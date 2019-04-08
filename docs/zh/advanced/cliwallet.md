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

解锁钱包后，界面显示为`unlocked`状态，此时便可以通过钱包进行复杂功能的操作。

### 2.2 获取链上信息

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

### 2.3 向其他账户转账

### 2.4 与智能合约交互

### 2.5 发起提案

### 2.5 手工构造交易

### 2.6 生成brain\_key




