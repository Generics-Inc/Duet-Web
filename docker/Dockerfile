FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:docker

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.output ./

CMD ["node", "server/index.mjs"]
