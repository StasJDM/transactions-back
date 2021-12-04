FROM node:14

EXPOSE 80

WORKDIR /home/app

COPY . /home/app

RUN yarn

RUN yarn build
