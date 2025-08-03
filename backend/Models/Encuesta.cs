using Google.Cloud.Firestore;
using System.Collections.Generic;

namespace Votacion.API.Models
{
    [FirestoreData]
    public class Encuesta
    {
        [FirestoreDocumentId]
        public string Id { get; set; }

        [FirestoreProperty]
        public string Titulo { get; set; }

        [FirestoreProperty]
        public string CreadorUid { get; set; }

        [FirestoreProperty]
        public string CreadorNombre { get; set; }

        [FirestoreProperty]
        public List<Opcion> Opciones { get; set; } = new List<Opcion>();

        // Guardará los UIDs de los usuarios que ya votaron en esta encuesta.
        [FirestoreProperty]
        public List<string> VotantesUids { get; set; } = new List<string>();

        [FirestoreProperty]
        public Timestamp FechaCreacion { get; set; } = Timestamp.GetCurrentTimestamp();
    }
}