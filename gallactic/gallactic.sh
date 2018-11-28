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

isRunning gallactic

cd $HOME/gallactic

sleep 2
./gallactic start 
