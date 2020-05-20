FROM node:13.8.0 as front

WORKDIR /app
COPY ./ /app/

RUN yarn install
RUN yarn run build

FROM nginx:1.17.8-alpine
RUN rm -rf /usr/share/nginx/html
COPY --from=front /app/public/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf