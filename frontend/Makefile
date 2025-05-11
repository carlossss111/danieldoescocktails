CONTAINERNAME="frontend"
IMAGENAME="danieldoescocktails-frontend"

compile-typescript:
	mkdir src/javascript/ &> /dev/null || true
	tsc src/typescript/* --outDir src/javascript --target es2015

clean:
	rm src/javascript/*.js

docker-build: compile-typescript
	docker build -t $(IMAGENAME) .

docker-run: docker-build
	docker run --rm $(IMAGENAME) --name $(CONTAINERNAME)

