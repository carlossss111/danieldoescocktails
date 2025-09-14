CONTAINERNAME="flask"
IMAGENAME="danieldoescocktails-flask"

docker-build:
	docker build -t $(IMAGENAME) .

docker-run: docker-build
	docker run --rm $(IMAGENAME) --name $(CONTAINERNAME)

