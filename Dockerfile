FROM node:14.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build
CMD [ "npm", "run", "start" ]
