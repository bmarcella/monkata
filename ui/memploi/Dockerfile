# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app/ui/memploi

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

WORKDIR /app
# Copy common files from parent directory
COPY ../../common ./common

WORKDIR /app/ui/memploi

# Build the application (modify as per your build process)
RUN npm run build

# Stage 2: Serve the application with Nginx or any other server
FROM nginx:alpine

# Copy the built application from the previous stage to Nginx html directory
COPY --from=build /app/ui/memploi/dist/listee-angular /usr/share/nginx/html


# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
