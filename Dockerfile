FROM node:20.12.2 as building
WORKDIR /container
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.12.2

WORKDIR /container
COPY package.json ./
RUN npm install --only=production
COPY --from=building /container/dist ./dist
EXPOSE 80
CMD node dist/main.js
