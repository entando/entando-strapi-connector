FROM node:lts-alpine

# node-canvas
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

# Use latest version of npm
RUN npm install npm@latest -g
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
WORKDIR /usr
COPY . .

ENV PORT=8081
EXPOSE 8081

CMD [ "npm", "run", "start" ]