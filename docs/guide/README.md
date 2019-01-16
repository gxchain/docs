# Getting Started with GXChain

## OverView

### 1. What is GXChain

#### GXChain is a decentralized, high-performance, eco-rich public blockchain. In the GXChain ecosystem, the Committee, TrustNodes and share holders jointly complete the chain governance.

- **Committee**：The top 11 TrustNodes were elected as members of the GXChain Committe member, mainly responsible for the modification of blockchain dynamic parameters.
- **TrustNode**：TrustNode responsible for packing blocks and verifying transactions; counting votes every 1 hour; there are 21 public trust nodes.
- **Share Holder**：Individuals or institutions holding any number of GXC, holders can participate in the GXChain ecosystem and vote for TrustNodes.

#### GXChain based on graphene architecture which implements DPoS consensus mechanism for higher performance.

- **Block Interval**：3s
- **TPS**：3000+

#### The GXChain smart uses WebAssembly virtual machine to support smart contracts written in multiple languages ​​such as C++ and TypeScript.

- **action**：The external interface provided by the contract can be interacted with by the front end, and the action invoked by the user is recorded in the block.
- **table**：The contract provides persistent storage, similar to the table in the database, supports multiple index, and the table is stored under the contract account object.

#### Block

- The block contains the transactions, the transaction contains the operations of calling the contract, voting, transferring, and so on. The common operation types are as follows:

| Code | Operation Type |
| :--- | :--- |
| 5 | Create Account |
| 6 | Update Account |
| 0 | Transfer |
| 73 | Proxy Transfer |
| 74 | Deploy Contract |
| 75 | Call Contract |
| 76 | Update Contract |

- A complete block contains the following information:
``` json
{
  "previous": "0092ab99afb1a7bc9107d85796ce7219214c5700",					//Previous block id
  "timestamp": "2018-12-12T07:44:18",										//timestamp of current block
  "witness": "1.6.30",														//id of block producer
  "transaction_merkle_root": "b0e3fc1caf19cb57530f5b14ad903779221f487c",	//merkle root of current block
  "extensions": [],
  "witness_signature": "1f6335138fa77a52986ed0e0980ece86b919f84cf06647c2fdea3382578287c2e5403088d960cd75d5d5f134647bae80d1189e0a417f0d5bc127b294949864d662",
  "transactions": [
    {
      "ref_block_num": 43928,
      "ref_block_prefix": 3666011859,
      "expiration": "2018-12-12T07:45:12",
      "operations": [
        [
          75,		// call contract
          {
            "fee": {
              "amount": 13097,
              "asset_id": "1.3.1"
            },
            "account": "1.2.882",
            "contract_id": "1.2.881",
            "amount": {
              "amount": 135000,
              "asset_id": "1.3.1"
            },
            "method_name": "roll",
            "data": "1e6632693277676439536b6c717065594a7a54736c6a3658316e4873797941008813", 	//serialized action parameters
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "1f254c944ee1bc26437f0d093ef1f05269a728914fee247db0556c5cf2dac52158124c495ddb404be83f5f08ac7960593ae0e2ccc9372d138c873d68bd6b9a99b6"
      ],
      "operation_results": [
        [
          3,
          {
            "billed_cpu_time_us": 505,
            "ram_usage_bs": 430,
            "fee": {
              "amount": 13097,
              "asset_id": "1.3.1"
            }
          }
        ]
      ]
    }
  ],
  "block_id": "0092ab9a9e7e11137fa487176f7e10992fef1c47",
  "signing_key": "GXC6xSvFR3hohUGut8tsARuJPMPvkdmc3KnVg2KvrKw9cvLTbTP3u",
  "transaction_ids": [
    "ba2bdb39acda14e11bc645a41e6d0e0cba14921d"
  ]
}
```

### 2. Object

The data structure of relevant type on GXChain is saved by the object, the object ID is its identifier (format: x.x.x), and the instance id of the object is the last digit of the object ID. Example: The nathan account ID is 1.2.17, the instance id is 17; the GXC asset ID is 1.3.1, the instance id is 1, and the common object types are as follows:

| ID | Object Type |
| :--- | :--- |
| 1.2.x | Account |
| 1.3.x | Asset |
| 1.5.x | Committee |
| 1.6.x | Witness |
| 1.10.x | Proposal |
| 1.11.x | Operation History |
| 1.13.x | Vesting Balance |
| 1.14.x | Worker |
| 1.25.x | Loyalty Program |
| 2.0.0 | Global Property |
| 2.1.x | Dynamic Global Property |
| 2.3.x | Asset Dynamic Data |
| 2.5.x | Balance |
| 2.6.x | Accoung Statistics |
| 2.7.x | Transaction |
| 2.8.x | Block Summary |
| 2.9.x | Account Transaction History |
| 2.12.x | Witness Schedule |

### 3. Tools

- **witness_node**

witness_node：The node program is used to produce blocks, which can start different functions according to different configurations. For example, start the function of the RPC server, start the save history transaction function, etc.

- **cli_wallet**

cli_wallet：The command line wallet is mainly used to manage the wallet and interact with witness_node program.

- **gxx**

gxx：Used to compile contract files into abi files and wasm files for deployment to GXChain.

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

### 1. Download

``` bash
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```
### 2. Start

``` bash
export LC_ALL=C
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="127.0.0.1:28090"  1>nohup.out 2>&1 &
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
