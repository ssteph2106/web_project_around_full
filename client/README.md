# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

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