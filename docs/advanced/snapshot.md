# How to use snapshot

This document describes how to generate and use gxchain snapshot.

## What is Snapshot

Snapshot is a database of current states of the blockchain. It'a blockchain replay result, so snapshot can be used for quick recovery.

**Important: Blocks is different from state database, Block height should higher than the snapshot before we use a snapshot.**

## Creating a Snapshot
### 1. Safely kill witness_node

```bash
kill -s SIGINT $(pgrep witness_node)
#kill -s SIGKILL $(pgrep witness_node) # For Mac OSX
```

### 2. Pack the snapshot
Then snapshot could be packed by compressing the dir under `./trusted_node/blockchain/object_database`

``` bash
DATA_DIR=trusted_node # modify this line if you start the witness_node with different --data-dir
cd ./${DATA_DIR}/blockchain
tar -zcvf object_database.tar.gz ./object_database 
```

## Use Snapshot

### 1. Safely kill witness_node
```bash
kill -s SIGINT $(pgrep witness_node)
#kill -s SIGKILL $(pgrep witness_node) # For Mac OSX
```

### 2. Backup original `object_database`

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

### 3. Replace the snapshot

**3.1 Make sure the dir looks like**

```bash
~/opt/gxb# ls -al trusted_node/blockchain/
total 71624
drwxr-xr-x   4 root root     4096 Jan 14 17:30 .
drwxr-xr-x   5 root root     4096 Jan 14 17:25 ..
drwxr-xr-x   3 root root     4096 Nov 14  2017 database
-rw-r--r--   1 root root       12 Dec 12 19:16 db_version
drwxr-xr-x 257 root root     4096 Jan 14 17:30 object_database_bak
drwxr-xr-x 257 root root     1328 Jan 14 17:30 object_database.tar.gz
```

**3.2 Umcompress `object_database.tar.gz`**

```bash
tar -zxvf object_database.tar.gz
```

**3.3 Check the dir again, should looks like**

```bash
~/opt/gxb# ls -al trusted_node/blockchain/
total 71624
drwxr-xr-x   4 root root     4096 Jan 14 17:30 .
drwxr-xr-x   5 root root     4096 Jan 14 17:25 ..
drwxr-xr-x   3 root root     4096 Nov 14  2017 database
-rw-r--r--   1 root root       12 Dec 12 19:16 db_version
drwxr-xr-x 257 root root     4096 Jan 14 17:30 object_database
drwxr-xr-x 257 root root     4096 Jan 14 17:30 object_database_bak
drwxr-xr-x 257 root root     1328 Jan 14 17:30 object_database.tar.gz
```

### 4.Restart witness_node

Use original start script to start the node, it takes time to load object_database, so keep patient on it

Example:
```bash
~/opt/gxb# ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint=127.0.0.1:28090 &
```

