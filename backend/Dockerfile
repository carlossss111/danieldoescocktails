FROM python:3.13.2-alpine3.21

LABEL "author"="Daniel R"
LABEL "version"="2.0.0"

COPY ["./src", "/opt/danieldoescocktails/backend"]
COPY ["./requirements.txt", "/opt/danieldoescocktails/."]
COPY ["./cocktaildb-2.0.0-py3-none-any.whl", "/opt/danieldoescocktails/."]

RUN ["pip", "install", "-r", "/opt/danieldoescocktails/requirements.txt"]

EXPOSE 5000/tcp

ENTRYPOINT ["python", "/opt/danieldoescocktails/backend/main.py"]

