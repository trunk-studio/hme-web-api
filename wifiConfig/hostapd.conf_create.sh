#!/bin/bash
CONFIG="${CONFIG:=/boot/hme.txt}"

ssid=$HME_SERIAL
password=$(crudini --get ${CONFIG} SYSTEM AP_PASSWORD)

# ssid=DEMO
# password=DEMODEMO

cat > hostapd.conf << EOF1
interface=wlan0
driver=rtl871xdrv
bridge=br0
ssid=$ssid
channel=1
wmm_enabled=0
wpa=1
wpa_passphrase=$password
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
auth_algs=1
macaddr_acl=0
EOF1
