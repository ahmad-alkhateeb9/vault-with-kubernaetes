FROM node:alpine

ENV  USERNAME=DEFUALT  
ENV  PASSWORD=DEFUALT

WORKDIR /app

COPY *.json /app/

RUN npm install

COPY . /app/

CMD ["npm", "start" , "${USERNAME}" , "${PASSWORD}"]
