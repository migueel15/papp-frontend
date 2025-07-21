FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 4200
RUN pnpm run build
CMD ["pnpm", "run", "start"]

