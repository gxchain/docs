# 如何成为一个公信节点

本文档介绍了如何在GXChain网络中成为一个公信节点。

## 流程简介

1. 通过公信宝钱包，一键创建公信节点
6. 部署并运行公信节点程序

### 1.创建公信节点
待补充

#### 下载最新版本的公信宝钱包，一键创建公信节点
#### 查看节点id


::: warning 提示
创建公信节点完成后，查看自己的节点id, 在启动公信节点程序时，需要带上此参数

:::

### 2.部署公信节点程序
#### 环境要求

- 系统: **Ubuntu 14.04 64-bit**, **4.4.0-63-generic** 以上内核
- 内存: 32 GB+
- 硬盘: 200 GB+

::: warning 依赖安装

* 安装ntp
``` bash
sudo apt-get install ntp
```

* 安装libstdc++-7-dev
```bash
# Ubuntu系统需要安装
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```

:::


下载节点程序
```
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```

启动公信节点程序

```
./programs/witness_node/witness_node --data-dir=trusted_node -w '"1.6.10"' \
--private-key '["GXC73Zyj56MHUEiCbWfhfJWjXAUJafGUXmwGeciFxprU5QEv9mhMU", "5Jainounrsmja4JYsgEYDQxpNYmMj98FRVSPhz2R7Pg8yaZh9Ks"]' &
```

其中
```
--data-dir指定区块数据存储路径

-w 指定的是自己的公信节点id
--private-key指定的是自己帐户的公钥和私钥
以上2个参数必须正确，否则将影响区块生产

&表示程序后台运行
```

完全同步区块需要约24小时。可以通过后台日志文件witness\_node\_data\_dir/logs/witness.log可查看区块同步进度，访问[公信宝区块浏览器](https://block.gxb.io/)查看最新区块。

通过tail -f trusted_node/log/witness.log查看日志。如果当选为活跃公信节点，可以看到如下生成区块的日志：

```
Generated block #367 with timestamp 2017-08-05T20:46:30 at time 2017-08-05T20:46:30
```

