FROM nginx:1.27.5-alpine3.21

LABEL "author"="Daniel R"
LABEL "version"="2.0.0"

COPY ["./src/html", "/usr/share/nginx/static"]
COPY ["./src/styles", "/usr/share/nginx/static/css"]
COPY ["./src/javascript", "/usr/share/nginx/static/scripts"]
COPY ["./src/images", "/usr/share/nginx/static/images"]
COPY ["./nginx.conf", "/etc/nginx/nginx.conf"]
COPY ["./nginx-mime-types.conf", "/etc/nginx/mime.types"]

EXPOSE 80/tcp

