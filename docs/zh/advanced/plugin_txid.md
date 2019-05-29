# txid反查插件使用教程

## 1. 插件概述

一个轻便的txid反查插件，通过txid获取`transaction`结构，采用levedb数据库存储，仅保存不可逆区块中的交易。采用leveldb数据库，无需启动额外进程，且`witness_node`程序提供API接口查询。

插件名：`query_txid_plugin`

数据库：`leveldb`

## 2. 插件的编译与启动

默认发布的release程序，并未包含该插件。如需使用该插件，请按照如下步骤编译带插件的`witness_node`程序。

### 2.1 编译插件

#### 1. 下载leveldb和snappy依赖和并安装

``` sh
# 安装leveldb依赖
wget https://github.com/google/leveldb/archive/v1.20.tar.gz
tar xvf v1.20.tar.gz
rm -f v1.20.tar.gz
cd leveldb-1.20
make
sudo scp -r out-static/lib* out-shared/lib* "/usr/local/lib"
cd include
sudo scp -r leveldb /usr/local/include
sudo ldconfig
```
```sh
# 安装snappy依赖
git clone https://github.com/google/snappy.git
cd snappy
mkdir build
cd build && cmake ../ 
sudo make install
```

#### 2. 开启编译选项，支持leveldb插件

按如下方式修改`gxb-core/CMakeLists.txt`文件，开启编译选项

```cpp
set( LOAD_TXID_PLUGIN 1)
```

#### 3. 编译带插件的witness_node程序

在Ubuntu环境下编译：[Build Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)

在MacOS环境下编译：[Build OSX](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2.2 启动插件

#### 1. 启动带插件的witness_node程序

启动`witness_node`程序时，添加`plugins`参数，参数如下：

```bash
--plugins "witness query_txid"
```
#### 2. 验证插件是否正常工作

当前目录下，生成`trx_entry.db`文件。

## 3. 插件的使用说明

使用`get_transaction_rows`接口可以根据txid，获取transaction结构，示例如下：

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
