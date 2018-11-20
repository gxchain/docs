# 私有链搭建

## 1. 下载最新节点程序

[**最新程序**](https://github.com/gxchain/gxb-core/releases/latest)

```bash
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_private_net_install.sh' | bash
```

## 2. 生成ECC密钥对

#### 通过cli_wallet来生成一对公私钥

``` bash
./programs/cli_wallet/cli_wallet --suggest-brain-key
{
  "brain_priv_key": "SHAP CASCADE AIRLIKE WRINKLE CUNETTE FROWNY MISREAD MOIST HANDSET COLOVE EMOTION UNSPAN SEAWARD HAGGIS TEENTY NARRAS",
  "wif_priv_key": "5J2FpCq3UmvcodkCCofXSNvHYTodufbPajwpoEFAh2TJf27EuL3",
  "pub_key": "GXC75UwALPEFECfHLjHyNSxCk1j7XzSvApQiXKEbanWgr7yvXXbdG"
}
```

::: tip 字段解释
- brain_priv_key: 助记词，是私钥的原始文本，通过助记词可以还原出私钥
- wif_priv_key: 私钥，在程序中使用
- pub_key: 公钥，用于链上账户注册
:::

接下来将讲解如何使用以上私钥，并会说明如何定义你自己的创世文件。

## 3. 生成创世文件genesis.json

::: tip 关于genisis.json
- genisis.json即创世文件
- 每一条链都有唯一的genesis.json
- genesis.json中指定了创世区块所必须的配置信息和节点启动的初始化参数
- 任意一个字符的改变，都会得到一个不同的chain_id
- 不同的chain_id将导致无法和seed_node之间相互通讯
- 因此：**请勿改变genisis.json**，除非你想跑一条[私有链](/zh/guide/private_chain)
:::

运行这条命令来创建一个名为`my-genesis.json`的初始文件：

```bash
./programs/witness_node/witness_node --create-genesis-json my-genesis.json
```

`my-genesis.json`这个文件将会存储在你私钥文件夹的根目录下，运行此命令后，所有见证人节点都会自行完成命令。

如果你想要自定义初始设定，打开`my-genesis.json`，你可以做以下的修改：

* 修改初始文件中账户， 以及账户名和公钥
* 区块链资产和初次分发（包含核心资产）
* 私链参数的最初基准（包括费用）
* 初始见证人的账户签名秘钥

## 4. 启动私链

运行以下命令:

```bash
./programs/witness_node/witness_node --data-dir data --genesis-json my-genesis.json
```

> --data-dir 指定了区块输出目录为`./data`文件夹
> --genesis-json 指定了启动节点的初始参数来自`my-genesis.json`

查看日志:

```bash
tail -f data/logs/witness.log
```

当这条信息出现时:

```log
3501235ms th_a main.cpp:165 main] Started witness node on a chain with 0 blocks.
3501235ms th_a main.cpp:166 main] Chain ID is 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824
```

::: warning 注意
请注意你的Chain ID会和上述例子中的ID不同。请记录下你的Chain ID，在之后你将会用到它
:::

初始化已经完成，按`ctrl-c` 关闭见证人节点

至此，你完成了:

- 创建了一条属于你自己的链，并启动了第一个节点
- 这个节点的初始化数据来自于`my-genisis.json`
- 只要其他的节点使用`my-genisis.json`, 并在启动参数中指定你的Chain ID, 即可加入你的私有区块链网络

关闭节点后，我们观察到，在`data`目录下生成了一个新文件`config.ini`，所有的*启动参数*，都可以在`data/config.ini`中进行配置

## 5. 配置见证人

用文本编辑器打开刚生成的`data/config.ini`, 做如下设置, 必要时请不要注释这些代码:

```ini
rpc-endpoint = 127.0.0.1:11011
genesis-json = my-genesis.json
enable-stale-production = true
```

在`data/config.ini`中定位以下语句:

```bash
# ID of witness controlled by this node (e.g. "1.6.5", quotes are required, may specify multiple times)
```

并添加如下词条:

```ini
witness-id = "1.6.1"
witness-id = "1.6.2"
witness-id = "1.6.3"
witness-id = "1.6.4"
witness-id = "1.6.5"
witness-id = "1.6.6"
witness-id = "1.6.7"
witness-id = "1.6.8"
witness-id = "1.6.9"
witness-id = "1.6.10"
witness-id = "1.6.11"
```

上述列表授权了见证人节点用见证人ID来生成区块

再来定位下一行配置

```
# Tuple of [PublicKey, WIF private key] (may specify multiple times)
private-key = ["GXC6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV","5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"]
```

::: tip 提示
- 正常情况下，每个见证人的节点不同
- 但在私有链中，我们会先设定成全体见证人在同一个节点生产区块
- 这些见证人ID的私钥（用来签署区块）已经在`data/config.ini`中提供：
:::

## 6. 开始生产区块

通过以下步骤，你可以生产基于你私链的第一个区块了，在见证人节点中运行以下命令:

```
./programs/witness_node/witness_node --data-dir data
```

之后私链的区块将开始生成，你会看到如下指示:

```
********************************
*                              *
*   ------- NEW CHAIN ------   *
*   - Welcome to Graphene! -   *
*   ------------------------   *
*                              *
********************************
```

之后data/log/witness.log文件会有更多成功生成区块的日志生成:

```
2322793ms th_a  main.cpp:176     main    ] Started witness node on a chain with 0 blocks.
2322794ms th_a  main.cpp:177     main    ] Chain ID is 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824
2324613ms th_a  witness.cpp:185  block_production_loo ] Generated block #1 with timestamp 2016-01-21T22:38:40 at time 2016-01-21T22:39:40
2344604ms th_a  witness.cpp:185  block_production_loo ] Generated block #2 with timestamp 2016-01-21T22:39:00 at time 2016-01-21T22:39:45
2349616ms th_a  witness.cpp:185  block_production_loo ] Generated block #3 with timestamp 2016-01-21T22:39:05 at time 2016-01-21T22:39:50
2354605ms th_a  witness.cpp:185  block_production_loo ] Generated block #4 with timestamp 2016-01-21T22:39:10 at time 2016-01-21T22:39:55
```

如果witness.log无日志生成，可以将日志打印打控制台，可以修改data/config.ini文件如下，然后重新启动witness_node

```
[logger.default]
level=debug
appenders=stderr
```

## 7. 客户端（cli_wallet）用法

现在可以将客户端和你的私链的见证人节点相关联。先确保你的见证人节点在运行状态，在另外一个CMD中运行以下命令：

```
./programs/cli_wallet/cli_wallet --wallet-file=my-wallet.json --chain-id 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824 -sws://127.0.0.1:11011
```

::: tip 提示
* 请确保用**你自己私链的区块链ID**替代上述ID`8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824`。
* 如果看到`set_password`提示，意味着你的客户端(cli_wallet)已经成功连接到见证人节点(witness_node)。
:::

### 1) 创建一个新钱包

首先你需要为你的钱包创建一个新的密码。这个密码被用于加密所有钱包的私钥。在教程中我们使用如下密码：`supersecret`

但你可以使用字母和数字的组合来创建属于你的密码。通过以下命令来创建你的密码：:

```
>>> set_password supersecret
```

现在你可以解锁你新建的钱包了：

```
locked >>> unlock supersecret
```

### 2) 申领初始余额

资产账户包含在钱包账户中， 要向你的钱包中添加钱包账户, 你需要知道账户名以及账户的私钥。
在例子中，我们将通过`import_key`命令向现有钱包中导入my-genesis.json中初始化的`nathan`帐户：

```
unlocked >>> import_key nathan 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
```

::: warning 提示
* `nathan`在初始文件中会被用于定义账户名,  如果你修改过`my-genesies.json` 文件，你可以填入一个不同的名字。并且，请注意`5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3`是定义在`config.ini`内的私钥
:::

现在我们已经将私钥导入进钱包, my-genesis.json中初始化的余额，需要通过`import_balance`命令来申领，无需申明费用：

```
unlocked >>> import_balance nathan ["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"] true
```

你可以通过以下命令来检视你的账户：

```
unlocked >>> get_account nathan
```

用以下命令获取账户余额：

```
unlocked >>> list_account_balances nathan
```

### 3) 创建账户

现在我们讲创建一个新的账户`alpha` ，这样我们可以在 `nathan`和`alpha`两个账户中来回转账了。

通常我们用一个已有账户来创建新账户，因为登记员需要缴纳注册费用。 并且，登记员的账户需要进入Also, there is the requirement  lifetime member \(LTM\)状态。因此我们必须在创建新账户前，先将账户`nathan`升级到LTM状态， 使用`upgrade_account`命令来升级账户：

```
unlocked >>> upgrade_account nathan GXC true
```
返回的信息中，在`membership_expiration_date`边上你会发现`2106-02-07T06:28:15`。 如果你看到`1970-01-01T00:00:00`，说明之前的操作出现了错误，`nathan`没能成功升级。

成功升级后，我们可以通过`nathan`来注册新账户，但首先我们需要拥有新账户的公钥。通过使用`suggest_brain_key`命令来完成：

```
unlocked >>> suggest_brain_key
```

然后调用register\_account / register\_account2接口创建新帐户

```
unlocked >>> register_account alpha GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ nathan nathan 10
```
至此，帐户alpha创建成功。你可以调用transfer3接口向alpha转帐
```
unlocked >>>  transfer3 nathan alpha 100 GXC "" GXC true
```

查看帐户alpha的余额

```
unlocked >>> list_account_balances alpha
```
