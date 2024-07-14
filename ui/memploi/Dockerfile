# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy common files from parent directory
COPY ../../common ./common

# Build the application (modify as per your build process)
RUN npm run build

# Stage 2: Serve the application with Nginx or any other server
FROM nginx:alpine

# Copy the built application from the previous stage to Nginx html directory
COPY --from=build /app/dist/listee-angular /usr/share/nginx/html

# Copy common files into the Nginx html directory if needed
COPY --from=build /app/common /usr/share/nginx/html/common

# (Optional) Copy custom Nginx configuration file if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
