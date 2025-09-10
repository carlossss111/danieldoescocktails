FROM python:3.13.7-alpine3.22

LABEL "author"="Daniel R"
LABEL "version"="2.0.2"
ENV   "VERSION"="2.0.2"

WORKDIR "/opt/danieldoescocktails"

COPY ["./src", "./backend"]
COPY ["./requirements.txt", "./"]
COPY ["./cocktaildb-2.0.2-py3-none-any.whl", "./"]

RUN ["pip", "install", "-r", "requirements.txt"]
RUN ["pip", "install", "./cocktaildb-2.0.2-py3-none-any.whl"]

EXPOSE 5000/tcp

ENTRYPOINT ["python", "/opt/danieldoescocktails/backend/main.py"]

