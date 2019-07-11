# witness\_node Introduce

`witness_node` is the GXChain-node program that contains blockchain core features such as packing blocks, verification blocks, and state storage.Starting the `witness_node` program with the `help` parameter will output all the commands supported by the tool. The following is an example of how to start the common functions.

### 1. replay blockchain
Rebuild object graph by replaying all blocks

```bash
./programs/witness_node/witness_node --replay-blockchain --fast-replay
```
`fast-replay`:no sleep while replaying block blocks

### 2. resync blockchain
Delete all blocks and re-sync with network from scratch

```bash
./programs/witness_node/witness_node --resync-blockchain
```

### 3. genesis-json
On the GXChain main-net, this file is built in, no need to specify it manually.

```bash
#File to read Genesis State from genesis-json
./programs/witness_node/witness_node --genesis-json genesis.json
```

### 4. API Server
Endpoint for websocket RPC to listen on

```bash
./programs/witness_node/witness_node --rpc-endpoint="0.0.0.0:28090"
```

### 5. P2P Server
Endpoint for P2P node to listen on

```bash
./programs/witness_node/witness_node --p2p-endpoint="0.0.0.0:9999"
```

### 6. Seed Nodes
P2P nodes to connect to on startup (may specify multiple times)

```bash
./programs/witness_node/witness_node --seed-nodes='["testnet.gxchain.org:6789"]'
```

### 7. Data-dir
Directory containing databases,configuration file, etc.

```bash
./programs/witness_node/witness_node --data-dir=testnet_node
```

### 8. Close `witness_node`

- If the `witness_node` is not running in the background, execute `Ctrl + C` once and then wait for the program to save the memory data and then exit automatically.

- If the `witness_node` is running in the background, execute `kill -s SIGINT $(pgrep witness_node)`, and wait for the program to save the memory data and then exit automatically. You can't use `kill -9`, otherwise the next time you start the index, the index will be rebuilt.  
