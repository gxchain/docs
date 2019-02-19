# 区块、operation和对象介绍

### 1. GXChain的区块结构

- 区块中包含了transaction，transaction包含了operation，opreation包含了调用合约、投票、转账等操作


- 通过GXChain的区块结构可以最直观的了解GXChain，一个完整的区块包含如下信息：

``` json
{
  "previous": "0092ab99afb1a7bc9107d85796ce7219214c5700",                   //上一个区块的ID
  "timestamp": "2018-12-12T07:44:18",                                       //生成区块的时间戳
  "witness": "1.6.30",                                                      //出块的公信节点对象ID
  "transaction_merkle_root": "b0e3fc1caf19cb57530f5b14ad903779221f487c",    //交易默克尔根
  "extensions": [],
  "witness_signature": "1f6335138fa77a52986ed0e0980ece86b919f84cf06647c2fdea3382578287c2e5403088d960cd75d5d5f134647bae80d1189e0a417f0d5bc127b294949864d662",    //公信节点签名
  "transactions": [         // block中包含的交易信息
    {
      "ref_block_num": 43928,               // 交易引用的区块信息（ref_block_num、ref_block_prefix皆来自之前的区块ID，可自己指定）
      "ref_block_prefix": 3666011859,
      "expiration": "2018-12-12T07:45:12",  // 交易到期时间
      "operations": [                       // transactions包含operations
        [
          75,       //operation操作码，75表示调用合约
          {
            "fee": {                    // 提供的手续费
              "amount": 13097,          // 带精度的手续费数量，比如精度为5，则除以100000
              "asset_id": "1.3.1"       // 手续费资产ID
            },
            "account": "1.2.882",       // 调用者账户ID
            "contract_id": "1.2.881",   // 合约账户ID
            "amount": {                 // 附带资产
              "amount": 135000,
              "asset_id": "1.3.1"
            },
            "method_name": "roll",      // action方法
            "data": "1e6632693277676439536b6c717065594a7a54736c6a3658316e4873797941008813",     //action参数
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [       // 交易签名
        "1f254c944ee1bc26437f0d093ef1f05269a728914fee247db0556c5cf2dac52158124c495ddb404be83f5f08ac7960593ae0e2ccc9372d138c873d68bd6b9a99b6"
      ],
      "operation_results": [        //操作执行结果，消耗的手续费、cpu、ram
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
  "block_id": "0092ab9a9e7e11137fa487176f7e10992fef1c47",       //此区块的ID
  "signing_key": "GXC6xSvFR3hohUGut8tsARuJPMPvkdmc3KnVg2KvrKw9cvLTbTP3u",   //出块公信节点的公钥
  "transaction_ids": [
    "ba2bdb39acda14e11bc645a41e6d0e0cba14921d"      //区块包含的交易ID
  ]
}
```
### 2. operation

GXChain区块链包含一系统operation, 每个operation对应一个Code，根据Code可以判断区块中包含哪些operation，比如区块 [1769028](https://block.gxb.io/#/block/1769028) 包含了一笔转帐交易，Code 0 对应转帐操作。 常用的Code和operation的对应关系:

| Code | Operation Type |
| :--- | :--- |
| 5 | 创建账户 |
| 6 | 更新账户 |
| 0 | 转账 |
| 73 | 代理转账 |
| 74 | 部署合约 |
| 75 | 调用合约 |
| 76 | 更新合约 |

### 3. GXChain上的对象

GXChain上相关类型的数据结构是通过对象保存的，对象ID作为其标识(格式为：x.x.x)，对象的instance id 为对象ID的最后一位。示例：nathan账户ID为1.2.17，instance id为17；GXC资产ID为1.3.1，instance id为1，常见对象类型如下：

| ID | Object Type |
| :--- | :--- |
| 1.2.x | 帐户对象 |
| 1.3.x | 资产对象 |
| 1.5.x | 理事会成员对象 |
| 1.6.x | 见证人对象 |
| 1.10.x | 提案对象 |
| 1.11.x | 操作历史对象 |
| 1.13.x | 待解冻余额对象 |
| 1.14.x | 预算项目对象 |
| 1.25.x | 忠诚计划冻结余额对象 |
| 2.0.0 | 系统全局参数对象 |
| 2.1.x | 动态参数对象 |
| 2.3.x | 资产动态参数对象 |
| 2.5.x | 帐户余额对象 |
| 2.6.x | 帐户统计对象 |
| 2.7.x | 交易对象 |
| 2.8.x | 区块摘要对象 |
| 2.9.x | 帐户交易历史对象 |
| 2.12.x | 见证人调度表对象 |
