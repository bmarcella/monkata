# Stage 1: Build the Angular application
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app/ui/memploi

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force
# Copy the rest of the application code
COPY . .

COPY ../../common ../../

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/ui/memploi/dist/listee-angular /usr/share/nginx/html

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
