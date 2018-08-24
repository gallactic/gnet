#!/bin/bash

echo 'Tryin to run gallactic....'
function isRunning {
    local epid=1
    while [ ! -z "$epid" ];do
    epid=$(pgrep -o -x $1)
        if [ ! -z "$epid" ];then
            echo  $1 is  already runing [PID : $epid]
            exit
        fi
    done
}

function isKeyRunning {
    local epid=1
    while [ ! -z "$epid" ];do
    epid=$(pgrep -o -x $1)
        if [ ! -z "$epid" ];then
            kill -9 $epid
            sleep 1
        fi
    done
}

isRunning gallactic

isKeyRunning gKeys

cd $HOME/gallactic

./gKeys server &>/dev/null &
sleep 2
./gallactic start 
