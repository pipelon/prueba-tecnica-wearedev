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


## 1. Clonar el repositorio

```bash
git clone https://github.com/pipelon/prueba-tecnica-wearedev.git
```

## 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

## 3. Configurar variables de entorno del Backend
Por ahora la unica variable que se configuró es el puerto ya que decidí hacer el alamacenamiento de la información en memoria

```bash
PORT=3000
```

## 4. Instalar dependencias del Frontend

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