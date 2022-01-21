# # Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM node:14.17.6 as build-stage
# # WORKDIR /app
# # COPY package*.json /app/
# # RUN npm install
# # COPY ./ /app/
# ARG configuration=production
# RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM node:14.17.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.20.1
COPY --from=build-step /app/dist/fiap-ng-docker /usr/share/nginx/html
EXPOSE 4200:80
