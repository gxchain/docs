# How to start testnet

## Introduction
The testnet is the external test environment of GXChain with the same parameters as the main chain.

Testnet can provide developers:

- Apply token on [testnet](http://blockcity.mikecrm.com/2SVDb67)
- Test [Client](clients.html)
- Experience the latest features
- Participate in GXChain development
- Project development, Contract debugging

| Testnet | Configuration |
| :-- | :-- |
| Access point *(built in test network wallet)* | wss://testnet.gxchain.org |
| Seed node *(specified when the node starts)* | testnet.gxchain.org:6789 |
| Smart contract compilation services *(configured in the IDE)* | https://testnet.gxx.gxchain.org |
| Block explorer | https://testnet.explorer.gxchain.org |
| Online wallet | https://testnet.wallet.gxchain.org |
| Faucet | https://testnet.faucet.gxchain.org |

::: tip TIPS
Currently, there is only one node. Community developer contribution nodes can join the testnet and apply for witnesses.
:::

## 1. Register an account

Visit the [TestNet Online Wallet](https://testnet.wallet.gxchain.org/#/)，register wallet account

## 2. Apply Token on Testnet

After registration, click to [apply token on testnet](http://blockcity.mikecrm.com/2SVDb67)

## 3. Download

[**The latest program**](https://github.com/gxchain/gxb-core/releases/latest)

```bash
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_testnet_install.sh' | bash
```

## 4. Download testnet-genesis.json

```bash
wget http://gxb-package.oss-cn-hangzhou.aliyuncs.com/gxb-core/genesis/testnet-genesis.json -O genesis.json
```

::: tip About genisis.json
- `genisis.json` is the genesis file
- Each chain has a unique genesis.json
- `genesis.json` specifies the configuration information necessary for the genesis block and initialization parameters for node startup
- Any change in a character will result in a different chain_id
- A different chain_id will result in an inability to communicate with seed_node
- Therefore: **do not change genisis.json, unless you want to run a** [Private-hain](/zh/guide/private_chain)
:::

## 5. Start node

```bash
./programs/witness_node/witness_node --data-dir=testnet_node --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:9999" --seed-nodes='["testnet.gxchain.org:6789"]' --genesis-json genesis.json &
```

At present the testnet data volume is not large, can support the entire node. The block synchronization progress can be viewed through the background log file testnet_node/logs/witness.log. Once the block synchronization is complete, you can run command line wallet cli_wallet.

## 6. Connect to TestNet via cli_wallet

```bash
./programs/cli_wallet/cli_wallet -sws://127.0.0.1:28090  -r 127.0.0.1:8091 --data-dir=testnet_node --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```
