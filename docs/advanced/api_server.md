# How to start API server

This document describes how to deploy a GXChain API server.

## 1. Requirement

- Os:  macOS / Ubuntu 14.04 LTS 64-bit, with 4.4.0-63-generic kernel or higher
- Ram:  16GB+
- Disk: 100GB+
- Net:  10MB bandwidth, with public network independent IP

::: warning DEPENDENCY NOTE

* install ntp
``` bash
sudo apt-get install ntp
# for macOS : brew install ntp
```

* install libstdc++-7-dev (Ubuntu only)
```bash
# for Ubuntu
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```
:::

## 2. Download Release 

``` bash
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```
## 3. Start witness_node

``` bash
export LC_ALL=C

nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:6789" 1>nohup.out 2 >&1 &
```
According to the above steps:

- The specified block information is saved in the ./trusted_node directory.

- Start an RPC service with a listening port of 28090, open the API service, and provide RPC calls to the wallet client.

- Start a P2P service with listening port 6789, which can serve as a seed node to provide connection and block synchronization services for other nodes in the network.

::: tip note
- The sync block takes about **30+ hours**, which of course has something to do with your network.
:::

## 4. Check the log

``` bash
tail -f trusted_node/logs/witness.log
```
During the block synchronization process, one line of logs is printed every 1000 blocks; when syncing to the latest block, one line of logs is printed every 3 seconds, the block number is continuous, and the log looks like this:

``` bash
root@iZbp1biztyjfqwug9wq9fpZ:~/opt/gxb tail -f trusted_node/logs/witness.log
2018-06-28T03:43:03 th_a:invoke handle_block         handle_block ] Got block: #10731531 time: 2018-06-28T03:43:03 latency: 60 ms from: miner11  irreversible: 10731513 (-18)		application.cpp:489
2018-06-28T03:43:06 th_a:invoke handle_block         handle_block ] Got block: #10731532 time: 2018-06-28T03:43:06 latency: 16 ms from: taffy  irreversible: 10731515 (-17)		application.cpp:489
2018-06-28T03:43:09 th_a:invoke handle_block         handle_block ] Got block: #10731533 time: 2018-06-28T03:43:09 latency: 49 ms from: david12  irreversible: 10731515 (-18)		application.cpp:489
2018-06-28T03:43:12 th_a:invoke handle_block         handle_block ] Got block: #10731534 time: 2018-06-28T03:43:12 latency: 42 ms from: miner6  irreversible: 10731516 (-18)		application.cpp:489
2018-06-28T03:43:15 th_a:invoke handle_block         handle_block ] Got block: #10731535 time: 2018-06-28T03:43:15 latency: 10 ms from: sakura  irreversible: 10731516 (-19)		application.cpp:489
2018-06-28T03:43:18 th_a:invoke handle_block         handle_block ] Got block: #10731536 time: 2018-06-28T03:43:18 latency: 57 ms from: miner9  irreversible: 10731517 (-19)		application.cpp:489
2018-06-28T03:43:21 th_a:invoke handle_block         handle_block ] Got block: #10731537 time: 2018-06-28T03:43:21 latency: 56 ms from: robin-green  irreversible: 10731517 (-20)application.cpp:489
2018-06-28T03:43:24 th_a:invoke handle_block         handle_block ] Got block: #10731538 time: 2018-06-28T03:43:24 latency: 17 ms from: kairos  irreversible: 10731522 (-16)		application.cpp:489
2018-06-28T03:43:27 th_a:invoke handle_block         handle_block ] Got block: #10731539 time: 2018-06-28T03:43:27 latency: 21 ms from: dennis1  irreversible: 10731524 (-15)		application.cpp:489
2018-06-28T03:43:30 th_a:invoke handle_block         handle_block ] Got block: #10731540 time: 2018-06-28T03:43:30 latency: 17 ms from: aaron  irreversible: 10731524 (-16)		application.cpp:489
2018-06-28T03:43:33 th_a:invoke handle_block         handle_block ] Got block: #10731541 time: 2018-06-28T03:43:33 latency: 23 ms from: caitlin  irreversible: 10731526 (-15)		application.cpp:489
```

## 5. Test if the API service is available

Assuming your public IP address is ```x.x.x.x```, call the node's get_dynamic_global_properties API to see the latest block number:

```bash
curl POST --data '{ "jsonrpc": "2.0", "method": "call", "params": [0, "get_dynamic_global_properties", []], "id": 1 }' http://x.x.x.x:28090
```

