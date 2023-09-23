.DEFAULT_GOAL := help


### QUICK
# ¯¯¯¯¯¯¯

install: server.install ## Install

daemon: server.daemon## Start daemon

stop: server.stop


include makefiles/server.mk
include makefiles/test.mk
include makefiles/database.mk
include makefiles/image.mk
include makefiles/help.mk
