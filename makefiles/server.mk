### SERVER
# ¯¯¯¯¯¯¯¯¯¯¯

server.start: ## Start server in its docker container
	docker-compose up bhayangkara

server.build:
	docker-compose up bhayangkara -d --build

server.bash: ## Connect to server to lauch commands
	docker-compose exec server bash

server.daemon: ## Start daemon server in its docker container
	docker-compose up -d bhayangkara

server.stop: ## Start server in its docker container
	docker-compose stop

server.logs: ## Display server logs
	tail -f server.log