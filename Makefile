start-services:
	- ./docker/scripts/init.sh
stop-services:
	- docker compose down
build:
	- docker build -f ./Dockerfile-prod -t ms-widget-container:latest .
start:
	- docker run --name ms-widget-container -p 5021:80 -d ms-widget-container:latest
exec:
	- docker exec -it ms-widget-container /bin/sh
logs:
	- docker logs -f --tail 50 --timestamps ms-widget-container
