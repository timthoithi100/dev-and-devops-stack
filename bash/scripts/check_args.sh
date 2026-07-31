#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided"
elif [ $# -eq 1 ]; then
    echo "One argument: $1"
else
    echo "Multiple arguments: $@"
fi
