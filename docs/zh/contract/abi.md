
# ABI文件解析

abi文件是调用智能合约action的外部接口，定义了action的参数和table的字段，（注：没有abi文件也可以调用合约中的action，只是需要修改一下钱包客户端）。我们正常调用action时，经常会因为abi文件某些项的缺失，导致action调用失败。所以本节教程解析abi文件，当您开发合约过程中，遇到abi文件错误时，也可以定位到出问题的原因。

abi文件主要包含四个重要字段：types、structs、actions、tables。
![](./png/abi.jpg)

## types

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

## structs

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

## actions

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

## tables

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