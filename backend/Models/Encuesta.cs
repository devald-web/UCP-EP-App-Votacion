using Google.Cloud.Firestore;
using System.Collections.Generic;

namespace Votacion.API.Models
{
    [FirestoreData]
    public class Encuesta
    {
        [FirestoreDocumentId] // Esto le dice a Firestore que use esta propiedad como el ID del documento
        public string Id { get; set; }

        [FirestoreProperty]
        public string Titulo { get; set; }

        [FirestoreProperty]
        public string CreadorUid { get; set; } // ID del usuario que la creó

        [FirestoreProperty]
        public string CreadorNombre { get; set; }

        [FirestoreProperty]
        public List<Opcion> Opciones { get; set; } = new List<Opcion>();

        [FirestoreProperty]
        public Timestamp FechaCreacion { get; set; } = Timestamp.GetCurrentTimestamp();
    }
}