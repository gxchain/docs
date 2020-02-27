# witness\_node 使用教程

witness_node是GXChain节点程序，包含打包区块、验证区块、状态存储等区块链核心功能。使用`help`参数启动`witness_node`程序，会输出该工具支持的所有命令，以下为启动常用功能的说明示例。

### 1. 重放区块
重放区块为重新执行区块内容，并更新状态数据库，使用命令如下:
```bash
./programs/witness_node/witness_node --replay-blockchain --fast-replay
```
其中`fast-replay`为可选参数，开启之后，取消重放区块的速度限制、睡眠时间。

### 2. 重新同步
重新同步区块为重新从相连接的p2p节点同步区块并执行，使用命令如下:
```bash
./programs/witness_node/witness_node --resync-blockchain
```

### 3. 创世文件
`genesis-json`文件为创世文件，每一条链对应一个`genesis-json`文件。在GXChain主网，该文件已经内置，无需手工指定。如果使用GXChain测试网络，或者启动GXChain私有网络，则需要配置该文件。

```bash
#指定genesis.json 文件
./programs/witness_node/witness_node --genesis-json genesis.json
```

### 4. 开启API服务
API服务提供了查询链上信息、查询内存对象、发起交易等功能接口，可以通过curl工具或者`cli_wallet`工具与之交互，出块节点无需开启。

```bash
./programs/witness_node/witness_node --rpc-endpoint="0.0.0.0:28090"
```

### 5. 开启P2P服务
P2P服务开启之后，其他节点可以从本节点同步区块数据。

```bash
./programs/witness_node/witness_node --p2p-endpoint="0.0.0.0:9999"
```

### 6. 设置种子节点列表
种子节点列表，包含节点启动后，连接并同步区块的节点。主网已经内置了部分种子节点，无需手工指定。

```bash
./programs/witness_node/witness_node --seed-nodes='["testnet.gxchain.org:6789"]'
```

### 7. 设置存储目录
指定保存区块数据、内存状态数据的目录，不指定默认为`witness_node_data_dir`

```bash
./programs/witness_node/witness_node --data-dir=testnet_node
```

### 8. 结束`witness_node`

* 如果witness_node没有后台运行，则执行一次Ctrl + C, 然后等待程序保存内存数据后自动退出。
* 如果witness_node运行在后台， 执行`kill -s SIGINT $(pgrep witness_node)`，等待程序保存内存数据后自动退出。不能使用`kill -9`， 否则下次启动会重建索引，启动比较慢。
