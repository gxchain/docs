#  Getting started with Smart Contract(TestNet)

## Introduction

GXChain智能合约2.0，底层使用WebAssembly虚拟机，目前支持C++语言的智能合约编写。
开发者使用C++编写智能合约，通过llvm将代码编译成WebAssembly（又名WASM），部署到区块链上，通过智能合约ABI(Application Binary Interface，应用程序的二进制接口)和智能合约交互。

### Documents

| 文档 | 链接 |
| :-- | :-- |
| 内置API | [gxb_contract_api.md](https://github.com/gxchain/Technical-Documents/blob/master/gxb_contract_api.md) |
| 合约存储 | [contract_storage_usage.md](https://github.com/gxchain/Technical-Documents/blob/master/contract/contract_storage_usage.md) |

### Examples

| 示例 | 地址 |
| :-- | :-- |
| helloworld合约 | [/contracts/examples/helloworld](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld) |
| 充值提现合约 | [/contracts/examples/bank](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/bank) |
| 红包合约 | [/contracts/examples/redpacket](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket) |
| 线性释放资产合约 | [/contracts/examples/linear_vesting_asset](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/linear_vesting_asset) |
| 基于hash验证的猜谜合约 | [/contracts/examples/riddle](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/riddle) |


体验智能合约有两种方式： 使用智能合约IDE工具 和 使用cli_wallet
## Quick Start(IDE)

### 1. Register an Account

访问测试网络[在线钱包](https://testnet.wallet.gxchain.org/#/) 注册钱包帐户

### 2. Apply Token on Testnet

注册完成后, 点击[申领测试代币](http://blockcity.mikecrm.com/2SVDb67)

### 3. Download IDE
通过智能合约IDE，可以编写、编译、部署、调用智能合约。
[点击下载](https://github.com/gxchain/gxchain-alpha/releases/latest)

### 4.Import Account

先去步骤1中的[在线钱包](https://testnet.wallet.gxchain.org/#/)找到自己的活跃权限私钥

![](./assets/ide/queryPvk.png)

![](./assets/ide/queryPvk2.png)

再打开客户端，进入设置页面，导入账户

::: warning 提示
密码不会上传到服务器，如果忘记需要移除账户重新导入
:::

![](./assets/ide/import.png)

#### 5.Select a template

![](./assets/ide/addProject.png)

#### 6.Compile

![](./assets/ide/compile.png)

#### 7.Deploy

部署之前需要先解锁钱包

![](./assets/ide/deploy.png)

![](./assets/ide/deploy2.png)

#### 8.Invoke

与部署一样，也需要先解锁钱包

![](./assets/ide/call.png)

![](./assets/ide/call2.png)

## Quick Start(Cli)

### 1. Install

如果不想使用智能合约IDE工具，或者想构建一个更加稳定可靠的编译环境；可以本地编译GXChain程序，通过命令行方式编译、部署、调用智能合约；GXChain源码编译，目前支持ubuntu系统和mac系统：

- [Build on Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)
- [Build on OS X](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2. Create a contract

使用gxx的模板创建一个helloworld合约

```
gxx -n helloworld
```

### 3. Compile

编译合约，生成wast和wasm文件

``` bash
gxx -o helloworld/helloworld.wast helloworld/helloworld.cpp
```
生成abi文件

``` bash
gxx -g helloworld/helloworld.abi helloworld/helloworld.cpp
```

### 4. Deploy

需要开启cli_wallet，连接本地节点或者远程testnet节点

``` bash
./programs/cli_wallet/cli_wallet -swss://testnet.gxchain.org --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```

Import your private key

``` bash
# setup a password for your wallet if neededm, eg.mylocalpassword

new >>> set_password mylocalpassword

# unlock the wallet
locked >>> unlock mylocalpassword

# Import your private key
unlocked >>> import_key your_account_name your_private_key

# 部署合约, 指定合约名为helloworld，发起的钱包帐户为your_accoutn_name， 0和0分别为vm type和vm version，./helloworld为wast/abi文件所在路径， GXS表示手续费资产类型，true表示发起广播
unlocked >>> deploy_contract helloworld your_account_name 0 0 ./helloworld GXS true
```

### 5. Invoke
部署合约成功后，可以使用get_account接口查询合约

``` bash
unlocked >>> call_contract nathan helloworld null hi "{\"user\":\"zhuliting\"}" GXS true
```

## Other
### 1. Setup Testnet

refer to [Testnet](testnet.html)

### 2. About GXX-Server

refer to [gxchain/gxx-server](https://github.com/gxchain/gxx-server)

### 3. Basic types in smart contract

::: warning
Currently the Multi-Index table only supports：int128, int256, float, double
:::
