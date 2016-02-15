#!/bin/bash
CONFIG="${CONFIG:=/boot/hme.txt}"

ssid=$(crudini --get ${CONFIG} WIFI SSID)
password=$(crudini --get ${CONFIG} WIFI PASSWORD)

# ssid=DEMO
# password=DEMO

cat > wpa_supplicant.conf << EOF1
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
        ssid=$ssid
        psk=$password
}
EOF1
