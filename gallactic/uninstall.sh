#!/bin/bash
#this script will uninstall gallactic and corresponding files

GALLACTIC_INSTALL_FILES_DIR=($HOME/gallactic)

echo 
echo uninstalling gallactic ....

##########################################################################
# we create a folder named gallactic-backup and put the gallactic old files in it
# if already existed
if [ -d "$GALLACTIC_INSTALL_FILES_DIR" ]; then
    rm -r $GALLACTIC_INSTALL_FILES_DIR
fi


echo 
echo Finished!

