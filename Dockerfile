# base image
FROM node:12.2.0-alpine AS build-env

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV npm_config_unsafe_perm=true

# install and cache app dependencies
COPY package.json /app/package.json
COPY ./public /app/public
COPY ./src /app/src
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 3000

# start app
CMD ["npm", "start"]