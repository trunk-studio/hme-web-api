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
rm -rf node_modules/
docker-compose run --rm build
docker-compose up -d mysql
```

### start service

```
docker-compose run --rm --service-ports web-master
docker-compose run --rm --service-ports web-slave-01
```

### test master access slave

```
docker-compose up -d web-slave-01
docker-compose run --rm --service-ports web-master /bin/bash -l
```

### test slave access master

```
docker-compose up -d web-master
docker-compose run --rm --service-ports web-slave-01 /bin/bash -l
```

### load hme.txt

```
apt-get install crudini

. loadEnv.sh -c=hme.txt && npm start
```

if `-c` not set, default `/boot/hme.txt`

### setup auto startup setting time zone

add line to `/etc/rc.local`

`. /root/hme-web-api/loadEnv.sh && rm /etc/localtime && ln -sf /usr/share/zoneinfo/Etc/$TIMEZONE_OFFSET /etc/localtime`
