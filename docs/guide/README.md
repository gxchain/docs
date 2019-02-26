# Getting Started with GXChain

## What is GXChain

GXChain is a decentralized, high-performance, eco-rich public blockchain. In the GXChain ecosystem, the Committee, TrustNodes and share holders jointly complete the chain governance.

- **Committee**：The top 11 TrustNodes were elected as members of the GXChain Committe member, mainly responsible for the modification of blockchain dynamic parameters.
- **TrustNode**：TrustNode responsible for packing blocks and verifying transactions; counting votes every 1 hour; there are 21 public trust nodes.
- **Share Holder**：Individuals or institutions holding any number of GXC, holders can participate in the GXChain ecosystem and vote for TrustNodes.

GXChain based on graphene architecture which implements DPoS consensus mechanism for higher performance.

- **Block Interval**：3s
- **TPS**：3000+

## Requirement

- **macOS / Ubuntu 14.04 LTS 64-bit**, with **4.4.0-63-generic** kernel or higher
- RAM: 8GB+
- Disk: 100GB+

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

## Install

The following steps demonstrate the startup of the primary network node.

- If you are a developer and want a quick experience, go to [TestNet](../advanced/testnet.html)
- If you want to build a private chain based on GXChain, go to [Private Chain](../advanced/private_chain.html)

### 1. Download

``` bash
# Executing this shell script will automatically download the latest program from github and extract it to the current directory.
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```
### 2. Start

``` bash
export LC_ALL=C
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="127.0.0.1:28090"  1>nohup.out 2>&1 &
```

- That's it, here we start a witness listening at `127.0.0.1:28090`.
- we indicate the block database dir is `<path>/<to>/<your>/<application>/trusted_node`

::: tip note
- The sync block takes about **30+ hours**, which of course has something to do with your network.
- Before the block sync is complete, you just have to wait patiently, during which you can read the documentation.
:::

check the log:

``` bash
tail -f trusted_node/logs/witness.log
```

### 3. Check the log

When the node is ready, the log should looks like this(Receive 1 new block from the network every 3 seconds):

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

## Register an account

GXChain is **Account Model** based(which is diffrent from UTXO)

To create an account on GXChain,  there 3 requirements:
- **Referrer**, an existing account on gxchain, referrer account needs to pay the fee for broadcasting `account_create` transaction
- **account name** (eg. gxchain-genius)
- **public key** (Base64 encoded ECC Public key, start with GXC...)

There are 2 options to register an account on GXChain.

### 1. Online wallet

Follow the steps on [https://wallet.gxb.io](https://wallet.gxb.io)

### 2. Manual register

This methods is recommended if you want to keep the private key offline.

#### step1: Generate key pairs

``` bash
./programs/cli_wallet/cli_wallet --suggest-brain-key
{
  "brain_priv_key": "SHAP CASCADE AIRLIKE WRINKLE CUNETTE FROWNY MISREAD MOIST HANDSET COLOVE EMOTION UNSPAN SEAWARD HAGGIS TEENTY NARRAS",
  "wif_priv_key": "5J2FpCq3UmvcodkCCofXSNvHYTodufbPajwpoEFAh2TJf27EuL3",
  "pub_key": "GXC75UwALPEFECfHLjHyNSxCk1j7XzSvApQiXKEbanWgr7yvXXbdG"
}
```

::: tip Tips
- brain_priv_key: Brain key, original text format of private key, keep it secret.
- wif_priv_key: Private key, always keep it secret
- pub_key: your public key on gxchain, this is public
:::

####  step2: Register via Faucet

1. Think about a uniq account_name, eg.`gxchain-genius`
2. Replace the placeholder `<account_name>` and `<public_key>` and try the curl command below:

``` bash
curl 'https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”<account_name>”,”owner_key”:”<public_key>”,”active_key”:”<public_key>”,”memo_key”:”<public_key>”,”refcode”:null,”referrer”:null}}’
```
