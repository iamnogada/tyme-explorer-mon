FROM node:10.16.0-alpine

RUN mkdir /app


COPY ./ /app

WORKDIR /app

RUN npm install

EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD ["./bin/www"]