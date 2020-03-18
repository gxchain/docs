# 如何使用快照

snapshot是节点的状态数据库快照，本文档介绍如何生成节点状态的snapshot，用于快速恢复一个节点。

下载支持snapshot的安装包
```bash
# 目前snapshot接口已支持测试网络，暂不支持主网
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_testnet_install.sh' | bash
```


## 创建snapshot
### 1. 重启witness_node， 指定snapshot path
```bash
~/opt/gxb# ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 --state-snapshots-dir "/opt/gxchain/data/snapshots"
```

### 2. 执行rpc请求，生成snapshot
```bash
~/opt/gxb# curl --data '{"jsonrpc": "2.0", "method": "call", "params": [0, "create_snapshot", []], "id": 1}' http://127.0.0.1:28090

{"id":1,"jsonrpc":"2.0","result":{"head_block_num":10580657,"head_block_id":"00a172b14a44015d35202ecabbdf1547be7fbbfe","snapshot_dir":"/opt/gxchain/data/snapshots/object_database-00a172b14a44015d35202ecabbdf1547be7fbbfe"}}
```

执行结果中，返回当前的区块号、区块id和snapshot数据所在的路径。
其中区块id和区块号，可以通过如下命令验证：

```bash
~/opt/gxb# curl --data '{ "jsonrpc": "2.0", "method": "call", "params": [0, "get_block_header", [10580657]], "id": 1 }' http://127.0.0.1:28090

{"id":1,"jsonrpc":"2.0","result":{"previous":"00a172b0e5f119e45478b36ba9f4b11412bccb69","timestamp":"2019-01-17T15:02:21","witness":"1.6.20","transaction_merkle_root":"0000000000000000000000000000000000000000","extensions":[]}}


```


## 使用snapshot数据，恢复节点

snapshot数据，需要在当前区块号变为不可逆后，才能使用。
为了测试snapshot数据，我们强制kill掉witness_node程序，让当前节点的状态数据库坏掉。

```bash
kill -s SIGKILL $(pgrep witness_node)

```

然后删除掉数据目录下状态数据库，也就是trusted_node目录下的object_database
```bash
~/opt/gxb# ls -al trusted_node/blockchain/
total 71624
drwxr-xr-x   4 root root     4096 Jan 14 17:30 .
drwxr-xr-x   5 root root     4096 Jan 14 17:25 ..
drwxr-xr-x   3 root root     4096 Nov 14  2017 database
-rw-r--r--   1 root root       12 Dec 12 19:16 db_version
drwxr-xr-x 257 root root     4096 Jan 14 17:30 object_database
~/opt/gxb# rm -rf trusted_node/blockchain/object_database
```

然后将刚刚保存的snapshot 数据移到trusted_node/blockchain/object_database
```bash
~/opt/gxb# mv /opt/gxchain/data/snapshots/object_database-00a172b14a44015d35202ecabbdf1547be7fbbfe/*  trusted_node/blockchain/object_database/
```


现在可以重新启动witnesss_node了：
```bash
~/opt/gxb# ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 &
```
