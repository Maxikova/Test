FROM node:20

WORKDIR /app #En donde va aestar 

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["npm","script"]