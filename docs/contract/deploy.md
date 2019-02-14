# Contract deployment

## Smart Contract IDE

### 1. register account

Access test-net [online wallet](https://testnet.wallet.gxchain.org/#/) Register a wallet account

### 2. Claim test-net Token

After registration is complete, claim test-net token(browser access [https://testnet.gxchain.org/gxc/get_token?your_account_name](), Please replace your_account_name with your test web wallet account name)

### 3. IDE download
Smart Contracts can be written, compiled, deployed, and debug by the Smart Contract IDE.

[click download](https://github.com/gxchain/gxchain-alpha/releases/latest)

### 4. Import account

Go to [Online Wallet](https://testnet.wallet.gxchain.org/#/) in Step 1  to find your own active permission private key.

![](../guide/assets/ide/queryPvk.png)

![](../guide/assets/ide/queryPvk2.png)

Open the client again and import the account on the settings page.

::: warning Note
The password will not be uploaded to the server, if you forget to remove the account and re-import
:::

![](../guide/assets/ide/import.png)

### 5. Select template project

![](../guide/assets/ide/addProject.png)

### 6. Compile

![](../guide/assets/ide/compile.png)

### 7. Deploy

Need to unlock the wallet before deployment

![](../guide/assets/ide/deploy.png)

![](../guide/assets/ide/deploy2.png)

### 8. Call

As with deployment, you also need to unlock your wallet first.

![](../guide/assets/ide/call.png)

![](../guide/assets/ide/call2.png)

## Cli_wallet

### 1. GXChain source code compilation

If you don't want to use smart contract IDE tools, or want to build a more stable and reliable compilation environment; you can compile GXChain program locally, compile, deploy, and call smart contracts through command line; GXChain source code compile, currently supports ubuntu system and mac system.

- [Build on Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)
- [Build on OS X](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2. Create a contract using a template

Create a helloworld contract with the `gxx` tool

```bash
gxx -n helloworld
```

### 3. Compile the contract, generate wast and abi

Compile the contract and generate wast and wasm files

```bash
gxx -o helloworld/helloworld.wast helloworld/helloworld.cpp
```
Generate abi file

```bash
gxx -g helloworld/helloworld.abi helloworld/helloworld.cpp
```

### 4. Deployment contract

Need to start cli_wallet, connect local node or remote testnet node

```bash
./programs/cli_wallet/cli_wallet -swss://testnet.gxchain.org --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```

Import wallet private key

```bash
# If it is a new wallet, you need to set an unlock password, here mylocalpassword

new >>> set_password mylocalpassword

# Unlock
locked >>> unlock mylocalpassword

# Import wallet private key
unlocked >>> import_key your_account_name your_private_key

# Deployment contract,0 and 0 are vm type and vm version respectively
unlocked >>> deploy_contract helloworld your_account_name 0 0 ./helloworld GXC true
```

### 5. Call contract
After the deployment contract is successful, you can call the contract using the call_contract interface.

```bash
unlocked >>> call_contract nathan helloworld null hi "{\"user\":\"zhuliting\"}" GXC true
```

### 6. Update contract

```bash
// 'hello120301' is contract name
unlocked >>> update_contract hello120301 zhao-123 /Users/zhaoxiangfei/code/contracts_work/example_contract_02/helloworld GXC true
```






