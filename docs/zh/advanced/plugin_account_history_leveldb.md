# 账户相关操作查询插件使用教程

## 1. 插件概述

一个轻便operation记录查询插件，可查询所有用户的所有操作，包括虚拟操作。采用levedb数据库存储，无需启动额外进程，且`witness_node`程序提供API接口查询。

插件名：`account_history_leveldb`

数据库：`leveldb`

所需最低配置：

| 网络 | 内存 | 磁盘 |
| :--- | :--- | :-- |
| 主网 | 32G | 500G |
| 测试网 | 16G | 200G |


## 2. 插件的编译与启动

默认发布的release程序，并未包含该插件。如需使用该插件，请按照如下步骤编译带插件的`witness_node`程序，或者直接下载包含插件的release包。

### 2.1 编译插件

#### 1. 下载leveldb和snappy依赖和并安装

``` sh
# 安装leveldb依赖
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
set( LOAD_ACCOUNT_HISTORY_LEVELDB_PLUGIN 1)
```

#### 3. 编译带插件的witness_node程序

在Ubuntu环境下编译：[Build Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)

在MacOS环境下编译：[Build OSX](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2.2 启动插件

#### 1. 启动带插件的witness_node程序

启动`witness_node`程序时，添加`plugins`参数，测试网节点启动参数例子如下：

```bash
nohup ./witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:6789" --seed-nodes='["testnet.gxchain.org:6789"]' --plugins "witness account_history_leveldb data_transaction " --genesis-json genesis.json --fast-replay  1>nohup.out 2>&1  &
```
#### 2. 验证插件是否正常工作

查看你的`data-dir`目录下是否生成`op_entry.db`文件。

## 3. 插件的使用说明

#### `get_account_relative_ops`

根据账户ID返回与账户相关的指定位置和数量的operation

#### 参数说明

<table>
    <tr>
        <th>请求参数</th>
        <th colspan="2">请求参数说明</th>
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
        <th>API参数</th>
        <th>API参数说明</th>
    </tr>
    <tr>
        <td>account_id</td>
        <td>账户ID</td>
    </tr>
    <tr>
        <td>start</td>
        <td>起始位置，大与等于1</td>
    </tr>
    <tr>
        <td>limit</td>
        <td>返回相关operation数量，最多100个</td>
    </tr>
    
</table>


#### 示例
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
            "is_virtual" : true,//是否为虚拟操作
            "op_index" : "1.2.4629_2",//operation的索引
            "op" : [//operation的具体信息
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
      "total_relative_ops_number" : 4 //与该账户相关的所有operation的个数
   },
   "id" : 1,
   "jsonrpc" : "2.0"
}
```