CONTAINERNAME="frontend"
IMAGENAME="danieldoescocktails-frontend"

docker-build:
	docker build -t $(IMAGENAME) .

docker-run: docker-build
	docker run --rm $(IMAGENAME) --name $(CONTAINERNAME)

