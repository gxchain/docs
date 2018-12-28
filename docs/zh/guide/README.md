# 快速开始

## OverView

### 1. 认识GXChain

#### GXChain是一条去中心化的、高性能的、生态丰富的治理型公链，在GXChain生态中，理事会、公信节点、持币人共同完成链的治理。

- **理事会**：公信节点按得票数的前 11 名当选为 GXChain 理事会成员，主要负责区块链动态参数的修改。  
- **公信节点**：负责打包区块、验证交易，每 1 小时统计一次投票，共有21个公信节点。  
- **持币人**：持有任意数量GXC的个体或机构，持币人可以参与GXChain生态，为公信节点投票。

#### GXChain底层采用基于DPoS共识机制的石墨烯架构，拥有更高的性能。

- **区块生成时间**：3 s
- **TPS**：千级

#### GXChain智能合约平台采用WebAssembly虚拟机，支持C++、TypeScript等多种语言编写智能合约。

- **action**：合约提供的对外接口，可以通过前端与之交互，用户调用的action会记录在区块中。
- **table**：合约提供持久化存储，类似数据库中的table，支持多种索引方式，table存储在合约账户对象下面。

#### GXChain的区块结构

- 区块中包含了transaction，transaction包含了operation，opreation包含了调用合约、投票、转账等操作。常见operation类型如下：

| Code | Operation Type |
| :--- | :--- |
| 5 | 创建账户 |
| 6 | 更新账户 |
| 9 | 用户转账 |
| 0 | 创建资产 |
| 73 | 代理转账 |
| 74 | 合约部署 |
| 75 | 调用合约 |
| 76 | 更新合约 |

- 通过GXChain的区块结构可以最直观的了解GXChain，一个完整的区块包含如下信息：
``` json
{
  "previous": "0092ab99afb1a7bc9107d85796ce7219214c5700",					//上一个区块的ID
  "timestamp": "2018-12-12T07:44:18",										//生成区块的时间戳
  "witness": "1.6.30",														//出块的公信节点对象ID
  "transaction_merkle_root": "b0e3fc1caf19cb57530f5b14ad903779221f487c",	//交易默克尔根
  "extensions": [],
  "witness_signature": "1f6335138fa77a52986ed0e0980ece86b919f84cf06647c2fdea3382578287c2e5403088d960cd75d5d5f134647bae80d1189e0a417f0d5bc127b294949864d662", 	//公信节点签名
  "transactions": [			// block中包含的交易信息
    {
      "ref_block_num": 43928,				// 交易引用的区块信息（ref_block_num、ref_block_prefix皆来自之前的区块ID，可自己指定）
      "ref_block_prefix": 3666011859,
      "expiration": "2018-12-12T07:45:12",	// 交易到期时间
      "operations": [						// transactions包含operations
        [
          75,		//operation操作码，75表示调用合约
          {
            "fee": {					// 提供的手续费
              "amount": 13097,			// 带精度的手续费数量，比如精度为5，则除以100000
              "asset_id": "1.3.1"		// 手续费资产ID
            },
            "account": "1.2.882",		// 调用者账户ID
            "contract_id": "1.2.881",	// 合约账户ID
            "amount": {					// 附带资产
              "amount": 135000,
              "asset_id": "1.3.1"
            },
            "method_name": "roll",		// action方法
            "data": "1e6632693277676439536b6c717065594a7a54736c6a3658316e4873797941008813", 	//action参数
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [		// 交易签名
        "1f254c944ee1bc26437f0d093ef1f05269a728914fee247db0556c5cf2dac52158124c495ddb404be83f5f08ac7960593ae0e2ccc9372d138c873d68bd6b9a99b6"
      ],
      "operation_results": [		//操作执行结果，消耗的手续费、cpu、ram
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
  "block_id": "0092ab9a9e7e11137fa487176f7e10992fef1c47",		//此区块的ID
  "signing_key": "GXC6xSvFR3hohUGut8tsARuJPMPvkdmc3KnVg2KvrKw9cvLTbTP3u",	//出块公信节点的公钥
  "transaction_ids": [
    "ba2bdb39acda14e11bc645a41e6d0e0cba14921d"		//区块包含的交易ID
  ]
}
```

### 2. GXChain上的对象

GXChain上相关类型的数据结构是通过对象保存的，对象ID作为其标识(格式为：x.x.x)，对象的instance id 为对象ID的最后一位。示例：nathan账户ID为1.2.17，instance id为17；GXC资产ID为1.3.1，instance id为1，常见对象类型如下：

| ID | Object Type |
| :--- | :--- |
| 1.2.x | 帐户对象 |
| 1.3.x | 资产对象 |
| 1.5.x | 理事会成员对象 |
| 1.6.x | 见证人对象 |
| 1.10.x | 提案对象 |
| 1.11.x | 操作历史对象 |
| 1.13.x | 待解冻余额对象 |
| 1.14.x | 预算项目对象 |
| 1.25.x | 忠诚计划冻结余额对象 |
| 2.0.0 | 系统全局参数对象 |
| 2.1.x | 动态参数对象 |
| 2.3.x | 资产动态参数对象 |
| 2.5.x | 帐户余额对象 |
| 2.6.x | 帐户统计对象 |
| 2.7.x | 交易对象 |
| 2.8.x | 区块摘要对象 |
| 2.9.x | 帐户交易历史对象 |
| 2.12.x | 见证人调度表对象 |

### 3. GXChain工具

GXChain源码编译生成的可执行程序，包括如下程序：

- **witness_node**

witness_node：node程序用来生产区块，可以根据不同的配置，启动不同的功能。比如启动RPC服务器的功能、启动保存历史交易功能等

- **cli_wallet**

cli_wallet：命令行钱包管理程序，主要用来管理钱包，与witness_node程序进行交互。

- **gxx**

gxx：用来将合约文件编译为abi文件和wasm文件，以便部署到区块链。

## 环境要求

- 系统: **macOS / Ubuntu 14.04 64-bit**, **4.4.0-63-generic** 以上内核
- 内存: 16GB+
- 硬盘: 100GB+
- 网络： 20MB+带宽

::: warning 依赖安装

* 安装ntp
``` bash
sudo apt-get install ntp
# macOS安装ntp:  brew install ntp
```

* 安装libstdc++-7-dev
```bash
# Ubuntu系统需要安装, macOS不需要
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```

:::

## 节点安装

以下的步骤演示的是**主网节点**的启动

- 如果你是开发者，希望快速体验，可前往[测试网络](testnet.html)
- 如果你想基于GXChain搭建私有链，可前往[私有链搭建](private_chain.html)

### 1. 下载Release包

``` bash
# 执行这个shell脚本，会自动从github下载最新的主网程序，并解压至当前目录下
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```

### 2. 启动节点， 同步数据

``` bash
./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="127.0.0.1:28090" &
```

就是这样了, 根据上面的步骤:
- 启动了一个节点监听在 `127.0.0.1:28090`
- 指定了区块信息保存在 `./trusted_node` 目录下

::: tip 友情提示
- 同步区块大约需要 **20+小时**, 当然这和你的网络情况有一定关系
- 在区块同步完成之前，你只需耐心等待，在此期间可以阅读一下文档
:::

### 3. 查看日志

``` bash
tail -f trusted_node/logs/witness.log
```

节点同步完成后，日志看起来是这样的:

``` bash
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

## 账户注册

GXChain采用**账户模型**，并且引入了推荐注册机制，因此在GXChain上注册一个账号，需要以下三个要素:

- **推荐人**，推荐人是链上已存在的账户，会使用你的账户名和公钥帮你注册一个账号
- **账户名**，账户名在链上是唯一的，所以请记住在GXChain上，**账户名即地址** (如gxchain-genius)
- **ECC公钥**，以GXC开头，Base64 编码的ECC公钥 ***(如何生成公钥？别担心，请往后看)***

有两种方式可以完成账户的注册:

### 1. 在线钱包

使用在线钱包[https://wallet.gxb.io](https://wallet.gxb.io)在界面上完成上述步骤

### 2. 手动注册

推荐对私钥安全要求较高的开发者使用这种方式完成注册，保证私钥是离线的

#### 步骤1: 通过cli_wallet来生成一对公私钥

``` bash
./programs/cli_wallet/cli_wallet --suggest-brain-key
{
  "brain_priv_key": "SHAP CASCADE AIRLIKE WRINKLE CUNETTE FROWNY MISREAD MOIST HANDSET COLOVE EMOTION UNSPAN SEAWARD HAGGIS TEENTY NARRAS",
  "wif_priv_key": "5J2FpCq3UmvcodkCCofXSNvHYTodufbPajwpoEFAh2TJf27EuL3",
  "pub_key": "GXC75UwALPEFECfHLjHyNSxCk1j7XzSvApQiXKEbanWgr7yvXXbdG"
}
```

::: tip 字段解释
- brain_priv_key: 助记词，是私钥的原始文本，通过助记词可以还原出私钥
- wif_priv_key: 私钥，在程序中使用
- pub_key: 公钥，用于链上账户注册
:::

####  步骤2: 通过水龙头来完成账户注册

1. 想一个专属的账户名(account_name),如`gxchain-genius`
2. 替换下面curl命令中的 `<account_name>` and `<public_key>` 并在终端执行:

``` bash
curl 'https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”<account_name>”,”owner_key”:”<public_key>”,”active_key”:”<public_key>”,”memo_key”:”<public_key>”,”refcode”:null,”referrer”:null}}’
```
