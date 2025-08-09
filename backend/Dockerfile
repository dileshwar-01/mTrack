FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 4000

CMD ["npm", "start"]