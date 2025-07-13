# AGENT.md

## Propósito

Este documento sirve como guía para agentes y desarrolladores que trabajen en el backend de PAPP. Aquí se resumen la arquitectura, convenciones, flujos principales, dependencias y recomendaciones para futuras sesiones de desarrollo y mantenimiento.

---

## Arquitectura General

- **Framework:** NestJS + Prisma ORM (PostgreSQL)
- **Módulos principales:** Autenticación (Google OAuth2 + JWT), Usuarios, Tareas
- **Punto de entrada:** `src/main.ts` inicializa la app y habilita CORS.
- **Estructura modular:** Cada dominio (auth, users, tasks) tiene su propio controller, service, DTOs y guards.

---

## Autenticación y Autorización

- **Login:** Solo por Google OAuth2 (`POST /auth/google`). Se almacena el access token y refresh token encriptados.
- **JWT:** Se genera y verifica en cada request protegida.
- **Guards:**
  - `AuthGuard`: Verifica JWT y agrega el payload a `request.user`.
  - `AdminGuard`: Permite acceso solo a usuarios con `isAdmin: true`.
  - `AuthorizedGuard`: Permite acceso solo a usuarios con `isAuthorized: true`.

---

## Roles y Permisos

- **Roles principales:** Administrador (`isAdmin`), Usuario autorizado (`isAuthorized`).
- **Gestión de roles:**
  - El primer administrador se define manualmente en la base de datos (modificando el campo `isAdmin` en la tabla `User`).
  - Los administradores pueden ver todos los usuarios en un panel, eliminar usuarios y cambiar sus roles (`isAdmin`, `isAuthorized`).
  - Los cambios de roles y eliminaciones se gestionan desde el panel de administración (endpoints protegidos por `AdminGuard`).

---

## Flujos principales

- **Usuarios:**
  - CRUD completo, filtrado por email, nombre, roles.
  - Solo administradores pueden crear, modificar, eliminar y listar usuarios.
- **Tareas:**
  - CRUD completo, filtrado por campos relevantes.
  - Solo usuarios autorizados pueden acceder a tareas.
- **Autenticación:**
  - Login con Google, almacenamiento seguro de tokens.
  - Endpoint para obtener perfil Google y userId.

---

## Base de datos

- **Modelos principales:** `User`, `Task`
- **Relaciones:** Un usuario puede tener muchas tareas.
- **Migraciones:** Gestionadas con Prisma. Las migraciones deben revisarse y aplicarse antes de desplegar.

---

## Convenciones y recomendaciones

- **DTOs:** Usar `class-validator` para validaciones en los DTOs.
- **Errores:** Usar las excepciones de NestJS (`HttpException`, `BadRequestException`, etc.) para manejo de errores consistente.
- **Dependencias:** Mantener actualizadas las dependencias principales (NestJS, Prisma, JWT, Google Auth).
- **Scripts útiles:** 
  - `pnpm run start:dev` para desarrollo.
  - `pnpm run test:e2e` para pruebas end-to-end.
  - `pnpm run lint` y `pnpm run format` para mantener el código limpio.

---

## Seguridad

- **Tokens de Google:** Se almacenan encriptados (AES-GCM) en la base de datos.
- **JWT:** Usar una clave secreta fuerte y mantenerla en variables de entorno.
- **Roles:** Solo administradores pueden modificar roles y eliminar usuarios.

---

## Recomendaciones para agentes

- Antes de modificar roles, asegúrate de tener acceso como administrador.
- Revisa las migraciones y el esquema de Prisma antes de modificar modelos.
- Mantén los DTOs y validaciones actualizados para evitar errores en los endpoints.
- Si agregas nuevos endpoints, documenta los guards y permisos requeridos.
- Si tienes dudas sobre flujos de negocio, consulta este documento o pregunta al responsable.
