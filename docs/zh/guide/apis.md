# API Reference

GXChain的节点提供WebSocket和JSONRPC两种接口形式

## 区块相关

### `get_block`

根据区块号获取区块信息

### `get_block_header`

根据区块号获取区块头信息

## 对象相关

在GXChain里面，通过不同的对象来存储不同类型的数据，常见的有以下几种类型

| ID | Object Type |
| :--- | :--- |
| 1.2.x | 帐户对象 |
| 1.3.x | 资产对象 |
| 1.5.x | 理事会成员对象 |
| 1.6.x | 见证人对象 |
| 1.10.x | 提案对象 |
| 1.11.x | 操作历史对象 |
| 1.13.x | 待解冻余额对象 |
| 1.14.x | 预算项目对象 |
| 1.25.x | 忠诚计划冻结余额对象 |
| 2.0.0 | 系统全局参数对象 |
| 2.1.x | 动态参数对象 |
| 2.3.x | 资产动态参数对象 |
| 2.5.x | 帐户余额对象 |
| 2.6.x | 帐户统计对象 |
| 2.7.x | 交易对象 |
| 2.8.x | 区块摘要对象 |
| 2.9.x | 帐户交易历史对象 |
| 2.12.x | 见证人调度表对象 |

### `get_objects`

根据对象ID获取对象信息

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_objects", [["1.25.100","1.2.200"]]], "id": 1
}' https://node1.gxb.io/rpc
```

## 账户相关

### `get_account_by_name`

根据`account_name`获取`account`信息，**不包含**关联对象的信息，如账户资产余额，冻结余额等

### `get_full_account`

根据`account_id`获取完整账户信息，**包含**关联对象的信息，如账户资产余额，冻结余额等

## 资产相关

### `list_assets`

根据首字母查询资产

### `lookup_asset_symbols`

根据资产名称获取资产详情












