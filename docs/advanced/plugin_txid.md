# Txid query plugin tutorial

## 1. Overview

A lightweight txid query plugin that gets the `transaction` structure via txid and uses the levedb database to store only the transactions in the irreversible block. With the leveldb database, there is no need to start additional processes, and the `witness_node` program provides API interface queries.

Plugin name: `query_txid_plugin`

Database: `leveldb`

## 2. Compilation and startup

### 2.1 Compilation

#### 1. Download leveldb dependencies and install

- Ubuntu：
```bash
mkdir ~/leveldb_dep
cd ~/leveldb_dep
git clone https://github.com/google/leveldb.git
cd leveldb
mkdir -p build && cd build
cmake -DCMAKE_BUILD_TYPE=Release .. && cmake --build .
sudo make install
```
- MacOS：
```bash
brew install leveldb
```

#### 2. Open compile option, support leveldb plugin

Modify the `gxchain/CMakeLists.txt` file as follows to enable compilation options

```cpp
set( LOAD_TXID_PLUGIN 0)
```

#### 3. Compile the witness_node program with plugins

Compile in Ubuntu environment: [Build Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)

Compile in MacOS environment: [Build OSX](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2.2 Start

#### 1. Start the witness_node program with plugins

Modify the `config.ini` file and start the `witness_node` program. If you want to save all transaction information, be sure to replay the block.
```bash
# Plugin to save txid records
load-query-txid-plugin = true
```

#### 2. Verify that the plugin is working properly

In the current directory, the `trx_entry.db` file is generated.

## 3. Instructions for using the plugin

Use the `get_transaction_rows` interface to get the transaction structure based on txid, as shown in the following example:

```bash
➜ curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_transaction_rows", ["730ab1d94b77232c04f79a83480bf5b2721d0837"]],
        "id": 1
}' 127.0.0.1:28090 | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1094  100   934  100   160  92907  15915 --:--:-- --:--:-- --:--:--  101k
{
   "jsonrpc" : "2.0",
   "id" : 1,
   "result" : {
      "ref_block_num" : 133,
      "expiration" : "2017-12-14T03:45:00",
      "signatures" : [
         "2067dc299394b083c2138ba60df4839dbe0795efeecf29f8585955b975f3390c6d10bc55de4717c32770803fdc61364400e994a0194039f800058bccadec9e3686"
      ],
      "extensions" : [],
      "operation_results" : [
         [
            1,
            "1.2.20"
         ]
      ],
      "ref_block_prefix" : 636542480,
      "operations" : [
         [
            5,
            {
               "extensions" : {},
               "owner" : {
                  "weight_threshold" : 1,
                  "address_auths" : [],
                  "key_auths" : [
                     [
                        "GXC7vSbriJrEia1kK3A9sQ2LS8e9qmB7hojnkakJ39zomAba5jTek",
                        1
                     ]
                  ],
                  "account_auths" : []
               },
               "referrer" : "1.2.17",
               "name" : "gxb-forum",
               "referrer_percent" : 1000,
               "registrar" : "1.2.17",
               "active" : {
                  "weight_threshold" : 1,
                  "account_auths" : [],
                  "address_auths" : [],
                  "key_auths" : [
                     [
                        "GXC7vSbriJrEia1kK3A9sQ2LS8e9qmB7hojnkakJ39zomAba5jTek",
                        1
                     ]
                  ]
               },
               "fee" : {
                  "amount" : 114453,
                  "asset_id" : "1.3.0"
               },
               "options" : {
                  "num_committee" : 0,
                  "votes" : [],
                  "memo_key" : "GXC7vSbriJrEia1kK3A9sQ2LS8e9qmB7hojnkakJ39zomAba5jTek",
                  "voting_account" : "1.2.5",
                  "num_witness" : 0,
                  "extensions" : []
               }
            }
         ]
      ]
   }
}
```