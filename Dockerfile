# Dockerfile
#Construyo el Build
FROM node:18.17.1 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

#Ejecucción del Build. La imagen final es mas limpia
FROM node:18.17.1 

WORKDIR /app

COPY --from=build /app .


CMD node index2.js