# 🚀 Guía de Instalación Detallada

## Requisitos del Sistema

### Software Necesario
- **Node.js** 18.x o superior
- **npm** 9.x o superior  
- **.NET 8 SDK**
- **Angular CLI** v17
- **Git**
- **Editor de código** (VS Code recomendado)

### Cuentas de Servicio
- **Cuenta Google** para Firebase
- **Proyecto Firebase** configurado

---

## 🔧 Configuración Paso a Paso

### 1. Preparación del Entorno

#### Verificar instalaciones
```bash
# Verificar Node.js
node --version  # Debe ser v18.x+

# Verificar npm
npm --version   # Debe ser 9.x+

# Verificar .NET
dotnet --version # Debe ser 8.x.x

# Instalar Angular CLI globalmente
npm install -g @angular/cli@17
```

### 2. Configuración de Firebase

#### Crear Proyecto Firebase
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Hacer clic en "Crear proyecto"
3. Seguir el asistente de configuración

#### Habilitar Servicios
1. **Authentication:**
   - Ir a Authentication > Sign-in method
   - Habilitar "Email/Password"
   
2. **Firestore Database:**
   - Ir a Firestore Database
   - Crear base de datos en modo "test"
   - Seleccionar ubicación más cercana

#### Obtener Credenciales Web
1. Ir a Configuración del proyecto (⚙️)
2. En "Tus apps" hacer clic en "Web app"
3. Registrar app con nombre descriptivo
4. Copiar la configuración de Firebase

#### Generar Service Account
1. Ir a Configuración del proyecto > Service accounts
2. Hacer clic en "Generar nueva clave privada"
3. Descargar archivo JSON
4. Renombrar a `firebase-credentials.json`

### 3. Configuración del Backend

#### Clonar y navegar
```bash
git clone https://github.com/devald-web/UCP-EP-App-Votacion.git
cd UCP-EP-App-Votacion/backend
```

#### Restaurar dependencias
```bash
dotnet restore
```

#### Configurar credenciales
1. Copiar `firebase-credentials.json` a la carpeta `backend/`
2. Crear/editar `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Jwt": {
    "Key": "tu-clave-super-secreta-de-al-menos-32-caracteres-aqui",
    "Issuer": "VotacionAPI",
    "Audience": "VotacionApp"
  },
  "Firebase": {
    "ApiKey": "tu-firebase-web-api-key-aqui"
  }
}
```

#### Verificar configuración
```bash
# Compilar proyecto
dotnet build

# Ejecutar en modo desarrollo
dotnet run
```

**✅ Backend corriendo en:** `http://localhost:5054`

### 4. Configuración del Frontend

#### Navegar e instalar
```bash
cd ../frontend
npm install
```

#### Configurar ambiente
Editar `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "tu-firebase-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  },
  apiUrl: 'http://localhost:5054/api'
};
```

#### Ejecutar aplicación
```bash
ng serve --open
```

**✅ Frontend corriendo en:** `http://localhost:4200`

---

## 🔍 Verificación de Instalación

### Tests de Conectividad

#### 1. Test Backend
```bash
curl http://localhost:5054/api/Users/test-firebase
```

**Respuesta esperada:**
```json
{
  "message": "Firebase configuration is working correctly",
  "hasFirebaseApiKey": true,
  "hasJwtKey": true,
  "hasJwtIssuer": true,
  "timestamp": "2025-01-XX..."
}
```

#### 2. Test Frontend
1. Abrir `http://localhost:4200`
2. Verificar que aparece la landing page
3. Probar navegación a Login/Register

#### 3. Test Integración
1. Registrar un usuario nuevo
2. Iniciar sesión
3. Crear una encuesta de prueba
4. Votar en la encuesta

---

## 🛠️ Solución de Problemas Comunes

### Error: "Firebase credentials not found"
**Solución:**
- Verificar que `firebase-credentials.json` esté en `backend/`
- Verificar permisos del archivo
- Reiniciar el servidor backend

### Error: "CORS policy"
**Solución:**
- Verificar que backend esté corriendo en puerto 5054
- Verificar configuración CORS en `Program.cs`
- Usar `http://` no `https://` en desarrollo

### Error: "Cannot GET /"
**Solución:**
- Verificar que Angular CLI esté instalado globalmente
- Ejecutar `npm install` en carpeta frontend
- Verificar que puerto 4200 esté disponible

### Error: "JWT key not configured"
**Solución:**
- Verificar `appsettings.json` tenga sección `Jwt`
- Verificar que la clave tenga al menos 32 caracteres
- Reiniciar backend después de cambios

---

## 📱 Configuración para Producción

### Backend
```json
// appsettings.Production.json
{
  "Jwt": {
    "Key": "clave-produccion-super-segura",
    "Issuer": "VotacionAPI",
    "Audience": "VotacionApp"
  },
  "Firebase": {
    "ApiKey": "firebase-key-produccion"
  }
}
```

### Frontend
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  firebase: { /* config producción */ },
  apiUrl: 'https://tu-api-produccion.com/api'
};
```

---

## 🎯 Próximos Pasos

1. **Crear primer usuario admin:**
   - Registrarte en la aplicación
   - Usar endpoint `/api/Users/make-me-admin` (POST)
   - Cerrar sesión e iniciar nuevamente

2. **Crear encuestas de prueba:**
   - Ir al panel administrativo
   - Crear 2-3 encuestas con diferentes opciones
   - Probar votación con diferentes usuarios

3. **Explorar funcionalidades:**
   - Probar todas las pantallas
   - Verificar responsive design
   - Probar casos límite (votar twice, etc.)

---

