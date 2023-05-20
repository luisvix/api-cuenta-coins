FROM node:18.16.0 as building
WORKDIR /container
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.16.0

WORKDIR /container
COPY package.json ./
RUN npm install --only=production
COPY --from=building /container/dist ./dist
EXPOSE 80
CMD node dist/src/main.js
