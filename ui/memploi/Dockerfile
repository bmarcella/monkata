
# Stage 2: Serve the application with Nginx or any other server
FROM nginx:alpine

# Copy the built application from the previous stage to Nginx html directory
COPY ./dist /usr/share/nginx/html

RUN cd /usr/share/nginx/html && ls

COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
