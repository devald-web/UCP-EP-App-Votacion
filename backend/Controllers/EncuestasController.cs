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
    public class EncuestasController : ControllerBase
    {
        private readonly FirestoreDb _db;
        private readonly CollectionReference _encuestasCollection;

        public EncuestasController(FirestoreDb db)
        {
            _db = db;
            _encuestasCollection = _db.Collection("encuestas");
        }

        // Endpoint para crear una nueva encuesta.
        // [Authorize] asegura que solo usuarios con un token JWT válido puedan acceder.
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CrearEncuesta([FromBody] CrearEncuestaDto encuestaDto)
        {
            // Obtenemos la información del usuario desde el token JWT.
            var userUid = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userDisplayName = User.FindFirstValue("displayName");

            if (string.IsNullOrEmpty(userUid) || string.IsNullOrEmpty(userDisplayName))
            {
                return Unauthorized("La información del usuario no se encontró en el token.");
            }

            var nuevaEncuesta = new Encuesta
            {
                Titulo = encuestaDto.Titulo,
                CreadorUid = userUid,
                CreadorNombre = userDisplayName,
                Opciones = encuestaDto.Opciones.Select(texto => new Opcion { Texto = texto }).ToList()
            };

            // Añadimos la encuesta a Firestore. Firestore generará un ID automáticamente.
            var documentRef = await _encuestasCollection.AddAsync(nuevaEncuesta);
            nuevaEncuesta.Id = documentRef.Id;

            return CreatedAtAction(nameof(GetEncuestaPorId), new { id = nuevaEncuesta.Id }, nuevaEncuesta);
        }

        // Endpoint para obtener todas las encuestas. Es público.
        [HttpGet]
        public async Task<IActionResult> GetTodasLasEncuestas()
        {
            var snapshot = await _encuestasCollection.OrderByDescending("FechaCreacion").GetSnapshotAsync();
            var encuestas = snapshot.Documents.Select(doc => doc.ConvertTo<Encuesta>()).ToList();
            return Ok(encuestas);
        }

        // Endpoint para obtener una encuesta específica por su ID. Es público.
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEncuestaPorId(string id)
        {
            var documentSnapshot = await _encuestasCollection.Document(id).GetSnapshotAsync();
            if (!documentSnapshot.Exists)
            {
                return NotFound("No se encontró la encuesta.");
            }
            var encuesta = documentSnapshot.ConvertTo<Encuesta>();
            return Ok(encuesta);
        }
    }
}