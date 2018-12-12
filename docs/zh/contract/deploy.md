# 合约部署

## 智能合约IDE方式

### 1. 注册账户

访问测试网络[在线钱包](https://testnet.wallet.gxchain.org/#/) 注册钱包帐户

### 2. 申领测试Token

注册完成后, 点击[申领测试代币](http://blockcity.mikecrm.com/2SVDb67)

### 3. IDE下载
通过智能合约IDE，可以编写、编译、部署、调用智能合约。
[点击下载](https://github.com/gxchain/gxchain-alpha/releases/latest)

### 4. 导入账户

先去步骤1中的[在线钱包](https://testnet.wallet.gxchain.org/#/)找到自己的活跃权限私钥

![](../guide/assets/ide/queryPvk.png)

![](../guide/assets/ide/queryPvk2.png)

再打开客户端，进入设置页面，导入账户

::: warning 提示
密码不会上传到服务器，如果忘记需要移除账户重新导入
:::

![](../guide/assets/ide/import.png)

### 5. 选择模板工程

![](../guide/assets/ide/addProject.png)

### 6. 编译

![](../guide/assets/ide/compile.png)

### 7. 部署

部署之前需要先解锁钱包

![](../guide/assets/ide/deploy.png)

![](../guide/assets/ide/deploy2.png)

### 8. 调用

与部署一样，也需要先解锁钱包

![](../guide/assets/ide/call.png)

![](../guide/assets/ide/call2.png)

## 本地命令行方式

### 1. GXChain源码编译

如果不想使用智能合约IDE工具，或者想构建一个更加稳定可靠的编译环境；可以本地编译GXChain程序，通过命令行方式编译、部署、调用智能合约；GXChain源码编译，目前支持ubuntu系统和mac系统：

- [Build on Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)
- [Build on OS X](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2. 使用模板创建合约

使用gxx的模板创建一个helloworld合约

```bash
gxx -n helloworld
```

### 3. 编译合约，生成wast和abi

编译合约，生成wast和wasm文件

```bash
gxx -o helloworld/helloworld.wast helloworld/helloworld.cpp
```
生成abi文件

```bash
gxx -g helloworld/helloworld.abi helloworld/helloworld.cpp
```

### 4. 部署合约

需要开启cli_wallet，连接本地节点或者远程testnet节点

```bash
./programs/cli_wallet/cli_wallet -swss://testnet.gxchain.org --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```

导入钱包私钥

```bash
# 如果是新钱包，需要设置一个解锁密码，此处为mylocalpassword

new >>> set_password mylocalpassword

# 解锁
locked >>> unlock mylocalpassword

# 导入钱包私钥
unlocked >>> import_key your_account_name your_private_key

# 部署合约, 指定合约名为helloworld，发起的钱包帐户为your_accoutn_name， 0和0分别为vm type和vm version，./helloworld为wast/abi文件所在路径， GXC表示手续费资产类型，true表示发起广播
unlocked >>> deploy_contract helloworld your_account_name 0 0 ./helloworld GXC true
```

### 5. 调用合约
部署合约成功后，可以使用call_contract接口调用合约

```bash
unlocked >>> call_contract nathan helloworld null hi "{\"user\":\"zhuliting\"}" GXC true
```

### 6. 更新合约

测试网络支持更新合约

```bash
// hello120301为合约名  测试网
unlocked >>> update_contract hello120301 zhao-123 /Users/zhaoxiangfei/code/contracts_work/example_contract_02/helloworld GXC true
```






