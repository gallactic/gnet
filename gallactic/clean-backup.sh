#!/bin/bash
#this script will clean gallactic's backup files
GALLACTIC_OLD_FILES=($HOME/gallactic-backup)

echo 
echo cleaning backup folder ....

if [ -d "$GALLACTIC_OLD_FILES" ]; then
    rm -r $GALLACTIC_OLD_FILES
else
    echo "There isn't any back up file!"    
fi

echo 
echo