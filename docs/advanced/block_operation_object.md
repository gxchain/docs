# Introduction to block and transaction structure

## 1. Block structure of GXChain

- A block contains some transactions, a transaction contains the some operations, and a opreation contains the functions such as calling contract, voting, transfering, etc.


- We can get the most intuitive understanding of GXChain through GXChain's block structure. A complete block contains the following information:

``` json
{
  "previous": "0092ab99afb1a7bc9107d85796ce7219214c5700",                   //ID of the previous block
  "timestamp": "2018-12-12T07:44:18",                                       //Generate timestamp of the block
  "witness": "1.6.30",                                                      //object ID
  "transaction_merkle_root": "b0e3fc1caf19cb57530f5b14ad903779221f487c",    //Trading Merkelgen
  "extensions": [],
  "witness_signature": "1f6335138fa77a52986ed0e0980ece86b919f84cf06647c2fdea3382578287c2e5403088d960cd75d5d5f134647bae80d1189e0a417f0d5bc127b294949864d662",    //signature
  "transactions": [
    {
      "ref_block_num": 43928,               // The block information referenced by the transaction (ref_block_num, ref_block_prefix are from the previous block ID, which can be specified by itself)
      "ref_block_prefix": 3666011859,
      "expiration": "2018-12-12T07:45:12",  // Transaction expiration time
      "operations": [                       // transactions contains operations
        [
          75,       //Operation opcode, the number 75 indicates the call contract
          {
            "fee": {                    // Provided fee
              "amount": 13097,          // The amount of the fee, which contains accuracy information. For example, if the accuracy is 5, the fee should be divide by 100000.
              "asset_id": "1.3.1"       // Fee asset ID
            },
            "account": "1.2.882",       // Caller account ID
            "contract_id": "1.2.881",   // Contract account ID
            "amount": {                 // Assets attached to the transaction
              "amount": 135000,
              "asset_id": "1.3.1"
            },
            "method_name": "roll",      // action name
            "data": "1e6632693277676439536b6c717065594a7a54736c6a3658316e4873797941008813",     //action params
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [       // transaction signatures
        "1f254c944ee1bc26437f0d093ef1f05269a728914fee247db0556c5cf2dac52158124c495ddb404be83f5f08ac7960593ae0e2ccc9372d138c873d68bd6b9a99b6"
      ],
      "operation_results": [        //The execution result of the operation which includes the cost of handing、cpu and ram
        [
          3,
          {
            "billed_cpu_time_us": 505,
            "ram_usage_bs": 430,
            "fee": {
              "amount": 13097,
              "asset_id": "1.3.1"
            }
          }
        ]
      ]
    }
  ],
  "block_id": "0092ab9a9e7e11137fa487176f7e10992fef1c47",       //block id
  "signing_key": "GXC6xSvFR3hohUGut8tsARuJPMPvkdmc3KnVg2KvrKw9cvLTbTP3u",   //Public key of the TrustNode
  "transaction_ids": [
    "ba2bdb39acda14e11bc645a41e6d0e0cba14921d"      //transaction ids
  ]
}
```
## 2. Operation

The GXChain block contains multiple operations, and each operation corresponds to a Code number. According to the Code numbers, We can judge which operations are included in the block according to Code numbers. For example, the block [1769028](https://block.gxb.io/#/block/1769028) contains a transfer transaction, and Code 0 corresponds to the transfer operation. The correspondence between Code and operation which are often used :

| Code | Operation Type |
| :--- | :--- |
| 0 | transfer |
| 5 | create account |
| 6 | update account |
| 73 | proxy transfer |
| 74 | deploy contract |
| 75 | call contract |
| 76 | update contract |

## 3. Object on GXChain

The data structure of the related type on GXChain is saved by the object, the object ID is its identifier (format: x.x.x), and the instance id of the object is the last digit of the object ID. Example: The nathan account ID is 1.2.17, the instance id is 17; the GXC asset ID is 1.3.1, the instance id is 1, and the common object types are as follows:

| ID | Object Type |
| :--- | :--- |
| 1.2.x | Account object |
| 1.3.x | Asset object |
| 1.5.x | Committee object |
| 1.6.x | Witness object |
| 1.10.x | Proposal object |
| 1.11.x | Operation history object |
| 1.13.x | To unfreeze balance object |
| 1.14.x | Budget item object |
| 1.25.x | Loyalty program freezes balance object |
| 2.0.0 | System global parameter object |
| 2.1.x | Dynamic parameter object |
| 2.3.x | Asset dynamic parameter object |
| 2.5.x | Account balance object |
| 2.6.x | Account statistics object |
| 2.7.x | Transaction object |
| 2.8.x | Block abstract object |
| 2.9.x | Account transaction history object |
| 2.12.x | Witness schedule object|
