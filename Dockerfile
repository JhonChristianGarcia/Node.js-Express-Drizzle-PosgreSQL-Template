FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY drizzle.config.ts ./
COPY src/drizzle ./src/drizzle

EXPOSE 3000

CMD ["sh", "-c", "npm run db:migrate && npm start"]

