FROM node:22-slim AS builder

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM public.ecr.aws/lambda/nodejs:22

COPY package*.json ${LAMBDA_TASK_ROOT}/

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ${LAMBDA_TASK_ROOT}/

COPY drizzle.config.ts ${LAMBDA_TASK_ROOT}/

# COPY src/drizzle ${LAMBDA_TASK_ROOT}/src/drizzle

CMD [ "dist/main.handler" ]