FROM node:slim

WORKDIR /src

RUN apt-get update -y && apt-get install -y openssl

COPY package.json package-lock.json ./

RUN npm install

RUN npm install bcrypt

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]





