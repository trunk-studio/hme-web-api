HME server
==========

docker run
----------

### build

ARM: docker-compose run --rm --service-ports web-arm /bin/bash -l

X86: docker-compose run --rm --service-ports web /bin/bash -l

### web

ARM: docker-compose run --rm --service-ports web-arm

X86: docker-compose run --rm --service-ports web
