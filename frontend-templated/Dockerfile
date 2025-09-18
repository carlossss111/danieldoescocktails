FROM python:3.13.7-alpine3.22

LABEL "author"="Daniel R"
LABEL "version"="2.1.0"

WORKDIR "/opt/danieldoescocktails"

COPY ["./src/", "./frontend"]
COPY ["./requirements.txt", "./"]

RUN ["pip", "install", "-r", "requirements.txt"]

WORKDIR "/opt/danieldoescocktails/frontend"
ENTRYPOINT ["gunicorn", "main:app", "-b", ":80"]

