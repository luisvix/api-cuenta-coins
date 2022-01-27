FROM node:16.13 as build
WORKDIR /container
COPY package*.json .
RUN npm install
COPY . .
CMD npm run build

FROM node:16.13 

WORKDIR /container
COPY package.json .
RUN npm install --only=production
COPY --from=build /container/dist ./dist
EXPOSE 80
CMD node dist/src/main.js
