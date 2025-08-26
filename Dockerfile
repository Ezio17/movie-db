# ========================
# Stage 1: Build stage
# ========================
FROM node:20-bullseye AS build

WORKDIR /app

# Передаємо режим білду (DEV/PROD)
ARG MODE=DEV
ENV MODE=$MODE

# Копіюємо package.json і package-lock.json / yarn.lock
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копіюємо весь код
COPY . .

# Будуємо Nuxt 3 та Storybook
RUN npm run build
RUN npm run build-storybook

# ========================
# Stage 2: Dev / Local testing
# ========================
FROM node:20-bullseye AS dev

WORKDIR /app

# Копіюємо package.json і встановлюємо залежності
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копіюємо збірки з build stage
COPY --from=build /app/.output /app/.output
COPY --from=build /app/storybook-static /app/storybook-static

# Встановлюємо глобально утиліти для запуску обох процесів одночасно
RUN npm install -g concurrently http-server

# Експортуємо порти
EXPOSE 3001 6008

# Запускаємо Nuxt і Storybook одночасно
CMD ["npm", "run", "start:all"]
