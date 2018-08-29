# 测试网络

## 介绍
测试网络是GXChain的外部测试环境，参数与主链相同。

在测试网络上，开发者可以:

- 申请[免费的Token](http://blockcity.mikecrm.com/2SVDb67)
- 测试[客户端](clients.html)
- 体验最新功能
- 参与GXChain开发
- 项目开发，合约调试

| 测试网络 | 配置 |
| :-- | :-- |
| 接入点 *(在测试网络钱包中已内置)* | wss://testnet.gxchain.org |
| 种子节点 *(在节点启动时候指定)* | testnet.gxchain.org:6789 |
| 智能合约编译服务 *(在IDE中配置)* | https://testnet.gxx.gxchain.org |
| 区块浏览器 | https://testnet.explorer.gxchain.org |
| 在线钱包 | https://testnet.wallet.gxchain.org |
| 水龙头 | https://testnet.faucet.gxchain.org |

::: tip 提示
目前只有一个节点，社区开发者贡献节点可以加入测试网络，申请见证人。
:::

## 1. 注册账户

访问测试网络[在线钱包](https://testnet.wallet.gxchain.org/#/) 注册钱包帐户

## 2. 申领测试Token

注册完成后, 点击[申领测试代币](http://blockcity.mikecrm.com/2SVDb67)

## 3. 下载最新节点程序

[**最新程序**](https://github.com/gxchain/gxb-core/releases/latest)

```bash
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/gxb_ubuntu_1.0.180809.beta.tar.gz -O gxb_ubuntu_1.0.180809.beta.tar.gz
tar zxvf gxb_ubuntu_1.0.180809.beta.tar.gz
```

## 4. 下载测试网络genesis.json

```bash
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json
```

::: tip 关于genisis.json
- genisis.json即创世文件
- 每一条链都有唯一的genesis.json
- genesis.json中指定了创世区块所必须的配置信息和节点启动的初始化参数
- 任意一个字符的改变，都会得到一个不同的chain_id
- 不同的chain_id将导致无法和seed_node之间相互通讯
- 因此：**请勿改变genisis.json**，除非你想跑一条[私有链](/zh/guide/private_chain)
:::

## 5. 启动测试网络节点

```bash
./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json &
```

目前测试网络数据量不大，可以跑全节点。通过后台日志文件testnet\_node/logs/witness.log可查看区块同步进度。
区块同步完成后，可以运行命令行钱包cli\_wallet。

## 6. 使用命令行钱包

```bash
./programs/cli_wallet/cli_wallet -sws://127.0.0.1:28090  -r 127.0.0.1:8091 --data-dir=testnet_node --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```
