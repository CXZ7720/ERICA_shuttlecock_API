FROM node:12

WORKDIR /usr/src/shuttle_API
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["node", "index.js"]