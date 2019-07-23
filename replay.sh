#!/bin/bash
echo "docker pull and run replay.sh $1 $2 $3 $4"
if [ "$#" -ne 4 ]; then
        echo " ./replay.sh -s 10 -c 20"
        exit 1
fi

sudo docker push myguddy/tyme-explorer-mon:latest
sudo docker run -d --rm --name tyme-replay -v /home/ubuntu/config:/app/config myguddy/tyme-explorer-mon replay.js $1 $2 $3 $4