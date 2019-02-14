# Confirm transaction

## Irreversible block and irreversible transaction

On GXChain, the block confirmed by 2/3 or more trustnodes is defined as a reversible block, and all transactions in the irreversible block become irreversible transactions. Therefore, judging whether a transaction is irreversible is achieved by judging whether the transaction appears in an irreversible block.

The irreversible transaction is of great significance and can be used for scenarios such as transfer confirmation and exchange deposit confirmation. The main idea is to query related transactions by traversing irreversible blocks.

## Step1: Get irreversible block height

Get dynamic global objects

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_dynamic_global_properties", []],
    "id": 1
}' https://node1.gxb.io/rpc
```

response:
``` json
{
    "id":1,
    "jsonrpc":"2.0",
    "result":{
        "id":"2.1.0",
        "head_block_number":16757465, // Latest block number
        "head_block_id":"00ffb2d9f6e344f2190a8dfba58baaadd49e76c4", // Latest block id
        "time":"2019-01-28T06:08:00", // Block time
        "current_witness":"1.6.52",
        "next_maintenance_time":"2019-01-28T06:40:00",
        "last_budget_time":"2019-01-28T05:40:00",
        "witness_budget":3065824,
        "accounts_registered_this_interval":2,
        "recently_missed_count":0,
        "current_aslot":16958091,
        "recent_slots_filled":"340282366920938463463374607431768211455",
        "dynamic_flags":0,
        "last_irreversible_block_num":16757449 // Last irreversible block number
    }
}
```

## Step2: Traversing irreversible blocks

For example: to determine whether a transaction with a txid of `9df2d2a2804c235bb16428c44f71de9468409ae7` is in an irreversible block, we will start query from the height of a block when sending the transaction, up to the height of the irreversible block, if this txid is found in the transaction_ids array, that proves that the transaction is irreversible, ie the transaction is finally confirmed by the network.

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_block", [17136876]],
    "id": 1
}' https://node1.gxb.io/rpc
```

response:
``` json
{
  "previous": "01057cebdee3cf922d8fa54c2f6a7e0f01e4528a",
  "timestamp": "2019-02-10T18:25:42",
  "witness": "1.6.83",
  "transaction_merkle_root": "e8fdfcbd168ae9da64826d93c2fb88d19ac5f9fc",
  "extensions": [],
  "witness_signature": "1f4aa0526cf96d40f1b7c971b9bd39c72818b5dce421b3ec4e730d2f720e4a3a8e2f6dfe2696f8a52e221f4bfb4f828eff8488d6c6131933fc85a01437893564db",
  "transactions": [
    {
      "ref_block_num": 31978,
      "ref_block_prefix": 301877440,
      "expiration": "2019-02-10T18:26:08",
      "operations": [
        [
          73,
          {
            "proxy_memo": "QmcPwEMDdceMqzGNc7CCuffG7GvQnCFDJGteZMhTNtSYaA",
            "fee": {
              "amount": 1,
              "asset_id": "1.3.5"
            },
            "request_params": {
              "from": "1.2.17539",
              "to": "1.2.46",
              "proxy_account": "1.2.693712",
              "amount": {
                "amount": 10000,
                "asset_id": "1.3.5"
              },
              "percentage": 1000,
              "memo": "0ddad68dcb985a8031ff1a60c7984d36",
              "expiration": "2019-02-10T18:55:38",
              "signatures": [
                "2016918af85ee94ce72cf46f0dd8c0dec3e55eba9cf7b892e582f15b10f2949a3f7a6e4f9bdb1470414da2098032132c2ceb7725a9183fe2fe0eaa2b87c087ab88"
              ]
            },
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "1b0a289b4322ea6f522f7400bc368673a60aec7c28da463fcebf338a591cf7d8c8081ca39533a7ae28346cea503745804064f3d9f946f9bb2a13d5a04a3f751cfc"
      ],
      "operation_results": [
        [
          0,
          {}
        ]
      ]
    },
    {
      "ref_block_num": 31979,
      "ref_block_prefix": 2463097822,
      "expiration": "2019-02-10T18:26:09",
      "operations": [
        [
          0,
          {
            "fee": {
              "amount": 1000,
              "asset_id": "1.3.1"
            },
            "from": "1.2.19643",
            "to": "1.2.1061995",
            "amount": {
              "amount": "20916437581",
              "asset_id": "1.3.1"
            },
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "1f1918828badce7d0f0a05ee5890aba48dafe1e59f9ceb3a680f8abdaa17546c827f4302988d51857d1b89188bb2ba426410015c2d627cfa2dfa44c441348d3105"
      ],
      "operation_results": [
        [
          0,
          {}
        ]
      ]
    },
    {
      "ref_block_num": 31979,
      "ref_block_prefix": 2463097822,
      "expiration": "2019-02-10T18:26:09",
      "operations": [
        [
          73,
          {
            "proxy_memo": "QmTK6dHnEixSNoWgB14j1ZujKhT1RjEgXvUVJtcdWwJoTX",
            "fee": {
              "amount": 1,
              "asset_id": "1.3.5"
            },
            "request_params": {
              "from": "1.2.3840",
              "to": "1.2.46",
              "proxy_account": "1.2.693712",
              "amount": {
                "amount": 10000,
                "asset_id": "1.3.5"
              },
              "percentage": 1000,
              "memo": "5bfa26ee65ddc08558a8bf0f01dfe93a",
              "expiration": "2019-02-10T18:55:41",
              "signatures": [
                "2041dafb5c38ecc885f730af79cf741f5fc50c0f5b24c4f2d9fbfca7a34009394b3efea5ef426f4f7eb864431c8f9462b31a0e08af7fa6367b99d5673c502fe473"
              ]
            },
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "1b15649c701dad9aa38fc14ef85e28de849637a390fd46765c2960073f3993522d6d2a0e795f5c30005877cddafbcd926a9d94be6a763607d24b5fbf9e2b03fef2"
      ],
      "operation_results": [
        [
          0,
          {}
        ]
      ]
    }
  ],
  "block_id": "01057cecdc861a10a7c52052a1f681212fd99547",
  "signing_key": "GXC7iFA4ejkfbYQ8f7xR8rQ6dEANLqqFHKm3evo9NgCbtbx9aivXd",
  "transaction_ids": [
    "b53c8626bae9e17a07457fccca350c8edac42888",
    "9df2d2a2804c235bb16428c44f71de9468409ae7",
    "26a893ed6f6fd1b9781262c750dc8905a9af2add"
  ]
}
```
