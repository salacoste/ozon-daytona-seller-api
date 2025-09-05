# -------- builder --------
    FROM node:22-alpine AS builder
    WORKDIR /app
    COPY package.json tsconfig.json ./
    RUN npm install
    COPY src ./src
    RUN npm run build
    
    # -------- runner --------
    FROM node:22-alpine
    WORKDIR /app
    # бинарник
    COPY --from=builder /app/dist ./dist
    # по умолчанию корень с md-артефактами смонтируем в /data/ozon-api-md
    ENV OZON_MD_ROOT=/data/ozon-api-md
    # включим http-режим по порту 8088 (можно изменить)
    ENV HTTP_PORT=8088
    EXPOSE 8088
    CMD ["node", "dist/index.js"]
    