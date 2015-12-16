HME server
==========

docker run
----------

### build

ARM: docker-compose run --rm --service-ports build-arm

X86: docker-compose run --rm --service-ports build

### web

ARM: docker-compose run --rm --service-ports web-arm

X86: docker-compose run --rm --service-ports web
