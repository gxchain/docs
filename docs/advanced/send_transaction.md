# Send Transaction

## Step1: Construct

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
  "signatures": []
}
```

From the above transaction structure, we can see that the whole transaction is mainly divided into three parts: **block Header**, **operations** and **signatures**.

The block header contains 3 fields:

- ref_block_num = head_block_num & 0xFFFF (head_block_num mod 65535)
- ref_block_prefix = hex2Num(head_block_id.substring(12,14)+head_block_id.substring(10,12)+head_block_id.substring(8,10))

`head_block_num` and `ref_block_prefix` can be obtained by `get_dynamic_global_properties

``` bash
curl -XPOST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_dynamic_global_properties", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

Reference:
- [gxclient-node](https://github.com/gxchain/gxclient-node/blob/master/lib/src/TransactionBuilder.js#L56)
- [gxclient-ios](https://github.com/gxchain/gxclient-ios/blob/master/gxclient-ios/lib/chain/GXTransactionBuilder.m#L87)

The above transaction is not signed, such a transaction cannot be broadcast on the blockchain before we do **Serialize** and **Signature**

## Step2: Serialize a transaction

There are a total of 76 different transaction structures on the GXChain. The transaction serialization uses a custom Protocol Buffer protocol to implement serialization (toByteBuffer) and deserialization (fromByteBuffer) of the following **Basic Types**:

| type | description |
| --- | --- |
| uint8 | Single-byte unsigned integer |
| uint16 | 2-byte unsigned integer |
| uint32 | 4-byte unsigned integer |
| uint64 | 8-byte unsigned integer |
| int64 | 8-byte integer |
| bool | Boolean |
| string | String |
| bytes | byte array |
| array | Array type for custom types |
| protocol_id_type | protocol object id type on gxchain(eg. 1.3.1 and 1.2.1) |
| vote_id | vote type id on gxchain (eg. 0:11 and 1:13)|
| map | a map of key-value |
| set | collection type (the difference with array is that only number and string types are supported in a set) |
| public_key | public key string type |
| time_point_second | timestamp(eg. "2019-01-18T03:35:54") |
| name_type | base32 encoded string |
| optional | use to describe optional and nullable field |
| future_extensions | extension features(usually an empty array) |

Let's take a look at the transfer operation serializer, which is defined like this:

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

The `Serializer` instance provides fromBuffer and toBuffer methods, which can serialize and deserialize a JSON according to the defined structure. Serializers can be nested with each other. During the serialization process, recursive serialization is performed when a **non-basic type** is encountered. For example, the `memo` field in the transfer message body is defined as follows:

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

For details on serialization and deserialization, you can refer to the following source code:
- [fromByteBuffer(bytes)](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/serializer.js#L17)
- [appendByteBuffer(bytes, object)](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/serializer.js#L59)

The process of serialization is complicated in the process of transaction encapsulation. Don't worry, we have prepared ready-made lib for you.[tx_serializer](https://unpkg.com/gxbjs@1.3.19/build/tx_serializer.js)

`tx_serializer.js` Provides 2 methods:

1. Smart contract parameter serialization

```js
var serializeCallData = function serializeCallData(action, params, abi)
```
2. Transaction serialization

```js
var serializeTransaction = function serializeTransaction(transaction)
```

So the problem returns to how to call `tx_serializer.js` in the program to serialize the transaction body. You can refer to the implementation of gxclient-ios:


First we construct a JS execution environment (jsContext), load `tx_serializer.js`

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

Then we can call the two methods of jsContext to serialize the contract call parameters and transactions.

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

Since now we have compress a json formatted transaction into a byte array, the next step is to sign the byte array with your private key.

## Step3: Sign a transaction

```js
let tx_buffer = serializer.serializeTransaction(tx);
let privateKey = ecc.PrivateKey.fromWif(private_key);
let signature = ecc.Signature.signBuffer(tx_buffer, privateKey).toHex();
tx.signatures=[signature];
```

So we got the signed transaction

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

## Step4: Broadcast a transaction

By calling `broadcast_transaction_synchronous`, we can push the transaction to the entry point and broadcast it to GXChain network.

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [2,"broadcast_transaction_synchronous",[tx]],
    "id": 1
}' https://node23.gxb.io/rpc
```












