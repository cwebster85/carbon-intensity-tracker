# Dockerfile
FROM node:22

WORKDIR /app

COPY app/package*.json ./
RUN npm install --include=dev

COPY app ./

# Make the www file executable
RUN chmod +x ./bin/www

# Start the application directly
CMD ["npm", "run", "dev"]