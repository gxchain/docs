# API Reference

GXChain nodes support WebSocket and JSONRPC

## Chain

### `get_chain_id`

Get chain id

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_chain_id", []],    
    "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id":1,
        "jsonrpc":"2.0",
        "result":"4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8" // chain id
}
```


### `get_dynamic_global_properties`

Get dynamic global properties

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0

#### Example
**request:**
```bash
curl -XPOST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_dynamic_global_properties", []],
    "id": 1
}' https://node1.gxb.io/rpc

```

**response:**
```json
{
    "id":1,
    "jsonrpc":"2.0",
    "result":{
        "id":"2.1.0",
        "head_block_number":16757465, // latest block num
        "head_block_id":"00ffb2d9f6e344f2190a8dfba58baaadd49e76c4", // latest block id (block hash)
        "time":"2019-01-28T06:08:00", // head block time
        "current_witness":"1.6.52",
        "next_maintenance_time":"2019-01-28T06:40:00",
        "last_budget_time":"2019-01-28T05:40:00",
        "witness_budget":3065824,
        "accounts_registered_this_interval":2,
        "recently_missed_count":0,
        "current_aslot":16958091,
        "recent_slots_filled":"340282366920938463463374607431768211455",
        "dynamic_flags":0,
        "last_irreversible_block_num":16757449 // last irreversible block num
    }
}
```

## Block

### `get_block`

Obtain block info via block number

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
block_num | block num

#### Example

**request:**
``` bash
curl POST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": {
            "previous": "0000270f5b219bc4c6996f2cca89b23ef653a2b0", // Block id of the previous block(block hash)
            "timestamp": "2017-06-10T22:53:45", // Timestamp of the current block
            "witness": "1.6.23", // Wrap the current block's witness id
            "transaction_merkle_root": "0000000000000000000000000000000000000000", // Merkle root of the transaction in the current block
            "extensions": [],
            "witness_signature": "204e95ba3f871d8f670cc8088d5f563704c9c0c8acd42a80077bd7c6a47ecde095633e6a614c7f73830d972c3b617d5c01e8e0e151bfc489a327103597d3f0c244", // Witness signature
            "transactions": [], // Transaction list
            "block_id": "000027100ef5386d4ea4481dc302401de66fe358", // Block id of the current block
            "signing_key": "GXC7ouC3miJyKrLf1XyeyDv6u5W9Q8BT3WdbJbJYACiFm2Zx8vPna", // Current witness's signing key
            "transaction_ids": [] // The tx id corresponding to the transaction list
        }
}
```

### `get_block_header`

Obtain block header info via block number

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
block_num | block num

#### Example
**request:**
``` bash
curl POST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block_header", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": {
            "previous": "0000270f5b219bc4c6996f2cca89b23ef653a2b0", // Block id (block hash) of the previous block
            "timestamp": "2017-06-10T22:53:45", // Timestamp of the current block
            "witness": "1.6.23", // Wrap the current block's witness id
            "transaction_merkle_root": "0000000000000000000000000000000000000000", // Merkle root of the transaction in the current block
            "extensions": []
        }
}
```

## Object

GXChain stores different types of data via different objects, Click here to view [object types on GXChain](../advanced/block_operation_object.html#_3-object-on-gxchain)

### `get_objects`

Obtain object info via ID

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
object_ids | Array, can pass multiple corresponding ids

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_objects", [["1.25.100","1.2.200"]]], "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": [{ // 1.3.1 object
            "id": "1.3.1",
            "symbol": "GXC",
            "precision": 5,
            "issuer": "1.2.0",
            "options": {
                "max_supply": "10000000000000",
                "market_fee_percent": 0,
                "max_market_fee": 0,
                "issuer_permissions": 69,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 100000,
                        "asset_id": "1.3.1"
                    },
                    "quote": {
                        "amount": 100000,
                        "asset_id": "1.3.1"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "whitelist_markets": [],
                "blacklist_markets": [],
                "description": "{\"main\":\"GXC是公信宝基金会在GXChain（公信链）上发行的Token，不仅具有流通价值，同时在公信链上开发、认证应⽤、使⽤链上服务（例如链上转账的矿⼯费）以及使⽤BaaS服务都需要⽀付或燃烧GXC，GXC是作为链上应⽤运⾏使⽤到的Token。 在布洛克城中也可以很方便地利用GXC进行支付结算，如居民之间互相使用GXC进行结算，使用城市公共服务需要用GXC结算，商家提供的服务也需要用GXC来购买等等\",\"short_name\":\"\",\"market\":\"\"}",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.3.1"
        }, { // 2.3.1 Object
            "id": "2.3.1",
                "current_supply": "9958303550217",
                "confidential_supply": 0,
                "accumulated_fees": 0,
                "fee_pool": 0
        }]
}
```

## Account

### `get_account_count`

Obtain total account count

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_count", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": 1118627 // Total number of accounts on the chain
}
```

### `get_account_by_name`

Obtain account info via `account_name`, **exclude** association object

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
account_name | Account name

**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_by_name", ["nathan"]],
    "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": {
            "id": "1.2.17", // account id
            "membership_expiration_date": "2106-02-07T06:28:15", // Not for 1970-01-01T00:00:00, representing a lifetime membership
            "merchant_expiration_date": "1970-01-01T00:00:00", // Not 1970-01-01T00:00:00, indicating a merchant
            "datasource_expiration_date": "1970-01-01T00:00:00", // Not 1970-01-01T00:00:00, indicating the data source
            "data_transaction_member_expiration_date": "1970-01-01T00:00:00", // Not 1970-01-01T00:00:00, with transaction confirmation permission in DES 1.0
            "registrar": "1.2.17", // Account registrant
            "referrer": "1.2.17", // Account recommender
            "lifetime_referrer": "1.2.17", // Lifetime member recommender
            "merchant_auth_referrer": "1.2.0", // Merchant recommender
            "datasource_auth_referrer": "1.2.0", // Data source recommender
            "network_fee_percentage": 2000, // Fee sharing, network fee ratio
            "lifetime_referrer_fee_percentage": 8000, // Fee sharing, lifetime member referrals
            "referrer_rewards_percentage": 0, // Fee sharing, proportion of referees
            "name": "nathan", // account name
            "vm_type": "", // vm type ,reserved text
            "vm_version": "", // vm version, reserved text
            "code": "", // Code for applicable contract accounts
            "code_version": "", // code hash
            "abi": { // Code corresponding to abi, for applicable contract accounts
                "version": "gxc::abi/1.0",
                "types": [],
                "structs": [],
                "actions": [],
                "tables": [],
                "error_messages": [],
                "abi_extensions": []
            },
            "owner": { // Account owner permission, can be used to modify account permissions
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    ["GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV", 1]
                ],
                "address_auths": []
            },
            "active": { // Active permissions on the account, can be used to spend account funds
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    ["GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV", 1]
                ],
                "address_auths": []
            },
            "options": {
                "memo_key": "GXC6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV", // memo key
                "voting_account": "1.2.5",
                "num_witness": 0,
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.17", // Account statistics object
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "cashback_vb": "1.13.246", // Return object id
            "owner_special_authority": [0, {}],
            "active_special_authority": [0, {}],
            "top_n_control_flags": 0
        }
}
```

### `get_full_accounts`

Obtain full account info via `account_ids`, **include** association object

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
[account_names or account_ids] | Array, you can pass in the account name or account id

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_full_accounts", [["1.2.1"],false]],
    "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id":1,
    "jsonrpc":"2.0",
    "result":[
        [
            "blockcitybp",
            {
                "account":{
                    "id":"1.2.1089881",
                    "membership_expiration_date":"2106-02-07T06:28:15",
                    "merchant_expiration_date":"1970-01-01T00:00:00",
                    "datasource_expiration_date":"1970-01-01T00:00:00",
                    "data_transaction_member_expiration_date":"1970-01-01T00:00:00",
                    "registrar":"1.2.1089881",
                    "referrer":"1.2.1089881",
                    "lifetime_referrer":"1.2.1089881",
                    "merchant_auth_referrer":"1.2.0",
                    "datasource_auth_referrer":"1.2.0",
                    "network_fee_percentage":2000,
                    "lifetime_referrer_fee_percentage":8000,
                    "referrer_rewards_percentage":1000,
                    "name":"blockcitybp", // account name
                    "vm_type":"",
                    "vm_version":"",
                    "code":"",  // contract account's code is not empty
                    "code_version":"",
                    "abi":{
                        "version":"gxc::abi/1.0",
                        "types":[

                        ],
                        "structs":[

                        ],
                        "actions":[

                        ],
                        "tables":[

                        ],
                        "error_messages":[

                        ],
                        "abi_extensions":[

                        ]
                    },
                    "owner":{
                        "weight_threshold":1,
                        "account_auths":[

                        ],
                        "key_auths":[
                            [
                                "GXC8XrrSD9LE4UuUvB1QtTA1EhUfjQeJLZwgeP7br56Koh1zrxez7",
                                1
                            ]
                        ],
                        "address_auths":[

                        ]
                    },
                    "active":{
                        "weight_threshold":1,
                        "account_auths":[

                        ],
                        "key_auths":[
                            [
                                "GXC8XrrSD9LE4UuUvB1QtTA1EhUfjQeJLZwgeP7br56Koh1zrxez7",
                                1
                            ]
                        ],
                        "address_auths":[

                        ]
                    },
                    "options":{
                        "memo_key":"GXC8XrrSD9LE4UuUvB1QtTA1EhUfjQeJLZwgeP7br56Koh1zrxez7",
                        "voting_account":"1.2.5",
                        "num_witness":0,
                        "num_committee":0,
                        "votes":[

                        ],
                        "extensions":[

                        ]
                    },
                    "statistics":"2.6.1089881",
                    "whitelisting_accounts":[

                    ],
                    "blacklisting_accounts":[

                    ],
                    "whitelisted_accounts":[

                    ],
                    "blacklisted_accounts":[

                    ],
                    "cashback_vb":"1.13.278",
                    "owner_special_authority":[
                        0,
                        {

                        }
                    ],
                    "active_special_authority":[
                        0,
                        {

                        }
                    ],
                    "top_n_control_flags":0
                },
                "statistics":{
                    "id":"2.6.1089881",
                    "owner":"1.2.1089881",
                    "most_recent_op":"2.9.201931750",
                    "total_ops":13,
                    "removed_ops":0,
                    "total_core_in_orders":0,
                    "lifetime_fees_paid":5153414,
                    "pending_fees":0,
                    "pending_vested_fees":0
                },
                "registrar_name":"blockcitybp",
                "referrer_name":"blockcitybp",
                "lifetime_referrer_name":"blockcitybp",
                "votes":[

                ],
                "cashback_balance":{ // cashback balance
                    "id":"1.13.278",
                    "owner":"1.2.1089881",
                    "balance":{
                        "amount":1932,
                        "asset_id":"1.3.1"
                    },
                    "policy":[
                        1,
                        {
                            "vesting_seconds":2592000,
                            "start_claim":"1970-01-01T00:00:00",
                            "coin_seconds_earned":"5007744000",
                            "coin_seconds_earned_last_update":"2019-01-16T07:40:00"
                        }
                    ]
                },
                "balances":[ // account balance
                    {
                        "id":"2.5.456853",
                        "owner":"1.2.1089881",
                        "asset_type":"1.3.1",
                        "balance":265386
                    }
                ],
                "locked_balances":[

                ],
                "vesting_balances":[ // vesting balance
                    {
                        "id":"1.13.171",
                        "owner":"1.2.1089881",
                        "balance":{
                            "amount":0,
                            "asset_id":"1.3.1"
                        },
                        "policy":[
                            1,
                            {
                                "vesting_seconds":7776000,
                                "start_claim":"1970-01-01T00:00:00",
                                "coin_seconds_earned":"0",
                                "coin_seconds_earned_last_update":"2018-12-27T03:04:21"
                            }
                        ]
                    },
                    {
                        "id":"1.13.259",
                        "owner":"1.2.1089881",
                        "balance":{
                            "amount":265747140,
                            "asset_id":"1.3.1"
                        },
                        "policy":[
                            1,
                            {
                                "vesting_seconds":86400,
                                "start_claim":"1970-01-01T00:00:00",
                                "coin_seconds_earned":"22960140940800",
                                "coin_seconds_earned_last_update":"2019-01-28T06:11:57"
                            }
                        ]
                    },
                    {
                        "id":"1.13.278",
                        "owner":"1.2.1089881",
                        "balance":{
                            "amount":1932,
                            "asset_id":"1.3.1"
                        },
                        "policy":[
                            1,
                            {
                                "vesting_seconds":2592000,
                                "start_claim":"1970-01-01T00:00:00",
                                "coin_seconds_earned":"5007744000",
                                "coin_seconds_earned_last_update":"2019-01-16T07:40:00"
                            }
                        ]
                    }
                ],
                "pledge_balances":[ // trustnode pledge balance
                    {
                        "id":"1.26.1",
                        "owner_account":"1.2.1089881",
                        "amount":{
                            "amount":1000000000,
                            "asset_id":"1.3.1"
                        }
                    }
                ],
                "limit_orders":[

                ],
                "call_orders":[

                ],
                "settle_orders":[

                ],
                "proposals":[

                ],
                "assets":[

                ],
                "withdraws":[

                ]
            }
        ]
    ]
}
```

### `is_account_registered`

Check if the account name is already registered. Returns true if registered, returns false if unregistered or the account name is invalid

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
account_name | account name

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "is_account_registered", ["nathan"]],
    "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": true // True means the account has been registered
}
```

### `get_key_references`

Obtain the associated accounts based on the public key , and return the associated account id

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
[public_keys] | Array, passing in a series of public keys

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_key_references", [["GXC7mmfnZWUYtz2tjNGqduZRe2w5x79GCjuoMiVkmEGRE94Vq7gAo"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        ["1.2.26", "1.2.26"] // Account id associated with the public key
    ]
}
```

## Asset

### `list_assets`

Query asset via initials

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
asset_name | Asset symbol or first string, such as GX
limit | Number of results returned

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "list_assets", ["G", 2]],
    "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [{
        "id": "1.3.11", // Return to asset 1.3.11
        "symbol": "GBA", // Asset name GBA
        "precision": 5, // Precision
        "issuer": "1.2.1110589", // Asset issuer
        "options": {
            "max_supply": "200000000000000", // Maximum supply of assets
            "market_fee_percent": 0,
            "max_market_fee": 0,
            "issuer_permissions": 0,
            "flags": 0,
            "core_exchange_rate": { // Exchange rate with GXC
                "base": {
                    "amount": 100000,
                    "asset_id": "1.3.1"
                },
                "quote": {
                    "amount": 1000000,
                    "asset_id": "1.3.11"
                }
            },
            "whitelist_authorities": [],
            "blacklist_authorities": [],
            "whitelist_markets": [],
            "blacklist_markets": [],
            "description": "{\"main\":\"Green Building Asset，简称GBA，是基于公信链的50%免费分发绿色资产。\",\"market\":\"\"}",
            "extensions": []
        },
        "dynamic_asset_data_id": "2.3.11" // The dynamic attribute corresponding to the asset corresponds to the id
    }, {
        "id": "1.3.5", // Return to asset 1.3.5
        "symbol": "GCNY", // Asset name GCNY
        "precision": 5,
        "issuer": "1.2.785392",
        "options": {
            "max_supply": "1000000000000000",
            "market_fee_percent": 0,
            "max_market_fee": 0,
            "issuer_permissions": 79,
            "flags": 0,
            "core_exchange_rate": {
                "base": {
                    "amount": 1000000,
                    "asset_id": "1.3.1"
                },
                "quote": {
                    "amount": 100000,
                    "asset_id": "1.3.5"
                }
            },
            "whitelist_authorities": [],
            "blacklist_authorities": [],
            "whitelist_markets": [],
            "blacklist_markets": [],
            "description": "",
            "extensions": []
        },
        "dynamic_asset_data_id": "2.3.5"
    }]
}
```

### `lookup_asset_symbols`

Get asset details based on asset name

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
asset_name | Asset symbol or first string, such as 'GXC'

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "lookup_asset_symbols", [["GXC"]]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
The same result list_assets

### `get_account_balances`

Get account balances based on account id and asset id, return all asset balances if asset id is not specified

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
account_id | account id
[asset_ids] | array,asset ids

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_balances", ["1.2.42", ["1.3.0", "1.3.1"]]],
    "id": 1
}' https://node1.gxb.io/rpc

```

**response:**
```json
{
    "id":1,
    "jsonrpc":"2.0",
    "result":[
        {
            "amount":"79795227868",
            "asset_id":"1.3.0" //1.3.0 is a NULL asset
        },
        {
            "amount":"3949999988445", // GXC asset accuracy is 5, the actual number is 39499999.88445
            "asset_id":"1.3.1" // 1.3.1 is a GXC asset
        }
    ]
}
```

### `get_named_account_balances`

Obtain account balances based on account name and asset id, return all asset balance if asset id is not specified

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
account_id | account id
[asset_ids] | array,asset ids

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_named_account_balances", ["gxbfoundation", ["1.3.0", "1.3.1"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [{
        "amount": "79795227868", // 1.3.0 Asset balance
        "asset_id": "1.3.0"
    }, {
        "amount": "3949999988445", // 1.3.1 Asset balance, ie GXC assets, since the accuracy of GXC assets is 5, the actual quantity is 3949999988445 / 100000
        "asset_id": "1.3.1"
    }]
}
```

### `get_vesting_balances`

Get all the unspent balances of the account based on the account id

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
account_id | account id

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_vesting_balances", ["1.2.748971"]],
    "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id":1,
    "jsonrpc":"2.0",
    "result":[
        {
            "id":"1.13.89",
            "owner":"1.2.748971",
            "balance":{
                "amount":0,
                "asset_id":"1.3.0"
            },
            "policy":[
                1,
                {
                    "vesting_seconds":7776000,
                    "start_claim":"1970-01-01T00:00:00",
                    "coin_seconds_earned":"0",
                    "coin_seconds_earned_last_update":"2018-11-09T11:29:30"
                }
            ]
        },
        {
            "id":"1.13.123",
            "owner":"1.2.748971",
            "balance":{
                "amount":24657392,
                "asset_id":"1.3.1"
            },
            "policy":[
                1,
                {
                    "vesting_seconds":7776000,
                    "start_claim":"1970-01-01T00:00:00",
                    "coin_seconds_earned":"191735880192000",
                    "coin_seconds_earned_last_update":"2018-12-04T07:40:00"
                }
            ]
        },
        {
            "id":"1.13.237",
            "owner":"1.2.748971",
            "balance":{
                "amount":1907009,
                "asset_id":"1.3.1"
            },
            "policy":[
                1,
                {
                    "vesting_seconds":2592000,
                    "start_claim":"1970-01-01T00:00:00",
                    "coin_seconds_earned":"4942967328000",
                    "coin_seconds_earned_last_update":"2019-01-28T00:40:00"
                }
            ]
        }
    ]
}
```

## Trust_node

### `get_trust_nodes`

Get the account ids of all trust nodes

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_trust_nodes", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
   "id":1,
   "jsonrpc":"2.0",
   "result":[
      "1.2.3429",
      "1.2.3431",
      "1.2.3432",
      "1.2.3433",
      "1.2.3434",
      "1.2.748971",
      "1.2.1090296",
      "1.2.1090419",
      "1.2.1061353",
      "1.2.1090653",
      "1.2.1090792",
      "1.2.1090458",
      "1.2.1091083",
      "1.2.1092168",
      "1.2.1106749"
   ]
}
```

### `get_witness_by_account`

Obtain the information of the trust node according to `account_id`, including the public key, the total votes, missing blocks, etc.

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
account_id | account id

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_witness_by_account", ["1.2.748971"]],
    "id": 1
}' https://node1.gxb.io/rpc
```
response:
```json
{
    "id":1,
    "jsonrpc":"2.0",
    "result":{
        "id":"1.6.35",
        "witness_account":"1.2.748971", // Account_id
        "last_aslot":0,
        "signing_key":"GXC5YFfb3LtUDnHCu4bTfSMUxoVMz2xwnCbTT99oAdVPCcB2nMKz9", // Sign the block's public key
        "vote_id":"1:56", // Witness's vote id
        "total_votes":"82099555219", // Total votes
        "url":".",
        "total_missed":0, // Total missing blocks
        "last_confirmed_block_num":0, // Last packaged block
        "is_valid":true // Witness state
    }
}
```

### `lookup_vote_ids`

Returns the worker object based on the information of the public node returned by vote_id

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
[vote_id] | Array, vote ids

#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "lookup_vote_ids", [["1:22", "0:72"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```


## Contract_table

### `get_table_rows_ex`
The extension interface of `get_table_rows` provides richer query functions. (The default value is used when the parameter field is not passed.)

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 0
contract_name | contract name
table_name | table name
params_object | params struct

get_table_rows_params description:

- **lower_bound:** The minimum value of the key specified during the query. The default is 0.
- **upper_bound:** The maximum value of the key specified during the query. The default is -1, which is the largest unsigned integer.
- **limit:** Specify the return limit bar when querying, and return 10 by default.
- **index_position:** The index specified when querying, the default is 1, that is, the first index.
- **reverse:** The result of the query is output in reverse order of the key. The default is 0, that is, the key is output from small to large.

All parameters of 'get_table_rows_params' have default values. If there is no need to change the default value, you can not pass in


#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_table_rows_ex", ["contract_name", "table_name", {"lower_bound":0,"upper_bound":-1,"limit":10,"index_position":1,"reverse":0}]],
    "id": 1
}'
```
**response:**
```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "rows": [{
            "pool": {
                "amount": "3294138495",
                "asset_id": 1
            },
            "totalbet": "30845491144",
            "betcount": 38425,
            "wincount": 31459,
            "minbet": 50000,
            "minbank": 10000000,
            "investtotalpercent": 2643728290,
            "profit": 462683014
        }, {
            "pool": {
                "amount": 0,
                "asset_id": 2
            },
            "totalbet": 0,
            "betcount": 0,
            "wincount": 0,
            "minbet": 1000000,
            "minbank": 100000000,
            "investtotalpercent": 0,
            "profit": 0
        }, {
            "pool": {
                "amount": "100000000000",
                "asset_id": 14
            },
            "totalbet": 0,
            "betcount": 0,
            "wincount": 0,
            "minbet": 10000000,
            "minbank": 1000000000,
            "investtotalpercent": 100000000,
            "profit": 0
        }],
        "more": false
    }
}
```

## broadcast

### `broadcast_transaction`
Broadcast a signed transaction to the network

::: tip Tips
[How to construct and send a transaction to GXChain?](../advanced/send_transaction.md)
:::

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 2
signed_transaction | Signed transaction message body

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [2,"broadcast_transaction",[{"ref_block_num":3698,"ref_block_prefix":1780126622,"expiration":"2018-12-18T10:56:09","operations":[[0,{"fee":{"amount":1000,"asset_id":"1.3.1"},"from":"1.2.17","to":"1.2.6","amount":{"amount":1000000,"asset_id":"1.3.1"},"extensions":[]}]],"extensions":[],"signatures":["204444e23dff4e911e33d4059b36c91f7d4f85022c90ebd3e509f9b2caeb6bca273c8616ebd4f0786ac03b3ef2796a56d754de301e97aff0e43df6f3dfb12d1e62"]}]],
    "id": 1
}' https://node23.gxb.io/rpc
```
parameter description:

broadcast API id in params is 2 by default.

Parameter in `[]` is signed transaction message body.

### `broadcast_transaction_synchronous`
Broadcast a signed transaction to the network, and wait for the transaction result synchronously. Wait for about 2 seconds depending on factors such as network and transaction confirmation.

::: tip Tips
[How to construct and send a transaction to GXChain?](../advanced/send_transaction.md)
:::

#### Parameter Description
Parameter | Description
---|---
API id | The interface is provided by the DB API with an id of 2
signed_transaction | Signed transaction message body

#### Example
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [2,"broadcast_transaction_synchronous",[{"ref_block_num":63524,"ref_block_prefix":3478923091,"expiration":"2019-01-21T07:59:24","operations":[[0,{"fee":{"amount":1000,"asset_id":"1.3.1"},"from":"1.2.22","to":"1.2.18","amount":{"amount":100000,"asset_id":"1.3.1"},"extensions":[]}]],"extensions":[],"signatures":["20165321fabdce0ca561370ba547738be12a33b929b17889845ab9b8c1a4ed2fa04bc555205bc945cf6f0129765a0f1c06265437c111957a4008167ef720c49f71"]}]],
    "id": 1
}' https://node23.gxb.io/rpc
```

parameter description:

broadcast API id in params is 2 by default.

Parameter in `[]` is signed transaction message body.

response:
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"id": "8e2a0d30d68a6a34f58cece5b7879d8a8ec123bd",
		"block_num": 10680361,
		"trx_num": 0,
		"trx": {
			"ref_block_num": 63524,
			"ref_block_prefix": 3478923091,
			"expiration": "2019-01-21T07:59:24",
			"operations": [
				[0, {
					"fee": {
						"amount": 1000,
						"asset_id": "1.3.1"
					},
					"from": "1.2.22",
					"to": "1.2.18",
					"amount": {
						"amount": 100000,
						"asset_id": "1.3.1"
					},
					"extensions": []
				}]
			],
			"extensions": [],
			"signatures": ["20165321fabdce0ca561370ba547738be12a33b929b17889845ab9b8c1a4ed2fa04bc555205bc945cf6f0129765a0f1c06265437c111957a4008167ef720c49f71"],
			"operation_results": [
				[0, {}]
			]
		}
	}
}
```
