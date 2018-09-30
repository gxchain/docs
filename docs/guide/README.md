# Getting Started with GXChain

## Requirement

- **Ubuntu 14.04 LTS 64-bit**, with **4.4.0-63-generic** kernel or higher
- RAM: 8GB+
- Disk: 100GB+

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

## Install

### 1. Download

``` bash
wget 'https://github.com/gxchain/gxb-core/releases/download/v1.0.180929/gxb_ubuntu_1.0.180929.tar.gz' -O gxb_ubuntu_1.0.180929.tar.gz
tar zxvf gxb_ubuntu_1.0.180929.tar.gz
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

### 3. Check the log

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
