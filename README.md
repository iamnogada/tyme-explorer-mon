# tyme-explorer
explorer block chain and stats

## how to run

### run in local
docker run  -d mongodb --name=mongodb

docker run -it --name tyme-mon --link=mongodb:database -v (absolute path config):/app/config tyme-explorer-mon


### run as replay as docker
docker run -d --rm --name tyme-mon --link=mongo-tyme:database -v /Users/nogada/workspace/ecotyme/phase-1st/tyme-explorer-mon/temp:/app/config tyme-explorer-mon replay.js -s 1 -c 200

docker run -d --rm --name tyme-mon  -v /Users/nogada/workspace/ecotyme/phase-1st/tyme-explorer-mon/temp:/app/config tyme-explorer-mon replay.js -s 1 -c 200


echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list 