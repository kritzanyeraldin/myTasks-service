# To-do-list (servicio)

Este proyecto es un servicio web construido con **Node** y **Express**.

## Requisitos

Debe tener instalado [`Node`](https://nodejs.org/en/download/package-manager) a partir de la versión 20 en adelante.

El proyecto utiliza [`pnpm`](https://pnpm.io/es/) como manejador de paquetes por su gestión eficiente y rápida. Puede instalarlo con [`npm`](https://pnpm.io/es/installation#usando-pnpm) a través del siguiente comando.

```sh
npm install -g pnpm
```

También debe contar con [`docker`](https://docs.docker.com) para levantar posteriormente la base de datos en un contenedor.

## Instalación

Primero, debe clonar el repositorio y luego instalar las dependencias:

```sh
# con https
git clone https://github.com/kritzanyeraldin/myTasks-service.git
# o con ssh
git clone git@github.com:kritzanyeraldin/myTasks-service.git

pnpm install
```

También debe crear un archivo `.env` en la raíz del proyecto que contenga las siguientes variables de entorno:

```sh
# archivo .env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_NAME=tasks_db
DB_PASSWORD=rootpass
```

**Nota**: Se deja el valor de las variables aquí por motivos prácticos, sin embargo es incorrecto.

## Ejecución

Para levantar la BD en un contenedor de Docker, es necesario que ejecute:

```sh
pnpm db:start

🗑️ Eliminando contenedor anterior (si existe)...
tasks-db
tasks-db
Deleted Volumes:
9c33cf31ad2c65858c0d1f58a80907ef4eec07c3b99ac3330ada7dc1696d3a19

Total reclaimed space: 209.2MB
🚀 Levantando nuevo contenedor de MySQL...
5f65b95c7ca7d6631a9bf509c7816c8d6ee4921d93749855749673d5343e265d
⏳ Esperando que MySQL esté disponible...
mysqld is alive
✅ MySQL está listo y ejecutándose.
```

Para iniciar el servidor de desarrollo, ejecute:

```sh
pnpm dev

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node --env-file=.env ./src/index.js`
Server is running on 8000
```

Esto iniciará la aplicación en [http://localhost:8000](http://localhost:8000) y escuchará cambios en el proyecto de forma local.

## Scripts disponibles

- **pnpm dev**: Inicia el servidor de desarrollo.
- **pnpm format**: Ejecuta Prettier para formatear el código acorde al 'code style'.
- **pnpm prepare**: Ejecuta la creación de la BD.

## Estructura del proyecto

```txt
📦softtek-challenge-service
 ┣ 📂database
 ┃ ┣ 📜01-create.sql            # Script para crear las tablas en la BD
 ┃ ┗ 📜02-insert.sql            # Script para poblar las tablas en la BD
 ┣ 📂src
 ┃ ┣ 📂adapters                 # Adaptadores para la entrada o salida de datos
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜db.js                  # Configuración de la DB
 ┃ ┃ ┗ 📜env.js                 # Lectura y validación del archivo .env
 ┃ ┣ 📂controllers              # Controladores para manejar la solicitud y respuesta de las rutas
 ┃ ┣ 📂errors
 ┃ ┃ ┗ 📜HttpError.js           # Clase de error personalizada para HTTP
 ┃ ┣ 📂messages                 # Mensajes centralizados para evitar magic strings
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜error-handler.js       # Manejador de errores global
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜validate-schema.js     # Validador de esquemas (params, body, query, etc)
 ┃ ┣ 📂routes                   # Rutas o endpoints disponibles
 ┃ ┣ 📂schemas                  # Esquemas de validación
 ┃ ┣ 📂services                 # Servicios que se encargan de la lógica de negocio
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜response-builder.js    # Utilidad para construir la respuesta (success o error)
 ┃ ┗ 📜index.js
 ┣ 📜.env                       # Variables de entorno
 ┣ 📜.env.example               # Ejemplo de estructura de variables de entorno
 ┣ 📜.gitignore                 # Archivo para ignorar carpetas o ficheros con git
 ┣ 📜.prettierignore            # Archivo para ignorar carpetas o ficheros con prettier
 ┣ 📜.prettierrc                # Configuración de prettier
 ┣ 📜README.md                  # Documentación del proyecto
 ┣ 📜package.json               # Información del proyecto y scripts
 ┗ 📜run.sh                     # Script para levantar la BD con docker
```

## Tecnologías utilizadas

- [**cors**](https://github.com/expressjs/cors#readme): Para habilitar el intercambio de recursos entre diferentes orígenes (CORS) en las peticiones HTTP.
- [**express**](https://expressjs.com/): Framework web para Node.js que permite crear y gestionar rutas, middlewares y controladores de forma sencilla.
- [**http-status**](https://github.com/adaltas/node-http-status): Para utilizar constantes de códigos de estado HTTP de forma semántica y legible.
- [**mysql2**](https://sidorares.github.io/node-mysql2/docs): Cliente MySQL para Node.js que permite conectarse a la base de datos y realizar consultas.
- [**nodemon**](https://nodemon.io/): Herramienta que reinicia automáticamente el servidor al detectar cambios en los archivos durante el desarrollo.
- [**zod**](https://zod.dev/): Librería de validación y parsing de esquemas para asegurar que los datos recibidos en las rutas cumplen con las estructuras esperadas.

## Dependencias de desarrollo utilizadas

El proyecto utiliza varias herramientas para mantener una alta calidad de código y mejorar el flujo de desarrollo:

- [**eslint**](https://www.npmjs.com/package/eslint): Para asegurar consistencia en el estilo del código y detectar posibles errores.
- [**prettier**](https://www.npmjs.com/package/prettier): Formateador de código automático para mantener un estilo consistente.
- [**husky**](https://typicode.github.io/husky/): Para ejecutar scripts antes de los commits, asegurando que el código esté limpio.
- [**lint-staged**](https://www.npmjs.com/package/lint-staged): Ejecuta linters en los archivos que han sido 'stageados' para commit.
