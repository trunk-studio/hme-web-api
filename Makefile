dev-env-build:

	- docker-machine rm -f hme-keystore hme-master hme-slave-01

	docker-machine create -d virtualbox \
	--virtualbox-memory 512 \
	--virtualbox-disk-size 8192 \
	--virtualbox-cpu-count 1 \
	hme-keystore

	docker $(docker-machine config hme-keystore) run -d \
    -p "8500:8500" \
    -h "consul" \
    progrium/consul -server -bootstrap

	docker-machine create -d virtualbox \
	--swarm --swarm-image="swarm" --swarm-master \
	--swarm-discovery="consul://$(docker-machine ip hme-keystore):8500" \
	--engine-opt="cluster-store=consul://$(docker-machine ip hme-keystore):8500" \
	--engine-opt="cluster-advertise=eth1:2376" \
	hme-master

	docker-machine create -d virtualbox \
	--swarm --swarm-image="swarm" \
	--swarm-discovery="consul://$(docker-machine ip hme-keystore):8500" \
	--engine-opt="cluster-store=consul://$(docker-machine ip hme-keystore):8500" \
	--engine-opt="cluster-advertise=eth1:2376" \
	hme-slave-01
