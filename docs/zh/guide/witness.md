# 如何成为一个出块的活跃见证人节点

本文档介绍了如何在公信链网络中成为一个出块的活跃见证人节点。

## 流程简介

1. 部署并启动见证人节点
2. 向钱包导入账户和资金
3. 将账户升级为终身会员
4. 注册成为新的见证人
5. 为新的见证人投票
6. 添加新的见证人，运行见证人节点

### 1.部署并启动见证人节点

#### 环境要求

- 系统: **macOS / Ubuntu 14.04 64-bit**, **4.4.0-63-generic** 以上内核
- 内存: 8GB+
- 硬盘: 100GB+

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


下载见证节点程序，请访问github release页面 https://github.com/gxchain/gxb-core/releases/latest


然后解压程序，将程序放置你的deploy目录，然后执行命令：

```
tar zxvf gxb_1.0.180404.tar.gz
cd gxb
```

启动公信宝见证节点witness\_node

```
./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 \
--p2p-endpoint=0.0.0.0:6789 --log-file --max-ops-per-account=2000 &
```

可使用--help 来查看命令参数

其中--data-dir指定区块数据存储路径

--rpc-endpoint指定rpc服务地址和端口\(端口可修改\)，127.0.0.1限定本地访问rpc服务，若不限定本地访问，可指定0.0.0.0

--p2p-endpoint=0.0.0.0:6789 用于连接p2p网络，端口6789不可修改

--log-file 输出日志文件，若无此参数，日志输出到控制台

--max-ops-per-account 内存中为每个帐户保存交易历史的个数

--data-transaction-lifetime 数据交易对象在内存中的生命周期，单位为小时


&表示程序后台运行

其它参数：
--replay-blockchain 重放所有已下载的区块并重建索引，比较耗时。当意外中断后重启会强制进行，所以尽量不要强制中断。

--resync-blockchain 删除所有已下载数据，重新同步区块链


完全同步区块需要半天时间。可以通过后台日志文件witness\_node\_data\_dir/logs/witness.log可查看区块同步进度，访问[公信宝区块浏览器](https://block.gxb.io/)查看最新区块。区块同步完成后，可以运行命令行钱包。

#### 运行命令行钱包cli\_wallet

命令行钱包cli\_wallet连接witness\_node，调用witness通过28090提供的websocket服务。

```
./programs/cli_wallet/cli_wallet -s ws://127.0.0.1:28090 \
--enable-rpc-log -r 0.0.0.0:8091 --data-dir=trusted_node
```

若需要后台运行，可加 -d &

其中-s指定连接witness\_node

--enable-rpc-log输出rpc日志文件

-r指定rpc服务的地址和端口

在使用钱包之前，需要设置钱包密码并解锁\(注意：你设置的钱包密码，会显示在终端\)：

```
new >>> set_password <my_password>
locked >>> unlock <my_password>
unlocked >>>
```

### 2.向钱包导入账户和资金

将账户活跃权限私钥导入钱包。

```
# <accountname> 为帐户名，<wif key> 为活跃权限私钥
unlocked >>> import_key <accountname> <wif key>
[a transaction in json format]

# 查看钱包下的账号信息
unlocked >>> list_my_accounts
[{
"id": "1.2.15",
...
"name": <accountname>,
...
]
unlocked >>> list_account_balances <accountname>
XXXXXXX GXS
```

### 3.将账户升级为终身会员（需要燃烧矿工费6 GXS, 该参数可由理事会投票调整）

```
unlocked >>> upgrade_account <accountname> GXS true
[a transaction in json format]
```

[note] 矿工费用于网络记帐，系统会将收到的矿工费奖励给出块的见证人。
### 4.建见证人，指定见证人的拥有者为你的帐户（需要燃烧矿工费1 GXS, 该参数可由理事会投票调整）

```
unlocked >>> create_witness <accountname> "url-to-proposal" GXS true
{
  "ref_block_num": 139,
  "ref_block_prefix": 3692461913,
  "relative_expiration": 3,
  "operations": [[
  21,{
    "fee": {
      "amount": 100000,
      "asset_id": "1.3.1"
    },
    "witness_account": "1.2.16",
    "url": "url-to-proposal",
    "block_signing_key": "PUBLIC KEY",  //此处为见证人公钥
    "initial_secret": "00000000000000000000000000000000000000000000000000000000"
  }
]
  ],
  "signatures": [
  "1f2ad5597af2ac4bf7a50f1eef2db49c9c0f7616718776624c2c09a2dd72a0c53a26e8c2bc928f783624c4632924330fc03f08345c8f40b9790efa2e4157184a37"
  ]
}
```

备注：“url-to-proposal” 为一个url，用于在区块中记录见证人。客户可以在显示证人名单时看到。
"url-to-proposal"指定一个网页链接，可以介绍自己的情况，比如个人信息，对公信宝社区的贡献和影响力等等，可以更好的在社区拉票。

### 5.由股东为新的见证人投票

见证人创建完成后，需要在社区拉票。由GXS股东通过轻钱包对新的见证人进行投票，选出自己信任的见证人，票数高的成为活跃见证人，并等到下一个维护间隔（10分钟，可调整），具备出块权限。另外，活跃见证人要求长期在线。

### 6.查看见证人，运行见证人节点

查看<accountname>拥有的见证人：
```
unlocked >>> get_witness <accountname>
{
  [...]
  "id": "1.6.10",   // 此处为见证人id
  "signing_key": "GXC73Zyj56MHUEiCbWfhfJWjXAUJafGUXmwGeciFxprU5QEv9mhMU", // 此处为见证人公钥
  [...]
}
```

运行`dump_private_keys`列出钱包所有的公私钥对，根据见证人公钥找到对应的私钥。
警告：`dump_private_keys`将在终端上不加密地显示密钥，不要让别人窥视。
```
unlocked >>> dump_private_keys
[[
  ...
  ],[
"GXC73Zyj56MHUEiCbWfhfJWjXAUJafGUXmwGeciFxprU5QEv9mhMU",//见证人公钥
"5Jainounrsmja4JYsgEYDQxpNYmMj98FRVSPhz2R7Pg8yaZh9Ks"// 见证人公钥对应的私钥
  ]
]
```
到此为止，见证人创建成功，见证人id为1.6.10。
现在需要重新开始运行程序，所以关闭钱包（ctrl-c），并关闭证人（ctrl-c），并再次运行见证人节点，带上-w指定见证人id，--private-key指定见证人公私钥。

```
./programs/witness_node/witness_node --data-dir=trusted_node \ 
--rpc-endpoint=127.0.0.1:28090 --p2p-endpoint=0.0.0.0:6789 \
--max-ops-per-account=20000 --partial-operations=true \
--data-transaction-lifetime=1 \
--log-file -w '"1.6.10"' \
--private-key '["GXC73Zyj56MHUEiCbWfhfJWjXAUJafGUXmwGeciFxprU5QEv9mhMU", \
"5Jainounrsmja4JYsgEYDQxpNYmMj98FRVSPhz2R7Pg8yaZh9Ks"]'
```

或者，也可以将下面这一行添加到config.ini中：

```
witness-id = "1.6.10"
private-key = ["GXC73Zyj56MHUEiCbWfhfJWjXAUJafGUXmwGeciFxprU5QEv9mhMU",\
"5Jainounrsmja4JYsgEYDQxpNYmMj98FRVSPhz2R7Pg8yaZh9Ks"]
```
其中1.6.10为新的见证人id， private-key 指定了见证人的公私钥对。

通过trusted/log/witness.log查看日志，可以看到运行界面中显示见证人签名的区块：

```
Witness 1.6.10 production slot has arrived; generating a block now...
Generated block #367 with timestamp 2017-08-05T20:46:30 at time 2017-08-05T20:46:30
```

