# Prueba Técnica - Gestión de Tareas

## 1. Descripción del proyecto y objetivo

Desarrollar una aplicación funcional para la gestión de tareas que permita crear, visualizar, editar y eliminar tareas. Esta prueba evalúa tu capacidad para construir una solución full-stack con buenas prácticas de desarrollo, manejo de errores, validaciones y arquitectura escalable.

---

# 2. Tecnologías utilizadas

- Node.js: `v24.14.1`
- npm: `v11.11.0`
- Angular: `v21.2.21`
- Operating System : `linux x64`
- Express
- JavaScript (ES Modules)
- Jest
- Supertest
- Swagger / OpenAPI
- CORS
- dotenv

---

# 3. Instalación

## Requisitos previos

Para ejecutar el proyecto se requiere tener instalado:

- Node.js `v24.14.1` o una versión compatible.
- npm `v11.11.0`
- Angular: `v21.2.21`
- Git


### 1. Clonar el repositorio

```bash
git clone https://github.com/pipelon/prueba-tecnica-wearedev.git
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Configurar variables de entorno del Backend
Por ahora la unica variable que se configuró es el puerto ya que decidí hacer el alamacenamiento de la información en memoria

```bash
PORT=3000
```

### 4. Instalar dependencias del Frontend

```bash
cd ..
cd frontend
npm install
```

---

# 4. Ejecución en desarrollo

El proyecto está compuesto por un Backend desarrollado con Node.js + Express y un Frontend desarrollado con Angular. Ambos deben ejecutarse de manera independiente.

### Backend

Desde la carpeta `backend`:

```bash
npm run dev
```

El servidor se ejecutará en:

```bash
http://localhost:3000
```

La API REST estará disponible en:
```bash
http://localhost:3000/api/tasks
```

Documentación de la API mediante Swagger:
```bash
http://localhost:3000/api-docs
```

### Frontend
Desde la carpeta frontend:
```bash
npm start
```

La aplicación Angular estará disponible en:
```bash
http://localhost:4200
```

---

# 5. Arquitectura

La aplicación está dividida en dos proyectos independientes:

- **Backend:** API REST desarrollada con Node.js y Express.
- **Frontend:** Aplicación web desarrollada con Angular.

Esta separación permite mantener las responsabilidades de cada parte del sistema claramente definidas y facilita futuras modificaciones o escalabilidad.

### Estructura del Backend

El Backend sigue una estructura sencilla basada en separación de responsabilidades:

```text
backend/
├── src/
│   ├── controllers/
│   │   ├── task.controller.js
│   │   └── task.controller.test.js
│   │
│   ├── services/
│   │   ├── task.service.js
│   │   └── task.service.test.js
│   │
│   ├── repositories/
│   │   ├── task.repository.js
│   │   └── task.repository.test.js
│   │
│   ├── models/
│   │   └── task.model.js
│   │
│   ├── middleware/
│   │   └── error.middleware.js
│   │
│   ├── routes/
│   │   └── task.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
└── README.md
```

Responsabilidades principales:

- **Controllers:** reciben las peticiones HTTP y construyen las respuestas.
- **Services:** contienen la lógica de negocio relacionada con las tareas.
- **Repositories:** gestionan el almacenamiento de las tareas en memoria.
- **Models:** definen la estructura de una tarea.
- **Middleware:** centraliza el manejo de errores de la aplicación.
- **Routes:** definen los endpoints disponibles de la API.

La información se almacena en memoria, tal como permite la especificación de la prueba. Por este motivo, los datos se pierden al reiniciar el servidor.

### Estructura del Frontend

El Frontend está organizado mediante componentes y servicios, separando la lógica de presentación de la comunicación con la API:

```text
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── task-list/
│   │   │   │   ├── task-list.ts
│   │   │   │   ├── task-list.html
│   │   │   │   └── task-list.css
│   │   │   │
│   │   │   └── task-modal/
│   │   │       ├── task-modal.ts
│   │   │       ├── task-modal.html
│   │   │       └── task-modal.css
│   │   │
│   │   ├── models/
│   │   │   └── task.model.ts
│   │   │
│   │   ├── services/
│   │   │   └── task.service.ts
│   │   │
│   │   ├── app.ts
│   │   └── app.config.ts
│   │
│   └── environments/
│       └── environment.ts
│
├── angular.json
├── package.json
└── tsconfig.json
```

Responsabilidades principales:

- **TaskList:** componente principal encargado de mostrar y gestionar el listado de tareas.
- **TaskModal:** componente reutilizable utilizado para crear y editar tareas.
- **TaskService:** centraliza las peticiones HTTP hacia el Backend.
- **Models:** contienen las interfaces TypeScript utilizadas para mantener el tipado de los datos.
- **Environment:** contiene la configuración de la URL base de la API.

### Comunicación entre Backend y Frontend

El Frontend y el Backend se ejecutan como aplicaciones independientes y se comunican mediante una API REST utilizando HTTP.

```text
┌──────────────────────┐
│      Angular         │
│    localhost:4200    │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│   Node.js + Express  │
│    localhost:3000    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Repository         │
│   Memoria (RAM)      │
└──────────────────────┘
```

El `TaskService` del Frontend realiza las peticiones HTTP a los endpoints proporcionados por el Backend:

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

Las respuestas se intercambian en formato JSON.

El Backend es responsable de las validaciones, reglas de negocio y manejo de errores, mientras que el Frontend se encarga de la interacción con el usuario, validaciones del formulario, visualización de información y manejo de los estados de la interfaz.