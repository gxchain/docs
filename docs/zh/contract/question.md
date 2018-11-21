# 附加选项

## 开发常见错误
在开发过程中，可能会遇到多种多样的错误，所以此篇教程将会长期收录遇到的各种问题（包括合约开发常见的以及C++开发相关的问题）。

### 1. VsCode 头文件错误
错误原因：多是由于源码编译没有成功，导致合约依赖的头文件没有添加到环境变量。

解决办法：可以在vscode软件中手动设置，.vscode目录 --> c_cpp_properties.json文件编辑

```json
"includePath": [
    "${workspaceFolder}/**",
    "/Users/zhaoxiangfei/code/gxb-core/contracts",  //替换为自己的合约头文件路径
    "/Users/zhaoxiangfei/code/gxb-core/externals/magic_get/include" //替换为自己的路径
],
```

### 2. 生成的abi文件缺少项
错误原因：可能是由于没有在给外部调用的action或者table上，没有添加注释，导致gxx工具扫描生成abi文件缺失。（abi文件解析点击[这里](#abi文件解析)）

解决办法：在action和table上添加注释，示例如下：
```cpp
// 调用不带附加资产的action
// @abi action
void hi(std::string user){
	...
}

// 调用带附加资产的action
// @abi action
// @abi payable
void issue(std::string pubkey, uint64_t number){
	...
}

// 多索引table
//@abi table packet i64
struct packet {
    ...
};

```

### 3. 操作多索引表时失败（增、改）
错误原因：可能传递的lambda表达式的参数不是对象的引用，导致修改的只是一份对象的拷贝。

解决办法：将lambda表达式的参数修改为对象的引用。

```cpp
offers.emplace(0, [&](auto &o) {
    o.id = offers.available_primary_key();;
    ...
});
```
### 4. 调用合约中的某个action出错
错误原因：除了检查action本身逻辑原因之外，仍然需要检查abi文件中的错误以及GRAPHENE_ABI的错误

解决办法：查看abi中是否存在该action和GRAPHENE_ABI宏是否包含该action

```cpp
// 如果不包含某个action，合约依然可以部署成功，只是在调用时，合约会无法处理调用的action
GRAPHENE_ABI(hello,(hi))
```

### 5. 使用gxx工具编译，“未发现头文件”
错误原因：同问题1，由于源码编译没有成功或者执行`sudo make install`没有成功，导致头文件没有拷贝到系统相关目录。

解决办法：正确编译代码，源码编译教程点击[这里](https://github.com/gxchain/gxb-core)，如果编译源码出现问题，请在源码github页面提交issues。


## ABI文件解析

abi文件是调用智能合约action的外部接口，定义了action的参数和table的字段，（注：没有abi文件也可以调用合约中的action，只是需要修改一下钱包客户端）。我们正常调用action时，经常会因为abi文件某些项的缺失，导致action调用失败。所以本节教程解析abi文件，当您开发合约过程中，遇到abi文件错误时，也可以定位到出问题的原因。

abi文件主要包含四个重要字段：types、structs、actions、tables。
![](./png/abi.jpg)

### types

types字段定义了合约开发过程中，类型的自定义别名，示例：
```cpp
// 合约中有如下定义
typedef std::string mystring;
// @abi action
void appyourcom(mystring comname,std::string compub);
...

// 生成的abi中定义如下
"types": [{
	"new_type_name": "mystring",
	"type": "string"
	}
],
```

### structs

structs字段定义了table名称、包含的字段类型以及action名称、包含的参数类型

```json
// 以红包合约abi文件为例，structs包含了table的定义和字段、action的定义和字段等详细定义
"structs": [{
	.......
	{
	  "name": "record",
	  "base": "",
	  "fields": [{
	      "name": "packet_issuer",
	      "type": "uint64"
	    },{
	      "name": "accounts",
	      "type": "account[]"
	    }
	  ]
	},{
	  "name": "issue",
	  "base": "",
	  "fields": [{
	      "name": "pubkey",
	      "type": "string"
	    },{
	      "name": "number",
	      "type": "uint64"
	    }
	  ]
	}
	......
}
```

### actions

actions字段包括定义的对外接口的name、type（同name）、payable（bool类型，调用action是否附加资产）

```json
"actions": [{
	"name": "issue",
	"type": "issue",
	"payable": true
},
.....
{
	"name": "close",
	"type": "close",
	"payable": false
}
],
```

### tables

table字段包括定义的多索引表，name（表名，与合约中定义的table名称一致）、index_type（主键索引类型，为i64）、key_names（主键成员名称）、key_types（主键成员类型）、type（同表名）

```json
"tables": [{
	"name": "packet",
	"index_type": "i64",
	"key_names": [
		"issuer"
	],
	"key_types": [
		"uint64"
	],
	"type": "packet"
	}
	.....
],
```


## 部署测试网节点

参考[测试网络](../guide/testnet.html)

## 合约中的随机数

在区块链上，无法生成可验证的随机数。需要选取固定的种子来生成随机数，一般通过sha256等哈希算法生成随机序列。所以随机数的安全与否，与种子的选取至关重要。如果选用链上可获取的变量作为随机数，例如区块id、区块数量、资产余额等，合约的随机算法一旦泄露出去，那么完全可以先于区块链得到随机数，并因此能够预测随机数相关的业务结果。所以，随机数算法应该尽可能复杂，或者探索获取链外数据作为随机数种子的可能。
下面是通过链外数据生成随机数的例子
- 1. 对手双方（Alice与Bob）每一方创建一个随机数，并计算其hash值。
```bash
Alice:随机创建一个字符串，例如:"I am Alice"，并生成sha256哈希值
zhaoxiangfei@zhaoxiangfeideMacBook-Pro:~$ echo "I am Alice" | shasum -a 256
da161d9ee3c116083030737d5a4d478ee1a7654f8ea51e0513020937a9206b0f

Bob:随机创建一个字符串，例如:"I am Bob"，并生成sha256哈希值
zhaoxiangfei@zhaoxiangfeideMacBook-Pro:~$ echo "I am Bob" | shasum -a 256
77f3bfe06cc926329510b60eba56f80a8d32cf35496587d1444fc690c806c0f9
```
- 2. 对手方各自生成了自己的随机数与哈希值，第一次交互双方均将哈希值提交到链上
```
将哈希值提交到链上之后，哈希值对应的随机字符串也是固定的，但是对方并不能根据哈希值逆推出自己的随机字符串
```

- 3. 对手双方提交自己的随机字符串，合约根据提交的字符串与上一次提交的哈希值做校验。然后使用两个哈希值、两个随机字符串进行拼接后生成哈希序列作为随机数。
```bash 
sha256("da161d9ee3c116083030737d5a4d478ee1a7654f8ea51e0513020937a9206b0f"+"77f3bfe06cc926329510b60eba56f80a8d32cf35496587d1444fc690c806c0f9"+"I am Alice"+"I am Bob")
```

- 4. 通过两次交互来生成一个随机序列。当第一次交互（提交双方哈希值时，第二次交互要提交的内容就确定了，但是最终的随机序列尚未确定）。这样防止了对手方作弊的可能性。

## 合约与分布式存储的结合

智能合约为复杂业务逻辑的去中心化带来了可能性，并可以在链上存储相关业务数据，开发去中心化的DAPP。链上存储使用的是RAM资源，适合存储高频读写的数据，链上RAM存储代价高昂，部分大文件没必要存储在链上ram中，可以使用GXChian提供的分布式存储服务，将大文件存储托管在[BaaS存储上](../baas-api/)
