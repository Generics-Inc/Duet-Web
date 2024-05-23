FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN nuxt build --dotenv ../.env

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.output ./

CMD ["node", "server/index.mjs"]
