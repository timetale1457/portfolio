# Step 1: Build the React app
FROM node:16-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the project
COPY . ./
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
