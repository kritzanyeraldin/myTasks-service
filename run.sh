#!/bin/bash

# Cargar variables desde .env
set -o allexport
source .env
set +o allexport

# Eliminar contenedor anterior si existe
echo "🗑️ Eliminando contenedor anterior (si existe)..."
docker stop tasks-db 2>/dev/null
docker rm -f tasks-db 2>/dev/null

# (Opcional) Eliminar volúmenes para limpieza total
docker volume prune -f

# Crear nuevo contenedor de MySQL con scripts
echo "🚀 Levantando nuevo contenedor de MySQL..."
docker run -d \
  --name tasks-db \
  -e MYSQL_ROOT_PASSWORD="$DB_PASSWORD" \
  -e MYSQL_DATABASE="$DB_NAME" \
  -v $(pwd)/database:/docker-entrypoint-initdb.d \
  -p 3306:3306 \
  mysql:latest

# Esperar hasta que MySQL esté listo
echo "⏳ Esperando que MySQL esté disponible..."
until docker exec tasks-db mysqladmin ping -h"localhost" --silent; do
  sleep 1
done

echo "✅ MySQL está listo y ejecutándose."
