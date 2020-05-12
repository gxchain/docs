# ¿Cómo enviar una transacción?

## Etapa 1: Construya

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

Cuando miramos la estructura de la transacción encima, podemos ver que la transacción entera es dividido en tres partes: **encabezado de bloque**、**operaciones**y**firmas**。

El encabezado de bloque contiene 3 campos:

- ref_block_num = head_block_num & 0xFFFF (head_block_num mod 65535)
- ref_block_prefix = hex2Num(head_block_id.substring(12,14)+head_block_id.substring(10,12)+head_block_id.substring(8,10))

Se puede obtener `head_block_num`y`ref_block_prefix`usando`get_dynamic_global_properties`

``` bash
curl -XPOST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_dynamic_global_properties", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

Fuentes:
- [gxclient-node](https://github.com/gxchain/gxclient-node/blob/master/lib/src/TransactionBuilder.js#L56)
- [gxclient-ios](https://github.com/gxchain/gxclient-ios/blob/master/gxclient-ios/lib/chain/GXTransactionBuilder.m#L87)

La transacción encima no es firmada. Una transacción así no se puede emitir en la cadena de bloques antes de que hagamos**Serialización **y**Firma**

## Etapa 2: Serializar una transacción

Hay un total de 76 estructuras de transacción diferentes en GXChain，La serialización de la transacción use un protocolo a medida Búfer de Protocolo para implementar serialización (toByteBuffer) y deserialización (fromByteBuffer) de los siguientes Tipos Básicos:

| tipo | descripción |
| --- | --- |
| uint8 | entero de 1 byte sin signo |
| uint16 | entero de 2 bytes sin signo |
| uint32 | entero de 4 bytes sin signo |
| uint64 | entero de 8 bytes sin signo |
| bool | booleano |
| string | cadena de caracteres |
| bytes | matriz de bytes |
| array | tipo de matriz para tipos a medida |
| protocol_id_type | tipo de identificación de un objeto de protocolo en gxchain (p. ej. 1.3.1 y 1.2.1) |
| vote_id | identificación del tipo del voto|
| map | identificación del tipo del voto |
| set | tipo compuesto (la diferencia entre set y array es que solamente tipos de número y cadena de caracteres son compatibles en un set) |
| public_key | tipo de cadena de caracteres de clave pública |
| time_point_second | marca de hora(p. ej. “2019-01-18T03:35:54”) |
| name_type | cadena de caracteres cifrada con base32 |
| optional | usado para describir campos opcionales y nulos |
| future_extensions | características de extensión (usualmente una matriz vacía) |

Miremos el serializador de la operación para transmisión, que se define así:

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

La instancia Serializer provee modos fromBuffer y toBuffer, los cuales pueden serializar y deserializar un JSON según la estructura definida. Se puede encajar los serializadores dentro de uno al altro. Por ejemplo, el campo memo en el cuerpo del mensaje de transacción se define así:

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

La instancia Serializer provee modos fromBuffer y toBuffer, los cuales pueden serializar y deserializar un JSON según la estructura definida. Se puede encajar los serializadores dentro de uno al altro. Por ejemplo, el campo memo en el cuerpo del mensaje de transacción se define así:
- [fromByteBuffer(bytes)](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/serializer.js#L17)
- [appendByteBuffer(bytes, object)](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/serializer.js#L59)

El proceso de serialización es complicado por el proceso de encapsulación de la transacción. No se preocupe, hemos preparado lib para Ud. [tx_serializer](https://unpkg.com/gxbjs@1.3.19/build/tx_serializer.js)

`tx_serializer.js`provee 2 modos:

1. Serialización de parámetros de los contratos inteligentes

```js
var serializeCallData = function serializeCallData(action, params, abi)
```
2. Serialización de transacción

```js
var serializeTransaction = function serializeTransaction(transaction)
```

Entonces el problema vuelve a como llamar tx_serializer.js en el programa para serializar el cuerpo de la transacción. Puede mirar la implementación de gxclient-ios:

Primero, construimos un entorno de ejecución de JS (jsContext), load tx_serializer.js

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

Primero, construimos un entorno de ejecución de JS (jsContext), load tx_serializer.js

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

Ya que hemos comprimido una transacción formateado por json en una matriz de bytes, la etapa siguiente es firmar la matriz de bytes con su clave privada.

## Etapa 3: Firme una transacción

```js
let tx_buffer = serializer.serializeTransaction(tx);
let privateKey = ecc.PrivateKey.fromWif(private_key);
let signature = ecc.Signature.signBuffer(tx_buffer, privateKey).toHex();
tx.signatures=[signature];
```

Tenemos la transacción firmada

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

## Etapa 4: Emita una transacción

Cuando llamamos broadcast_transaction_synchronous, podemos empujar la transacción al punto de entrada y emitirlo al red de GXChain.

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [2,"broadcast_transaction_synchronous",[tx]],
    "id": 1
}' https://node23.gxb.io/rpc
```




## Fuente de Código

[bepalcore-java](https://github.com/Bepal/bepalcore-java/blob/master/src/test/java/pro/bepal/test/GXCTest.java#L71)
[bepalcore-oc](https://github.com/Bepal/bepalcore-oc/blob/master/BepalCoreTests/GXCTest.m#L50)








