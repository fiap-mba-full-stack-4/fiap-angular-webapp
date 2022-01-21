# # Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM node:14.17.6 as build-stage
# # WORKDIR /app
# # COPY package*.json /app/
# # RUN npm install
# # COPY ./ /app/
# ARG configuration=production
# RUN npm run build -- --output-path=./dist/out --configuration $configuration

# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15
# #Copy ci-dashboard-dist
# COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# #Copy default nginx configuration
# COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# The standard nginx container just runs nginx. The configuration file added
# below will be used by nginx.
FROM nginx

# Copy the nginx configuration file. This sets up the behavior of nginx. Most
# important, it ensures that nginx listens on port 8080. Google App Engine expects
# the runtime to respond to HTTP requests at port 8080.
COPY nginx.conf /etc/nginx/nginx.conf

# create log dir configured in nginx.conf
RUN mkdir -p /var/log/fiap-angular-webapp

# Create a simple file to handle health checks. Health checking can be disabled
# in app.yaml, but is highly recommended. Google App Engine will send an HTTP
# request to /_ah/health and any 2xx or 404 response is considered healthy.
# Because 404 responses are considered healthy, this could actually be left
# out as nginx will return 404 if the file isn't found. However, it is better
# to be explicit.
RUN mkdir -p /usr/share/nginx/www/_ah && \
    echo "healthy" > /usr/share/nginx/www/_ah/health

# Finally, all static assets.
ADD dist/ /usr/share/nginx/www/fiap-angular-webapp

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/www/fiap-angular-webapp/assets/envconfig.template.js > /usr/share/nginx/www/fiap-angular-webapp/assets/envconfig.js && exec nginx -g 'daemon off;'"]
