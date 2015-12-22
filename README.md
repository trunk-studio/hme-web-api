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



### troubleShooting

ERROR: Cannot start container 05e028e7a121df0f721df8dcd680e0395b65475dbaf66c33c4fa6db26e0f610f: error gathering device information while adding custom device "/dev/ttyUSB0": lstat /dev/ttyUSB0: no such file or directory

樹梅派沒有連接機器
