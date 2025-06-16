FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install react-modal --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]