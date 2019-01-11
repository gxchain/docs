# GXChain

本工程为GXChain最新的技术文档，基于VuePress构建，使用Markdown编辑

<img width="400px" src='https://raw.githubusercontent.com/gxchain/gxips/master/assets/images/task-docs.png'/>

在线文档 [Getting Started](https://docs.gxchain.org)

## 如何编辑

依赖: node8+

```bash
# 安装vuepress
npm install vuepress -g
# Clone项目
git clone git@github.com:gxchain/docs.git
cd docs
# dev模式启动
npm start
```

## 参与翻译

欢迎提交Pull Request, 翻译过程中，你可能需要关注的是

1. 配置文件：`docs/.vuepress/config.js`
2. 文档内容：`docs/zh`

> `docs/zh`目录下始终是最新的内容，en语言默认在`docs`根目录下

## GXChain介绍
公信链（GXChain）是一条主要面向海量数据交换和应用开发的公有链，用于建立基于区块链的可信任的全领域数据交换价值网络。公信链具有基于DPoS共识机制的石墨烯底层架构的性能优势，同时具备G-ID、GVM、BaaS、Blockcity pay等链上配套功能，方便各类应用开发。基于公信链的Dapp布洛克城已经拥有百万级实名用户，为链上应用和合伙伙伴提供丰富的数据资源；面向企业服务的公信宝数据交易所也已上线，服务企业数量超过百家。公信链通过区块链技术实现了数据的安全、可信、自由、高效交易交换，为更大化发挥数据应用价值提供支撑。GXChain主网已于2017年6月上线。

![](docs/.vuepress/public/images/zh/gxchain-family.jpg)

## GXChain Awesome

开源社区 [github.com/gxchain](https://github.com/gxchain)
- 主链核心gxb-core
    - GXChain 核心模块
    - [github.com/gxchain/gxb-core](https://github.com/gxchain/gxb-core)
- 轻钱包
    - GXChain资产管理PC客户端
    - [github.com/gxchain/gxb-light](https://github.com/gxchain/gxb-light)
- 手机钱包
    - GXChain资产管理手机端
    - [github.com/gxchain/gxs-wallet](https://github.com/gxchain/gxs-wallet)
- 区块浏览器
    - 区块查询，交易查询，账户查询，资产查询
    - [github.com/gxchain/gxb-explorer](https://github.com/gxchain/gxb-explorer)
- 主链客户端
    - 主链交互Client，封装了账户注册，转账，区块查询等常用API
    - Java: [github.com/gxchain/gxclient-java](https://github.com/gxchain/gxclient-java)
    - Node: [github.com/gxchain/gxclient-node](https://github.com/gxchain/gxclient-node)
- BaaS SDK
    - 基于GXChain的数据存储+存证SDK
    - Java: [github.com/gxchain/baas-sdk-java](https://github.com/gxchain/baas-sdk-java)
    - Node: [github.com/gxchain/baas-sdk-node](https:///github.com/gxchain/baas-sdk-node)
- DES SDK
    - 基于GXChain的数据交换SDK
    - Java: [github.com/gxchain/des-sdk-java](https://github.com/gxchain/des-sdk-java)
    - Node: [github.com/gxchain/des-sdk-node](https://github.com/gxchain/des-sdk-node)
    - PHP: [github.com/gxchain/des-sdk-php](https://github.com/gxchain/des-sdk-php)
- 智能合约
    - 基于GXChain的智能合约开发工具集
    - 合约编译服务: [github.com/gxchain/gxx-server](https://github.com/gxchain/gxx-server)
    - IDE: [github.com/gxchain/gxchain-alpha](https://github.com/gxchain/gxchain-alpha)

