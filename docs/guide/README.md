# Getting Started with GXChain

## Requirement

- **Ubuntu 14.04 LTS 64-bit**, with **4.4.0-63-generic** kernel or higher
- RAM: 8GB+
- Disk: 100GB+

::: warning DEPENDENCY NOTE
GXChain requires NTP service installed

``` bash
sudo apt-get install ntp
```
:::

## Install

### 1. Download

``` bash
wget https://github.com/gxchain/gxb-core/releases/download/1.0.180713/gxb_ubuntu_1.0.180713.tar.gz
tar zxvf gxb_1.0.180713.tar.gz
```
### 2. Start

``` bash
cd gxb
./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="127.0.0.1:28090" &
```

That's it, here we start a witness listening at `127.0.0.1:28090`, and we indicate the block database dir is `<path>/<to>/<your>/<application>/trusted_node`

It takes about **6 hours** to sync the blocks as usual, it also depend on your network.

check the log:

``` bash
tail -f trusted_node/logs/witness.log
```

When the node is ready, the log should looks like this:

``` bash
root@iZbp1biztyjfqwug9wq9fpZ:~/opt/gxb tail -f trusted_node/logs/witness.log
2018-06-28T03:43:03 th_a:invoke handle_block         handle_block ] Got block: #10731531 time: 2018-06-28T03:43:03 latency: 60 ms from: miner11  irreversible: 10731513 (-18)			application.cpp:489
2018-06-28T03:43:06 th_a:invoke handle_block         handle_block ] Got block: #10731532 time: 2018-06-28T03:43:06 latency: 16 ms from: taffy  irreversible: 10731515 (-17)			application.cpp:489
2018-06-28T03:43:09 th_a:invoke handle_block         handle_block ] Got block: #10731533 time: 2018-06-28T03:43:09 latency: 49 ms from: david12  irreversible: 10731515 (-18)			application.cpp:489
2018-06-28T03:43:12 th_a:invoke handle_block         handle_block ] Got block: #10731534 time: 2018-06-28T03:43:12 latency: 42 ms from: miner6  irreversible: 10731516 (-18)			application.cpp:489
2018-06-28T03:43:15 th_a:invoke handle_block         handle_block ] Got block: #10731535 time: 2018-06-28T03:43:15 latency: 10 ms from: sakura  irreversible: 10731516 (-19)			application.cpp:489
2018-06-28T03:43:18 th_a:invoke handle_block         handle_block ] Got block: #10731536 time: 2018-06-28T03:43:18 latency: 57 ms from: miner9  irreversible: 10731517 (-19)			application.cpp:489
2018-06-28T03:43:21 th_a:invoke handle_block         handle_block ] Got block: #10731537 time: 2018-06-28T03:43:21 latency: 56 ms from: robin-green  irreversible: 10731517 (-20)			application.cpp:489
2018-06-28T03:43:24 th_a:invoke handle_block         handle_block ] Got block: #10731538 time: 2018-06-28T03:43:24 latency: 17 ms from: kairos  irreversible: 10731522 (-16)			application.cpp:489
2018-06-28T03:43:27 th_a:invoke handle_block         handle_block ] Got block: #10731539 time: 2018-06-28T03:43:27 latency: 21 ms from: dennis1  irreversible: 10731524 (-15)			application.cpp:489
2018-06-28T03:43:30 th_a:invoke handle_block         handle_block ] Got block: #10731540 time: 2018-06-28T03:43:30 latency: 17 ms from: aaron  irreversible: 10731524 (-16)			application.cpp:489
2018-06-28T03:43:33 th_a:invoke handle_block         handle_block ] Got block: #10731541 time: 2018-06-28T03:43:33 latency: 23 ms from: caitlin  irreversible: 10731526 (-15)			application.cpp:489
```

> You can do nothing but wait before the node is ready

## Interact with GXChain

Let's start with 2 steps

### Step1. Register an account

To register a account, you need prepare 2 things:
- **account name** (eg. gxchain-genius)
- **public key** (Base64 encoded ECC Public key, start with GXC...)

Then you can replace the placeholder `<account_name>` and `<public_key>` and try the curl command below:

``` bash
curl ‘https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”<account_name>”,”owner_key”:”<public_key>”,”active_key”:”<public_key>”,”memo_key”:”<public_key>”,”refcode”:null,”referrer”:null}}’
```

### Step2. Send a transaction

See Clients in the next part

## Clients

| client | link |
| :-- | :-- |
| gxclient-java | [https://github.com/gxchain/gxclient-java](https://github.com/gxchain/gxclient-java) |
| gxclient-node | [https://github.com/gxchain/gxclient-node](https://github.com/gxchain/gxclient-node) |











