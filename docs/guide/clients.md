# 客户端

## 命令行钱包

在[快速开始](/zh/guide/#节点安装)中，我们介绍了如何下载节点安装程序。

等待节点同步完成后，在根目录下启动命令行钱包

``` bash
./programes/cli_wallet/cli_wallet
```

在cli_wallet进程中，通过`help`和`get_help`两个命令可以帮助你快速学习命令行钱包API使用

## 轻钱包
| 客户端 | 链接 | 开源地址 |
| :-- | :-- | :-- |
| 网页钱包 | [在线访问](https://wallet.gxb.io) | [gxchain/gxb-light](https://github.com/gxchain/gxb-light) |
| 手机钱包(推荐使用布洛克城) | [点击下载](https://blockcity.gxb.io/download) | [gxchain/gxs-wallet](https://github.com/gxchain/gxs-wallet) |


## GXClient

为了方便开发者在程序中调用gxchain api，我们封装了gxclient并实现了以下几个常用功能:

- [x] [公私钥对生成](https://github.com/gxchain/gxclient-node#2-keypair-generation)
- [x] [账户注册](https://github.com/gxchain/gxclient-node#3-account-register)
- [x] [发起转账](https://github.com/gxchain/gxclient-node#4-transfer)
- [x] [区块遍历，交易监测](https://github.com/gxchain/gxclient-node#1-transaction-detect)
- [x] [备注解密](https://github.com/gxchain/gxclient-node#1-transaction-detect)

| 客户端 | 链接 |
| :-- | :-- |
| gxclient-java | [gxchain/gxclient-java](https://github.com/gxchain/gxclient-java) |
| gxclient-node | [gxchain/gxclient-node](https://github.com/gxchain/gxclient-node) |

> 更多的方法在添加中，欢迎提交[Feature Request](https://github.com/gxchain/gxclient-node/issues/new?template=feature_request.md)和[Pull Request](https://github.com/gxchain/gxclient-node)
