FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 4000
CMD ["npm", "start"]
