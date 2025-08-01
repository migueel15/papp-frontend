# Etapa base
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Etapa development
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 4200
CMD ["pnpm", "run", "dev"]

# Etapa production
FROM base AS build
ENV NODE_ENV=production
COPY . .
RUN pnpm run build

FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY --from=build /app/dist ./dist
EXPOSE 4200
CMD ["pnpm", "run", "start"]
