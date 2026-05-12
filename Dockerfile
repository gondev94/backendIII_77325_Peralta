# imagen base oficial de node
FROM node:20-alpine

# directorio de trabajo dentro del contenedor

WORKDIR /app

# copiamos primero los archivos de dependencias para aprovechar el cache de DOCKER

COPY package*.json ./

# instalamos dependencias solamente necesarias para produccion

RUN npm ci

# copiamos el resto del proyecto

COPY . .

# creamos la carpeta de logs

RUN mkdir -p src/logs/errors

# indicamos el puerto en el que escucha la app dentro del contenedor

EXPOSE 7777

# variables de entorno

ENV NODE_ENV=production
ENV PORT=7777

# comando para ejecutar la app

CMD ["npm", "start"]
