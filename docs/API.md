# 📋 API Documentation

## Base URL
```
Development: http://localhost:5054/api
Production: https://algun-dia.com/api
```

## Authentication
La API utiliza **JWT Bearer Token** para autenticación. Incluir en headers:
```http
Authorization: Bearer <jwt-token>
```

---

## 👤 Users Endpoints

### Register User
Registra un nuevo usuario en el sistema.

```http
POST /api/Users/register
```

**Request Body:**
```json
{
  "email": "micorreo@correo.com",
  "password": "contrasena123",
  "displayName": "Usuario1"
}
```

**Response (201 Created):**
```json
{
  "message": "Usuario registrado exitosamente",
  "userId": "firebase-user-uid"
}
```

**Possible Errors:**
- `400 Bad Request`: Email ya existe o datos inválidos
- `500 Internal Server Error`: Error de Firebase

---

### Login User
Autentica un usuario y retorna JWT token.

```http
POST /api/Users/login
```

**Request Body:**
```json
{
  "email": "micorreo@correo.com",
  "password": "contrasena123"
}
```

**Response (200 OK):**
```json
{
  "uid": "firebase-user-uid",
  "email": "micorreo@correo.com",
  "displayName": "Nombre Completo",
  "token": "jwt-token-aqui"
}
```

**Possible Errors:**
- `401 Unauthorized`: Credenciales incorrectas
- `400 Bad Request`: Datos faltantes o inválidos

---

### Test Firebase Connection
Endpoint de prueba para verificar configuración.

```http
GET /api/Users/test-firebase
```

**Response (200 OK):**
```json
{
  "message": "Firebase configuration is working correctly",
  "hasFirebaseApiKey": true,
  "hasJwtKey": true,
  "hasJwtIssuer": true,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

### Set Admin Role (Development)
Asigna rol de administrador a un usuario. **Solo para desarrollo.**

```http
POST /api/Users/set-admin-claim/{email}
```

**Path Parameters:**
- `email`: Email del usuario a hacer admin

**Response (200 OK):**
```json
{
  "message": "El rol de 'admin' ha sido asignado a usuario@ejemplo.com."
}
```

---

### Make Current User Admin (Development)
Asigna rol de admin al usuario autenticado. **Solo para desarrollo.**

```http
POST /api/Users/make-me-admin
```

**Headers Required:**
```http
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "message": "¡Felicidades! El rol de 'admin' ha sido asignado a usuario@ejemplo.com. Cierra sesión y vuelve a iniciar para que los cambios tomen efecto."
}
```

---

## 📊 Encuestas Endpoints

### Get All Polls
Obtiene todas las encuestas ordenadas por fecha de creación.

```http
GET /api/Encuestas
```

**Authentication:** No requerida (público)

**Response (200 OK):**
```json
[
  {
    "id": "encuesta-uuid",
    "titulo": "¿Cuál es tu lenguaje de programación favorito?",
    "creadorUid": "user-uid",
    "creadorNombre": "Usuario1",
    "fechaCreacion": "2025-08-02T19:30:00Z",
    "opciones": [
      {
        "id": "opcion-1-uuid",
        "texto": "JavaScript",
        "votos": 15
      },
      {
        "id": "opcion-2-uuid",
        "texto": "Python", 
        "votos": 23
      }
    ],
    "votantesUids": ["user-1-uid", "user-2-uid"]
  }
]
```

---

### Get Poll by ID
Obtiene una encuesta específica por su ID.

```http
GET /api/Encuestas/{id}
```

**Path Parameters:**
- `id`: ID único de la encuesta

**Authentication:** No requerida (público)

**Response (200 OK):**
```json
{
  "id": "encuesta-uuid",
  "titulo": "¿Cuál es tu framework frontend favorito?",
  "creadorUid": "user-uid",
  "creadorNombre": "María García",
  "fechaCreacion": "2025-01-15T14:20:00Z",
  "opciones": [
    {
      "id": "opcion-1-uuid",
      "texto": "React",
      "votos": 8
    },
    {
      "id": "opcion-2-uuid",
      "texto": "Angular",
      "votos": 12
    },
    {
      "id": "opcion-3-uuid",
      "texto": "Vue.js",
      "votos": 5
    }
  ],
  "votantesUids": ["user-1-uid", "user-3-uid"]
}
```

**Possible Errors:**
- `404 Not Found`: Encuesta no existe

---

### Create Poll
Crea una nueva encuesta.

```http
POST /api/Encuestas
```

**Headers Required:**
```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "titulo": "¿Cuál es tu IDE favorito?",
  "opciones": [
    "Visual Studio Code",
    "IntelliJ IDEA", 
    "Sublime Text",
    "Vim"
  ]
}
```

**Validation Rules:**
- `titulo`: Requerido, mínimo 1 carácter
- `opciones`: Requerido, mínimo 2 opciones

**Response (201 Created):**
```json
{
  "id": "nueva-encuesta-uuid",
  "titulo": "¿Cuál es tu IDE favorito?",
  "creadorUid": "current-user-uid",
  "creadorNombre": "Usuario Actual",
  "fechaCreacion": "2025-01-15T15:45:00Z",
  "opciones": [
    {
      "id": "opcion-1-uuid",
      "texto": "Visual Studio Code",
      "votos": 0
    },
    {
      "id": "opcion-2-uuid",
      "texto": "IntelliJ IDEA",
      "votos": 0
    }
  ],
  "votantesUids": []
}
```

**Possible Errors:**
- `400 Bad Request`: Datos de validación faltantes o incorrectos
- `401 Unauthorized`: Token JWT faltante o inválido

---

### Vote in Poll
Emite un voto en una encuesta específica.

```http
POST /api/Encuestas/{idEncuesta}/votar/{idOpcion}
```

**Path Parameters:**
- `idEncuesta`: ID de la encuesta
- `idOpcion`: ID de la opción a votar

**Headers Required:**
```http
Authorization: Bearer <jwt-token>
```

**Request Body:** Vacío `{}`

**Response (200 OK):**
```json
{
  "id": "encuesta-uuid",
  "titulo": "¿Cuál es tu lenguaje favorito?",
  "creadorUid": "creator-uid",
  "creadorNombre": "Creador",
  "fechaCreacion": "2025-01-15T10:30:00Z",
  "opciones": [
    {
      "id": "opcion-votada-uuid",
      "texto": "JavaScript",
      "votos": 16
    },
    {
      "id": "opcion-2-uuid",
      "texto": "Python",
      "votos": 23
    }
  ],
  "votantesUids": ["user-1-uid", "current-user-uid"]
}
```

**Possible Errors:**
- `401 Unauthorized`: Token JWT faltante o inválido
- `404 Not Found`: Encuesta o opción no existe
- `409 Conflict`: Usuario ya votó en esta encuesta

**Error Response Example (409):**
```json
{
  "message": "El usuario ya ha votado en esta encuesta."
}
```

---

### Delete Poll
Elimina una encuesta específica.

```http
DELETE /api/Encuestas/{id}
```

**Path Parameters:**
- `id`: ID de la encuesta a eliminar

**Headers Required:**
```http
Authorization: Bearer <jwt-token>
```

**Response (204 No Content):**
Sin cuerpo de respuesta.

**Possible Errors:**
- `401 Unauthorized`: Token JWT faltante o inválido
- `404 Not Found`: Encuesta no existe

---

## 🛡️ Security Considerations

### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "firebase-user-uid",
    "email": "user@example.com", 
    "displayName": "User Name",
    "role": "admin",
    "iss": "VotacionAPI",
    "aud": "VotacionApp",
    "exp": 1642681234,
    "jti": "token-unique-id"
  }
}
```

### Input Validation
- **Email**: Valid email format required
- **Password**: Minimum 6 characters (Firebase default)
- **Poll Title**: 1-200 characters, HTML stripped
- **Poll Options**: 2-6 options, 1-100 characters each

---

## 📊 Response Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST requests |
| 204 | No Content | Successful DELETE requests |
| 400 | Bad Request | Validation errors, malformed JSON |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Business logic conflict (already voted) |
| 500 | Server Error | Internal server or Firebase errors |

---

## 🧪 Testing Examples

### Using cURL

#### Register User
```bash
curl -X POST http://localhost:5054/api/Users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123",
    "displayName": "Test User"
  }'
```

#### Login User  
```bash
curl -X POST http://localhost:5054/api/Users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com", 
    "password": "admin123"
  }'
```

#### Create Poll
```bash
curl -X POST http://localhost:5054/api/Encuestas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "titulo": "¿Cuál prefieres?",
    "opciones": ["Opción A", "Opción B", "Opción C"]
  }'
```

#### Vote in Poll
```bash
curl -X POST http://localhost:5054/api/Encuestas/POLL_ID/votar/OPTION_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{}'
```
