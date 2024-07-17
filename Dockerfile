FROM nginx:alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm-run-all
RUN npm-run-all build

COPY dist /app/dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]