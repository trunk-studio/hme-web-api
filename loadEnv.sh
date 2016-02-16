#!/bin/bash
CONFIG=
for i in "$@"
do
case $i in
    -c=*|--config=*)
    CONFIG="${i#*=}"
    shift # past argument=value
    ;;
    *)
            # unknown option
    ;;
esac
done

export CONFIG="${CONFIG:=/boot/hme.txt}"
echo "CONFIG=${CONFIG}"

export HME_SERIAL=$(crudini --get ${CONFIG} SYSTEM HME_SERIAL)
export TYPE=$(crudini --get ${CONFIG} SYSTEM TYPE)
export REPORT_EMAIL=$(crudini --get ${CONFIG} SYSTEM REPORT_EMAIL)
export TIMEZONE_OFFSET=$(crudini --get ${CONFIG} SYSTEM TIMEZONE_OFFSET)
export MASTER_NAME=$(crudini --get ${CONFIG} SYSTEM MASTER_NAME)

echo "HME_SERIAL=${HME_SERIAL}"
echo "TYPE=${TYPE}"
echo "REPORT_EMAIL=${REPORT_EMAIL}"
echo "TIMEZONE_OFFSET=${TIMEZONE_OFFSET}"
echo "MASTER_NAME=${MASTER_NAME}"


if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi
