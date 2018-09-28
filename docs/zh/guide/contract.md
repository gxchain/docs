#  智能合约快速开始(TestNet)

## 介绍

   GVM使用WebAssembly(WASM)执行智能合约。借助WebAssembly,开发者可以运用自己熟悉的编程语言编写智能合约，目前支持C++。为了降低开发者编写智能合约的门槛，GXChain将在未来支持更多的编程语言。

   使用GXChain提供的编译工具，可以把C++等高级语言代码编译成WASM格式的字节码，然后调用合约部署接口将代码部署在链上。
   
   成功部署的智能合约会在区块链上会创建一个智能合约账户，账户中存储了合约的字节码和对应的ABI(Application Binary Interface)。不同于普通GXChain账户，合约账户和资产由合约代码控制，没有私钥。用户调用智能合约，需要指定合约账户名以及合约方法，利用ABI和智能合约交互。ABI是由GXChain编译工具生成，包含合约接口、接口参数和持久化存储结构等信息。
   
   智能合约的持久化存储，以对象的形式顺序存储在内存中，对象的存储字段及类型由开发者根据业务需要自定义。
   
   为了合理利用区块链资源，每次调用智能合约都需要燃烧一定的矿工费，费用由3部分组成：基础费用(固定)，内存费用(根据持久存储使用量计费)， CPU费用(根据本次调用占用的CPU时间计费)，3种费用的价格和调用合约的CPU上限均可通过理事会动态调整。智能合约费用计算规则：      

   合约部署手续费：基准手续费 +  交易消息体大小 * 单位KB费用
```
deploy_fee = basic_fee + transaction_size * price_per_kb
```

   合约调用手续费： 基准手续费 + 内存使用量 + cpu使用量
```
transaction_fee = basic_fee + ram_usage * price_per_kb + cpu_usage * price_per_ms
```


### 参考文档

| 文档 | 链接 |
| :-- | :-- |
| 内置API | [gxb_contract_api.md](https://github.com/gxchain/Technical-Documents/blob/master/gxb_contract_api.md) |
| 合约存储 | [contract_storage_usage.md](https://github.com/gxchain/Technical-Documents/blob/master/contract/contract_storage_usage.md) |

### 合约示例

| 示例 | 地址 |
| :-- | :-- |
| helloworld合约 | [/contracts/examples/helloworld](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld) |
| 充值提现合约 | [/contracts/examples/bank](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/bank) |
| 红包合约 | [/contracts/examples/redpacket](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket) |
| 线性释放资产合约 | [/contracts/examples/linear_vesting_asset](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/linear_vesting_asset) |
| 基于hash验证的猜谜合约 | [/contracts/examples/riddle](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/riddle) |

::: tip 友情提示
合约函数名，只能使用26个小写字母和数字0 - 5， 合约帐户名同GXChain帐户名规则。
:::

体验智能合约有两种方式： 使用智能合约IDE工具 和 使用cli_wallet
## 快速开始(通过智能合约IDE)

### 1. 注册账户

访问测试网络[在线钱包](https://testnet.wallet.gxchain.org/#/) 注册钱包帐户

### 2. 申领测试Token

注册完成后, 点击[申领测试代币](http://blockcity.mikecrm.com/2SVDb67)

### 3. IDE下载
通过智能合约IDE，可以编写、编译、部署、调用智能合约。
[点击下载](https://github.com/gxchain/gxchain-alpha/releases/latest)

### 4.导入账户

先去步骤1中的[在线钱包](https://testnet.wallet.gxchain.org/#/)找到自己的活跃权限私钥

![](./assets/ide/queryPvk.png)

![](./assets/ide/queryPvk2.png)

再打开客户端，进入设置页面，导入账户

::: warning 提示
密码不会上传到服务器，如果忘记需要移除账户重新导入
:::

![](./assets/ide/import.png)

#### 5.选择模板工程

![](./assets/ide/addProject.png)

#### 6. 编译

![](./assets/ide/compile.png)

#### 7.部署

部署之前需要先解锁钱包

![](./assets/ide/deploy.png)

![](./assets/ide/deploy2.png)

#### 8.调用

与部署一样，也需要先解锁钱包

![](./assets/ide/call.png)

![](./assets/ide/call2.png)

## 快速开始(使用本地命令行方式)

### 1. GXChain源码编译

如果不想使用智能合约IDE工具，或者想构建一个更加稳定可靠的编译环境；可以本地编译GXChain程序，通过命令行方式编译、部署、调用智能合约；GXChain源码编译，目前支持ubuntu系统和mac系统：

- [Build on Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)
- [Build on OS X](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2. 编译合约

使用gxx的模板创建一个helloworld合约

```
gxx -n helloworld
```

### 3. 编译合约，生成wast和abi

编译合约，生成wast和wasm文件

``` bash
gxx -o helloworld/helloworld.wast helloworld/helloworld.cpp
```
生成abi文件

``` bash
gxx -g helloworld/helloworld.abi helloworld/helloworld.cpp
```

### 4. 部署合约

需要开启cli_wallet，连接本地节点或者远程testnet节点

``` bash
./programs/cli_wallet/cli_wallet -swss://testnet.gxchain.org --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```

导入钱包私钥

``` bash
# 如果是新钱包，需要设置一个解锁密码，此处为mylocalpassword

new >>> set_password mylocalpassword

# 解锁
locked >>> unlock mylocalpassword

# 导入钱包私钥
unlocked >>> import_key your_account_name your_private_key

# 部署合约, 指定合约名为helloworld，发起的钱包帐户为your_accoutn_name， 0和0分别为vm type和vm version，./helloworld为wast/abi文件所在路径， GXS表示手续费资产类型，true表示发起广播
unlocked >>> deploy_contract helloworld your_account_name 0 0 ./helloworld GXS true
```

### 5. 调用合约
部署合约成功后，可以使用call_contract接口调用合约

``` bash
unlocked >>> call_contract nathan helloworld null hi "{\"user\":\"zhuliting\"}" GXS true
```

## 其它
### 1. 部署测试网络节点

参考[测试网络](testnet.html)

### 2. 部署合约编译服务GXX-Server

参考[gxchain/gxx-server](https://github.com/gxchain/gxx-server)

### 3. 合约数据类型

::: warning 测试智能合约时需要注意
目前的存储表(Multi-Index table)不支持的类型：int128, int256, float, double
:::
