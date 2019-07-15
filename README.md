# tyme-explorer
explorer block chain and stats

## how to run

docker run  -d mongodb --name=mongodb

docker run -it --name tyme-mon --link=mongodb:database -v (absolute path config):/app/config tyme-explorer-mon

