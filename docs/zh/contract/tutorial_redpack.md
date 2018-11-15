## 红包合约简介

在阅读本篇教程之前，假定您已经阅读完了[智能合约入门](./tutorial.html)

### 1. 功能简介与部署调用

####  1.0 合约功能

[红包合约](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket)是一个相对复杂的合约，通过对红包合约的分析，我们来说明多索引表、内置API调用等功能的使用方式。

红包合约包括三个action：创建红包（issue）、打开红包（open）、关闭红包（close)。
> 注：调用创建红包（issue）接口可以附带资产；如果红包未抢完，发行者可以关闭红包，余额退还。
> 发红包需要设置一个口令（公钥），抢红包时，需要使用口令对应的私钥对自己用户id进行签名才可以抢成功。

- **调用发红包接口，调用过程与结果反馈如下**
```
# 发红包 pubkey为随机生成的口令 ：下面调用表示发5个红包，总金额为11 GXS（1.3.1表示GXS资产）
unlocked >>> call_contract nathan redpacket {"amount":1100000,"asset_id":1.3.1} issue "{\"pubkey\":\"GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b\",\"number\":5}" GXS true
{
  "ref_block_num": 15124,
  ...
  ...
  ...
  "signatures": [
    "1f7fade01ef08d986282164c1428fee37ecc5817c4e6bdc7c160220cf965b881d7417874ab22be48047becf62936e6a060a3e06c65e3548e90a72ddc1720794db3"
  ]
}
# 查看合约账户资产，当前合约只有一个用户发红包，所以金额为一个用户发送的资产11 GXS
unlocked >>> list_account_balances redpacket
11 GXS

# 查看红包table信息，subpackets是随机分成的5个子红包序列，pub_key用来验证签名
unlocked >>> get_table_objects redpacket packet 0 -1 10
[{
    "issuer": 17,
    "pub_key": "GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b",
    "total_amount": {
      "amount": 1100000,
      "asset_id": 1
    },
    "number": 5,
    "subpackets": [
      350531,
      150227,
      390591,
      66767,
      141884
    ]
  }
]

```

抢红包，需要知道发红包口令对应的私钥。即发红包时创建的口令为：GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b，那么需要知道该口令对应的私钥（此口令的私钥为5J9vj4XiwVQ2HNr22uFrxgaaerqrPN7xZQER9z2hwSPeWdbMKBM）。然后使用私钥对用户instanceid进行签名（签名方式使用cli_wallet提供了sign_string方法，instanceid为为账号id的最后一个字段，例如nathan的账号id是1.2.17，那么他的instanceid是17）

- **调用抢红包接口，调用过程与结果反馈如下**
```
#使用私钥对instanceid进行签名
unlocked >>> get_account_id nathan
"1.2.17"
unlocked >>> sign_string 5J9vj4XiwVQ2HNr22uFrxgaaerqrPN7xZQER9z2hwSPeWdbMKBM 17
"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2"

#调用接口 抢红包
call_contract nathan redpacket null open "{\"issuer\":\"nathan\",\"sig\":\"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2\"}" GXS true
#合约账户所剩余额
list_account_balances redpacket
unlocked >>> list_account_balances redpacket
7.09409 GXS
#合约账户剩余红包分配序列，由5个减少为4个，减少的项为390591，代表3.90591个GXS 被抢走
unlocked >>> get_table_objects redpacket packet 0 -1 10
[{
    "issuer": 17,
    "pub_key": "GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b",
    "total_amount": {
      "amount": 1100000,
      "asset_id": 1
    },
    "number": 5,
    "subpackets": [
      350531,
      150227,
      66767,
      141884
    ]
  }
]
# 抢红包记录
unlocked >>> get_table_objects redpacket record 0 -1 10
[{
    "packet_issuer": 17,
    "accounts": [{
        "account_id": 17,
        "amount": 390591
      }
    ]
  }
]

```
::: warning 提示
get_table_objects的参数分别为：

redpacket（合约名）、record（表名）、0（lower）、-1（upper）、10（limit）
:::

- **调用关闭红包接口，该接口只能由发红包的用户调用，会将未抢完的红包返回给用户，调用过程与结果反馈如下**

```
# 您可以使用如下命令关闭红包
unlocked >>> call_contract nathan redpacket null close "{}" GXS true

# 获取合约账户资产余额
unlocked >>> list_account_balances redpacket
0 GXS
```

####  1.1 编译合约

您可以使用如下命令编译智能合约的abi文件和wast文件

```
# 其中的redpacket.cpp所在路径需要替换为你自己的路径
./gxx -g /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.abi /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.cpp

# 其中的redpacket.cpp所在路径需要替换为你自己的路径
./gxx -o /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.wast /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.cpp
```

#### 1.2  部署合约

您可以使用如下命令部署Redpacket红包合约

```
# 需要将智能合约所在路径替换为你自己的路径
deploy_contract redpacket nathan 0 0 /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket GXS true
```

#### 1.3 调用合约

```
# 发红包 
unlocked >>> call_contract nathan redpacket {"amount":1100000,"asset_id":1.3.1} issue "{\"pubkey\":\"GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b\",\"number\":5}" GXS true

# 抢红包
call_contract nathan redpacket null open "{\"issuer\":\"nathan\",\"sig\":\"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2\"}" GXS true

# 您可以使用如下命令关闭红包
unlocked >>> call_contract nathan redpacket null close "{}" GXS true
```

### 2. 代码解析

红包合约代码包含了内置API的调用，多索引表的使用。通过分析红包合约，我们来简略说明如何使用它们，合约框架可以参考上篇教程[Hello World合约简介](./tutorial_hello.html)。
- 注释 // @abi payable表示该action可以附带资产，用来生成正确的abi文件
```
// @abi action
// @abi payable
void issue(std::string pubkey, uint64_t number){
	...
}
```

- 使用断言graphene_assert，失败时回滚action
```
graphene_assert(pubkey.size() > prefix_len, "invalid public key");
graphene_assert(pubkey.substr(0, prefix_len) == prefix, "invalid public key");
```

- 调用[内置API](./apis.html)
```
//引入相关头文件，内置API文档，请点击“内置API”
int64_t total_amount = get_action_asset_amount();
```

- 多索引表简单介绍

```
//每一个多索引表称为一个table，在合约开发中，定义为一个类。
//注释部分是用来生成abi文件的，详细内容请查看abi文件详解部分
//@abi table packet i64
struct packet {
    uint64_t                issuer;
    std::string             pub_key;
    contract_asset          total_amount;
    uint32_t                number;
    vector<int64_t>         subpackets;							// 可以定义复杂类型

    uint64_t primary_key() const { return issuer; }				// 定义一个主键函数，返回的值作为主键索引是唯一的。

    GRAPHENE_SERIALIZE(packet, (issuer)(pub_key)(total_amount)(number)(subpackets))
};

//定义多索引表类型
typedef graphene::multi_index<N(packet), packet> packet_index;
//声明多索引表类型的一个实例
packet_index            packets;

//增加
packets.emplace(owner, [&](auto &o) {
    o.issuer = owner;
    ...
});
//修改
packets.modify(packet_iter, sender, [&](auto &o) {
            o.subpackets.erase(subpacket_it);
});
//删除
packets.erase(packet_iter);
``` 

## 下一步
[内置类型](./basic_types.html)