namespace Votacion.API.DTOs
{
    public class AuthResponseDto
    {
        public string Uid { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
    }
}