### TEST
# ¯¯¯¯¯¯¯¯


.PHONY: test
test: ## Launch tests in their own docker container
	docker-compose run --rm testserver
