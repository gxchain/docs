## 快速开始(智能合约IDE方式)

### 1. 注册账户

访问测试网络[在线钱包](https://testnet.wallet.gxchain.org/#/) 注册钱包帐户

### 2. 申领测试Token

注册完成后, 点击[申领测试代币](http://blockcity.mikecrm.com/2SVDb67)

### 3. IDE下载
通过智能合约IDE，可以编写、编译、部署、调用智能合约。
[点击下载](https://github.com/gxchain/gxchain-alpha/releases/latest)

### 4.导入账户

先去步骤1中的[在线钱包](https://testnet.wallet.gxchain.org/#/)找到自己的活跃权限私钥

![](../guide/assets/ide/queryPvk.png)

![](../guide/assets/ide/queryPvk2.png)

再打开客户端，进入设置页面，导入账户

::: warning 提示
密码不会上传到服务器，如果忘记需要移除账户重新导入
:::

![](../guide/assets/ide/import.png)

#### 5.选择模板工程

![](../guide/assets/ide/addProject.png)

#### 6. 编译

![](../guide/assets/ide/compile.png)

#### 7.部署

部署之前需要先解锁钱包

![](../guide/assets/ide/deploy.png)

![](../guide/assets/ide/deploy2.png)

#### 8.调用

与部署一样，也需要先解锁钱包

![](../guide/assets/ide/call.png)

![](../guide/assets/ide/call2.png)

## 下一步
[本地命令行方式](./command_line.html)