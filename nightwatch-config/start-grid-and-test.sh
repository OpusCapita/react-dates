#!/bin/sh

sh ./start-grid.sh ;
sleep 1
sh ./test.sh ;
sh ./stop-grid.sh ;
