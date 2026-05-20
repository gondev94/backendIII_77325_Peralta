# Backend III - Coderhouse (77325) - Peralta Gonzalo

API REST desarrollada con Node.js y Express para el curso de Backend III de Coderhouse.

## Información del Proyecto

- **Autor:** Gonzalo Ezequiel Peralta
- **Curso:** Backend III - Coderhouse (Comisión 77325)
- **Profesor:** A
- **Licencia:** MIT

---

## Enlaces

| Recurso                | URL                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Repositorio GitHub** | [https://github.com/gondev94/backendIII_77325_Peralta](https://github.com/gondev94/backendIII_77325_Peralta)                                                             |
| **Imagen DockerHub**   | [https://hub.docker.com/repository/docker/gonzaloperalta94/77325-peralta-coderhouse](https://hub.docker.com/repository/docker/gonzaloperalta94/77325-peralta-coderhouse) |

---

## Tecnologías Utilizadas

- Node.js 20
- Express 5.x
- Jest (Testing)
- Supertest (Testing HTTP)
- Swagger (Documentación API)
- Docker
- Winston (Logging)

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) v20 o superior
- [Docker](https://www.docker.com/) instalado
- [Git](https://git-scm.com/)

---

## Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/gondev94/backendIII_77325_Peralta.git

# Ingresar al directorio
cd backendIII_77325_Peralta

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env basándose en .env.example (si existe)

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en modo producción
npm start
```

---

## Docker

### Construir la Imagen Localmente

```bash
# Construir la imagen
docker build -t backend-iii-77325 .

# Ejecutar el contenedor
docker run -d -p 7777:7777 --name backend-api backend-iii-77325
```

### Ejecutar desde DockerHub

```bash
# Descargar y ejecutar la imagen desde DockerHub
docker pull gondev94/backend-iii-77325:latest

docker run -d -p 7777:7777 --name backend-api gondev94/backend-iii-77325:latest
```

### Subir Imagen a DockerHub

```bash
# Iniciar sesión en DockerHub
docker login

# Etiquetar la imagen
docker tag backend-iii-77325 gondev94/backend-iii-77325:latest

# Subir la imagen
docker push gondev94/backend-iii-77325:latest
```

### Verificar que el Contenedor está Corriendo

```bash
# Ver contenedores activos
docker ps

# Ver logs del contenedor
docker logs backend-api
```

La API estará disponible en: `http://localhost:7777`

---

## Tests

El proyecto incluye tests unitarios y de integración utilizando Jest y Supertest.

### Archivos de Test

- `src/test/user.test.js` - Tests unitarios
- `src/test/user.routes.test.js` - Tests de integración de rutas

### Ejecutar Tests Localmente

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con cobertura
npm test -- --coverage
```

### Ejecutar Tests con Docker

```bash
# Construir imagen y ejecutar tests
docker build -t backend-iii-77325 .
docker run --rm backend-iii-77325 npm test
```

### Test de Carga (Artillery)

```bash
# Ejecutar test de carga
npm run load:test
```

---

## Evidencia de Pruebas

### Logs de Ejecución de Tests

```
$ npm test

> 77325_peralta@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js

 PASS  src/test/user.test.js
 PASS  src/test/user.routes.test.js

Test Suites: 2 passed, 2 total
Tests:       X passed, X total
Snapshots:   0 total
Time:        X.XXs
```

### Logs de Docker

```
$ docker build -t backend-iii-77325 .

[+] Building X.Xs (X/X) FINISHED
 => [1/6] FROM node:20-alpine
 => [2/6] WORKDIR /app
 => [3/6] COPY package*.json ./
 => [4/6] RUN npm ci
 => [5/6] COPY . .
 => [6/6] RUN mkdir -p src/logs/errors
 => exporting to image

$ docker run -d -p 7777:7777 --name backend-api backend-iii-77325
<container_id>

$ docker ps
CONTAINER ID   IMAGE               PORTS                    STATUS
xxxxxxxxxxxx   backend-iii-77325   0.0.0.0:7777->7777/tcp   Up X seconds
```

---

## Estructura del Proyecto

```
├── src/
│   ├── controllers/     # Controladores
│   ├── middlewares/     # Middlewares
│   ├── models/          # Modelos
│   ├── repositories/    # Repositorios (acceso a datos)
│   ├── routes/          # Rutas de la API
│   ├── services/        # Servicios (lógica de negocio)
│   ├── test/            # Tests
│   │   ├── user.test.js
│   │   └── user.routes.test.js
│   └── logs/            # Logs de la aplicación
├── app.js               # Punto de entrada
├── Dockerfile           # Configuración Docker
├── package.json         # Dependencias y scripts
└── README.md            # Este archivo
```

---

## API Endpoints

La documentación completa de la API está disponible en Swagger:
- Local: `http://localhost:7777/api-docs`

---

## Variables de Entorno

| Variable   | Descripción             | Valor por defecto |
| ---------- | ----------------------- | ----------------- |
| `PORT`     | Puerto de la aplicación | 7777              |
| `NODE_ENV` | Entorno de ejecución    | development       |

---

## Comandos Disponibles

| Comando             | Descripción                                       |
| ------------------- | ------------------------------------------------- |
| `npm start`         | Inicia la aplicación en producción                |
| `npm run dev`       | Inicia la aplicación en modo desarrollo (nodemon) |
| `npm test`          | Ejecuta los tests con Jest                        |
| `npm run load:test` | Ejecuta tests de carga con Artillery              |

---

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
