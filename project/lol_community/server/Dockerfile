# Step 1: Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend source files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose port (e.g., 5000)
EXPOSE 5000

# Run the application
CMD ["node", "dist/main.js"]
