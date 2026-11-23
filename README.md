# Tripleten web_project_around_full
# Alrededor de los EE. UU. — Sprint 16

Aplicación Full Stack desarrollada con React y Node.js que permite a los usuarios registrarse, iniciar sesión y administrar sus tarjetas de lugares.

## Funcionalidades

- Registro e inicio de sesión con autenticación JWT.
- Contraseñas protegidas mediante hash con bcrypt.
- Rutas protegidas y persistencia de sesión.
- API REST con Express y MongoDB.
- Creación, visualización y eliminación de tarjetas.
- Gestión de likes y permisos por usuario.
- Validación de datos y manejo centralizado de errores.
- Limitación de solicitudes para registro e inicio de sesión.

## Tecnologías

**Frontend:** React, TypeScript, Vite y React Router.

**Backend:** Node.js, Express, TypeScript y MongoDB con Mongoose.

**Autenticación y seguridad:** JWT, bcryptjs, CORS y express-rate-limit.

**Despliegue:** Vercel y MongoDB Atlas.

## Despliegues

- **Frontend:** https://web-project-around-full-shk6.vercel.app/
- **Backend:** https://web-project-around-full-hazel.vercel.app/

## Ejecución local

1. Clonar el repositorio.
2. Instalar las dependencias en las carpetas `client` y `server`.
3. Configurar las variables de entorno siguiendo los archivos `.env.example`.
4. Iniciar el servidor y el cliente con `npm run dev`.

