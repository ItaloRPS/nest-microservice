FROM node:18-slim

WORKDIR /home/node/app

COPY . .

RUN npm install

RUN apt-get update && apt-get install -y openssl

CMD ["tail","-f","/dev/null"]