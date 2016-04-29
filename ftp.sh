#!/bin/bash
HOST='aquariumlightings.com'
DIRECTORY='/public_html/cloud/hlp600/firmware/latest'
#HOST=$(crudini --get ./updateConfig.txt SYSTEM FTP_HOST)
#DIRECTORY=$(crudini --get ./updateConfig.txt SYSTEM FTP_DIRECTORY)
USER='aquarium'
PASS=''
BUILD_UPDATE_PACKAGE_PATH=/Users/FuD/Downloads/hmeup
UPDATE_PACKAGE_NAME=hme.tgz
# BUILD_UPDATE_PACKAGE_PATH=$(crudini --get ./updateConfig.txt SYSTEM BUILD_UPDATE_PACKAGE_PATH)
# BUILD_UPDATE_PACKAGE_PATH=$(crudini --get ./updateConfig.txt SYSTEM UPDATE_PACKAGE_NAME)
cd $BUILD_UPDATE_PACKAGE_PATH
ftp -n $HOST <<END_SCRIPT
user $USER $PASS
cd $DIRECTORY
put hme.info
put hme.md5
put $UPDATE_PACKAGE_NAME
quit
END_SCRIPT
exit 0
