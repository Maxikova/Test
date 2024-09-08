FROM node:18.17.1 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM node:18.17.1

WORKDIR /app

COPY --from=build /app .


CMD node index.js