# FROM node:18-alpine

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY . .


# EXPOSE 4000

# CMD [ "npm" ,"run", "start" ]


FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]