# 智能合约手续费介绍

GXChain中，部署合约、更新合约、调用合约会产生不同数额的手续费。本篇文档对智能合约相关的手续费进行说明。

## 部署合约手续费

部署合约手续费由调用者支付，支付的手续费计算方式如下:

```cpp
// base_fee为0.01GXC，contract_size为合约大小，price_per_kbyte为1kb ram的费用，当前为0.2GXC
fee = base_fee + contract_size / 1024 * price_per_kbyte
```

## 更新合约手续费

更新合约手续费由调用者支付，支付的手续费计算方式如下:

```cpp
// base_fee为0.01GXC，contract_size为合约大小，price_per_kbyte为1kb ram的费用，当前为0.2GXC
fee = base_fee + new_contract_size / 1024 * price_per_kbyte
```

## 调用合约手续费

调用合约是免费的，但是在调用时会产生手续费，手续费共包含三部分，ram_fee、cpu_fee和fee，之后会进行返还。

- **ram_fee**

在合约的table中创建或修改对象时产生，ram_fee可以指定关联账户来支付。ram_fee的计算方式：

```cpp
// ram_bytes为占用的内存字节数，price_per_kbyte_ram为1kb ram的费用，当前为0.2GXC
ram_fee = ram_bytes / 1024 * price_per_kbyte_ram 
```

| ram_fee payer | 说明 |
| --- | --- | 
| 0 | 合约账户自身（同\_slef） |
| \_self | 合约账户自身（同0） |
| sender | 合约调用账户 |
| original | 合约原始调用账户，跨合约调用中，为起始调用账户 |

ram_fee的返还：删除table中的对象后，会立即将创建时消耗的手续费返还给该内存所属payer。

- **cpu_fee**

cpu_fee当前单价为0

- **fee**

调用合约除了使用cpu_fee和ram_fee之外，基础手续费为0.01GXC。所以调用智能合约手续费计算方式为:

```cpp
// base_fee为0.001GXC，ram_fee根据payer和所占内存来计算，cpu_fee为0
fee = base_fee + ram_fee + cpu_fee
```

base_fee的返还：调用合约产生的基本手续费，会返还到用户的待解冻余额，需要用户手工领取