FROM node:12

WORKDIR /app #En donde va aestar 

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]