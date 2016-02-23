#!/bin/bash
CONFIG="${CONFIG:=/boot/hme.txt}"

ssid=$(crudini --get ${CONFIG} SYSTEM HME_SERIAL)
password=$(crudini --get ${CONFIG} SYSTEM AP_PASSWORD)

# ssid=DEMO
# password=DEMODEMO

echo "ssid=${ssid}"
echo "password=${password}"


cat > hostapd.conf << EOF1
interface=wlan0
driver=rtl871xdrv
bridge=br0
ssid=$ssid
channel=6
wpa=1
wpa_passphrase=$password
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
auth_algs=1
macaddr_acl=0
ieee80211n=1
wmm_enabled=1
hw_mode=g
EOF1
