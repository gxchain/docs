# API Reference

GXChain nodes support WebSocket and JSONRPC

## Chain

### `get_chain_id`

Get chain id

params: none

request:
```
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_chain_id", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_dynamic_global_properties`

Get dynamic global properties

params: none

request:
```
curl -XPOST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_dynamic_global_properties", []],
    "id": 1
}' https://node1.gxb.io/rpc

```

response:
```
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

params: `<block_num>`

request:
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

params: `<block_num>`

request:
``` bash
curl POST --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block_header", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

## Object

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

params: `<[object_ids]>`

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_objects", [["1.25.100","1.2.200"]]], "id": 1
}' https://node1.gxb.io/rpc
```

## Account

### `get_account_count`

Obtain total account count

params: none

request:
```
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_count", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_account_by_name`

Obtain account info via `account_name`, **exclude** association object

prams: `<account_name>`

request:
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

params: `<[account_names or account_ids])`

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_full_accounts", [["1.2.1"],false]],
    "id": 1
}' https://node1.gxb.io/rpc
```

response:
```
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

params: `<account_name>`

request:
```
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "is_account_registered", ["nathan"]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_key_references`

Obtain the associated accounts based on the public key , and return the associated account id

params: `<[public_keys]>`

request:
```
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_key_references", [["GXC7mmfnZWUYtz2tjNGqduZRe2w5x79GCjuoMiVkmEGRE94Vq7gAo"]]],
    "id": 1
}' https://node1.gxb.io/rpc
```

## Asset

### `list_assets`

Query asset via initials

params: `<asset_name> <limit>`

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "list_assets", ["A", 100]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_account_balances`

Get account balance based on account id and asset id, return all asset balance if asset id is not specified

params: `<account_id> <[asset_ids]>`

request:
```
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_balances", ["1.2.42", ["1.3.0", "1.3.1"]]],
    "id": 1
}' https://node1.gxb.io/rpc

```

response:
```
{
    "id":1,
    "jsonrpc":"2.0",
    "result":[
        {
            "amount":"79795227868",
            "asset_id":"1.3.0"
        },
        {
            "amount":"3949999988445",
            "asset_id":"1.3.1"
        }
    ]
}
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








