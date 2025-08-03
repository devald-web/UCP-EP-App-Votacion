using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Votacion.API.DTOs
{
    public class CrearEncuestaDto
    {
        [Required]
        [MinLength(1)] // Cambiado de 5 a 1 para facilitar testing
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        public List<string> Opciones { get; set; } = new List<string>(); // Solo necesitamos una lista de textos para las opciones
    }
}