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

local docker run master slave
-----------------------------

### build environment

```
make dev-env-build
eval `docker-machine env --swarm hme-master`
docker network create --driver overlay hme-net
docker-compose run build
docker-compose up -d mysql
```

### start service

```
docker-compose run --rm --service-ports web-master
docker-compose run --rm --service-ports web-slave-01
```

### sample from master access slave
