### DATABASE
# ¯¯¯¯¯¯¯¯


database.connect: ## Connect to database
	docker-compose exec db psql -U user -d db

database.pull : ## Pull database
	docker-compose run --rm bhayangkara npx prisma db pull

database.migrate: ## Create alembic migration file
	docker-compose run --rm bhayangkara npx prisma migrate dev --name $(name)
