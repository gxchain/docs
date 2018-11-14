## 智能合约入门

本教程的目的是为公信宝智能合约开发提供指导，包括合约开发、部署、调试以及常见错误归类等相关内容。

公信宝智能合约采用C++语言编写，通过[Webassembly](https://webassembly.org/)虚拟机编译后部署在公信宝主链上。编译后的智能合约主要包括abi文件与wast文件，abi文件是合约定义的接口文件，wast文件为合约逻辑文件。  

**开发智能合约之前，你需要做如下准备:**

- 对C++语言开发有一定程度的了解
- 对Linux、Mac系统命令有一定程度的了解
- 在本地启动Gxb-Core节点(witness_node和cli_wallet程序)（源码编译教程点[这里](https://github.com/gxchain/gxb-core)）


### 1. 启动本地节点

编译完成后，切换到witness_node程序所在目录，使用如下命令启动本地出块节点，data保存配置信息、生成的区块信息等。

```
./witness_node -d data
```

启动后大致如下图所示（请记录下Chain ID，cli_wallet连接时会使用到）：

![](./png/chain_id.jpg)

出块节点运行之后，切换到cli_wallet目录，运行如下命令，启动cli_wallet客户端与出块节点交互，包括创建账号、部署合约、合约调用等功能，均可通过cli_wallet客户端进行测试。(chain-id 切换为自己的id)

```
./cli_wallet -sws://localhost:11011 --chain-id=679beed54a9081edfd3ede349a0aa1962ea2dc9d379808fecce56226cb199c84
```

启动后大致如下图所示：（**初次启动显示为new**）

![](./png/cli_wallet.jpg)


### 2. 创建一个新钱包


首先你需要为你的钱包创建一个新的密码。这个密码被用于加密所有钱包的私钥。在教程中我们使用如下密码：`supersecret`

但你可以使用字母和数字的组合来创建属于你的密码。通过以下命令来创建你的密码：:

```
>>> set_password supersecret
```

现在你可以解锁你新建的钱包了：

```
unlock supersecret
```

### 3. 申领初始余额

资产账户包含在钱包账户中， 要向你的钱包中添加钱包账户, 你需要知道账户名以及账户的私钥。
在例子中，我们将通过`import_key`命令向现有钱包中导入my-genesis.json中初始化的`nathan`帐户：

```
import_key nathan 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
```

::: warning 提示
* `nathan`在初始文件中会被用于定义账户名,  如果你修改过`my-genesies.json` 文件，你可以填入一个不同的名字。并且，请注意`5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3`是定义在`config.ini`内的私钥
:::

现在我们已经将私钥导入进钱包, my-genesis.json中初始化的余额，需要通过`import_balance`命令来申领，无需申明费用：

```
import_balance nathan ["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"] true
```

你可以通过以下命令来检视你的账户：

```
get_account nathan
```

用以下命令获取账户余额：

```
list_account_balances nathan
```

### 4. 创建账户

现在我们讲创建一个新的账户`alpha` ，这样我们可以在 `nathan`和`alpha`两个账户中来回转账了。

通常我们用一个已有账户来创建新账户，因为登记员需要缴纳注册费用。 并且，登记员的账户需要进入Also, there is the requirement  lifetime member \(LTM\)状态。因此我们必须在创建新账户前，先将账户`nathan`升级到LTM状态， 使用`upgrade_account`命令来升级账户：

```
upgrade_account nathan GXC true
```
返回的信息中，在`membership_expiration_date`边上你会发现`2106-02-07T06:28:15`。 如果你看到`1970-01-01T00:00:00`，说明之前的操作出现了错误，`nathan`没能成功升级。

成功升级后，我们可以通过`nathan`来注册新账户，但首先我们需要拥有新账户的公钥。通过使用`suggest_brain_key`命令来生成公私钥对：

```
// 生成秘钥对
suggest_brain_key
```

然后调用register\_account / register\_account2接口创建新帐户

```
register_account alpha GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ nathan nathan 10 true
```

使用transfer3命令转移部分资产到账户

```
transfer3 nathan alpha 1000 GXC test GXS true
```

使用如下命令查看资产余额：

```
list_account_balances alpha
```

## 下一步
[Hello World合约简介](./tutorial_hello.html)
