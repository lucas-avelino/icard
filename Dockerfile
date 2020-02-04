FROM node:10.13.0-alpine as dependencies-env

#GET DEPS IMAGE
WORKDIR /packages
COPY package*.json yarn.lock ./
RUN yarn install --prod

#BUILD IMAGE
FROM dependencies-env AS build-env
WORKDIR /app
COPY --from=dependencies-env /packages ./
COPY ./ ./
RUN yarn build

#FINAL IMAGE
FROM nginx:1.15
COPY --from=build-env /app/build/ /usr/share/nginx/html
COPY --from=build-env /app/nginx.conf /etc/nginx/conf.d/default.conf