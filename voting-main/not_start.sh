#!/bin/bash

geth --datadir ./accounts init ./genesis.json
geth --http -http.addr "127.0.0.1" --http.api "net, web3, personal, miner, eth, admin" --networkid 15 --datadir ./accounts --allow-insecure-unlock --http.corsdomain "*" console
