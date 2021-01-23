#!/bin/bash

#for i in {1..10}
#do
    #ranNum=$[RANDOM%10+300]
    #echo $ranNum
    #echo 'posting ...'
    curl --header "Content-Type: application/json" --request POST --data '{"feedmap_name":"poo","map_url":"http://cnn.com"}' http://192.168.1.163:3004/new_feedmap
#    echo ""
#    sleep 1
#done


