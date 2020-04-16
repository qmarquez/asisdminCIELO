FROM node:13

WORKDIR /asisdminCIELO

# Nest JS packages.
COPY ./app/package-lock.json ./app/package-lock.json
COPY ./app/package.json ./app/package.json

RUN npm install --prefix ./app

# Angular packages.
COPY ./web/package-lock.json ./web/package-lock.json
COPY ./web/package.json ./web/package.json

RUN npm install --prefix ./web

COPY . .

# Build nest app
RUN npm run build --prefix ./app

# Build angular app
RUN npm run build --prefix ./web

CMD npm start:prod --prefix ./app

EXPOSE 80