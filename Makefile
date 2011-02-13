PREFIX		= /usr/local
PROJECT_NAME	= node-tmpl

test:
	@NODE_PATH=$NODE_PATH:./lib/ bin/node-tmpl test/tmpl1.data

install:
	mkdir -p ~/.node_libraries
	cp -f bin/$(PROJECT_NAME) $(PREFIX)/bin/$(PROJECT_NAME)
	cp -fr lib/$(PROJECT_NAME) ~/.node_libraries/$(PROJECT_NAME)

uninstall:
	rm -f $(PREFIX)/bin/$(PROJECT_NAME)
	rm -fr ~/.node_libraries/$(PROJECT_NAME)

publish:
	npm publish
	
.PHONY: install uninstall test