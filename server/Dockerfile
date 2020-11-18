FROM node:10.19.0

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]