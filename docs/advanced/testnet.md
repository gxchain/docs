# How to start testnet

## Introduction
The testnet is the external test environment of GXChain with the same parameters as the main chain.

Testnet can provide developers:

- Testnet Token automatically claims, 200 each time, 1000 per day, browser access `https://testnet.gxchain.org/gxc/get_token?your_account_name` Please replace `your_account_name` with your testnet wallet account name
- Test [Client](../guide/clients.html)
- Experience the latest features
- Participate in GXChain development
- Project development, Contract debugging

| Testnet | Configuration |
| :-- | :-- |
| Access point *(built in test network wallet)* | wss://testnet.gxchain.org |
| Seed node *(specified when the node starts)* | testnet.gxchain.org:6789 |
| Smart contract compilation services *(configured in the IDE)* | https://testnet.gxx.gxchain.org |
| Block explorer | https://testnet.explorer.gxchain.org |
| Online wallet | https://testnet.wallet.gxchain.org |

::: tip TIPS
Currently, there is only one node. Community developer contribution nodes can join the testnet and apply for witnesses.
:::

## Requirement

- Os:  macOS / Ubuntu 14.04 LTS 64-bit, with 4.4.0-63-generic kernel or higher
- Ram: 2GB+ (The more the better)
- Disk: 40GB+
- Net: 10MB+ bandwidth

::: warning DEPENDENCY NOTE

* install ntp
``` bash
sudo apt-get install ntp
```

* install libstdc++-7-dev
```bash
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```
:::

## 1. Register an account

Visit the [TestNet Online Wallet](https://testnet.wallet.gxchain.org/#/)，register wallet account

## 2. Apply Token on Testnet

Test network Token automatically claims, 200 each time, 1000 per day, browser access `https://testnet.gxchain.org/gxc/get_token?your_account_name`. Please replace `your_account_name` with your test network wallet account name

## 3. Download

[**The latest program**](https://github.com/gxchain/gxb-core/releases/latest)

```bash
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_testnet_install.sh' | bash
```

## 4. Download testnet-genesis.json

```bash
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json
```

::: tip About genisis.json
- `genisis.json` is the genesis file
- Each chain has a unique genesis.json
- `genesis.json` specifies the configuration information necessary for the genesis block and initialization parameters for node startup
- Any change in a character will result in a different chain_id
- A different chain_id will result in an inability to communicate with seed_node
- Therefore: **do not change genisis.json, unless you want to run a** [Private-hain](/private_chain)
:::

## 5. Start node

```bash
export LC_ALL=C

nohup ./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json 1>nohup.out 2>&1 &
```

::: tip Parameter introduction
- --data-dir: Specified block data storage path
- --rpc-endpoin: Open rpc service
- --p2p-endpoint: Enable p2p listening service
- --seed-nodes: Specifies the seed node to connect when the node starts
:::

At present, the amount of network data tested is not large, and it can run all nodes. The background synchronization progress can be viewed through the background log file `testnet_node/logs/witness.log`, and the block synchronization is completed.
When the block number is incremented by 10000, it indicates that the block is being synchronized. When the block number is incremented by 1, it means that the block synchronization is completed. The data of the entire test chain of GXChain is about 1.5G, and can be completed synchronously within one hour.

```
2018-11-11T12:58:54        th_a:?unnamed?       reset_p2p_node ] Adding seed node 106.14.180.117:6789			application.cpp:152
2018-11-11T12:58:54        th_a:?unnamed?       reset_p2p_node ] Configured p2p node to listen on 0.0.0.0:8659			application.cpp:194
2018-11-11T12:58:54        th_a:?unnamed? reset_websocket_serv ] Configured websocket rpc to listen on 0.0.0.0:38067			application.cpp:269
2018-11-11T12:58:54        th_a:?unnamed?       plugin_startup ] data transaction plugin startup			data_transaction_plugin.cpp:63
2018-11-11T12:58:54        th_a:?unnamed?       plugin_startup ] witness plugin:  plugin_startup() begin			witness.cpp:121
2018-11-11T12:58:54        th_a:?unnamed?       plugin_startup ] No witnesses configured! Please add witness IDs and private keys to configuration.		witness.cpp:137
2018-11-11T12:58:54        th_a:?unnamed?       plugin_startup ] witness plugin:  plugin_startup() end			witness.cpp:138
2018-11-11T12:58:54        th_a:?unnamed?                 main ] Started witness node on a chain with 0 blocks.			main.cpp:216
2018-11-11T12:58:54        th_a:?unnamed?                 main ] Chain ID is c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4			main.cpp:217

...

2018-11-11T13:02:14 th_a:invoke handle_block         handle_block ] Got block: #960000 time: 2018-01-17T18:44:30 latency: 25726664888 ms from: init3  irreversible: 959990 (-10)			application.cpp:496
2018-11-11T13:02:16 th_a:invoke handle_block         handle_block ] Got block: #970000 time: 2018-01-18T03:12:09 latency: 25696207587 ms from: init2  irreversible: 969992 (-8)			application.cpp:496
2018-11-11T13:02:18 th_a:invoke handle_block         handle_block ] Got block: #980000 time: 2018-01-18T11:39:39 latency: 25665759432 ms from: init10  irreversible: 979992 (-8)			application.cpp:496

...

2018-11-10T05:47:51 th_a:invoke handle_block         handle_block ] Got block: #8749837 time: 2018-11-10T05:47:51 latency: 33 ms from: init5  irreversible: 8749822 (-15)			application.cpp:496
2018-11-10T05:47:54 th_a:invoke handle_block         handle_block ] Got block: #8749838 time: 2018-11-10T05:47:54 latency: 36 ms from: init6  irreversible: 8749823 (-15)			application.cpp:496
2018-11-10T05:47:57 th_a:invoke handle_block         handle_block ] Got block: #8749839 time: 2018-11-10T05:47:57 latency: 30 ms from: miner8  irreversible: 8749824 (-15)			application.cpp:496

...

```
After the block synchronization is complete, you can run the command line wallet cli\_wallet.


## 6. How to become the public trust node of the test network


#### (1) Upgrade to a lifetime membership

To create a public trust node, you first need to upgrade to a lifetime membership.

Download the latest version of the PC Wallet connection test network access point, or visit the test network [web wallet](https://testnet.wallet.gxchain.org/#/), upgrade to a lifetime membership as shown below.

![](./assets/witness/lifetime.jpeg)

::: warning note
Only a lifetime membership can create a public trust node candidate. To upgrade a lifetime membership, you need to burn 50GXC miners. Please ensure that your account balance is sufficient.

:::

#### (2) Create a public trust node

Create a public address node as shown below.

![](./assets/witness/trustnode.jpg)

#### (3) View public trust node id
Click the figure below to view the public node id.

![](./assets/witness/witnessid.jpeg)

::: warning note
After the public trust node is created, check its own node id. When starting the public node program, you need to bring this parameter.

:::

#### (4) Restart the public node program

To restart the public node program, you need to close the original witness_node first.

Execute the following command to close the witness_node program:
```
kill -s SIGTERM $(pgrep witness_node)
```

Restart command:
```
# View your own public node id via PC wallet or web wallet
# You need to replace the following 1.6.10 with your own public node id, and replace the parameter value of --private-key with the public and private key of your own public node account, which is used to sign the block.

export LC_ALL=C

./programs/witness_node/witness_node --data-dir=testnet_node \
--rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" \
--seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json  -w '"1.6.10"' \
--private-key '["GXC73xxxxxxv9mhMU", "5Jainouxxxxxg8yaZh9Ks"]' &
```


```
--data-dir: Specified block data storage path

-w: Specify the own public node id, note that '"1.6.x"', double quotes with single quotation marks
--private-key: Specify the public and private keys of your account, pay attention to the outermost single quotes
The above two parameters must be correct, otherwise it will affect the block production.

&Indicates that the program runs in the background
```


::: tip note

After the program startup command line is determined, it is recommended to put a shell script to facilitate starting and stopping later. Script can refer to [here](https://github.com/gxcdac/gxchain-script/tree/master/gxchain-test-script)

```
#!/bin/bash
set -x

kill -s SIGINT $(pgrep witness_node)
echo $?

while true
do
	pid=$(pgrep witness_node)
	if [ $pid ] ; then
		echo "stop witness_node ..."
		sleep 1
	else
		break
	fi
done
echo "start witness_node ..."

./programs/witness_node/witness_node --data-dir=testnet_node \
--rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" \
--seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json  -w '"1.6.10"' \
--private-key '["GXC73Zyj56MHxxxxxxxU5QEv9mhMU", "5Jainounrsxxxxxxh9Ks"]' \
--fast-replay  &
```
:::
