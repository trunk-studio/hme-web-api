#!/bin/bash

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
echo "CONFIG=${CONFIG}"

export HME_SERIAL=$(crudini --get ${CONFIG} SYSTEM HME_SERIAL)

echo "HME_SERIAL=${HME_SERIAL}"

if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi
