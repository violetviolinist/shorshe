# Use Node.js 22 as the base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Start the server
CMD ["npm", "start"]
