#!/bin/bash
sudo docker pull myguddy/tyme-explorer-mon:latest
sudo docker run -d --name tyme-mon -p 3000:3000 -v /home/ubuntu/config:/app/config myguddy/tyme-explorer-mon