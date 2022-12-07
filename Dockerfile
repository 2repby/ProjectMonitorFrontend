FROM node:alpine
# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider
# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package.json ./
COPY package-lock.json ./
RUN apk add git
RUN apk add --update --no-cache curl jq py3-configobj py3-pip py3-setuptools python3 python3-dev
# устанавливаем зависимости проекта
RUN apk add --no-cache --virtual .gyp make g++ \
    && npm install  --force \
    && apk del .gyp


RUN npm install -g http-server
COPY ./src ./src
COPY ./public ./public
COPY ./vue.config.js ./vue.config.js
COPY ./babel.config.js ./babel.config.js
# собираем приложение для production с минификацией
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build  --max_old_space_size=1024
EXPOSE 8800
CMD [ "http-server", "dist", "-p", "8800"]

