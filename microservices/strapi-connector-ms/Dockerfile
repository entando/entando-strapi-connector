FROM node:lts-alpine

ENV NPM_CONFIG_CACHE=/app/.npm
ENV PORT=8081

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

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
COPY . .
RUN chmod -R g=u /app

EXPOSE 8081


CMD [ "npm", "run", "start" ]