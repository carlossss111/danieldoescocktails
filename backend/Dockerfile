FROM python:3.13.11-alpine3.23

LABEL "author"="Daniel R"
LABEL "version"="2.1.2"
ENV   "VERSION"="2.1.2"

WORKDIR "/opt/danieldoescocktails"

COPY ["./src", "./backend"]
COPY ["./requirements.txt", "./"]
COPY ["./cocktaildb-2.1.2-py3-none-any.whl", "./"]

RUN ["pip", "install", "-r", "requirements.txt"]
RUN ["pip", "install", "./cocktaildb-2.1.2-py3-none-any.whl"]

EXPOSE 5000/tcp

ENTRYPOINT ["python", "/opt/danieldoescocktails/backend/main.py"]

