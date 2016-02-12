FROM node:argon

RUN mkdir -p /usr/src/felicity
WORKDIR /usr/src/felicity

COPY package.json /usr/src/felicity
RUN npm install

COPY . /usr/src/felicity

EXPOSE 8080

CMD ["npm", "start"]