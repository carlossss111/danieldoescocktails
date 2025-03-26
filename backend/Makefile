CONTAINERNAME="backend"
IMAGENAME="danieldoescocktails-backend"

docker-build:
	cd ../database && python -m build && cd -
	cp ../database/dist/cocktaildb-*-py3-none-any.whl .
	docker build -t $(IMAGENAME) .
	rm cocktaildb-*-py3-none-any.whl

docker-run: docker-build
	docker run --rm $(IMAGENAME) --name $(CONTAINERNAME)

