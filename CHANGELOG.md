# 📋 Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

## [1.0.0] - 2025-08-02

### ✨ Added - Funcionalidades Nuevas

#### 🔐 Sistema de Autenticación
- **Registro de usuarios** con validación de email y contraseña
- **Inicio de sesión** con JWT tokens seguros
- **Guards de protección** para rutas autenticadas
- **Interceptor HTTP** para manejo automático de tokens
- **Logout** con limpieza de sesión

#### 📊 Gestión de Encuestas
- **Crear encuestas** con título y múltiples opciones (2-6)
- **Listar encuestas** ordenadas por fecha de creación
- **Ver detalles** de encuesta específica
- **Eliminar encuestas** con confirmación
- **Validaciones** completas en frontend y backend

#### 🗳️ Sistema de Votación
- **Votar en encuestas** con interface intuitiva
- **Prevención de voto duplicado** por usuario y encuesta
- **Actualización en tiempo real** de resultados
- **Transacciones atómicas** para consistencia de datos
- **Manejo de errores** específicos (409 Conflict para votos duplicados)

#### 📈 Visualización de Resultados
- **Dashboard principal** con todas las encuestas
- **Resultados en tiempo real** con porcentajes
- **Gráficos de barras** proporcionales por opción
- **Contador de votos totales** emitidos
- **Destacado del ganador** automático

#### 🎨 Interface de Usuario
- **Landing page** atractiva con call-to-action
- **Diseño responsive** con Tailwind CSS
- **Navegación fluida** entre secciones
- **Panel administrativo** para gestión de encuestas
- **Feedback visual** para todas las acciones

#### 🏗️ Arquitectura Backend
- **API RESTful** con ASP.NET Core 8
- **Controladores** separados por responsabilidad
- **DTOs** para validación de datos
- **Middleware** de autenticación JWT
- **Manejo de errores** globalizado

#### 🗄️ Base de Datos
- **Firebase Firestore** como base de datos NoSQL
- **Modelos** definidos con atributos Firestore
- **Consultas** optimizadas con ordenamiento
- **Seguridad** con Service Account
- **Backup automático** por Firebase

### 🔧 Technical Implementation

#### Frontend (Angular 17)
- **Standalone Components** para arquitectura moderna
- **Reactive Forms** con validaciones
- **Services** con inyección de dependencias
- **HTTP Client** con interceptores
- **Router** con guards de protección
- **TypeScript** strict mode habilitado

#### Backend (.NET 8)
- **Web API** con controladores RESTful
- **Firebase Admin SDK** para Firestore
- **JWT Bearer Authentication** 
- **Data Annotations** para validaciones
- **CORS** configurado para desarrollo
- **Logging** implementado

#### DevOps & Tooling
- **Git** para control de versiones
- **npm** para gestión de dependencias frontend
- **dotnet CLI** para gestión backend
- **Firebase CLI** para configuración
- **VS Code** configuración incluida

### 🛡️ Security Features

#### Autenticación y Autorización
- ✅ **JWT Tokens** con expiración configurable (30 min)
- ✅ **Encriptación de contraseñas** via Firebase Auth
- ✅ **Validación de tokens** en cada request autenticado
- ✅ **Claims personalizados** para roles de usuario
- ✅ **Logout seguro** con limpieza de tokens

#### Validaciones
- ✅ **Frontend**: Reactive Forms con validadores
- ✅ **Backend**: Data Annotations en DTOs
- ✅ **Database**: Reglas de seguridad Firebase
- ✅ **HTTP**: CORS configurado específicamente
- ✅ **Input Sanitization**: Automática por Angular

#### Protección de Datos
- ✅ **Transacciones atómicas** en Firestore
- ✅ **Prevención de inyección** SQL/NoSQL
- ✅ **Validación de entrada** en múltiples capas
- ✅ **Manejo seguro** de errores sin exposición de datos
- ✅ **Service Account** para acceso controlado a Firebase

### 📦 Dependencies

#### Frontend Dependencies
```json
{
  "@angular/core": "^17.0.0",
  "@angular/fire": "^17.0.0",
  "@angular/forms": "^17.0.0",
  "@angular/router": "^17.0.0",
  "firebase": "^10.0.0",
  "rxjs": "^7.5.0",
  "tailwindcss": "^3.3.0"
}
```

#### Backend Dependencies
```xml
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.7" />
<PackageReference Include="FirebaseAdmin" Version="3.3.0" />
<PackageReference Include="Google.Cloud.Firestore" Version="3.10.0" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
<PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="7.6.0" />
```

### 🎯 Objetivos Técnicos Completados

#### ✅ 1. Creación y Autenticación de Usuarios
- [x] Sistema de registro con validaciones
- [x] Autenticación con JWT tokens
- [x] Encriptación de contraseñas (Firebase)
- [x] Medidas de seguridad implementadas

#### ✅ 2. Creación de Encuestas (Base de Datos)
- [x] Backend .NET 8 con Firestore
- [x] Medidas de seguridad en acceso a datos
- [x] CRUD completo para encuestas
- [x] Validaciones en múltiples capas

#### ✅ 3. Pantalla de Selección y Votación
- [x] 3.1: Pantalla de selección de encuestas
- [x] 3.2: Pantalla de votación interactiva
- [x] Prevención de voto duplicado
- [x] Interface responsive

#### ✅ 4. Pantalla de Resultados
- [x] Visualización de resultados en tiempo real
- [x] Destacado de opción más votada
- [x] Gráficos proporcionales
- [x] Contador de votos totales

#### ✅ 5. Arquitectura y Diseño
- [x] Diseño escalable frontend/backend
- [x] Patrones de diseño implementados
- [x] Separación de responsabilidades
- [x] Documentación completa

### 🐛 Bug Fixes

#### Frontend
- **Fixed**: Bucle infinito en redirección de rutas protegidas
- **Fixed**: Configuración incorrecta de Firebase providers
- **Fixed**: Estilos CSS que no cubrían toda la pantalla en landing page
- **Fixed**: Manejo de errores HTTP sin feedback visual

#### Backend
- **Fixed**: Error 403 Forbidden en creación de encuestas (roles admin)
- **Fixed**: Error 400 Bad Request por validaciones estrictas en DTOs
- **Fixed**: Warnings de nullable reference types en .NET 8
- **Fixed**: Configuración CORS para desarrollo local

#### Integration
- **Fixed**: Interceptor HTTP no enviaba tokens correctamente
- **Fixed**: Mapeo incorrecto de datos entre frontend y backend
- **Fixed**: Validaciones inconsistentes entre capas
- **Fixed**: Manejo de errores de red sin retry logic

### 🔄 Changed

#### Configuration
- **Updated**: JWT token expiration aumentado a 30 minutos
- **Updated**: Validación mínima de título de encuesta de 5 a 1 caracter
- **Updated**: CORS policy para permitir cualquier origen en desarrollo
- **Updated**: Firebase SDK a versiones más recientes

#### UI/UX
- **Improved**: Landing page con diseño más atractivo
- **Improved**: Navegación con gradientes coherentes
- **Improved**: Panel administrativo con mejor UX
- **Improved**: Feedback visual para todas las acciones de usuario

#### Architecture
- **Refactored**: Componentes Angular a standalone architecture
- **Refactored**: Services con mejor separación de responsabilidades
- **Refactored**: Error handling centralizado
- **Refactored**: Interceptors con mejor manejo de errores

### 🗑️ Removed

#### Development
- **Removed**: Restricciones estrictas de roles admin (temporalmente)
- **Removed**: Validaciones excesivamente restrictivas
- **Removed**: Console.log statements de debug
- **Removed**: Dependencias no utilizadas en package.json

#### Security (Temporarily for Development)
- **Removed**: Admin role requirement para crear encuestas
- **Removed**: Admin role requirement para eliminar encuestas
- **Commented**: Endpoints de asignación de roles admin

### 📚 Documentation

#### Created
- ✅ **README.md** completo con instrucciones detalladas
- ✅ **INSTALL.md** con guía paso a paso de instalación
- ✅ **API.md** con documentación completa de endpoints
- ✅ **SCRIPTS.md** con scripts útiles de desarrollo
- ✅ **LICENSE.md** con términos de uso
- ✅ **CHANGELOG.md** (este archivo)