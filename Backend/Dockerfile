FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
# sequelize-cli is used to apply migrations before the API starts.
RUN npm ci
COPY . .

EXPOSE 4000
CMD ["node", "src/server.js"]
