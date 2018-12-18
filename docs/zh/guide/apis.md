# API Reference

GXChain的节点提供WebSocket和JSONRPC两种接口形式

## 链相关

### `get_chain_id`
获取链id

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_chain_id", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_dynamic_global_properties`
获取动态全局对象


``` bash
curl POST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_dynamic_global_properties", []],
    "id": 1
}' https://node1.gxb.io/rpc
```


## 区块相关

### `get_block`

通过区块号获取区块信息

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_block_header`

根据区块号获取区块头信息

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block_header", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

## 对象相关

在GXChain里面，通过不同的对象来存储不同类型的数据，点此查看[Gxchain上的对象类型](./#_2-gxchain上的对象)

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


### `get_account_count`

获取链上帐户总数量

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_count", []],
    "id": 1
}' https://node1.gxb.io/rpc
```


### `get_account_by_name`

根据`account_name`获取`account`信息，**不包含**关联对象的信息，如账户资产余额、待解冻余额、忠诚计划冻结余额等

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_by_name", ["nathan"]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_full_accounts`

根据`account_ids`获取完整账户信息，**包含**关联对象的信息，如账户资产余额，冻结余额等

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_full_accounts", [["1.2.1"],false]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `is_account_registered`
查询帐户名是否已注册。 若已注册，则返回true，未注册或者帐户名不合法，返回false

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "is_account_registered", ["nathan"]],
    "id": 1
}' https://node1.gxb.io/rpc
```


### `get_key_references`
根据公钥，查询关联的帐户，返回关联的帐户id

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_key_references", [["GXC7mmfnZWUYtz2tjNGqduZRe2w5x79GCjuoMiVkmEGRE94Vq7gAo"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```

## 资产相关

### `list_assets`

根据首字母查询资产

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "list_assets", ["A", 100]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `lookup_asset_symbols`

根据资产名称获取资产详情

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "lookup_asset_symbols", [["GXS"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_account_balances`
根据帐户id和资产id获取帐户余额， 如果资产id不指定，返回全部资产余额

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_balances", ["1.2.42", ["1.3.0", "1.3.1"]]],
    "id": 1
}' https://node1.gxb.io/rpc

```

### `get_named_account_balances`

根据帐户名和资产id获取帐户余额， 如果资产id不指定，返回全部资产余额

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_named_account_balances", ["gxbfoundation", ["1.3.0", "1.3.1"]]],
    "id": 1
}' https://node1.gxb.io/rpc

```

### `get_vesting_balances`

根据帐户id获取帐户所有的待解冻余额

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_vesting_balances", ["1.2.748971"]],
    "id": 1
}' https://node1.gxb.io/rpc

```
## 公信节点相关

### `get_trust_nodes`

获取所有的公信节点所属帐户id

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_trust_nodes", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_witness_by_account`

根据`account_id`获取`公信节点`信息，包括节点公钥、总票数、缺块数等

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_witness_by_account", ["1.2.748971"]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `lookup_vote_ids`

根据vote_id返回所属公信节点的信息

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "lookup_vote_ids", [["1:22", "0:72"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```


## 智能合约存储表相关

### `get_table_rows`
根据contract和table，查询合约的表内容。查询时指定合约名、表名、start和limit （修改合约名、表名为你自己的）

```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_table_rows", ["contract_name", "table_name", 0, 10]],
    "id": 1
}' https://node1.gxb.io/rpc
```




