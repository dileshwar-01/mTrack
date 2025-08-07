FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5173

CMD ["npm", "run", "dev"]