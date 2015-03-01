#!/bin/sh

if [ -n "$1" ]
then
    make test^juux^step$1
else
    echo Error: $0 1
fi
