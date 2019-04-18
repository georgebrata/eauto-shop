FROM node

MAINTAINER nicejade

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 9999

CMD npm start
