# 反序列化区块

## 调用合约operation

示例区块：10001177(testnet)，区块原始数据
```hex
00 98 9b 18 c6 89 f5 33 c1 4e 0e d8 2d b5 66 2d da 88 cb 99 58 e1 24 5c 1a 8d 56 7d fa ee 44 
9d 2f 6a 45 c9 3d 8d ce d7 45 52 e5 6d 3f 00 20 70 74 4a ff 98 3b 6a 38 9f 0a 26 cd f8 d7 46 
7d d5 fd cd 60 b6 25 2e 44 6c 18 fb 83 e7 f6 f5 42 68 26 e8 68 11 a6 46 a1 64 43 67 1e 26 49 
3c e4 7e a3 cf ef 5b a1 d8 a8 1d 75 93 4d 52 66 c4 03 01 18 9b c6 89 f5 33 67 e1 24 5c 01 4b 
64 00 00 00 00 00 00 00 01 aa 03 86 0a 00 00 00 00 00 00 00 80 6b 10 0f 68 65 6c 6c 6f 68 65 
6c 6c 6f 68 65 6c 6c 6f 00 00 01 1f 3f 6b ae ac 50 34 a2 c4 61 48 c1 3b 16 0f 02 2d ee c6 55 
15 d0 39 10 be 56 4b 8a 23 d8 16 9a 41 5e 49 32 94 9e fe d4 77 c0 63 2e 0c 7a b2 60 70 58 31 
07 a4 57 82 08 41 04 66 48 8d 62 6c 49 d7 01 03 7f 00 00 00 00 00 00 00 64 00 00 00 00 00 00 
00 01
```
```json
{
  "previous": "00989b18c689f533c14e0ed82db5662dda88cb99", //00989b18c689f533c14e0ed82db5662dda88cb99
  "timestamp": "2018-12-27T14:27:36",//5c24e158
  "witness": "1.6.26",//1a
  "transaction_merkle_root": "8d567dfaee449d2f6a45c93d8dced74552e56d3f",//8d567dfaee449d2f6a45c93d8dced74552e56d3f
  "extensions": [],//extensions_num:00
  "witness_signature": "2070744aff983b6a389f0a26cdf8d7467dd5fdcd60b6252e446c18fb83e7f6f5426826e86811a646a16443671e26493ce47ea3cfef5ba1d8a81d75934d5266c403",//2070744aff983b6a389f0a26cdf8d7467dd5fdcd60b6252e446c18fb83e7f6f5426826e86811a646a16443671e26493ce47ea3cfef5ba1d8a81d75934d5266c403
  "transactions": [//(transaction_numbers) 01
    {
      "ref_block_num": 39704, // 9b18
      "ref_block_prefix": 871729606, // 33f589c6
      "expiration": "2018-12-27T14:27:51", // 5c24e167
      "operations": [  //operation_nums: 01
        [
          75,// 4b
          {
            "fee": { // 
              "amount": 100, // 6400000000000000
              "asset_id": "1.3.1" // 01
            },
            "account": "1.2.426", // aa03
            "contract_id": "1.2.1286", // 860a
            						   // asset_num : 00
            "method_name": "hi", // 000000000000806b
            "data": "0f68656c6c6f68656c6c6f68656c6c6f",// 100f68656c6c6f68656c6c6f68656c6c6f(size+buffer)
            "extensions": [] // extensions_num: 00
          }
        ]
      ],
      "extensions": [], // extensions_num: 00
      "signatures": [ // sig_num :01 
        "1f3f6baeac5034a2c46148c13b160f022deec65515d03910be564b8a23d8169a415e4932949efed477c0632e0c7ab26070583107a4578208410466488d626c49d7" // 1f3f6baeac5034a2c46148c13b160f022deec65515d03910be564b8a23d8169a415e4932949efed477c0632e0c7ab26070583107a4578208410466488d626c49d7
      ],
      "operation_results": [ // op_num : 01
        [
          3, // 03
          {
            "billed_cpu_time_us": 127, // 7f000000
            "ram_usage_bs": 0,// 00000000
            "fee": {
              "amount": 100, // 6400000000000000
              "asset_id": "1.3.1" // 01
            }
          }
        ]
      ]
    }
  ],
  "block_id": "00989b19d6e385ad0181701a04e75b5a73996f17",
  "signing_key": "GXC6ePe1hxLtzXAHgBKNZpHU5VhknQo2r3CWd8j3zht4NzPMxq7AX",
  "transaction_ids": [
    "41c3ccd99a91351342b1220eb98b529a9db544f0"
  ]
}

```
## 转账operation 

示例区块：10012266(testnet)，区块原始数据

```
00 98 c6 69 9f 6e 52 8f ab 47 de 61 8a 91 04 cf 85 32 99 43 7a 85 25 5c 14 8d f8 d7 f0 3c ae 
07 63 e8 63 67 b4 0a 8a 14 42 71 b2 fb c9 00 20 4b e6 dc 1b 72 61 5c 7a 96 29 0a f6 e5 6f 7b 
ce f0 07 4f ef 56 2e 0a 24 8a bc ee c1 c8 4a 94 51 24 c5 2f 36 95 0d 30 56 93 2b 06 04 17 b3 
03 9e ae ff 55 c7 10 c9 23 5b 39 7d 99 67 79 79 35 7c 01 69 c6 9f 6e 52 8f 88 85 25 5c 01 00 
9b 04 00 00 00 00 00 00 01 aa 03 c9 09 a0 86 01 00 00 00 00 00 01 01 03 ea 46 82 e1 84 b0 cf 
5f e0 23 2f 48 cb 2c 15 1c 6a 16 e4 16 76 0a bb cb 66 af ca d8 c4 45 e7 b2 02 f0 1f 61 9e 03 
b8 4b b8 1d b3 46 14 74 e5 a7 a3 21 66 d4 f7 b1 31 39 44 42 f3 71 f8 a2 c0 90 20 c4 8a 55 91 
f2 67 01 00 10 40 ca 24 cd 4f dd 0f c1 31 41 15 44 2f fc e4 1f 00 00 01 20 49 28 c6 b5 bd 47 
3f a4 43 ff c2 5c 69 b1 9b 2d 3e 47 8b fa 91 f3 77 c1 35 95 b9 23 49 42 3d 0d 24 ed 00 17 86 
8a 21 19 d6 b1 44 63 dc 14 2b 9a a0 34 b3 d1 75 85 0d 3b 78 a2 33 80 ea ff 3a 79 01 00

```
```json
{
  "previous": "0098c6699f6e528fab47de618a9104cf85329943", // 0098c6699f6e528fab47de618a9104cf85329943
  "timestamp": "2018-12-28T02:07:54", // 5c25857a
  "witness": "1.6.20", // 14
  "transaction_merkle_root": "8df8d7f03cae0763e86367b40a8a144271b2fbc9", // 8df8d7f03cae0763e86367b40a8a144271b2fbc9
  "extensions": [], // extensions_num: 00
  "witness_signature": "204be6dc1b72615c7a96290af6e56f7bcef0074fef562e0a248abceec1c84a945124c52f36950d3056932b060417b3039eaeff55c710c9235b397d99677979357c", // 204be6dc1b72615c7a96290af6e56f7bcef0074fef562e0a248abceec1c84a945124c52f36950d3056932b060417b3039eaeff55c710c9235b397d99677979357c
  "transactions": [ // transaction_num: 01
    {
      "ref_block_num": 50793, // c669
      "ref_block_prefix": 2404544159, // 8f526e9f
      "expiration": "2018-12-28T02:08:08", // 5c258588
      "operations": [ // operation_num: 01
        [
          0, // 00 
          {
            "fee": {
              "amount": 1179, //9b04000000000000
              "asset_id": "1.3.1" //01
            },
            "from": "1.2.426", // aa03
            "to": "1.2.1225", // c909
            "amount": {
              "amount": 100000, // a086010000000000
              "asset_id": "1.3.1" //01
            },
            "memo": {
              "from": "GXC8cQnHYf2RGgeAEAQKAT3i9Hz9rxJagcXcXD8Znvtj16vYybwxE", // 03ea4682e184b0cf5fe0232f48cb2c151c6a16e416760abbcb66afcad8c445e7b2
              "to": "GXC6iExnwwd5HtPXuyo7PHD4CxDdw8S3XDzR2ZjD9tLD3bD7B48bZ",// 02f01f619e03b84bb81db3461474e5a7a32166d4f7b131394442f371f8a2c09020
              "nonce": "395766494759620", // c48a5591f2670100
              "message": "40ca24cd4fdd0fc1314115442ffce41f" // 1040ca24cd4fdd0fc1314115442ffce41f
            },
            "extensions": [] // extensions_num: 00
          }
        ]
      ],
      "extensions": [], // extensions_num : 00
      "signatures": [ // sig_num :01
        "204928c6b5bd473fa443ffc25c69b19b2d3e478bfa91f377c13595b92349423d0d24ed0017868a2119d6b14463dc142b9aa034b3d175850d3b78a23380eaff3a79" //01204928c6b5bd473fa443ffc25c69b19b2d3e478bfa91f377c13595b92349423d0d24ed0017868a2119d6b14463dc142b9aa034b3d175850d3b78a23380eaff3a79
      ],
      "operation_results": [ // operations_results_num: 01 
        [
          0, // 00
          {}
        ]
      ]
    }
  ],
  "block_id": "0098c66ad2f4b3e15be34ad86fa59fc74dd8ca16",
  "signing_key": "GXC6ePe1hxLtzXAHgBKNZpHU5VhknQo2r3CWd8j3zht4NzPMxq7AX",
  "transaction_ids": [
    "b1d935a58514ea5d4e6d73b2a741b94a9d91f717"
  ]
}

```

## 创建账户operation

示例区块：9841632(testnet)，区块原始数据

```
00 96 2b df f6 22 6c 04 69 84 db 0f 52 05 c9 0d 70 c9 5f 01 b2 98 1c 5c 26 0d e9 f4 e5 a6 b0 
c2 64 34 41 54 9d a4 cf 11 b1 68 3c ab c0 00 1f 05 b5 4e a6 bb 69 e0 4b 9c d9 9b 67 0c cc 64 
1c 8b 37 30 17 b0 ca 50 6a 36 28 ed 52 40 94 18 31 3c 2e 2e 97 2d 13 e8 31 7f 4f a6 4a db 9d 
d3 f1 ef 9d 5f 21 35 29 10 70 de 2f 79 9a 5f b5 42 56 01 df 2b f6 22 6c 04 cd 98 1c 5c 01 05 
66 00 00 00 00 00 00 00 01 fb 01 fb 01 00 00 09 7a 68 61 6f 2d 31 32 31 32 01 00 00 00 00 01 
03 4f 12 dc f1 34 d5 f6 3b ef 5a cc b4 29 50 ff 11 d4 7d 0c f2 b8 e2 e5 8a be 5d 7f e2 9c ca 
6a 26 01 00 00 01 00 00 00 00 01 02 f0 1f 61 9e 03 b8 4b b8 1d b3 46 14 74 e5 a7 a3 21 66 d4 
f7 b1 31 39 44 42 f3 71 f8 a2 c0 90 20 01 00 00 02 f0 1f 61 9e 03 b8 4b b8 1d b3 46 14 74 e5 
a7 a3 21 66 d4 f7 b1 31 39 44 42 f3 71 f8 a2 c0 90 20 05 00 00 00 00 00 00 00 00 01 20 27 da 
fd f1 1e 9e f5 16 d1 a5 28 77 61 77 88 10 2c 4a d2 d2 cd 2f 3b 3a aa 5b a6 e3 6f f7 c5 29 60 
df b0 95 f1 33 94 64 7b 09 5a 9b bd 30 da 25 1a fa d7 ed fe 68 82 4a e3 96 f0 98 60 33 3b be 
01 01 c9 04 00 00 00 00 02 01
```

```json
{
  "previous": "00962bdff6226c046984db0f5205c90d70c95f01",//00962bdff6226c046984db0f5205c90d70c95f01
  "timestamp": "2018-12-21T07:39:30",//5c1c98b2
  "witness": "1.6.38",// 26
  "transaction_merkle_root": "0de9f4e5a6b0c2643441549da4cf11b1683cabc0",// 0de9f4e5a6b0c2643441549da4cf11b1683cabc0
  "extensions": [], // extensions_num: 00 
  "witness_signature": "1f05b54ea6bb69e04b9cd99b670ccc641c8b373017b0ca506a3628ed52409418313c2e2e972d13e8317f4fa64adb9dd3f1ef9d5f2135291070de2f799a5fb54256",//1f05b54ea6bb69e04b9cd99b670ccc641c8b373017b0ca506a3628ed52409418313c2e2e972d13e8317f4fa64adb9dd3f1ef9d5f2135291070de2f799a5fb54256
  "transactions": [ // transactions_num : 01
    {
      "ref_block_num": 11231, //2bdf
      "ref_block_prefix": 74195702, // 046c22f6
      "expiration": "2018-12-21T07:39:57", // 5c1c98cd
      "operations": [ // operation_num : 01
        [
          5, //05 
          {
            "fee": {
              "amount": 102, //6600000000000000
              "asset_id": "1.3.1" //01
            },
            "registrar": "1.2.251",// fb01
            "referrer": "1.2.251", // fb01
            "referrer_percent": 0, // 0000
            "name": "zhao-1212",// 097a68616f2d31323132
            "owner": {
              "weight_threshold": 1, //01000000
              "account_auths": [], // account_auths_num: 00 
              "key_auths": [ // num:01
                [
                  "GXC7S4MuFXR5cgBFXCrjZUSLNPSRHcpq3mB6XxaFvMTp2abZoSTTp", // 034f12dcf134d5f63bef5accb42950ff11d47d0cf2b8e2e58abe5d7fe29cca6a26
                  1// 0100
                ]
              ],
              "address_auths": [] // address_auths_num : 00
            },
            "active": {
              "weight_threshold": 1, // 01000000
              "account_auths": [], // account_auths_num: 00 
              "key_auths": [ // num:01
                [
                  "GXC6iExnwwd5HtPXuyo7PHD4CxDdw8S3XDzR2ZjD9tLD3bD7B48bZ", //02f01f619e03b84bb81db3461474e5a7a32166d4f7b131394442f371f8a2c09020
                  1 //0100
                ]
              ],
              "address_auths": [] // address_auths_num : 00
            },
            "options": {
              "memo_key": "GXC6iExnwwd5HtPXuyo7PHD4CxDdw8S3XDzR2ZjD9tLD3bD7B48bZ",//02f01f619e03b84bb81db3461474e5a7a32166d4f7b131394442f371f8a2c09020
              "voting_account": "1.2.5",//05
              "num_witness": 0,//0000
              "num_committee": 0,//0000
              "votes": [],//votes_num: 00
              "extensions": [] // extensions_num: 00
            },
            "extensions": {} // 00
          }
        ]
      ],
      "extensions": [], //extensions_num: 00
      "signatures": [ //sig_num:01
        "2027dafdf11e9ef516d1a52877617788102c4ad2d2cd2f3b3aaa5ba6e36ff7c52960dfb095f13394647b095a9bbd30da251afad7edfe68824ae396f09860333bbe"//2027dafdf11e9ef516d1a52877617788102c4ad2d2cd2f3b3aaa5ba6e36ff7c52960dfb095f13394647b095a9bbd30da251afad7edfe68824ae396f09860333bbe
      ],
      "operation_results": [ // operation_results_num:01
        [
          1, //01
          "1.2.1225"//c904
        ]
      ]
    }
  ],
  "block_id": "00962be0be47bebe4e3b1114e16f0a709955eb14",
  "signing_key": "GXC54DxZy9HNU5es1GSLGJdwFjCGpkr9qxUwWoDm3nAwX4uRQiKFp",
  "transaction_ids": [
    "dab079e827b97ec5acc92601f38f34dbbb15df06"
  ]
}
```
## 更新账户operation

示例区块：10022148(testnet)，区块原始数据

```
00 98 ed 03 91 84 75 a7 20 a2 62 ad 31 40 b3 cf 4d 93 a2 91 c3 0b 26 5c 19 38 24 fb 41 55 d5 
82 d9 a5 3b 5b 9f b5 bc 2b af b1 25 90 1d 00 20 6f 9b 29 bf e7 5f f5 c8 12 ba 65 d6 90 e3 bf 
39 35 a7 81 bb 6f 8d 69 ed 63 62 18 3d 90 6c 80 d8 5b ad 11 fd 19 f8 46 17 99 0b c8 0d 61 56 
dd 95 aa 40 eb d9 7a 51 23 88 c9 19 05 96 24 a9 09 4f 01 03 ed 91 84 75 a7 d2 0b 26 5c 01 06 
6a 00 00 00 00 00 00 00 01 aa 03 00 00 01 03 ea 46 82 e1 84 b0 cf 5f e0 23 2f 48 cb 2c 15 1c 
6a 16 e4 16 76 0a bb cb 66 af ca d8 c4 45 e7 b2 05 02 00 02 00 04 00 2f 00 00 01 30 00 00 00 
61 00 00 01 62 00 00 00 00 00 01 20 3c b4 31 8d 01 d6 d4 73 f4 ab 4a 9a 0a ed 07 b5 cd 80 6e 
fb ef cc bf 7a d5 11 aa 19 c8 5a 58 5d 6d 51 c2 27 60 e8 da 19 d3 34 09 53 42 44 07 eb 63 67 
b4 88 a8 be 1d 8d 73 11 13 ce f0 a7 0e eb 01 00

```

```json
{
  "previous": "0098ed03918475a720a262ad3140b3cf4d93a291",//0098ed03918475a720a262ad3140b3cf4d93a291
  "timestamp": "2018-12-28T11:40:51",//5c260bc3
  "witness": "1.6.25", //19
  "transaction_merkle_root": "3824fb4155d582d9a53b5b9fb5bc2bafb125901d",//3824fb4155d582d9a53b5b9fb5bc2bafb125901d
  "extensions": [], // extensions_num: 00
  "witness_signature": "206f9b29bfe75ff5c812ba65d690e3bf3935a781bb6f8d69ed6362183d906c80d85bad11fd19f84617990bc80d6156dd95aa40ebd97a512388c919059624a9094f",//206f9b29bfe75ff5c812ba65d690e3bf3935a781bb6f8d69ed6362183d906c80d85bad11fd19f84617990bc80d6156dd95aa40ebd97a512388c919059624a9094f
  "transactions": [ //transactions_num: 01
    {
      "ref_block_num": 60675, //ed03
      "ref_block_prefix": 2809496721, // a7758491
      "expiration": "2018-12-28T11:41:06", //5c260bd2
      "operations": [ // operations_num:01
        [
          6, // 06
          {
            "fee": {
              "amount": 106,	// 6a00000000000000
              "asset_id": "1.3.1" // 01
            },
            "account": "1.2.426", // aa03
            						// owner_authority: 00
            						// active_authority: 00
            						// option: 01
            "new_options": {
              "memo_key": "GXC8cQnHYf2RGgeAEAQKAT3i9Hz9rxJagcXcXD8Znvtj16vYybwxE",//03ea4682e184b0cf5fe0232f48cb2c151c6a16e416760abbcb66afcad8c445e7b2
              "voting_account": "1.2.5", //05
              "num_witness": 2, //0200
              "num_committee": 2, // 0200
              "votes": [ // votes_num: 04 
                "0:47", // 002f0000
                "1:48", // 01300000
                "0:97", // 00610000
                "1:98"  // 01620000
              ],
              "extensions": [] // extensions_num: 00
            },
            "extensions": {} // 00
          }
        ]
      ],
      "extensions": [], // extensions_num: 00
      "signatures": [ //sig_num:01
        "203cb4318d01d6d473f4ab4a9a0aed07b5cd806efbefccbf7ad511aa19c85a585d6d51c22760e8da19d3340953424407eb6367b488a8be1d8d731113cef0a70eeb" //203cb4318d01d6d473f4ab4a9a0aed07b5cd806efbefccbf7ad511aa19c85a585d6d51c22760e8da19d3340953424407eb6367b488a8be1d8d731113cef0a70eeb
      ],
      "operation_results": [ //operation_results_num: 01 
        [
          0, // 00
          {}
        ]
      ]
    }
  ],
  "block_id": "0098ed049265e46df58fe962a6bd44b013844259",
  "signing_key": "GXC6ePe1hxLtzXAHgBKNZpHU5VhknQo2r3CWd8j3zht4NzPMxq7AX",
  "transaction_ids": [
    "4117a06ab501971202bddf60268559f0313c5577"
  ]
}

```