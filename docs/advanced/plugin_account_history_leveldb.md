# account_history_leveldb plugin tutorial

## 1. Overview

A lightweight operations query plugin that can get all relative operations of accounts, including virtual operations .With the leveldb database, there is no need to start additional processes, and the `witness_node` program provides API  queries.

Plugin name: `account_history_leveldb`

Database: `leveldb`

Configuration:

| BlockChain | Ram | Disk |
| :--- | :--- | :-- |
| Mainnet | 32G | 500G |
| Testnet | 16G | 200G |


## 2. Compilation and startup

The release program does not include the plugin. If you want to use the plugin, please follow the steps below to compile the program with the plugin. Also you can download the release program with plugins.

### 2.1 Compilation

#### 1. Download leveldb dependencies and install

``` sh
# install leveldb
wget https://github.com/google/leveldb/archive/v1.20.tar.gz
tar xvf v1.20.tar.gz
rm -f v1.20.tar.gz
cd leveldb-1.20
make
sudo cp -r out-static/lib* out-shared/lib* "/usr/local/lib"
cd include
sudo cp -r leveldb /usr/local/include
sudo ldconfig
```
```sh
# install snappy
git clone https://github.com/google/snappy.git
cd snappy
mkdir build
cd build && cmake ../
sudo make install
```

#### 2. Open compile option, support leveldb plugin

Modify the `gxb-core/CMakeLists.txt` file as follows to enable compilation options

```cpp
set( LOAD_ACCOUNT_HISTORY_LEVELDB_PLUGIN 1)
```

#### 3. Compile the witness_node program with plugins

Compile in Ubuntu environment: [Build Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)

Compile in MacOS environment: [Build OSX](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2.2 Start

#### 1. Start the witness_node program with plugins

When starting the `witness_node` program, add the `plugins` parameter with the following parameters,that's a example for testnet node:

```bash
nohup ./witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:6789" --seed-nodes='["testnet.gxchain.org:6789"]' --plugins "witness account_history_leveldb data_transaction " --genesis-json genesis.json --fast-replay  1>nohup.out 2>&1  &
```

#### 2. Verify that the plugin is working properly

In the current directory, the `op_entry.db` file is generated.

## 3. Instructions for using the plugin
#### `get_account_relative_ops`

Returns the specified position and number of operations related to the account according to the account ID

#### Parameter Description

<table>
    <tr>
        <th>Request parameter</th>
        <th colspan="2">Parameter Description
</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_account_relative_ops</td>
    </tr>
    <tr>
        <td rowspan="5" >API Parameters</td>   
    </tr>
    <tr>
        <th>API Parameters</th>
        <th>API Parameter Description</th>
    </tr>
    <tr>
        <td>account_id</td>
        <td>account_id</td>
    </tr>
    <tr>
        <td>start</td>
        <td>starting number,should be greater than or equal to 1</td>
    </tr>
    <tr>
        <td>limit</td>
        <td>number of limit, up to 100</td>
    </tr>
    
</table>


#### Example
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_account_relative_ops", ["1.2.4629","2","2"]],
        "id": 1
}' 127.0.0.1:28090 | json_pp
```

**response:**
```json
{
   "result" : {
      "ops" : [
         {
            "is_virtual" : true,//whether the operation is virtual or not
            "op_index" : "1.2.4629_2",//the index of operation
            "op" : [//operation's information
               79,
               {
                  "sender_contract" : "1.2.4629",
                  "data" : "07090000000000000568656c6c6f",
                  "fee" : {
                     "amount" : 0,
                     "asset_id" : "1.3.1"
                  },
                  "contract_id" : "1.2.4628",
                  "method_name" : "inlinecall",
                  "extensions" : []
               }
            ]
         },
         {
            "op_index" : "1.2.4629_3",
            "op" : [
               75,
               {
                  "account" : "1.2.3297",
                  "method_name" : "inlinecall",
                  "extensions" : [],
                  "data" : "14120000000000000a696e6c696e65626a6e32",
                  "fee" : {
                     "asset_id" : "1.3.1",
                     "amount" : 100
                  },
                  "contract_id" : "1.2.4629"
               }
            ],
            "is_virtual" : false
         }
      ],
      "total_relative_ops_number" : 4 //the number of all the relative operations the account have
   },
   "id" : 1,
   "jsonrpc" : "2.0"
}
```