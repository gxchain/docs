# cli\_wallet 使用教程

cli_wallet是GXChain提供的命令行工具，提供转账、调用合约、查询对象等功能。启动命令行工具之后，执行`help`命令，会输出该工具支持的所有命令。本篇教程演示如何使用`cli_wallet`工具。

## 1. 启动cli\_wallet

在启动`cli_wallet`工具之前，你首先要启动一个开启了API服务的节点程序`witness_node`，并且要明确节点程序所在区块链的`Chain id`。当你获取以上信息之后，便可以通过`cli_wallet`工具与GXChain进行交互了。

`cli_wallet`可以使用如下方式启动：

```bash
#注： chain-id修改为你连接的链id，ip、端口根据节点启动配置信息指定
./cli_wallet --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4 -sws://127.0.0.1:28090
```

## 2. cli\_wallet常用功能

### 2.1 新钱包设置、私钥导入

正确启动`cli_wallet`工具之后，会进入一个交互窗口。如果是首次启动，会提示创建一个新钱包，窗口提示如下：

```bash
Please use the set_password method to initialize a new wallet before continuing
new >>>
```

根据提示，输入`set_password`命令，指定钱包密码，创建钱包。

```bash
# 123456替换为你自己的自定义密码
new >>> set_password 123456
set_password 123456
null
```

输入密码之后，钱包则创建完成了，可以看到界面上显示钱包为锁定状态，输入`unlock`命令，解锁钱包：

```bash
# 123456替换为你自己设置的密码
locked >>> unlock 123456
unlock 123456
null
```

解锁钱包之后，如果想使用`cli_wallet`工具发起交易，需要导入自己的账户私钥，命令如下：

```bash
unlocked >>> import_key zhao-123 5JVtwDKFQCx9EqANKL4Qb3N6HbPiBnVXz6STz6gwzpJJusH7SqJ
import_key zhao-123 5JVtwDKFQCx9EqANKL4Qb3N6HbPiBnVXz6STz6gwzpJJusH7SqJ
2548361ms th_a       wallet.cpp:798                save_wallet_file     ] saving wallet to file wallet.json
2548365ms th_a       wallet.cpp:473                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-7c829d0b.wallet
true
```

界面显示为`unlocked`状态，此时便可以通过钱包进行复杂功能的操作。

### 2.2 账户操作

可以使用`cli_wallet`工具注册账户，并升级账户为终身会员，具体命令如下：

#### register\_account

**接口定义：** `signed_transaction register_account(string name, public_key_type owner, public_key_type active, string registrar_account, string referrer_account, uint32_t referrer_percent, bool broadcast)`

**功能说明：** 注册账户

**参数：**

参数 | 类型 | 描述
---|---|---
name | string | 需要注册的账户名
owner | public_key_type | ower公钥
active | public_key_type | active 公钥
registrar_account | string | 推荐人账户
referrer_account | string | 推荐人返现百分比
broadcast | bool | 是否广播

**示例：** 

```bash
unlocked >>> register_account a111 GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ zhao-123 zhao-123 10 true
register_account a111 GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ zhao-123 zhao-123 10 true
{
  "ref_block_num": 10747,
  "ref_block_prefix": 3037397366,
  "expiration": "2019-04-11T03:47:24",
  "operations": [[
      5,{
        "fee": {
          "amount": 102,
          "asset_id": "1.3.1"
        },
        "registrar": "1.2.426",
        "referrer": "1.2.426",
        "referrer_percent": 1000,
        "name": "a111",
        "owner": {
          "weight_threshold": 1,
          "account_auths": [],
          "key_auths": [[
              "GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ",
              1
            ]
          ],
          "address_auths": []
        },
        "active": {
          "weight_threshold": 1,
          "account_auths": [],
          "key_auths": [[
              "GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ",
              1
            ]
          ],
          "address_auths": []
        },
        "options": {
          "memo_key": "GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ",
          "voting_account": "1.2.5",
          "num_witness": 0,
          "num_committee": 0,
          "votes": [],
          "extensions": []
        },
        "extensions": {}
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f4510f43daf1f2ecb83dd8b8c4b21b1ce1031ea0a64562ce5f20dbe3b4b8f9d9e2b438a74a0c56cc6c37f6e21e6aeeadd8619de8e916a268e964d68d9e68fc35f"
  ]
}
```

#### upgrade\_account

**接口定义：** `signed_transaction upgrade_account(string name, string asset_symbol, bool broadcast)`

**功能说明：** 升级账户到终身会员，需要保证账户最少有50GXC资产

**参数：**

参数 | 类型 | 描述
---|---|---
name | string | 账户名
asset_symbol | string | 资产名
broadcast | bool | 是否广播

**示例：** 

```bash
unlocked >>> upgrade_account test-upgrade GXC true
upgrade_account test-upgrade GXC true
{
  "ref_block_num": 13251,
  "ref_block_prefix": 906310083,
  "expiration": "2019-04-11T06:56:36",
  "operations": [[
      8,{
        "fee": {
          "amount": 5000000,
          "asset_id": "1.3.1"
        },
        "account_to_upgrade": "1.2.2575",
        "upgrade_to_lifetime_member": true,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "202abed5a02c1b75fa804f3550416546bf389673f77d0c9b76d8a8b0b8797a6c315be31a039ff7677ee0264b0a1d2c96a236b1181bc0964b9776ba16cbaf3e56ac"
  ]
}
```


### 2.3 获取链上信息

`cli_wallet`工具可以通过相关命令获取链上内存对象信息（账户、资产、合约table等），也可以获取链上区块信息（区块数据、不可逆区块号等）。（按Tab键可以查看命令提示并补全）

#### get\_account

**接口定义：** `account_object get_account(string account_name_or_id)`

**功能说明：** 获取账户信息

**参数：**

参数 | 类型 | 描述
---|---|---
account_name_or_id | string | 账户名或者账户id（比如：init4或1.2.10）

**示例：** 

```bash
unlocked >>> get_account 1.2.10
get_account 1.2.10
{
  "id": "1.2.10",
  "membership_expiration_date": "2106-02-07T06:28:15",
  "merchant_expiration_date": "1970-01-01T00:00:00",
  "datasource_expiration_date": "1970-01-01T00:00:00",
  "data_transaction_member_expiration_date": "1970-01-01T00:00:00",
  "registrar": "1.2.10",
  "referrer": "1.2.10",
  "lifetime_referrer": "1.2.10",
  "merchant_auth_referrer": "1.2.0",
  "datasource_auth_referrer": "1.2.0",
  "network_fee_percentage": 2000,
  "lifetime_referrer_fee_percentage": 8000,
  "referrer_rewards_percentage": 0,
  "name": "init4",
  "vm_type": "",
  "vm_version": "",
  "code": "",
  "code_version": "",
  "abi": {
    "version": "gxc::abi/1.0",
    "types": [],
    "structs": [],
    "actions": [],
    "tables": [],
    "error_messages": [],
    "abi_extensions": []
  },
  "owner": {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [[
        "GXC8AoHzhXhMRV9AFTihMAcQPNXKFEZCeYNYomdcc7vh8Gzp7b7xP",
        1
      ]
    ],
    "address_auths": []
  },
  "active": {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [[
        "GXC8AoHzhXhMRV9AFTihMAcQPNXKFEZCeYNYomdcc7vh8Gzp7b7xP",
        1
      ]
    ],
    "address_auths": []
  },
  "options": {
    "memo_key": "GXC8AoHzhXhMRV9AFTihMAcQPNXKFEZCeYNYomdcc7vh8Gzp7b7xP",
    "voting_account": "1.2.5",
    "num_witness": 0,
    "num_committee": 3,
    "votes": [
      "0:11",
      "0:16",
      "0:17"
    ],
    "extensions": []
  },
  "statistics": "2.6.10",
  "whitelisting_accounts": [],
  "blacklisting_accounts": [],
  "whitelisted_accounts": [],
  "blacklisted_accounts": [],
  "cashback_vb": "1.13.200",
  "owner_special_authority": [
    0,{}
  ],
  "active_special_authority": [
    0,{}
  ],
  "top_n_control_flags": 0
}
```


#### get\_asset

**接口定义：** `asset_object get_asset(string asset_name_or_id)`

**功能说明：** 获取资产信息

**参数：**

参数 | 类型 | 描述
---|---|---
asset_name_or_id | string | 资产名或者资产id（比如：GXC或1.3.1）

**示例：** 

```bash
unlocked >>> get_asset GXC
get_asset GXC
{
  "id": "1.3.1",
  "symbol": "GXC",
  "precision": 5,
  "issuer": "1.2.0",
  "options": {
    "max_supply": "10000000000000",
    "market_fee_percent": 0,
    "max_market_fee": 0,
    "issuer_permissions": 79,
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
    "description": "{\"main\":\"GXC是公信宝基金会在GXChain（公信链）上发行的Token，不仅具有流通价值，同时在公信链上开发、认证应⽤、使⽤链上服务（例如链上转账的矿⼯费）以及使⽤BaaS服务都需要⽀付或燃烧GXC，GXC是作为链上应⽤运⾏使⽤到的Token。 在布洛克城中也可以很方便地利用GXC进行支付结算，如居民之间互相使用GXC进行结算，使用城市公共服务需要用GXC结算，商家提供的服务也需要用GXC来购买等等。\",\"short_name\":\"\",\"market\":\"\"}",
    "extensions": []
  },
  "dynamic_asset_data_id": "2.3.1"
}
```

#### get\_block

**接口定义：** `optional<signed_block_with_info> get_block(uint32_t num)`

**功能说明：** 获取区块信息

**参数：**

参数 | 类型 | 描述
---|---|---
num | uint32_t | 区块号

**示例：** 

```bash 
unlocked >>> get_block 1
get_block 1
{
  "previous": "0000000000000000000000000000000000000000",
  "timestamp": "2017-12-14T03:37:36",
  "witness": "1.6.4",
  "transaction_merkle_root": "0000000000000000000000000000000000000000",
  "extensions": [],
  "witness_signature": "207ceb3fe6a81fb77670370762bb7a9be58951534a053ef33b2bf4430d47315fe14ed3ed3b04472072ef28e06cf66715fcdc184b8683b9543f159e9fcf9e67af25",
  "transactions": [],
  "block_id": "000000010d6e163620e7a0c1144ef68e55b29607",
  "signing_key": "GXC8AoHzhXhMRV9AFTihMAcQPNXKFEZCeYNYomdcc7vh8Gzp7b7xP",
  "transaction_ids": []
}
```

#### get\_dynamic\_global\_properties

**接口定义：** `dynamic_global_property_object get_dynamic_global_properties()`

**功能说明：** 获取全局对象，保存了区块信息

**参数：** 空

**示例：** 

```bash
unlocked >>> get_dynamic_global_properties
get_dynamic_global_properties
{
  "id": "2.1.0",
  "head_block_number": 12839485,
  "head_block_id": "00c3ea3d8e14e164c443ddf2cb15baf597b97e9c",
  "time": "2019-04-08T06:20:00",
  "current_witness": "1.6.3",
  "next_maintenance_time": "2019-04-08T06:30:00",
  "last_budget_time": "2019-04-08T06:20:00",
  "witness_budget": 953600,
  "accounts_registered_this_interval": 0,
  "recently_missed_count": 0,
  "current_aslot": 13625993,
  "recent_slots_filled": "340282366920938463463374607431768211455",
  "dynamic_flags": 1,
  "last_irreversible_block_num": 12839471
}
```

#### get\_table\_rows\_ex

**接口定义：** `get_table_rows_result get_table_rows_ex(string contract, string table, const get_table_rows_params & params)`

**功能说明：** 获取合约table信息

**参数：** 

参数 | 类型 | 描述
---|---|---
contract | string | 合约账户名
table | string | 合约中的table名
params | const get_table_rows_params & | 查询方式对象，配置查询方式

get_table_rows_params参数说明：
```
lower_bound， 查询时指定的key最小值, 默认为0
upper_bound， 查询时指定的key最大值，默认为-1，即最大的无符号整形
limit， 查询时指定返回limit条，默认返回10条
index_position， 查询时指定的index，默认为1，即第1个索引
reverse， 查询结果按key的倒序输出，默认为0，即按key从小到大输出
get_table_rows_params所有的参数都有默认值，如无需要改变默认值，可以不传入
```

**示例：** 

```bash
unlocked >>> get_table_rows_ex gdice prizepool {}
get_table_rows_ex gdice prizepool {}
{
  "rows": [{
      "pool": {
        "amount": 27113974,
        "asset_id": 1
      },
      "totalbet": 580317119,
      "betcount": 3509,
      "wincount": 1753,
      "minbet": 50000,
      "minbank": 50000000,
      "investtotalpercent": 289011989,
      "profit": 8704792
    },{
      "pool": {
        "amount": 1015513750,
        "asset_id": 3
      },
      "totalbet": 38250000,
      "betcount": 17,
      "wincount": 9,
      "minbet": 50000,
      "minbank": 50000000,
      "investtotalpercent": "81684229471",
      "profit": 573750
    },{
      "pool": {
        "amount": "11029550000",
        "asset_id": 10
      },
      "totalbet": 75000000,
      "betcount": 7,
      "wincount": 2,
      "minbet": 50000,
      "minbank": 50000000,
      "investtotalpercent": "1899559049845",
      "profit": 1125000
    },{
      "pool": {
        "amount": "20073876000",
        "asset_id": 17
      },
      "totalbet": 1170000000,
      "betcount": 36,
      "wincount": 17,
      "minbet": 10000000,
      "minbank": "10000000000",
      "investtotalpercent": 1557641343,
      "profit": 17550000
    },{
      "pool": {
        "amount": "2000000110000",
        "asset_id": 27
      },
      "totalbet": 0,
      "betcount": 0,
      "wincount": 0,
      "minbet": 500,
      "minbank": 100000,
      "investtotalpercent": 200000005,
      "profit": 0
    }
  ],
  "more": false
}
```

#### get\_witness

**接口定义：** `witness_object get_witness(string owner_account)`

**功能说明：** 获取公信节点信息

**参数：**

参数 | 类型 | 描述
---|---|---
owner_account | string | 公信节点id

**示例：** 

```bash
unlocked >>> get_witness 1.6.1
get_witness 1.6.1
{
  "id": "1.6.1",
  "witness_account": "1.2.6",
  "last_aslot": 13626273,
  "signing_key": "GXC8AoHzhXhMRV9AFTihMAcQPNXKFEZCeYNYomdcc7vh8Gzp7b7xP",
  "pay_vb": "1.13.97",
  "vote_id": "1:0",
  "total_votes": "928209451466",
  "url": "",
  "total_missed": 35022,
  "last_confirmed_block_num": 12839765,
  "is_valid": true
}
```

#### get\_account\_history

**接口定义：** `vector<operation_detail> get_account_history(string name, int limit)`

**功能说明：** 获取指定账户交易历史

**特殊说明：** 需要设置`config.ini`文件中的配置选项，如下所示

```json
 # Account ID to track history for (may specify multiple times)
 track-account = "1.2.426"

 # Maximum number of operations per account will be kept in memory
 max-ops-per-account = 10000
```

**参数：**

参数 | 类型 | 描述
---|---|---
name | string | 账户名
limit | int | 获取的条目数

**示例：** 

```bash
unlocked >>> get_account_history zhao-123 5
get_account_history zhao-123 5
2019-04-11T06:51:18 Transfer 1 GXC from zhao-123 to nathan   (Fee: 0.01000 GXC)
2019-04-11T06:51:03 Transfer 1 GXC from zhao-123 to nathan   (Fee: 0.01000 GXC)
```

### 2.4 向其他账户转账

这里我们通过`cli_wallet`命令行工具，发起一笔转账，请注意：在发起一笔转账前，需要保证已经导入了转账账户的私钥

**接口定义：** `signed_transaction transfer(string from, string to, string amount, string asset_symbol, string memo, bool broadcast)`

**功能说明：** 向其他账户转账

**参数：**

参数 | 类型 | 描述
---|---|---
from | string | 转账账户
to | string | 接收账户
amount | string | 转账数量，不需要乘以精度（1 = 1 GXC）
asset_symbol | string | 资产名称（例如GXC）
memo | string | 备注
broadcast | bool | 是否广播

**示例：** 

```bash
unlocked >>> transfer zhao-123 nathan 1 GXC "transfer test" true
transfer zhao-123 nathan 1 GXC "transfer test" true
{
  "ref_block_num": 60407,
  "ref_block_prefix": 1572501575,
  "expiration": "2019-04-08T06:43:03",
  "operations": [[
      0,{
        "fee": {
          "amount": 1210,
          "asset_id": "1.3.1"
        },
        "from": "1.2.426",
        "to": "1.2.17",
        "amount": {
          "amount": 100000,
          "asset_id": "1.3.1"
        },
        "memo": {
          "from": "GXC8cQnHYf2RGgeAEAQKAT3i9Hz9rxJagcXcXD8Znvtj16vYybwxE",
          "to": "GXC8AoHzhXhMRV9AFTihMAcQPNXKFEZCeYNYomdcc7vh8Gzp7b7xP",
          "nonce": "7135256515508096303",
          "message": "d2d9e72e468fb8f4df7aaf8f0f3608701f95912800c96c6124eb3613699cb151"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "203cb7f17515a68026eec4a43b9651fc2ad1cc3d521ef9d93ff4612e435a36ba2718ce4e12a69163698643e7f77cdaf1f621241fabb502b65d2b471592a8f069ae"
  ]
}
```

### 2.5 与智能合约交互

这里我们使用`cli_wallet`工具与智能合约交互，包括部署合约、更新合约、调用合约。

#### deploy\_contract

**接口定义：** `signed_transaction deploy_contract(string name, string account, string vm_type, string vm_version, string contract_dir, string fee_asset_symbol, bool broadcast)`

**功能说明：** 部署智能合约

**参数：**

参数 | 类型 | 描述
---|---|---
name | string | 合约账户名
account | string | 支付手续费的账户
vm_type | string | 设置为0
vm_version | string | 设置为0
contract_dir | string | 合约目录（绝对路径）
fee_asset_symbol | string | 支付手续费的资产名
broadcast | bool | 是否广播

**示例：** 

```bash
unlocked >>> deploy_contract hello0306 zhao-123 0 0 /Users/zhaoxiangfei/code/contracts_work/helloworld GXC true
deploy_contract hello0306 zhao-123 0 0 /Users/zhaoxiangfei/code/contracts_work/helloworld GXC true
{
  "ref_block_num": 60935,
  "ref_block_prefix": 792061404,
  "expiration": "2019-04-08T07:09:45",
  "operations": [[
      74,{
        "fee"
        ....
    }
    ]]
}
```

#### update\_contract

**接口定义：** `signed_transaction update_contract(string contract, optional<string> new_owner, string contract_dir, string fee_asset_symbol, bool broadcast)`

**功能说明：** 更新智能合约

**参数：**

参数 | 类型 | 描述
---|---|---
contract | string | 合约账户名
new_owner | string | 合约所有者，部署合约时支付手续费的账户
contract_dir | string | 合约目录（绝对路径）
fee_asset_symbol | string | 支付手续费的资产名
broadcast | bool | 是否广播

**示例：** 

```bash
unlocked >>> update_contract hello0306 zhao-123 /Users/zhaoxiangfei/code/contracts_work/helloworld GXC true
update_contract hello0306 zhao-123 /Users/zhaoxiangfei/code/contracts_work/helloworld GXC true
{
  "ref_block_num": 61224,
  "ref_block_prefix": 3331763629,
  "expiration": "2019-04-08T07:24:30",
  "operations": [[
      76,{
        "fee":
        ...
      }
   ]]
}
```

#### call\_contract

**接口定义：** `signed_transaction call_contract(string account, string contract, optional<asset> amount, string method, string arg, string fee_asset_symbol, bool broadcast)`

**功能说明：** 调用智能合约

**参数：**

参数 | 类型 | 描述
---|---|---
account | string | 调用账户
contract | string | 合约账户名
amount | optional\<asset\> | 附带的资产对象，不附带可以填null
method | string | 合约方法名
arg | string | 合约参数
fee_asset_symbol | string | 支付手续费的资产名
broadcast | bool | 是否广播

**示例：** 

```bash
unlocked >>> call_contract zhao-123 hello0306 null hi "{\"user\":\"gxchain\"}" GXC true
call_contract zhao-123 hello0306 null hi "{\"user\":\"gxchain\"}" GXC true
{
  "ref_block_num": 61393,
  "ref_block_prefix": 3449630089,
  "expiration": "2019-04-08T07:33:06",
  "operations": [[
      75,{
        "fee":
        ...
    }
    ]]
}
```

### 2.6 手工构造交易

以下内容为如何通过`cli_wallet`命令行工具构造交易，步骤如下

>begin_builder_transaction  
add_operation_to_builder_transaction  
set_fees_on_builder_transaction  
sign_builder_transaction

#### begin\_builder\_transaction

**接口定义：** `transaction_handle_type begin_builder_transaction()`

**功能说明：** 构建`transaction`实例，与其他构建交易的命令一起使用

**参数：** 无

**示例：**

```bash
unlocked >>> begin_builder_transaction
begin_builder_transaction
0
```

#### add\_operation\_to\_builder\_transaction

**接口定义：** `void add_operation_to_builder_transaction(transaction_handle_type transaction_handle, const operation & op)`

**功能说明：** 添加一个`operation`到构建的实例中，与其他构建交易的命令一起使用

**备注：** 该接口添加的operation结构可以使用`get_prototype_operation`命令获取，其中参数参见[operation类型说明](#operation)

**参数：**

参数 | 类型 | 描述
---|---|---
transaction_handle | transaction_handle_type | begin_builder_transaction的返回值，构建的交易的索引
op   | const operation & | 添加到transaction实例的operation对象

**示例：** 

```bash
unlocked >>> add_operation_to_builder_transaction 0 [0,{"from":"1.2.426","to":"1.2.425","amount":{"amount":3,"asset_id":"1.3.1"},"extensions":[]}]
add_operation_to_builder_transaction 0 [0,{"from":"1.2.426","to":"1.2.425","amount":{"amount":3,"asset_id":"1.3.1"},"extensions":[]}]
null
```

#### set\_fees\_on\_builder\_transaction

**接口定义：** `asset set_fees_on_builder_transaction(transaction_handle_type handle, string fee_asset)`

**功能说明：** 设置构建交易的手续费

**参数：** 

参数 | 类型 | 描述
---|---|---
handle | transaction_handle_type | begin_builder_transaction的返回值，构建的交易的索引
fee_asset   | string | 添加的手续费资产类型

**示例：**

```bash
unlocked >>> set_fees_on_builder_transaction 0 GXC
set_fees_on_builder_transaction 0 GXC
{
  "amount": 1000,
  "asset_id": "1.3.1"
}
```

#### sign\_builder\_transaction

**接口定义：** `signed_transaction sign_builder_transaction(transaction_handle_type transaction_handle, bool broadcast)`

**功能说明：** 签署构造的交易并选择广播

**参数：** 

参数 | 类型 | 描述
---|---|---
transaction_handle | transaction_handle_type | begin_builder_transaction的返回值，构建的交易的索引
broadcast   | bool | 是否广播

**示例：**

```bash
unlocked >>> sign_builder_transaction 0 true
sign_builder_transaction 0 true
{
  "ref_block_num": 62831,
  "ref_block_prefix": 3969632163,
  "expiration": "2019-04-08T08:46:03",
  "operations": [[
      0,{
        "fee": {
          "amount": 1000,
          "asset_id": "1.3.1"
        },
        "from": "1.2.426",
        "to": "1.2.425",
        "amount": {
          "amount": 3,
          "asset_id": "1.3.1"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "207e9b0b29eb4b0dec8de0f7e64334109a3f0ebd4ce62b429b961f29a77c26799f3511f42638fdcf40811f5dab64f530c9f1f6013808c6d0d4167476e5afa52345"
  ]
}
```

#### operation

```cpp
   typedef fc::static_variant<
            transfer_operation,
            limit_order_create_operation,
            limit_order_cancel_operation,
            call_order_update_operation,
            fill_order_operation,           // VIRTUAL
            account_create_operation,
            account_update_operation,//6
            account_whitelist_operation,//7
            account_upgrade_operation,//8
            account_transfer_operation,//9
            asset_create_operation,//10
            asset_update_operation,//11
            asset_update_bitasset_operation,//12
            asset_update_feed_producers_operation,//13
            asset_issue_operation,//14
            asset_reserve_operation,//15
            asset_fund_fee_pool_operation,//16
            asset_settle_operation,//17
            asset_global_settle_operation,//18
            asset_publish_feed_operation,//19
            witness_create_operation,//20
            witness_update_operation,//21
            proposal_create_operation,//22
            proposal_update_operation,//23
            proposal_delete_operation,//24
            withdraw_permission_create_operation,//25
            withdraw_permission_update_operation,//26
            withdraw_permission_claim_operation,//27
            withdraw_permission_delete_operation,//28
            committee_member_create_operation,//29
            committee_member_update_operation,//30
            committee_member_update_global_parameters_operation,//31
            vesting_balance_create_operation,//32
            vesting_balance_withdraw_operation,//33
            worker_create_operation,//34
            custom_operation,//35
            assert_operation,//36
            balance_claim_operation,//37
            override_transfer_operation,//38
            transfer_to_blind_operation,//39
            blind_transfer_operation,//40
            transfer_from_blind_operation,//41
            asset_settle_cancel_operation,  // VIRTUAL
            asset_claim_fees_operation,//43
            fba_distribute_operation,        // VIRTUAL
            account_upgrade_merchant_operation,//45
            account_upgrade_datasource_operation,//46
            stale_data_market_category_create_operation,//47, stale
            stale_data_market_category_update_operation,//48, stale
            stale_free_data_product_create_operation,//49, stale
            stale_free_data_product_update_operation,//50, stale
            stale_league_data_product_create_operation,//51, stale
            stale_league_data_product_update_operation,//52, stale
            stale_league_create_operation,//53, stale
            stale_league_update_operation,//54, stale
            data_transaction_create_operation, // 55
            data_transaction_update_operation, // 56
            pay_data_transaction_operation,  // 57
            account_upgrade_data_transaction_member_operation, // 58
            data_transaction_datasource_upload_operation, // 59
            data_transaction_datasource_validate_error_operation, // 60
            data_market_category_create_operation,//61
            data_market_category_update_operation,//62
            free_data_product_create_operation,//63
            free_data_product_update_operation,//64
            league_data_product_create_operation,//65
            league_data_product_update_operation,//66
            league_create_operation,//67
            league_update_operation,//68
            datasource_copyright_clear_operation,//69
            data_transaction_complain_operation,//70
            balance_lock_operation,//71
            balance_unlock_operation,//72
            proxy_transfer_operation, //73
            contract_deploy_operation, //74
            contract_call_operation, //75
            contract_update_operation, //76
            trust_node_pledge_withdraw_operation, //77
            inline_transfer_operation, //78
            inter_contract_call_operation //79
         > operation;
```

### 2.7 发起提案

上面我们手工构造了一笔交易并发送成功，以下我们便发起一个提案。发起提案的操作与构造手工交易类似，相较于构造交易，增加了一个发起提案的命令。操作步骤如下所示：

>begin_builder_transaction  
add_operation_to_builder_transaction  
propose_builder_transaction2  
set_fees_on_builder_transaction  
sign_builder_transaction

其中可以通过`propose_builder_transaction2`命令发起提案。

#### propose\_builder\_transaction2

**接口定义：** `signed_transaction propose_builder_transaction2(transaction_handle_type handle, string account_name_or_id, time_point_sec expiration, uint32_t review_period_seconds, bool broadcast)`

**功能说明：** 发起提案

**参数：** 

参数 | 类型 | 描述
---|---|---
transaction_handle | transaction_handle_type | begin_builder_transaction的返回值，构建的交易的索引
account_name_or_id   | string | 发起提案的账户
expiration | time_point_sec | 到期时间
review_period_seconds | uint32_t | 审核期
broadcast | bool | 是否广播

**示例：**

```bash
unlocked >>> propose_builder_transaction2 3 zhao-123 "2019-04-09T09:05:50" 3600 false
propose_builder_transaction2 3 zhao-123 "2019-04-09T09:05:50" 3600 false
{
  "ref_block_num": 63344,
  "ref_block_prefix": 2285425626,
  "expiration": "2019-04-08T09:12:33",
  "operations": [[
      22,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "fee_paying_account": "1.2.426",
        "expiration_time": "2019-04-09T09:05:50",
        "proposed_ops": [{
            "op": [
              0,{
                "fee": {
                  "amount": 1000,
                  "asset_id": "1.3.1"
                },
                "from": "1.2.425",
                "to": "1.2.426",
                "amount": {
                  "amount": 3,
                  "asset_id": "1.3.1"
                },
                "extensions": []
              }
            ]
          }
        ],
        "review_period_seconds": 3600,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f7cd974cba54f898559db7be25f9d5f70e1499131b278faa9f6eb03c8f6c9c8385239d23ce2e2de4ae62e4d6fe0f5a628afc99cfd3eec4a9a26dfe921823f582d"
  ]
}
```

以下是一个发起提案的示例:

```bash
#构建交易示例
unlocked >>> begin_builder_transaction
begin_builder_transaction
3
#添加operation
unlocked >>> add_operation_to_builder_transaction 3 [0,{"from":"1.2.425","to":"1.2.426","amount":{"amount":3,"asset_id":"1.3.1"},"extensions":[]}]
add_operation_to_builder_transaction 3 [0,{"from":"1.2.425","to":"1.2.426","amount":{"amount":3,"asset_id":"1.3.1"},"extensions":[]}]
null
#发起提案
unlocked >>> propose_builder_transaction2 3 zhao-123 "2019-04-09T09:05:50" 3600 false
propose_builder_transaction2 3 zhao-123 "2019-04-09T09:05:50" 3600 false
{
  "ref_block_num": 63344,
  "ref_block_prefix": 2285425626,
  "expiration": "2019-04-08T09:12:33",
  "operations": [[
      22,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "fee_paying_account": "1.2.426",
        "expiration_time": "2019-04-09T09:05:50",
        "proposed_ops": [{
            "op": [
              0,{
                "fee": {
                  "amount": 1000,
                  "asset_id": "1.3.1"
                },
                "from": "1.2.425",
                "to": "1.2.426",
                "amount": {
                  "amount": 3,
                  "asset_id": "1.3.1"
                },
                "extensions": []
              }
            ]
          }
        ],
        "review_period_seconds": 3600,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f7cd974cba54f898559db7be25f9d5f70e1499131b278faa9f6eb03c8f6c9c8385239d23ce2e2de4ae62e4d6fe0f5a628afc99cfd3eec4a9a26dfe921823f582d"
  ]
}
#设置手续费
unlocked >>> set_fees_on_builder_transaction 3 GXC
set_fees_on_builder_transaction 3 GXC
{
  "amount": 100,
  "asset_id": "1.3.1"
}
#签名并广播
unlocked >>> sign_builder_transaction 3 true
sign_builder_transaction 3 true
{
  "ref_block_num": 63350,
  "ref_block_prefix": 1608432681,
  "expiration": "2019-04-08T09:12:51",
  "operations": [[
      22,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "fee_paying_account": "1.2.426",
        "expiration_time": "2019-04-09T09:05:50",
        "proposed_ops": [{
            "op": [
              0,{
                "fee": {
                  "amount": 1000,
                  "asset_id": "1.3.1"
                },
                "from": "1.2.425",
                "to": "1.2.426",
                "amount": {
                  "amount": 3,
                  "asset_id": "1.3.1"
                },
                "extensions": []
              }
            ]
          }
        ],
        "review_period_seconds": 3600,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2068ca58484ad452fd8c1821927f244233b9dd82a7fe5098959ab598491def538e49ab4e1d9eb496a6793a75ef2747f9c183bdfaf8ab609d36cdf94e6fcbca203e"
  ]
}
```

### 2.8 生成brain\_key

可以使用`cli_wallet`生成GXChain公私钥对，输入如下命令：

```bash
unlocked >>> suggest_brain_key
suggest_brain_key
{
  "brain_priv_key": "JANE PUNLET SHINDLE TROPAL MORGAN FENBANK SMOLT HYMEN ABOUT ACINAR CARDED BILKER DAMINE CHYMIC FRINGE PROFIT",
  "wif_priv_key": "5Jki4BJqFhjDhujv9235e3RzXNBtJRzwEDr21sWr73ybUPwGgv6",
  "pub_key": "GXC58tBmaibqe6sYnwG9F2cVnqGkMoSzgnM8fVwVKUtbTWzjG6oTe"
}
```

