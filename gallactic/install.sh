#!/bin/bash
#this script will install gallactic and their requirments for you

GALLACTIC_INSTALL_DIR=($HOME/gallactic)
GALLACTIC_OLD_FILES=($HOME/gallactic-backup)
GALLACTIC_FILES_DIR=$1



echo 
echo copying gallactic files....

##########################################################################
# we create a folder named gallactic-backup and put the gallactic old files in it
# if already existed
if [ -d "$GALLACTIC_INSTALL_DIR" ]; then

    echo the file already existed, trying to back up the old files.    

    if [ ! -d "$GALLACTIC_OLD_FILES" ]; then
        mkdir $GALLACTIC_OLD_FILES
    fi

    NEW=$(date "+%Y.%m.%d-%H.%M.%S")
    mkdir $GALLACTIC_OLD_FILES/$NEW
    mv -v $GALLACTIC_INSTALL_DIR/* $GALLACTIC_OLD_FILES/$NEW
    rm -r $GALLACTIC_INSTALL_DIR
fi

# copying gallactic's stuffs
mkdir $GALLACTIC_INSTALL_DIR
cp -r $GALLACTIC_FILES_DIR/* $GALLACTIC_INSTALL_DIR/


echo Finished!

