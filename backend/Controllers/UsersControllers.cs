using Microsoft.AspNetCore.Mvc;
using Votacion.API.DTOs;
using FirebaseAdmin.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Votacion.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public UsersController(IConfiguration config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto request)
        {
            try
            {
                var userArgs = new UserRecordArgs
                {
                    Email = request.Email,
                    Password = request.Password,
                    DisplayName = request.DisplayName,
                    EmailVerified = false,
                    Disabled = false
                };
                var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(userArgs);
                return Ok(new { Message = "Usuario registrado exitosamente", UserId = userRecord.Uid });
            }
            catch (FirebaseAdmin.Auth.FirebaseAuthException ex)
            {
                // Simplificamos el manejo de errores para que sea más robusto
                return BadRequest(new { Message = $"Error en el registro: {ex.Message}" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            try
            {
                // Verificar credenciales usando Firebase REST API
                var isValidCredentials = await VerifyCredentialsAsync(request.Email, request.Password);

                if (!isValidCredentials)
                {
                    return Unauthorized(new { Message = "El correo o la contraseña son incorrectos." });
                }

                // Obtener información del usuario
                var userRecord = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(request.Email);
                var token = GenerateJwtToken(userRecord);

                var response = new AuthResponseDto
                {
                    Uid = userRecord.Uid,
                    Email = userRecord.Email,
                    DisplayName = userRecord.DisplayName,
                    Token = token
                };
                return Ok(response);
            }
            catch (FirebaseAdmin.Auth.FirebaseAuthException)
            {
                return Unauthorized(new { Message = "El correo o la contraseña son incorrectos." });
            }
        }

        [HttpGet("test-firebase")]
        public IActionResult TestFirebase()
        {
            try
            {
                var firebaseApiKey = _config["Firebase:ApiKey"];
                var jwtKey = _config["Jwt:Key"];
                var jwtIssuer = _config["Jwt:Issuer"];

                return Ok(new
                {
                    Message = "Firebase configuration is working correctly",
                    HasFirebaseApiKey = !string.IsNullOrEmpty(firebaseApiKey),
                    HasJwtKey = !string.IsNullOrEmpty(jwtKey),
                    HasJwtIssuer = !string.IsNullOrEmpty(jwtIssuer),
                    Timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = $"Error checking Firebase configuration: {ex.Message}" });
            }
        }

        private async Task<bool> VerifyCredentialsAsync(string email, string password)
        {
            try
            {
                var firebaseApiKey = _config["Firebase:ApiKey"] ?? throw new ArgumentNullException("Firebase:ApiKey is not configured.");
                var requestUri = $"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={firebaseApiKey}";

                var requestBody = new
                {
                    email = email,
                    password = password,
                    returnSecureToken = true
                };

                var json = System.Text.Json.JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(requestUri, content);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        private string GenerateJwtToken(UserRecord user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // 1. Empezamos con los claims básicos
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Uid),
        new Claim(JwtRegisteredClaimNames.Email, user.Email!),
        new Claim("displayName", user.DisplayName ?? ""),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            // 2. Le pedimos a Firebase los roles personalizados (custom claims)
            if (user.CustomClaims != null)
            {
                foreach (var claim in user.CustomClaims)
                {
                    claims.Add(new Claim(claim.Key, claim.Value.ToString()));
                }
            }
            // --- FIN DE LA LÓGICA MEJORADA ---

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims, // Usamos la lista de claims que ahora incluye el rol
                expires: DateTime.Now.AddHours(8),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [HttpPost("set-admin-claim/{email}")]
        public async Task<IActionResult> SetAdminClaim(string email)
        {
            try
            {
                // Primero, obtenemos el usuario por su email
                var user = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(email);
                if (user == null)
                {
                    return NotFound(new { Message = "Usuario no encontrado." });
                }

                // Creamos el "claim" personalizado. Esto es lo que se añade al token.
                var claims = new Dictionary<string, object>()
        {
            { "role", "admin" }
        };

                // Establecemos el claim para ese usuario
                await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(user.Uid, claims);

                return Ok(new { Message = $"El rol de 'admin' ha sido asignado a {email}." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Ocurrió un error: {ex.Message}" });
            }
        }
    }
}