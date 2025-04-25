FROM nginx:1.27.5-alpine3.21

LABEL "author"="Daniel R"
LABEL "version"="2.0.0"

COPY ["./src", "/usr/share/nginx/html"]
COPY ["./nginx.conf", "/etc/nginx/nginx.conf"]

EXPOSE 80/tcp

