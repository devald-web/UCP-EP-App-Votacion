using Google.Cloud.Firestore;

namespace Votacion.API.Models
{
    [FirestoreData]
    public class Opcion
    {
        [FirestoreProperty]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [FirestoreProperty]
        public string Texto { get; set; }

        [FirestoreProperty]
        public int Votos { get; set; } = 0;
    }
}