using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Votacion.API.DTOs
{
    public class CrearEncuestaDto
    {
        [Required]
        [MinLength(5)]
        public string Titulo { get; set; }

        [Required]
        [MinLength(2)]
        public List<string> Opciones { get; set; } // Solo necesitamos una lista de textos para las opciones
    }
}