# Name the node stage "builder"
FROM --platform=linux/amd64 node:14.7.0-alpine AS builder

# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .

RUN apk update && \
    apk add --update vips-tools vips-dev fftw-dev gcc g++ make libc6-compat && \
    apk add git && \
    apk add --no-cache python3 py3-pip && \
    python3 -m ensurepip && \
    apk add --no-cache libtool && \
    apk add --no-cache python2 && \
    apk add --no-cache automake && \
    apk add --no-cache autoconf && \
    apk add --no-cache dpkg && \
    apk add --no-cache pkgconfig && \
    apk add --no-cache nasm && \
    apk add --no-cache libpng && \
    apk add --no-cache libpng-dev && \
    rm -r /usr/lib/python*/ensurepip && \
    rm -rf /var/cache/apk/*


# install node modules and build assets
RUN rm yarn.lock
RUN yarn cache clean
RUN yarn --verbose
ENV NODE_OPTIONS=”–max_old_space_size=2048″
RUN yarn run build

FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
COPY ./nginx_docker.conf /etc/nginx/conf.d/default.conf
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/public /usr/share/nginx/html
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]