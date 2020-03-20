# How to use snapshot

The snapshot is a state database snapshot of the node. This document describes how to generate a snapshot of the node state for fast recovery of a node.

Download the support package that supports snapshot

```bash
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_testnet_install.sh' | bash
```

## Creating a Snapshot
### 1. Restart the duration_node, specify the snapshot path

```bash
~/opt/gxb# ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 --state-snapshots-dir "/opt/gxchain/data/snapshots"
```

### 2. Execute the RPC command as shown below
```bash
~/opt/gxb# curl --data '{"jsonrpc": "2.0", "method": "call", "params": [0, "create_snapshot", []], "id": 1}' http://127.0.0.1:28090

{"id":1,"jsonrpc":"2.0","result":{"head_block_num":10580657,"head_block_id":"00a172b14a44015d35202ecabbdf1547be7fbbfe","snapshot_dir":"/opt/gxchain/data/snapshots/object_database-00a172b14a44015d35202ecabbdf1547be7fbbfe"}}
```


Execution result shows head_block_id value and snapshot location and file name when the corresponding snapshot is created

The head block id can be confirmed by cli_wallet get_block block_num command.

```bash
~/opt/gxb# curl --data '{ "jsonrpc": "2.0", "method": "call", "params": [0, "get_block_header", [10580657]], "id": 1 }' http://127.0.0.1:28090

{"id":1,"jsonrpc":"2.0","result":{"previous":"00a172b0e5f119e45478b36ba9f4b11412bccb69","timestamp":"2019-01-17T15:02:21","witness":"1.6.20","transaction_merkle_root":"0000000000000000000000000000000000000000","extensions":[]}}


```

Snapshot data is valid after the head block is confirmed as an irreversible block.

## Recovering Snapshot Data

The blocks log must have log data after the block ID at the time of creation of the snapshot becomes the Irreversible Block and can not be recovered by restoring to the log file before the confirmation block.

In order to test the data recovery of Snapshot, we will forcibly terminate the witness_node that is currently in normal operation, and proceed with recovery.

```bash
kill -s SIGKILL $(pgrep witness_node)

```

When recovering to snapshot data, you should back up object_database in trusted_node directory.

```bash
~/opt/gxb# ls -al trusted_node/blockchain/
total 71624
drwxr-xr-x   4 root root     4096 Jan 14 17:30 .
drwxr-xr-x   5 root root     4096 Jan 14 17:25 ..
drwxr-xr-x   3 root root     4096 Nov 14  2017 database
-rw-r--r--   1 root root       12 Dec 12 19:16 db_version
drwxr-xr-x 257 root root     4096 Jan 14 17:30 object_database
~/opt/gxb# mv trusted_node/blockchain/object_database/ trusted_node/blockchain/object_database_bak/
```
Now use snapshot to proceed with the recovery.  Move snapshot data to blockchain directory.
```bash
~/opt/gxb# mv /opt/gxchain/data/snapshots/object_database-00a172b14a44015d35202ecabbdf1547be7fbbfe  trusted_node/blockchain/object_database
```

It performs additional replay for the remaining blocks(blocks after 10580657) based on the point at which index creation is completed and snapshot is made .

Then start witness_node
```bash
~/opt/gxb# ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 &
```
