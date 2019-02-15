# 如何发起链上交易

## Step1: 构造交易

``` json
{
  "ref_block_num": 54701, // an exist block num
  "ref_block_prefix": 2861949695, // The exist block id
  "expiration": "2019-01-18T03:35:54", // transaction expiration date, max expiration = current + 24hours
  "operations": [
   [
      0, // operation id
      { // operation
        "fee": {
          "amount": 1179,
          "asset_id": "1.3.1"
        },
        "from": "1.2.937396",
        "to": "1.2.19645",
        "amount": {
          "amount": 173600000,
          "asset_id": "1.3.1"
        },
        "memo": { // memo
          "from": "GXC6cUP6LvdpcfC9G4TMre4yxB3PxttUjVK1ybybgt63ZtEKCXamC", // memo_key of from account
          "to": "GXC7o71VExYFoFJKtduFXEF15jgPdbmC1tdyT8BPCpnzCTeFiXEog", // memo_key of to account
          "nonce": 1, // nonce of encryption key
          "message": "15e06e19346d8f9c2d5355abcf5fffaa" // ECIES encrypted message
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": []
}
```

从上面的交易结构中我们看到，整个交易主要分为三部分: **区块头信息**、**操作数组**和**签名**。

区块头信息包含3个字段:

- ref_block_num = head_block_num & 0xFFFF (head_block_num mod 65535)
- ref_block_prefix = hex2Num(head_block_id.substring(12,14)+head_block_id.substring(10,12)+head_block_id.substring(8,10))

其中`head_block_num`和`ref_block_prefix`可以通过`get_dynamic_global_properties`来获得

``` bash
curl -XPOST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_dynamic_global_properties", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

参考代码:
- [gxclient-node](https://github.com/gxchain/gxclient-node/blob/master/lib/src/TransactionBuilder.js#L56)
- [gxclient-ios](https://github.com/gxchain/gxclient-ios/blob/master/gxclient-ios/lib/chain/GXTransactionBuilder.m#L87)

上面的交易是未完成签名的，这样的交易无法在区块链上进行广播，接下来我们需要对交易进行**序列化**和**签名**

## Step2: 交易序列化

GXChain链上一共76种不同的交易消息体结构，交易序列化采用一种自定义的Protocol Buffer协议，实现了以下**基础类型**序列化(toByteBuffer)和反序列化(fromByteBuffer):

| 类型 | 描述 |
| --- | --- |
| uint8 | 单字节无符号整型 |
| uint16 | 2字节无符号整型 |
| uint32 | 4字节无符号整型 |
| uint64 | 8字节无符号整型 |
| int64 | 8字节整型 |
| bool | 布尔类型 |
| string | 字符串 |
| bytes | 字节数组 |
| array | 数组类型(仅支持自定义类型) |
| protocol_id_type | 协议id类型(如1.3.1, 1.2.1) |
| vote_id | 投票id类型(如0:11, 1:13)|
| map | key-value类型 |
| set | 集合类型(和array的区别是仅支持整形和字符串类型) |
| public_key | 公钥类型 |
| time_point_second | 时间戳类型 |
| name_type | base32类型 |
| optional | 可空类型 |
| future_extensions | 扩展类型 |

我们来看一下常见的转账操作，是这样定义的:

``` js
export const transfer = new Serializer (
    "transfer",
    {
        fee: asset,
        from: protocol_id_type ("account"),
        to: protocol_id_type ("account"),
        amount: asset,
        memo: optional (memo_data),
        extensions: set (future_extensions)
    }
);
```

`Serializer`实例提供fromBuffer和toBuffer方法，可以将一个JSON根据所定义的结构进行序列化和反序列化。Serializer可以相互嵌套，序列化过程中，在碰到**非基础类型**时，会进行递归序列化, 如转账消息体中的`memo`字段是这样定义的:

```js
export const memo_data = new Serializer (
    "memo_data",
    {
        from: public_key,
        to: public_key,
        nonce: uint64,
        message: bytes ()
    }
);
```

序列化和反序列化的细节，可以参考以下源码:
- [fromByteBuffer(bytes)](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/serializer.js#L17)
- [appendByteBuffer(bytes, object)](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/serializer.js#L59)

假如你是一个开发者，在交易封装的过程中，序列化的过程是比较头疼的，不用担心，我们已经为你准备好了现成的[tx_serializer](https://unpkg.com/gxbjs@1.3.19/build/tx_serializer.js)

`tx_serializer.js`提供了两个方法

1. 智能合约参数序列化

```js
var serializeCallData = function serializeCallData(action, params, abi)
```
2. 交易序列化

```js
var serializeTransaction = function serializeTransaction(transaction)
```

所以问题回归到如何在程序中调用`tx_serializer.js`对交易消息体进行序列化，可以参考gxclient-ios的实现：

首先我们构造了一个JS执行环境(jsContext)，加载`tx_serializer.js`

``` Objective-C
+(JSContext*)jsContext{
    static dispatch_once_t onceToken;
    static JSContext* instance;
    dispatch_once(&onceToken, ^{
        NSBundle* bundle = [NSBundle bundleForClass:[GXUtil class]];
        NSString * path = [bundle pathForResource:@"gxclient.bundle/tx_serializer.min" ofType:@"js"];
        NSData * jsData = [[NSData alloc]initWithContentsOfFile:path];
        NSString * jsCode = [[NSString alloc]initWithData:jsData encoding:NSUTF8StringEncoding];
        instance=[[JSContext alloc] init];
        [instance evaluateScript:jsCode];
    });

    return instance;
}
```

然后我们就可以调用jsContext的两个方法对合约调用参数和交易进行序列化了

``` Objective-C
+(NSString*) serialize_action_data:(NSString*)action params:(NSDictionary*)params abi:(NSDictionary*)abi{
    NSString* jsCode = [NSString stringWithFormat:@"serializer.serializeCallData('%@',%@,%@).toString('hex')",action, [params json],[abi json]];
    NSString* result = [[[GXUtil jsContext] evaluateScript:jsCode] toString];
    return result;
}

+(NSString*) serialize_transaction:(NSDictionary*)transaction{
    NSString* jsCode = [NSString stringWithFormat:@"serializer.serializeTransaction(%@).toString('hex')", [transaction json]];
    NSString* result = [[[GXUtil jsContext] evaluateScript:jsCode] toString];
    return result;
}
```

通过序列化，我们把一个json结构的交易压缩成了一个byte数组，接下来就是对这个byte数组进行签名

## Step3: 交易签名

```js
let tx_buffer = serializer.serializeTransaction(tx);
let privateKey = ecc.PrivateKey.fromWif(private_key);
let signature = ecc.Signature.signBuffer(tx_buffer, privateKey).toHex();
tx.signatures=[signature];
```

于是我们得到了签名好的交易

``` json
{
  "ref_block_num": 54701, // an exist block num
  "ref_block_prefix": 2861949695, // The exist block id
  "expiration": "2019-01-18T03:35:54", // transaction expiration date, max expiration = current + 24hours
  "operations": [
   [
      0, // operation id
      { // operation
        "fee": {
          "amount": 1179,
          "asset_id": "1.3.1"
        },
        "from": "1.2.937396",
        "to": "1.2.19645",
        "amount": {
          "amount": 173600000,
          "asset_id": "1.3.1"
        },
        "memo": {
          "from": "GXC6cUP6LvdpcfC9G4TMre4yxB3PxttUjVK1ybybgt63ZtEKCXamC", // memo_key of from account
          "to": "GXC7o71VExYFoFJKtduFXEF15jgPdbmC1tdyT8BPCpnzCTeFiXEog", // memo_key of to account
          "nonce": 1, // nonce of encryption key
          "message": "15e06e19346d8f9c2d5355abcf5fffaa" // ECIES encrypted message
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1b4a899ab4831ee6c0e7bb3825cfbbf47947d5861671cd8f8e6c61436c7f71b0336622e98b2e29b1fa1f00ca697baa1a797e280c619cc04bab1645db19c87f78aa"
  ]
}
```

## Step4: 广播交易

通过调用`broadcast_transaction_synchronous`，我们就可以把交易推送到接入点上向整个网络广播了

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [2,"broadcast_transaction_synchronous",[tx]],
    "id": 1
}' https://node23.gxb.io/rpc
```












