### imake
# ¯¯¯¯¯¯¯¯

# Path: makefiles/image.mk
image.build: ## Build image
	@echo "Building image"
	@docker build -t airbyte/bhayangkara .