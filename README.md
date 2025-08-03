# 🗳️ UCP-EP-App-Votacion

## Sistema de Votación Web - Reto Técnico

Aplicación web completa para la gestión de encuestas y votaciones, desarrollada con **Angular 17** y **.NET 8**, implementando autenticación segura con **JWT** y base de datos **Firebase Firestore**.

[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![.NET](https://img.shields.io/badge/.NET-8-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

---

## 🎯 Objetivos Técnicos Implementados

### ✅ 1. Creación y Autenticación de Usuarios
- **Sistema de registro y login** con validaciones completas
- **Autenticación JWT** con tokens seguros y expiración configurable
- **Encriptación de contraseñas** mediante Firebase Authentication
- **Interceptores HTTP** para manejo automático de tokens
- **Guards de protección** para rutas autenticadas

### ✅ 2. Creación de Encuestas (Base de Datos)
- **Backend .NET 8** con arquitectura RESTful
- **Firebase Firestore** como base de datos NoSQL
- **Validaciones de datos** con Data Annotations
- **Seguridad en el acceso** mediante autenticación JWT
- **CRUD completo** para gestión de encuestas

### ✅ 3. Pantalla de Selección y Votación
- **3.1 Pantalla de Selección**: Lista interactiva de encuestas disponibles
- **3.2 Pantalla de Votación**: Interface intuitiva para votar opciones
- **Prevención de voto duplicado** por usuario
- **Actualización en tiempo real** de resultados

### ✅ 4. Pantalla de Resultados
- **Visualización de resultados** con estadísticas en tiempo real
- **Destacado de opción ganadora** con diseño visual atractivo
- **Contador de votos totales** por encuesta
- **Interface responsive** para múltiples dispositivos

### ✅ 5. Arquitectura y Diseño
- **Arquitectura escalable** con separación frontend/backend
- **Patrón Repository** para acceso a datos
- **Inyección de dependencias** en ambos proyectos
- **Componentes reutilizables** en Angular
- **Diseño responsive** con Tailwind CSS

---

## 🚀 Tecnologías Utilizadas

### Frontend (Angular 17)
- **Angular Standalone Components** para arquitectura moderna
- **Angular Router** con guards de protección
- **Reactive Forms** para validaciones
- **HTTP Interceptors** para autenticación automática
- **Tailwind CSS** para diseño responsive

### Backend (.NET 8)
- **ASP.NET Core Web API** con controladores RESTful
- **JWT Bearer Authentication** para seguridad
- **Firebase Admin SDK** para integración con Firestore
- **Data Annotations** para validaciones
- **CORS** configurado para comunicación frontend

### Base de Datos
- **Firebase Firestore** para almacenamiento NoSQL
- **Firebase Authentication** para gestión de usuarios
- **Transacciones** para operaciones atómicas
- **Indexación automática** para consultas eficientes

---

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Node.js** (v18 o superior)
- **Angular CLI** (v17)
- **.NET 8 SDK**
- **Cuenta Firebase** con proyecto configurado

### 1. Clonar el Repositorio
```bash
git clone https://github.com/devald-web/UCP-EP-App-Votacion.git
cd UCP-EP-App-Votacion
```

### 2. Configuración del Backend

#### Instalar dependencias
```bash
cd backend
dotnet restore
```

#### Configurar Firebase
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar **Authentication** y **Firestore**
3. Generar **clave privada** del Service Account
4. Guardar como `firebase-credentials.json` en la carpeta `backend/`

#### Configurar appsettings.json
```json
{
  "Jwt": {
    "Key": "secret-key",
    "Issuer": "VotacionAPI",
    "Audience": "VotacionApp"
  },
  "Firebase": {
    "ApiKey": "tu-firebase-api-key"
  }
}
```

#### Ejecutar Backend
```bash
dotnet run
```
🌐 **Backend disponible en:** `http://localhost:5054`

### 3. Configuración del Frontend

#### Instalar dependencias
```bash
cd frontend
npm install
```

#### Configurar Firebase
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
    appId: "tu-app-id"
  },
  apiUrl: 'http://localhost:5054/api'
};
```

#### Ejecutar Frontend
```bash
ng serve --open
```
🌐 **Frontend disponible en:** `http://localhost:4200`

---

## 📋 Funcionalidades Principales

### 🔐 Autenticación
- **Registro de usuarios** con email y contraseña
- **Login seguro** con validación de credenciales
- **Landing page** atractiva con call-to-action
- **Protección de rutas** automática

### 📊 Gestión de Encuestas
- **Crear encuestas** con múltiples opciones (2-6)
- **Listar encuestas** ordenadas por fecha
- **Eliminar encuestas** con confirmación
- **Panel administrativo** intuitivo

### 🗳️ Sistema de Votación
- **Votar una vez** por encuesta por usuario
- **Resultados en tiempo real** 
- **Prevención de fraude** con validación de usuario
- **Interface visual** para selección de opciones

---

## 🏗️ Arquitectura del Sistema

### Frontend (Angular)
```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   ├── pages/               # Páginas principales
│   │   ├── index/           # Landing page
│   │   ├── login/           # Autenticación
│   │   ├── register/        # Registro
│   │   ├── home/            # Dashboard principal
│   │   └── admin/           # Panel administrativo
│   ├── services/            # Servicios de datos
│   │   ├── auth.service.ts  # Gestión de autenticación
│   │   └── poll.service.ts  # Gestión de encuestas
│   ├── guards/              # Protección de rutas
│   │   ├── auth.guard.ts    # Guard de autenticación
│   │   └── admin.guard.ts   # Guard de administrador
│   └── interceptors/        # Interceptores HTTP
│       └── auth.interceptor.ts
```

### Backend (.NET)
```
backend/
├── Controllers/             # Controladores API
│   ├── EncuestasController.cs
│   └── UsersController.cs
├── Models/                  # Modelos de datos
│   ├── Encuesta.cs
│   └── Opcion.cs
├── DTOs/                    # Objetos de transferencia
│   ├── CrearEncuestaDto.cs
│   ├── LoginRequestDto.cs
│   └── AuthResponseDto.cs
└── firebase-credentials.json
```

---

## 🔒 Seguridad Implementada

### Autenticación
- ✅ **JWT Tokens** con expiración configurable
- ✅ **Encriptación de contraseñas** via Firebase
- ✅ **Validación de tokens** en cada request
- ✅ **Refresh automático** de sesiones

### Autorización
- ✅ **Guards de ruta** para protección frontend
- ✅ **Middleware de autorización** en backend
- ✅ **Validación de roles** para operaciones administrativas
- ✅ **CORS configurado** específicamente

### Validaciones
- ✅ **Validaciones frontend** con Reactive Forms
- ✅ **Validaciones backend** con Data Annotations
- ✅ **Sanitización de datos** automática
- ✅ **Prevención de inyección** SQL/NoSQL

---

## 📱 Screenshots

### Landing Page
![Landing Page](https://i.ibb.co/MxXRdt4q/F47546-BC-5156-45-BD-89-C8-C3-A5644-EBD47.png)

### Panel de Votación
![Voting Panel](https://i.ibb.co/5WbsRxkQ/334-DEE20-9282-4857-95-D5-352-DB56-CB6-DB.png)

### Resultados
![Results](https://i.ibb.co/nN2ZkwJ5/D29390-E8-1356-439-F-9575-C44686259679.png)

### Panel Administrativo
![Admin Panel](https://i.ibb.co/jP1ZfSyF/28-B0-D4-CC-2-F81-4-DF2-8-E0-D-E45-F2-C0-CDDB6.png)

---

## 🚦 API Endpoints

### Autenticación
```http
POST /api/Users/register     # Registro de usuario
POST /api/Users/login        # Inicio de sesión
POST /api/Users/make-me-admin # Asignar rol admin (dev)
```

### Encuestas
```http
GET    /api/Encuestas           # Listar todas las encuestas
GET    /api/Encuestas/{id}      # Obtener encuesta específica
POST   /api/Encuestas           # Crear nueva encuesta
DELETE /api/Encuestas/{id}      # Eliminar encuesta
POST   /api/Encuestas/{id}/votar/{opcionId} # Votar en encuesta
```

---

## 🔧 Variables de Entorno

### Backend (appsettings.json)
```json
{
  "Jwt": {
    "Key": "clave-secreta-jwt",
    "Issuer": "VotacionAPI", 
    "Audience": "VotacionApp"
  },
  "Firebase": {
    "ApiKey": "firebase-api-key"
  }
}
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  firebase: { /* configuración firebase */ },
  apiUrl: 'http://localhost:5054/api'
};
```

---