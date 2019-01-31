# API Reference

GXChain的节点提供WebSocket和JSONRPC两种接口形式

## 链相关

### `get_chain_id`
获取链id

params: 无

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

params: 无

request:
``` bash
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
        "head_block_number":16757465, // 最新区块号
        "head_block_id":"00ffb2d9f6e344f2190a8dfba58baaadd49e76c4", // 最新区块id
        "time":"2019-01-28T06:08:00", // 区块头时间
        "current_witness":"1.6.52",
        "next_maintenance_time":"2019-01-28T06:40:00",
        "last_budget_time":"2019-01-28T05:40:00",
        "witness_budget":3065824,
        "accounts_registered_this_interval":2,
        "recently_missed_count":0,
        "current_aslot":16958091,
        "recent_slots_filled":"340282366920938463463374607431768211455",
        "dynamic_flags":0,
        "last_irreversible_block_num":16757449 // 最后不可逆区块号
    }
}
```


## 区块相关

### `get_block`

通过区块号获取区块信息

params: ```<区块号>```

request:
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

params: ```<区块号>```

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block_header", [1]],
    "id": 1
}' https://node1.gxb.io/rpc
```

## 对象相关

在GXChain里面，通过不同的对象来存储不同类型的数据，点此查看[GXChain上的对象类型](./#_2-gxchain上的对象)

### `get_objects`

根据对象ID获取对象信息

params: ```<[对象ids]>```
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

params: 无
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

params: ```<帐户名>```

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

根据`account_ids 或者 account_names`获取完整账户信息，**包含**关联对象的信息，如账户资产余额，冻结余额等。

params: ```<[帐户名s或者帐户ids]>```

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_full_accounts", [["blockcitybp"],false]],
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
                    "membership_expiration_date":"2106-02-07T06:28:15", // 非1970，为终身会员帐户
                    "merchant_expiration_date":"1970-01-01T00:00:00", // 非1970， 为商户
                    "datasource_expiration_date":"1970-01-01T00:00:00", // 非1970， 为数据源
                    "data_transaction_member_expiration_date":"1970-01-01T00:00:00",
                    "registrar":"1.2.1089881", // 帐户注册人
                    "referrer":"1.2.1089881", // 帐户推荐人
                    "lifetime_referrer":"1.2.1089881",
                    "merchant_auth_referrer":"1.2.0",
                    "datasource_auth_referrer":"1.2.0",
                    "network_fee_percentage":2000,
                    "lifetime_referrer_fee_percentage":8000,
                    "referrer_rewards_percentage":1000,
                    "name":"blockcitybp", // 帐户名
                    "vm_type":"",
                    "vm_version":"",
                    "code":"",  // code不为空，为智能合约帐户
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
                "cashback_balance":{ // 返现余额，属于待解冻余额的一部分
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
                "balances":[ // 余额
                    {
                        "id":"2.5.456853",
                        "owner":"1.2.1089881",
                        "asset_type":"1.3.1",
                        "balance":265386
                    }
                ],
                "locked_balances":[

                ],
                "vesting_balances":[ // 待解冻余额
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
                "pledge_balances":[ // 公信节点抵押资产余额
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
查询帐户名是否已注册。 若已注册，则返回true，未注册或者帐户名不合法，返回false

params: ```<帐户名>```

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

params: ```<[公钥s]>```
request:
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

params: ```<资产名> <limit>```

request:
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

params: ```<[资产名字s]>```

request:
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

params:``` <帐户id> <[资产ids]> ```

request:
``` bash
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
            "asset_id":"1.3.0"  // 1.3.0为NULL资产
        },
        {
            "amount":"3949999988445", // GXC资产精度为5， 实际数量为39499999.88445
            "asset_id":"1.3.1" // 1.3.1 为GXC资产
        }
    ]
}
```

### `get_named_account_balances`

根据帐户名和资产id获取帐户余额， 如果资产id不指定，返回全部资产余额

params: ```<帐户名> <[资产ids]>```

request:
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

params: ```<帐户名>```

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_vesting_balances", ["1.2.748971"]],
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

## 公信节点相关

### `get_trust_nodes`

获取所有的公信节点所属帐户id

params:  无

request:
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

params: ```<帐户id>```

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_witness_by_account", ["1.2.748971"]],
    "id": 1
}' https://node1.gxb.io/rpc
```
response:
```
{
    "id":1,
    "jsonrpc":"2.0",
    "result":{
        "id":"1.6.35",
        "witness_account":"1.2.748971", // 所属帐户
        "last_aslot":0,
        "signing_key":"GXC5YFfb3LtUDnHCu4bTfSMUxoVMz2xwnCbTT99oAdVPCcB2nMKz9", // 签署区块的公钥
        "vote_id":"1:56", // witness的vote id
        "total_votes":"82099555219", // 得票总数
        "url":".",
        "total_missed":0, // 总的缺失块数
        "last_confirmed_block_num":0, // 最后一次打包的区块
        "is_valid":true // witness状态
    }
}
```

### `lookup_vote_ids`

根据vote_id返回所属公信节点的信息, 返回对应的worker对象

params: ```<vote id>```

request:
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

params: ```<contract_name> <table_name> <start> <limit>```

request:
```bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_table_rows", ["contract_name", "table_name", 0, 10]],
    "id": 1
}' https://node1.gxb.io/rpc
```

### `get_table_rows_ex`
`get_table_rows`的扩展接口，提供更丰富的查询功能。（参数字段不传时，使用默认值）

params: ```<contract_name> <table_name> <get_table_rows_params> ```

request:
```bash
# 该接口已上线测试网，主网暂不支持
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_table_rows_ex", ["contract_name", "table_name", {"lower_bound":0,"upper_bound":-1,"limit":10,"index_position":1,"reverse":0}]],
    "id": 1
}' https://testnet.gxchain.org
```

get_table_rows_params参数说明：
```
lower_bound， 查询时指定的key最小值, 默认为0
upper_bound， 查询时指定的key最大值，默认为-1，即最大的无符号整形
limit， 查询时指定返回limit条，默认返回10条
index_position， 查询时指定的index，默认为1，即第1个索引
reverse， 查询结果按key的倒序输出，默认为0，即按key从小到大输出
```


## 广播接口

### `broadcast_transaction`

异步api，向网络广播一笔带签名的交易，但不等待交易执行的结果

params: ```<signed_trx>```
	
``` bash
# 该接口尚未升级到主网的API服务器，如果要使用，需要源码编译程序
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [2,"broadcast_transaction",[{"ref_block_num":3698,"ref_block_prefix":1780126622,"expiration":"2018-12-18T10:56:09","operations":[[0,{"fee":{"amount":1000,"asset_id":"1.3.1"},"from":"1.2.17","to":"1.2.6","amount":{"amount":1000000,"asset_id":"1.3.1"},"extensions":[]}]],"extensions":[],"signatures":["204444e23dff4e911e33d4059b36c91f7d4f85022c90ebd3e509f9b2caeb6bca273c8616ebd4f0786ac03b3ef2796a56d754de301e97aff0e43df6f3dfb12d1e62"]}]],
    "id": 1
}' https://node23.gxb.io/rpc
```
#### 参数说明：
params包含3个参数，分别为api id、方法名和参数，其中api id固定为2， 方法名固定为broadcast_transaction， []中的参数为带签名的交易消息体。

### `broadcast_transaction_synchronous`

同步api，向网络广播一笔带签名的交易，并同步的等待交易结果，视网络及交易确认等因素需要等待2秒左右

``` bash
# 该接口尚未发布release版本，需要源码编译程序或者连接GXChain团队提供的API服务器
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [2,"broadcast_transaction_synchronous",[{"ref_block_num":63524,"ref_block_prefix":3478923091,"expiration":"2019-01-21T07:59:24","operations":[[0,{"fee":{"amount":1000,"asset_id":"1.3.1"},"from":"1.2.22","to":"1.2.18","amount":{"amount":100000,"asset_id":"1.3.1"},"extensions":[]}]],"extensions":[],"signatures":["20165321fabdce0ca561370ba547738be12a33b929b17889845ab9b8c1a4ed2fa04bc555205bc945cf6f0129765a0f1c06265437c111957a4008167ef720c49f71"]}]],
    "id": 1
}' https://node23.gxb.io/rpc
```
#### 参数说明：
params包含3个参数，分别为api id、方法名和参数，其中api id固定为2， 方法名固定为broadcast_transaction_synchronous， []中的参数为带签名的交易消息体。

返回示例
```
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
