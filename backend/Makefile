CONTAINERNAME="backend"
IMAGENAME="danieldoescocktails-backend"

docker-build:
	cd ../database && python -m build && cd -
	cp ../database/dist/cocktaildb-*-py3-none-any.whl .
	docker build -t $(IMAGENAME) .
	rm cocktaildb-*-py3-none-any.whl

docker-run: docker-build
	docker run -e IMAGE_DIRECTORY="/tmp" -e CORS-ALLOW-ORIGINS=["https://localhost"] -p 5000:5000 --rm $(IMAGENAME) --name $(CONTAINERNAME)

