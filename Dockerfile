# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

# Add wait-for-it script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for production
ENV NODE_ENV=production

# Start the app with wait-for-it using sh
CMD ["bash", "/usr/local/bin/wait-for-it.sh", "backend:8000", "--", "node", "server-frontend.js"]
