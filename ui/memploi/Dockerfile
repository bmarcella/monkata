# syntax=docker/dockerfile:1.2
# Stage 1: Build the Angular application
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /app/ui/memploi

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Copy common dependencies from a different context
# (Note the different syntax for multi-context copy)
COPY --from=common-context /../../common /app/common

# Go back to the application's working directory
WORKDIR /app/ui/memploi

# Build the Angular application in production mode
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built Angular application from the previous stage to the Nginx html directory
COPY --from=build /app/ui/memploi/dist/listee-angular /usr/share/nginx/html

# (Optional) Copy custom Nginx configuration file if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
