# 客户端

## 命令行钱包

在[快速开始](/zh/guide/#节点安装)中，我们介绍了如何下载节点安装程序。

命令行钱包`cli_wallet`等待节点同步完成后，在根目录下启动命令行钱包，点击查看[命令行钱包教程](../advanced/cli_wallet.html)


## 轻钱包
| 客户端 | 链接 | 开源地址 |
| :-- | :-- | :-- |
| 网页钱包 | [主网](https://wallet.gxb.io)/[测试网](https://testnet.wallet.gxchain.org) | [gxchain/gxb-light](https://github.com/gxchain/gxb-light) |
| 手机钱包(推荐使用布洛克城) | [点击下载](https://blockcity.gxb.io/download) | [gxchain/gxs-wallet](https://github.com/gxchain/gxs-wallet) |


## GXClient

为了方便开发者在程序中调用gxchain api，我们封装了gxclient并实现了以下几个类型的功能:

- [x] [生成公私钥对](https://gxchain.github.io/gxclient-node/api/#chain-api)
- [x] [获取链信息](https://gxchain.github.io/gxclient-node/api/#chain-api)
- [x] [账户相关](https://gxchain.github.io/gxclient-node/api/#account-api)
- [x] [资产相关](https://gxchain.github.io/gxclient-node/api/#asset-api)
- [x] [智能合约相关](https://gxchain.github.io/gxclient-node/api/#contract-api)

| 客户端 | 链接 |
| :-- | :-- |
| gxclient-node | [gxchain/gxclient-node](https://github.com/gxchain/gxclient-node) |
| gxclient-ios | [gxchain/gxclient-ios](https://github.com/gxchain/gxclient-ios) |
| gxclient-java | [gxchain/gxclient-java](https://github.com/gxchain/gxclient-java) |


> 更多的方法在添加中，欢迎提交[Feature Request](https://github.com/gxchain/gxclient-node/issues/new?template=feature_request.md)和[Pull Request](https://github.com/gxchain/gxclient-node)
