# API Reference

GXChain nodes support WebSocket and JSONRPC

## Block API

### `get_block`

Obtain block info via block number

``` bash
curl POST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_block_header`

Obtain block header info via block number

``` bash
curl POST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block_header", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

## Object API

GXChain stores different types of data via different objects, following are several types:

| ID | Object Type |
| :--- | :--- |
| 1.2.x | Account |
| 1.3.x | Asset |
| 1.5.x | Committee |
| 1.6.x | Witness |
| 1.10.x | Proposal |
| 1.11.x | Operation History |
| 1.13.x | Vesting Balance |
| 1.14.x | Worker |
| 1.25.x | Loyalty program |
| 2.0.0 | System parameters |
| 2.1.x | Dynamic parameters |
| 2.3.x | Asset parameters |
| 2.5.x | Balance |
| 2.6.x | Account Statistics |
| 2.7.x | Transaction |
| 2.8.x | Block Summary |
| 2.9.x | Account Trasaction History |
| 2.12.x | Witness schedule |

### `get_objects`

Obtain object info via ID

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_objects", [["1.25.100","1.2.200"]]], "id": 1
}' https://node1.gxb.io/rpc
```

## Object API

### `get_account_by_name`

Obtain account info via `account_name`, **exclude** association object

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_by_name", ["nathan"]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_full_accounts`

Obtain full account info via `account_ids`, **include** association object

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_full_accounts", [["1.2.1"],false]],
    "id": 1
}' https://node1.gxb.io/rpc
```

## Asset API

### `list_assets`

Query asset via initials

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "list_assets", ["A", 100]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `lookup_asset_symbols`

Obtain details by asset name

``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "lookup_asset_symbols", [["GXS"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```








