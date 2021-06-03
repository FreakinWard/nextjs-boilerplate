FROM node:12-alpine as base
WORKDIR /base
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM base as build
WORKDIR /build
RUN npm install -g next
COPY --from=base /base/package*.json ./
COPY --from=base /base/.next ./.next
COPY --from=base /base/public ./public

FROM nginx:stable-alpine as production
WORKDIR /app
COPY --from=build /build ./

EXPOSE 3000

CMD npm run start
