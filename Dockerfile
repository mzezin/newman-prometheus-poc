FROM node:10-alpine as builder
WORKDIR /server
COPY . .
RUN npm install
RUN npm run build

FROM node:10-alpine  
WORKDIR /server
COPY --from=builder /server/package.json .
COPY --from=builder /server/dist/server.js .
RUN npm install --only=prod

EXPOSE 3000

CMD ["npm", "run", "prod"]
