## Hello World合约简介

在阅读本篇教程之前，假定您已经阅读完了[智能合约入门](./tutorial.html)

### 1. 功能简介与部署调用

####  1.0 合约功能

[Hello World合约](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld)是一个最精简的公信宝合约，通过分析该合约，我们可以掌握智能合约开发的基本框架。该合约实现了一个`hi action`，action是合约给外部调用提供的接口，功能为打印两次`hi user(user为调用action的参数)`字符串到控制台，输出结果如下

![](./png/console_print.jpg)

####  1.1 编译合约
智能合约编写完成后包括xxx.hpp文件和xxx.cpp文件，需要编译为xxx.wast文件和xxx.abi文件，才能部署到区块链上。您可以使用公信宝提供的gxx工具，编译wast和abi文件，该工具可以在目录`~/gxb-core/build/tools/gxx`找到。您可以切换到gxx所在目录，然后使用如下命令进行编译：

```
//编译wast文件，路径需要替换成你自己的
./gxx -o /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.wast /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.cpp

//编译abi文件，路径需要替换成自己的
./gxx -g /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.abi /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.hpp
```
####  1.2 部署合约

您可以使用如下命令部署Hello World合约，hello为合约用户名（执行部署合约命令则会创建一个合约账户，合约账户的资产只能通过合约来控制），nathan为支付手续费的账户，0 0 表示虚拟机类型和版本，/Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld 为合约路径（**包括wast文件和abi文件**），GXS表示手续费类型，true表示是否广播。

```
// 部署合约
deploy_contract hello nathan 0 0 /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld GXS true
```

::: warning 注意
* 部署合约时，支付手续费的账户必须已经导入过私钥（上面命令支付账户为`nathan`），且账户余额足够支付手续费
:::

####  1.3 调用合约

您可以使用如下命令调用合约接口，公信宝的调用合约接口可以附加资产发送选项。附加资产的调用方式，会将资产发送到合约账户。合约账户的资产，只能通过合约自身代码使用提现API`withdraw_asset`来控制。
```
// 不附带资产
call_contract nathan hello null hi "{\"user\":\"gxchain!!!\"}" GXS true

// 附带资产(附带资产的action，需要在合约中添加 // @abi payable )
call_contract nathan hello {"amount":10000000,"asset_id":1.3.1} hi "{\"user\":\"gxchain!!!\"}" GXS true

```

::: warning 带转移资产的action定义
```
// @abi action
// @abi payable
void hi(std::string user)
{
	    {
        for (int i = 0; i < 2; ++i) {
            print("hi, ", user, "\n");
        }
    }
}
```
:::

### 2. 代码解析

Hello World智能合约只包含一个action，是一个最简单的智能合约。我们可以以此为例，分析智能合约的基本框架。

合约的开发包括**定义一个合约类，并提供一个apply接口**，apply接口可以使用系统提供的`GRAPHENE_ABI`来定义。

![](./png/hello_code.jpg)

以上，一个基础智能合约就完成了。其中头文件所在目录为`/Users/zhaoxiangfei/code/gxb-core/contracts/graphenelib`(更改为你的对应目录)，合约开发过程中，引入相关头文件之后，便可以使用合约的内置类型和内置api函数了。下一篇教程分析一个较为复杂的智能合约-红包合约。

## 下一步
[红包合约简介](./tutorial_redpack.html)






















