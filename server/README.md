# Tripleten web_project_around_express

# Around the U.S. — API

## Descripción

Proyecto del Sprint 13 del bootcamp de desarrollo web. Consiste en un servidor web creado con Node.js, Express y TypeScript para proporcionar datos de usuarios y tarjetas en formato JSON.

## Funcionalidades

- Obtener la lista de usuarios.
- Obtener la lista de tarjetas.
- Obtener los datos de un usuario mediante su ID.
- Responder con errores HTTP 404 para rutas o usuarios inexistentes.
- Responder con errores HTTP 500 cuando ocurre un error interno al procesar los archivos.

## Tecnologías

- Node.js
- Express
- TypeScript
- JavaScript ES Modules
- ESLint
- Prettier
- `node:fs/promises` para la lectura asíncrona de archivos.
- `node:path` e `import.meta.dirname` para construir rutas a los archivos de datos.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

   ```bash
   npm install
   ```

## Comandos disponibles

- `npm run dev`: inicia el servidor de desarrollo con recarga automática.
- `npm run build`: compila TypeScript y genera los archivos JavaScript en `dist`.
- `npm start`: inicia el servidor compilado.
- `npm run lint`: analiza el código con ESLint.

## Rutas de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users` | Obtiene todos los usuarios. |
| GET | `/cards` | Obtiene todas las tarjetas. |
| GET | `/users/8340d0ec33270a25f2413b69` | Obtiene los datos del usuario con ese ID. |

El servidor se ejecuta en `http://localhost:3000`.

## Manejo de errores

Las respuestas de error contienen únicamente el campo `message` y utilizan el código de estado HTTP correspondiente.

# Around the U.S. — REST API

## Descripción

Este proyecto consiste en el desarrollo de una API REST para la aplicación **Around the U.S.**, que permite gestionar usuarios y tarjetas de lugares mediante operaciones HTTP. La información se almacena en una base de datos MongoDB.

El proyecto forma parte del Sprint 14 del bootcamp de desarrollo web Full Stack y se enfoca en la creación de un servidor con Express, TypeScript y Mongoose.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** framework para crear el servidor y definir las rutas de la API.
- **TypeScript:** tipado estático para mejorar la seguridad y el mantenimiento del código.
- **MongoDB:** base de datos NoSQL.
- **Mongoose:** modelado de datos, esquemas y validaciones.
- **Postman:** pruebas de los endpoints y respuestas HTTP.

## Funcionalidades implementadas

### Usuarios

- Obtener la lista de usuarios.
- Obtener la información del usuario actual.
- Buscar un usuario por su ID.
- Crear usuarios.
- Actualizar el nombre y la descripción del usuario actual.
- Actualizar el avatar del usuario actual.

### Tarjetas

- Obtener la lista de tarjetas.
- Crear tarjetas asociadas al usuario actual.
- Eliminar tarjetas.
- Dar y quitar «Me gusta» a las tarjetas.
- Calcular si una tarjeta tiene «Me gusta» del usuario actual mediante la propiedad `isLiked`.

### Validaciones y manejo de errores

- Validación de campos obligatorios y longitudes mediante esquemas de Mongoose.
- Validación del formato de las URL del avatar y de las imágenes.
- Validación de identificadores y manejo de recursos inexistentes.
- Middleware centralizado para gestionar errores HTTP.
- Respuestas JSON con mensajes personalizados para errores de validación e identificadores inválidos.
- Manejo de errores inesperados con código HTTP 500.

## Endpoints de la API

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/users` | Obtener todos los usuarios |
| GET | `/users/me` | Obtener el usuario actual |
| GET | `/users/:id` | Obtener un usuario por ID |
| POST | `/users` | Crear un usuario |
| PATCH | `/users/me` | Actualizar nombre y descripción |
| PATCH | `/users/me/avatar` | Actualizar avatar |

### Tarjetas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/cards` | Obtener todas las tarjetas |
| POST | `/cards` | Crear una tarjeta |
| DELETE | `/cards/:id` | Eliminar una tarjeta |
| PUT | `/cards/:id/likes` | Dar «Me gusta» |
| DELETE | `/cards/:id/likes` | Quitar «Me gusta» |

## Instalación y ejecución

1. Clonar el repositorio.
2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Asegurarse de que MongoDB esté instalado y en ejecución.
4. Iniciar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Para compilar TypeScript:

   ```bash
   npm run build
   ```

6. Para iniciar la versión compilada:

   ```bash
   npm run start
   ```

7. Para ejecutar el linter:

   ```bash
   npm run lint
   ```

El servidor utiliza el puerto `3000` y se conecta a la base de datos `aroundb` en MongoDB local.

## Pruebas

Los endpoints se probaron con Postman para comprobar la creación y consulta de usuarios y tarjetas, la actualización de perfiles, las operaciones de «Me gusta», la eliminación de tarjetas y las respuestas de error.

## Autoría

Proyecto desarrollado como parte del bootcamp de desarrollo web Full Stack.


Around the U.S. — Aplicación web

Aplicación web desarrollada como proyecto del Sprint 15 del bootcamp de Desarrollo Web Full Stack de TripleTen. Permite a los usuarios registrarse, iniciar sesión y compartir lugares mediante tarjetas con imágenes.

El proyecto integra una aplicación frontend desarrollada con React y TypeScript con una API propia construida con Node.js, Express y MongoDB. La autenticación se realiza mediante la API de autenticación de TripleTen.

Funcionalidades

Autenticación

Registro de nuevos usuarios.

Inicio y cierre de sesión.

Validación de sesión mediante token.

Almacenamiento del token en localStorage.

Protección de rutas para usuarios autenticados.

Persistencia de sesión al recargar la aplicación.

Perfil de usuario

Visualización de información del perfil.

Edición del nombre y descripción.

Actualización del avatar.

Tarjetas

Visualización de tarjetas de lugares.

Creación de nuevas tarjetas.

Eliminación de tarjetas.

Dar y quitar «Me gusta».

Visualización de imágenes de los lugares.

Interfaz

Diseño basado en el prototipo de Figma.

Formularios de registro e inicio de sesión.

Ventanas modales para editar información y gestionar tarjetas.

Diseño adaptable a diferentes tamaños de pantalla.

Tecnologías utilizadas

Frontend

React

TypeScript

React Router

Vite

HTML5

CSS3

Backend

Node.js

Express

TypeScript

MongoDB

Mongoose

CORS

Autenticación

API de autenticación de TripleTen

JSON Web Token (JWT)

LocalStorage

Estructura del proyecto

web_project_around_full/
├── client/          # Aplicación frontend
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── interfaces/
│       ├── utils/
│       └── blocks/
│
├── server/          # API REST
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
│
├── package.json
└── README.md

Instalación y ejecución

Requisitos previos

Node.js y npm.

MongoDB instalado y en ejecución.

Git.

1. Clonar el repositorio

git clone <URL-DE-TU-REPOSITORIO>
cd web_project_around_full

2. Instalar las dependencias

Desde la carpeta raíz del proyecto:

npm run install:all

Este comando instala las dependencias del frontend y del backend.

3. Iniciar MongoDB

Asegúrate de que MongoDB esté funcionando localmente. El servidor utiliza la base de datos aroundb.

4. Iniciar el backend

Desde la carpeta raíz, ejecuta:

npm run dev:server

La API estará disponible en:

http://localhost:3001

5. Iniciar el frontend

Abre una segunda terminal desde la carpeta raíz y ejecuta:

npm run dev:client

La aplicación estará disponible en:

http://localhost:3000

Mantén ambos procesos en ejecución mientras utilizas la aplicación.

API REST

La API propia gestiona los datos del perfil y las tarjetas.

Usuarios

Método

Endpoint

Descripción

GET

/users/me

Obtener el perfil actual

PATCH

/users/me

Actualizar nombre y descripción

PATCH

/users/me/avatar

Actualizar avatar

Tarjetas

Método

Endpoint

Descripción

GET

/cards

Obtener todas las tarjetas

POST

/cards

Crear una tarjeta

DELETE

/cards/:id

Eliminar una tarjeta

PUT

/cards/:id/likes

Dar «Me gusta»

DELETE

/cards/:id/likes

Quitar «Me gusta»

La autenticación y la gestión de tokens se realizan mediante el servicio de autenticación de TripleTen.

Scripts disponibles

Desde la raíz:

Comando

Descripción

npm run install:all

Instalar dependencias del cliente y servidor

npm run dev:client

Iniciar el frontend

npm run dev:server

Iniciar el backend

Desde client/:

Comando

Descripción

npm run dev

Iniciar Vite

npm run build

Compilar y generar la versión de producción

npm run lint

Ejecutar ESLint

Desde server/:

Comando

Descripción

npm run dev

Iniciar el servidor en modo desarrollo

npm run build

Compilar TypeScript

npm start

Iniciar el servidor compilado

npm run lint

Ejecutar ESLint

Autoría

Desarrollado por Stephanie Mendoza como parte del bootcamp de Desarrollo Web Full Stack de TripleTen.