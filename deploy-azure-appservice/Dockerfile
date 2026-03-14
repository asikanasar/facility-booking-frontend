# Use Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (runs postinstall build)
RUN npm install

# Copy all files
COPY . .

# postinstall already builds the React app

# Expose port
ENV PORT=3000
EXPOSE 3000

# Run app
CMD ["npm", "start"]
