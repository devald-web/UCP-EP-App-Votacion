using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Votacion.API.Models;
using Votacion.API.DTOs;
using Google.Cloud.Firestore;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Votacion.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Protegeremos todo el controlador por defecto
    public class EncuestasController : ControllerBase
    {
        private readonly FirestoreDb _db;
        private readonly CollectionReference _encuestasCollection;

        public EncuestasController(FirestoreDb db)
        {
            _db = db;
            _encuestasCollection = _db.Collection("encuestas");
        }

        // POST /api/encuestas
        [HttpPost]
        // [Authorize(Roles = "admin")] // Comentado: cualquier usuario autenticado puede crear encuestas
        public async Task<IActionResult> CrearEncuesta([FromBody] CrearEncuestaDto encuestaDto)
        {
            // Debug logs
            Console.WriteLine($"Received DTO: Titulo='{encuestaDto?.Titulo}', Opciones Count={encuestaDto?.Opciones?.Count}");
            if (encuestaDto?.Opciones != null)
            {
                for (int i = 0; i < encuestaDto.Opciones.Count; i++)
                {
                    Console.WriteLine($"Opcion {i}: '{encuestaDto.Opciones[i]}'");
                }
            }

            var userUid = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userDisplayName = User.FindFirstValue("displayName");

            var nuevaEncuesta = new Encuesta
            {
                Titulo = encuestaDto.Titulo,
                CreadorUid = userUid,
                CreadorNombre = userDisplayName,
                Opciones = encuestaDto.Opciones.Select(texto => new Opcion { Texto = texto }).ToList()
            };

            var documentRef = await _encuestasCollection.AddAsync(nuevaEncuesta);
            nuevaEncuesta.Id = documentRef.Id;

            return CreatedAtAction(nameof(GetEncuestaPorId), new { id = nuevaEncuesta.Id }, nuevaEncuesta);
        }

        // GET /api/encuestas
        [HttpGet]
        [AllowAnonymous] // Todos, incluso sin loguear, pueden ver las encuestas
        public async Task<IActionResult> GetTodasLasEncuestas()
        {
            var snapshot = await _encuestasCollection.OrderByDescending("FechaCreacion").GetSnapshotAsync();
            var encuestas = snapshot.Documents.Select(doc => {
                var encuesta = doc.ConvertTo<Encuesta>();
                encuesta.Id = doc.Id; // Asegurarse de que el ID esté asignado
                return encuesta;
            }).ToList();
            return Ok(encuestas);
        }

        // GET /api/encuestas/{id}
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEncuestaPorId(string id)
        {
            var documentSnapshot = await _encuestasCollection.Document(id).GetSnapshotAsync();
            if (!documentSnapshot.Exists)
            {
                return NotFound("No se encontró la encuesta.");
            }
            var encuesta = documentSnapshot.ConvertTo<Encuesta>();
            encuesta.Id = documentSnapshot.Id;
            return Ok(encuesta);
        }

        // POST /api/encuestas/{idEncuesta}/votar/{idOpcion}
        [HttpPost("{idEncuesta}/votar/{idOpcion}")]
        public async Task<IActionResult> Votar(string idEncuesta, string idOpcion)
        {
            var userUid = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userUid))
            {
                return Unauthorized();
            }

            var encuestaRef = _encuestasCollection.Document(idEncuesta);

            try
            {
                var encuestaActualizada = await _db.RunTransactionAsync(async transaction =>
                {
                    var snapshot = await transaction.GetSnapshotAsync(encuestaRef);
                    if (!snapshot.Exists) throw new Exception("No se encontró la encuesta.");

                    var encuesta = snapshot.ConvertTo<Encuesta>();
                    
                    // --- VERIFICAR SI YA VOTÓ ---
                    if (encuesta.VotantesUids.Contains(userUid))
                    {
                        throw new Exception("El usuario ya ha votado en esta encuesta.");
                    }

                    var opcionAVotar = encuesta.Opciones.FirstOrDefault(o => o.Id == idOpcion);
                    if (opcionAVotar == null) throw new Exception("No se encontró la opción especificada.");
                    
                    opcionAVotar.Votos++;
                    encuesta.VotantesUids.Add(userUid); // Añadir al votante a la lista

                    transaction.Set(encuestaRef, encuesta);
                    encuesta.Id = snapshot.Id;
                    return encuesta;
                });

                return Ok(encuestaActualizada);
            }
            catch (Exception ex)
            {
                // Si el error es porque ya votó, enviamos un 409 Conflict
                if (ex.Message.Contains("ya ha votado"))
                {
                    return Conflict(new { Message = ex.Message });
                }
                return NotFound(new { Message = ex.Message });
            }
        }

        // DELETE /api/encuestas/{id}
        [HttpDelete("{id}")]
        // [Authorize(Roles = "admin")] // Comentado: cualquier usuario autenticado puede eliminar encuestas
        public async Task<IActionResult> BorrarEncuesta(string id)
        {
            var docRef = _encuestasCollection.Document(id);
            var snapshot = await docRef.GetSnapshotAsync();
            if (!snapshot.Exists)
            {
                return NotFound();
            }

            await docRef.DeleteAsync();
            return NoContent(); // 204 No Content es la respuesta estándar para un DELETE exitoso
        }
    }
}