FROM node:12

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "start"]