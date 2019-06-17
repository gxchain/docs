# Quick start
## Overview

The purpose of this tutorial is to provide guidance on GXChain intelligent contract development, including contract development, deployment, debugging, and common error categorization.

The GXChain smart contract is developed in C++, compiled by the [Webassembly](https://webassembly.org/) virtual machine and deployed on the GXChain blockchain network. The compiled smart contract includes the abi file and the wast file, the `abi` file is the interface file defined by the contract, and the `wast` file is the bytecode file executed by the Webassembly virtual machine. The GXChain uses WebAssembly virtual machine to support smart contracts written in multiple languages ​​such as C++ and TypeScript.

**Before developing a smart contract, you need to do the following:**

- Experience in C++ language development
- Experience with Linux or Mac
- Compile the source locally to start the local private chain or download the release program to connect to the test network (source compilation tutorial point [here](https://github.com/gxchain/gxb-core)）

**Related terms:**

- **Action**：The external interface provided by the contract can be interacted with by the front end, and the action invoked by the user is recorded in the block.
- **Table**：The contract provides persistent storage, similar to the table in the database, supports multiple index, and the table is stored under the contract account object.

**Tool introduction**
- **witness_node**：The node program is used to produce blocks, which can start different functions according to different configurations. For example,during the development, the startup RPC port can interact with cli_wallet to call the contract and lookup table.
- **cli_wallet**：The command line wallet is mainly used to manage the wallet and interact with witness_node program.The commands include:deploying contracts,calling contracts,updating contracts,querying tables,etc.(use the help command and gethelp command to view the specification)
- **gxx**：Used to compile `C++` files into abi files and wasm files for deployment to GXChain.
- **gxc-smart-contract-ide**：The smart contract IDE, which can write, compile, deploy, and call smart contracts.[click here to download](https://github.com/gxchain/gxc-smart-contract-ide/releases/tag/v1.1.0)

### 1. Start witness_node

You need to compile the source code to start the private chain, and then switch to the directory where the witness_node program is located, use the following command to start the node, the `data` directory to save the configuration information, the generated block information, etc. Start the private chain tutorial click [here](../advanced/private_chain.md )

```bash
./witness_node -d data
```

After startup, it will be roughly as shown below (please record the Chain ID, which will be used when you want to connect cli_wallet):


![](./png/chain_id.jpg)

While the block node running, you can switch to the cli_wallet directory and use the following command to start the cli_wallet client to interact with the block node, including creating accounts, deploying contracts, and calling contracts, all of which can be tested by the cli_wallet client. (chain-id switches to your own chain-id )

```bash
./cli_wallet -sws://localhost:11011 --chain-id=679beed54a9081edfd3ede349a0aa1962ea2dc9d379808fecce56226cb199c84
```

![](./png/cli_wallet.jpg)


### 2. Create a new wallet

First you need to create a new password for your wallet, and the wallet password is used to unlock your wallet. In the tutorial we use the following password: `supersecret`. You can also use a combination of letters and numbers to create your own password. Please use the following command to create:

```bash
>>> set_password supersecret
```

Now you can unlock your new wallet:

```bash
unlock supersecret
```

### 3. Claim initial balances

The asset account is included in the wallet account. To add a wallet account to your wallet, you need to get the account name and the private key of the account. In the example, we will import the nathan account initialized in my-genesis.json to the existing wallet via the import_key command:

```bash
import_key nathan 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
```

::: warning note
* `nathan` will be used to define the account name in the initial file. If you have modified the `my-genesies.json` file, you can fill in a different name. Also, please note that `5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3` is the private key defined in `config.ini`
:::

Now that we have imported the private key into the wallet, the balance initialized in my-genesis.json needs to be claimed via the import_balance command without a declaration fee:

```bash
import_balance nathan ["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"] true
```

You can view your account by the following command:

```bash
get_account nathan
```

Use the following command to get the account balance:

```bash
list_account_balances nathan
```

### 4. Create account

Now we will create a new account `alpha` so that we can revolve in the two accounts `nathan` and `alpha`.

Usually we use an existing account to create a new account because the registrar is required to pay the registration fee. Also, the registrar's account needs to enter the state of `Also, there is the requirement lifetime member (LTM)`. So we must upgrade the account `nathan` to the LTM state and the `upgrade_account` command to upgrade the account before creating a new account:

```bash
upgrade_account nathan GXC true
```
In the returned information, you will find `2106-02-07T06:28:15` on the side of `membership_expiration_date`. If you see `1970-01-01T00:00:00`, it means that the previous operation has an error and the `nathan` failed to upgrade.

After a successful upgrade, we can register a new account with `nathan`, but first we need to have a public key for the new account. Generate a public-private key pair by using the `suggest_brain_key` command:

```bash
//Generate key pair
suggest_brain_key
```

Then call the `register_account` / `register_account2` interface to create a new account.

```bash
register_account alpha GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ nathan nathan 10 true
```

Transfer some assets to the account by using the `transfer3` command

```bash
transfer3 nathan alpha 1000 GXC test GXC true
```

Use the following command to get the asset balance of the `alpha`:

```bash
list_account_balances alpha
```
## Hello World

Before reading this tutorial, assume that you have already read the [Overview](#overview)

### 1. Function introduction

####  1.0 Introduction

[Hello World](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld)
The Hello World contract is the most streamlined GXChain contract. We can grasp the basic framework of smart contract development by analyzing the contract. The contract implements a `hi` action, which is the interface provided by the contract to the external call. The function is to print the hi user (user is a parameter of the action) string to the console twice. The output is as follows.
![](./png/console_print.jpg)

####  1.1 Compile contract
After the smart contract is completed,it includes a xxx.hpp file and a xxx.cpp file, which need to be compiled into the xxx.wast file and the xxx.abi file to be deployed on the blockchain. You can compile the wast and abi files using the gxx tool provided by GXChain, which can be found in the directory `~/gxb-core/build/tools/gxx`.You can switch to the directory where gxx is located and compile with the following command:

```bash
//Compile the wast file, the path needs to be replaced with your own
./gxx -o /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.wast /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.cpp

//Compile the abi file, the path needs to be replaced with your own
./gxx -g /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.abi /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.hpp
```
####  1.2 Deploy contract

You can deploy the Hello World contract with the following command, `hello` is the user name of contract (the contract will be created by the command of executing the deployment contract , the assets of the contract account can only be controlled by the contract), `nathan` is the account for paying the fee, and `0 0` means The virtual machine type and version, `/Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld `is the contract path (including the wast file and the abi file), GXC means the fee type, and true means whether to broadcast or not.

```bash
//deploy contract
deploy_contract hello nathan 0 0 /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld GXC true
```

::: warning note
* When deploying the contract, the account for the payment of the fee must have been imported with the private key (the above payment account is `nathan`), and the account balance must be sufficient to pay the handling fee.
:::

####  1.3 Call contract
You can call the contract interface with the following command, GXChain's call contract interface allows we to attach asset delivery options. The way in which the additional asset is called will send the asset to the contract account. The assets of the contract account can only be controlled by the contract's own code using the withdrawal API ：withdraw_asset.
```bash
//No assets attached
call_contract nathan hello null hi "{\"user\":\"gxchain!!!\"}" GXC true

//Some assets attached (For attaching some assets to the action,you need to  add `//@abi payable `to the contract )
call_contract nathan hello {"amount":10000000,"asset_id":1.3.1} hi "{\"user\":\"gxchain!!!\"}" GXC true

```

::: warning // @abi payable means attached assets
```cpp
// @abi action
// @abi payable
void hi(std::string user)
{
	    {
        for (int i = 0; i < 2; ++i) {
            print("hi, ", user, "\n");
        }
    }
}
```
:::

### 2. Code

The `Hello World` Smart Contract contains only one action and is the simplest smart contract,so we can use this as an example to analyze the basic framework of the smart contract.

The development of smart contracts involves defining a contract class and providing an apply interface, which can be defined using the `GRAPHENE_ABI` provided by the system
```bash
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/print.hpp>
#include <graphenelib/types.h>

using namespace graphene;

class helloworld : public contract
{
  public:
    helloworld(uint64_t id)
        : contract(id) #Define a construct with parameters and initialize the parent class
    {
    }

    /// @abi action
		# the `///@abi action`means adding comments to the action of the external call,the tool of gxx will retrieve comments and compile them into abi files

    void hi(std::string user)
    {
        for (int i = 0; i < 2; ++i) {
            print("hi, ", user, "\n");
        }
    }
};

GRAPHENE_ABI(helloworld, (hi))
#we can using built-in macro of the gxchain to implement the apply function interface
```
The directory where the header file is located is `/Users/zhaoxiangfei/code/gxb-core/contracts/graphenelib` (change to your directory). After importing the header file, you can use the built-in type of the contract and the built-in api function. The next tutorial will analyze a more complex smart contract - red packet contract.

## Red Packet

Before reading this tutorial, assume that you have already read the [Overview](#overview)

### 1. Function introduction

####  1.0 Introduction

[Red Packet](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket) is a relatively complicated contract. Through the analysis of the red packet contract, we will learn the use of multi-index tables, the call of built-in API and other functions.

The red packet contract includes three actions: issuing a red packet(issue), opening a red packet (open), and closing a red packet(close).

> Note: When a user creates a red packet by calling the  `issue` interface ,he should  attach  some  assets to it ; if the red packet is not finished, the issuer can close the red packet and the balance will be refunded. A red packet needs to be set with a password (public key). When a user want to open a red packet, his ID must be signed with the private key corresponding to the password.

```bash
# Pubkey is a randomly generated password (GXC public key). The following call indicates that 5 red packets are sent, and the total amount is 11 GXC (1.3.1 indicates GXC assets).
unlocked >>> call_contract nathan redpacket {"amount":1100000,"asset_id":1.3.1} issue "{\"pubkey\":\"GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b\",\"number\":5}" GXC true
{
  "ref_block_num": 15124,
  ...
  ...
  ...
  "signatures": [
    "1f7fade01ef08d986282164c1428fee37ecc5817c4e6bdc7c160220cf965b881d7417874ab22be48047becf62936e6a060a3e06c65e3548e90a72ddc1720794db3"
  ]
}
# View the contract account assets, the current contract only issued one red packet, and the balance is 11 GXC
unlocked >>> list_account_balances redpacket
11 GXC

# View the contract table, the'subpackets' is randomly divided into 5 sub-red packets and the 'pub_key' is used to verify the signature
unlocked >>> get_table_rows redpacket packet 0 -1
[{
    "issuer": 17,
    "pub_key": "GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b",
    "total_amount": {
      "amount": 1100000,
      "asset_id": 1
    },
    "number": 5,
    "subpackets": [
      350531,
      150227,
      390591,
      66767,
      141884
    ]
  }
]

```

When a user opens the a packet, he needs to know the private key corresponding to the red packet password(public key).Here the password is （`GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b`, and the corresponded private key is (`5J9vj4XiwVQ2HNr22uFrxgaaerqrPN7xZQER9z2hwSPeWdbMKBM`). Then the user can use the private key to sign his instanceid (using the `sign_string` interface provided by `cli_wallet`, the instanceid is the last field of the account id. For example, the account id of `nathan` is `1.2.17`, and the instanceid is 17).

```bash
#Sign instanceid with the private key
unlocked >>> get_account_id nathan
"1.2.17"
unlocked >>> sign_string 5J9vj4XiwVQ2HNr22uFrxgaaerqrPN7xZQER9z2hwSPeWdbMKBM 17
"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2"

#Open the red packet
call_contract nathan redpacket null open "{\"issuer\":\"nathan\",\"sig\":\"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2\"}" GXC true

#Balance of contract account
list_account_balances redpacket
unlocked >>> list_account_balances redpacket
7.09409 GXC

#The "subpackets" sequence is reduced from 5 to 4, and the reduced item is 390591, which means 3.90591 GXC is taken away.
unlocked >>> get_table_rows redpacket packet 0 -1
[{
    "issuer": 17,
    "pub_key": "GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b",
    "total_amount": {
      "amount": 1100000,
      "asset_id": 1
    },
    "number": 5,
    "subpackets": [
      350531,
      150227,
      66767,
      141884
    ]
  }
]
# View open red packet record by contract table
unlocked >>> get_table_rows redpacket record 0 -1
[{
    "packet_issuer": 17,
    "accounts": [{
        "account_id": 17,
        "amount": 390591
      }
    ]
  }
]

```
Call the `close` interface which can only be called by the user who issue the red packet, to close the red packet. If the red packet  has outstanding balance ,it will be returned to the issuer. The calling process and the result feedback are as follows:
```bash
# Close red packet
unlocked >>> call_contract nathan redpacket null close "{}" GXC true

# Get the balance of the contract account
unlocked >>> list_account_balances redpacket
0 GXC
```

#### 1.1 Compile contract

You can compile the abi file and the wast file of the smart contract with the following command:
```bash
#The path where redpacket.cpp is located needs to be replaced with your own path.
./gxx -g /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.abi /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.cpp

#The path where redpacket.cpp is located needs to be replaced with your own path.
./gxx -o /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.wast /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.cpp
```

#### 1.2  Deployment contract
You can deploy the `Redpacket` contract with the following command:
```bash
deploy_contract redpacket nathan 0 0 /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket GXC true
```

#### 1.3  Call contract

```bash
# Issue a red packet
unlocked >>> call_contract nathan redpacket {"amount":1100000,"asset_id":1.3.1} issue "{\"pubkey\":\"GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b\",\"number\":5}" GXC true

# Open a red packet
unlocked >>> call_contract nathan redpacket null open "{\"issuer\":\"nathan\",\"sig\":\"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2\"}" GXC true

# Close a red packet
unlocked >>> call_contract nathan redpacket null close "{}" GXC true
```

### 2. Code
The red packet contract code contains  call to the built-in API and the use of  multi-index tables. By analyzing the red packet contract, we can learn how to use them. The contract framework can refer to the introduction to the Hello World contract in the previous tutorial.
- Comments // @abi payable means that the action can be accompanied by assets, which can be used to generate the correct abi file
```cpp
// @abi action
// @abi payable
void issue(std::string pubkey, uint64_t number){
	...
}
```

- Use the 'graphene_assert' function to roll back the action when it fails
```cpp
graphene_assert(pubkey.size() > prefix_len, "invalid public key");
graphene_assert(pubkey.substr(0, prefix_len) == prefix, "invalid public key");
```

- Call the built-in API
```cpp
int64_t total_amount = get_action_asset_amount();
```

- Introduction of multi-index table

```cpp
//Each multi-index table is called a `table` and is defined as a class in smart contract.
//@abi table packet i64
struct packet {
    uint64_t                issuer;
    std::string             pub_key;
    contract_asset          total_amount;
    uint32_t                number;
    vector<int64_t>         subpackets;							// Can use vector, struct, and built-in types

    uint64_t primary_key() const { return issuer; }				// Define a primary key function, the returned value is unique as the primary key index.

    GRAPHENE_SERIALIZE(packet, (issuer)(pub_key)(total_amount)(number)(subpackets))
};

// Declare an instance of a multi-indexed table type
typedef graphene::multi_index<N(packet), packet> packet_index;
packet_index            packets;

// Add item
packets.emplace(owner, [&](auto &o) {
    o.issuer = owner;
    ...
});
// Modify item
packets.modify(packet_iter, sender, [&](auto &o) {
            o.subpackets.erase(subpacket_it);
});
// Erase item
packets.erase(packet_iter);
```
## Bank

Before reading this tutorial, assume that you have already read the [Overview](#overview)


### 1. Function introduction

####  1.0 Introduction

[Bank](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/bank)contract can deposit and withdraw assets. There are two action interfaces, one is the 'deposit'. When the user calls the interface, the additional token assets are the assets that the user needs to deposit. The second is the 'withdraw'interface, which can be called to extract a certain amount of assets to the specified account. The contract contains an account table, and the stored content is the user id and the list of assets it stores.

```bash
// nathan calls the 'deposit' interface to deposit 10GXC to the bank contract
unlocked >>> call_contract nathan bank {"amount":1000000,"asset_id":1.3.1} deposit "{}" GXC true
{
  {
  "ref_block_num": 36472,
  "ref_block_prefix": 290922209,
  "expiration": "2018-11-20T09:19:40",
  "operations": [[
  ...
  ...
}
//View the account table in the contract, get the account balance
unlocked >>> get_table_rows bank account 0 -1
[{
    "owner": 17,
    "balances": [{
        "amount": 1000000,
        "asset_id": 1
      }
    ]
  }
]
```

```bash
// nathan calls the cash 'withdraw' interface to withdraw 1GXC to the hello account
unlocked >>> call_contract nathan bank null withdraw "{\"to_account\":\"hello\",\"amount\":{\"asset_id\":1,\"amount\":100000}}" GXC true
{
  "ref_block_num": 36733,
  "ref_block_prefix": 1321509121,
  "expiration": "2018-11-20T09:42:10",
  ...
  ...
}
// View 'hello' account balance
unlocked >>> list_account_balances hello
1 GXC
```
####  1.1 Compile contract

```bash
#The path where bank.cpp is located needs to be replaced with your own path.
./gxx -g /Users/zhaoxiangfei/code/contracts_work/bank/bank.abi /Users/zhaoxiangfei/code/contracts_work/bank/bank.cpp

#The path where bank.cpp is located needs to be replaced with your own path.
./gxx -o /Users/zhaoxiangfei/code/contracts_work/bank/bank.wast /Users/zhaoxiangfei/code/contracts_work/bank/bank.cpp
```

####  1.2 Deployment contract


```bash
#Need to replace the path of the smart contract with your own path
deploy_contract bank nathan 0 0 /Users/zhaoxiangfei/code/contracts_work/bank GXC true
```

#### 1.3 Call contract

```bash
# Deposit asset
call_contract nathan bank {"amount":1000000,"asset_id":1.3.1} deposit "{}" GXC true

# Withdraw asset
call_contract nathan bank null withdraw "{\"to_account\":\"hello\",\"amount\":{\"asset_id\":1,\"amount\":100000}}" GXC true
```

### 2. Code

The bank contract includes two action interfaces and a table.The table stores the user ids and the list of assets
```cpp
//The primary key is instance_id, and the balances field is the list of assets stored by the user.
//@abi table account i64
struct account {
    uint64_t owner;
    std::vector<contract_asset> balances;  

    uint64_t primary_key() const { return owner; }

    GRAPHENE_SERIALIZE(account, (owner)(balances))
};
```
'deposit' is an interface with no parameters. When you want to call the interface to store assets, you can achieve the purpose by attaching assets. The logical function of 'deposit' interface includes obtaining additional asset information (asset id, asset quantity), traversing 'table', and adding stored asset information to the table.

:::warning Note
The table field can only be modified by the 'modify' interface provided by GXChain. It cannot be modified using the iterator obtained by traversal. The iterator type returned by the find method is const.
:::
```cpp
// Payable means that the action can attach assets
// @abi action
// @abi payable
void deposit()
{
    // Obtain additional 'asset_id' and 'asset_amount' by 'get_action_asset_amount' and 'get_action_asset_id' functions
    int64_t asset_amount = get_action_asset_amount();
    uint64_t asset_id = get_action_asset_id();
    contract_asset amount{asset_amount, asset_id};

    // Get caller account_id
    uint64_t owner = get_trx_sender();
    auto it = accounts.find(owner);
    // If the caller has not deposited assets, create a table entry for it, the primary key is the 'instance_id'
    if (it == accounts.end()) {
        accounts.emplace(owner, [&](auto &o) {
            o.owner = owner;
            o.balances.emplace_back(amount);
        });
    } else {
        uint16_t asset_index = std::distance(it->balances.begin(),
                                             find_if(it->balances.begin(), it->balances.end(), [&](const auto &a) { return a.asset_id == asset_id; }));
        if (asset_index < it->balances.size()) {
            // The 'contract_asset' class overloads the '+=' operator
            accounts.modify(it, 0, [&](auto &o) { o.balances[asset_index] += amount; });
        } else {
            accounts.modify(it, 0, [&](auto &o) { o.balances.emplace_back(amount); });
        }
    }
}

```

The `withdraw` interface has two parameters, the first parameter is the account name (not the account id), and the second is the asset object (the asset id and the number of withdrawals). If the validation request passes, the built-in api (withdraw_asset) is called to withdraw the asset to the account.
```cpp
// @abi action
void withdraw(std::string to_account, contract_asset amount)
{
    // Get the instance_id by account name, this is the account that needs to be withdrawn
    int64_t account_id = get_account_id(to_account.c_str(), to_account.size());
    graphene_assert(account_id >= 0, "invalid account_name to_account");
    graphene_assert(amount.amount > 0, "invalid amount");

    // Get the caller account id
    uint64_t owner = get_trx_sender();
    auto it = accounts.find(owner);
    graphene_assert(it != accounts.end(), "owner has no asset");

    int asset_index = 0;
    for (auto asset_it = it->balances.begin(); asset_it != it->balances.end(); ++asset_it) {
        if ((amount.asset_id) == asset_it->asset_id) {
            graphene_assert(asset_it->amount >= amount.amount, "balance not enough");
            if (asset_it->amount == amount.amount) {
                //Clear the asset status information when the user withdraws an asset.
                accounts.modify(it, 0, [&](auto &o) {
                    o.balances.erase(asset_it);
                });
                //Empty the user's ‘accounts table’ when the user asset list is empty
                if (it->balances.size() == 0) {
                    accounts.erase(it);
                }
            } else {
                accounts.modify(it, 0, [&](auto &o) {
                    o.balances[asset_index] -= amount;
                });
            }
            break;
        }
        asset_index++;
    }
    //Built-in api, withdraw assets to a specified account
    withdraw_asset(_self, account_id, amount.asset_id, amount.amount);
}
```
## Riddle

Before reading this tutorial, assume that you have already read the [Overview](#overview)

### 1. Function introduction

####  1.0 Introduction

[Riddle](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/riddle)is a guessing contract, including two action interfaces. The user can create a puzzle via the `issue` interface and save the hash of the answer in the blockchain. The `reveal` interface is used to verify whether the answer to the puzzle is correct or not.

- **Create puzzles and hash of answers**

```bash
//Generate a sha256 hash of the answer, the vaule of answer is '4'
zhaoxiangfei@zhaoxiangfeideMacBook-Pro:~$ echo -n "4" | shasum -a 256
4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a

//Create a '2+2=? ' puzzle, the answer is '4'.
unlocked >>> call_contract nathan riddle null issue "{\"question\":\"2 + 2 = ?\", \"hashed_answer\":\"4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a\"}" GXC true
{
  "ref_block_num": 39138,
  "ref_block_prefix": 3499868408,
  "expiration": "2018-11-20T13:37:00",
  "operations": [[
      75,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "account": "1.2.17",
        "contract_id": "1.2.29",
        "method_name": "issue",
        "data": "0932202b2032203d203f4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f0982608581765be0119c2af2261dd161b60e9ff5f02d07ff69c486e0ef2e52ef3187544f035d169de640386c87e24f2c61194693ac82d708f6177745d6dfb5a5"
  ]
}
```
- **Verify that the submitted response whether is correct or not by outputing success or wrong**


![](./png/wrong_answer.jpg)

![](./png/right_answer.jpg)

####  1.1 Compile contract
You can compile the abi file and the wast file of the smart contract with the following command:
```bash
#The path where riddle.cpp is located needs to be replaced with your own path.
./gxx -g /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.abi /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.cpp

#The path where riddle.cpp is located needs to be replaced with your own path.
./gxx -o /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.wast /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.cpp
```

####  1.2 Deployment contract
You can deploy the riddle puzzle contract with the following command:
```bash
# you need to replace the path of the smart contract with your own path
deploy_contract riddle nathan 0 0 /Users/zhaoxiangfei/code/contracts_work/riddle GXC true
```

####  1.3 Call contract

```bash
echo -n "4" | shasum -a 256
# Generate the sha256 hash of the answer
call_contract nathan riddle null issue "{\"question\":\"2 + 2 = ?\", \"hashed_answer\":\"4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a\"}" GXC true

# Submit incorrect answers
call_contract nathan riddle null reveal "{\"issuer\":\"nathan\", \"answer\":\"3\"}" GXC true
# Submit the correct answer
call_contract nathan riddle null reveal "{\"issuer\":\"nathan\", \"answer\":\"4\"}" GXC true
```

### 2. Code

The contract includes a table called 'record table' which stores the puzzle and the hash of the answer. When the puzzle is cracked, the puzzle item in the table is deleted. The table primary key is instance_id, which is unique, so each user can only create a puzzle on the chain. The contract consists of two actions, one is to create puzzles and the other is to submit answers.

```cpp
// @abi table record i64
struct record {
    uint64_t            issuer;             
    std::string         question;
    checksum256         hashed_answer;      //Checksum256 is a built-in type

    uint64_t primary_key() const { return issuer; }

    GRAPHENE_SERIALIZE(record, (issuer)(question)(hashed_answer))
};
```

- To create puzzles, you should submit puzzle content and hash values of answers that generated by using sha256 algorithm
```cpp
/// @abi action
void issue(const std::string& question, const checksum256& hashed_answer)
{
    // Get the instance_id of the caller as the primary key of the 'record table'
    uint64_t owner = get_trx_sender();
    records.emplace(owner, [&](auto &p) {
            p.issuer = owner;
            p.question = question;
            p.hashed_answer = hashed_answer;
    });
}
```
- Submit the answer and verify that the submitted answer whether is correct or not
```cpp
/// @abi action
void reveal(const std::string& issuer, const std::string& answer)
{
    int64_t issuer_id = get_account_id(issuer.c_str(), issuer.size());
    graphene_assert(issuer_id >= 0, "issuer not exist");
    auto iter = records.find(issuer_id);
    graphene_assert(iter != records.end(), "no record");

    checksum256 hashed_answer;
    sha256(const_cast<char *>(answer.c_str()), answer.length(), &hashed_answer);

    // After the puzzle is cracked, it will be deleted from the table soonly.
    if (iter->hashed_answer == hashed_answer) {
        print("reveal success! \n");
        records.erase(iter);
    } else {
        print("answer is wrong! \n");
    }
}
```

## Linear\_vesting\_asset

Before reading this tutorial, assume that you have already read the [Overview](#overview)

### 1. Function introduction

####  1.0 Introduction

[linear_vesting_asset](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/linear_vesting_asset) contract can release the asset linearly in time to an account. Users can create an asset release task that includes the account which will receive the released assets, frozen time, and releasing time. For example, account A linearly releases an asset to account B through a contract. The process of asset release is linear，you can set frozen xx time before releasing, and the total xx time for releasing.

- **Create a linear release asset task**
```bash
// Create a linear asset release to the `hello` account with the frozen time of 30s and the release time of 120s.
call_contract nathan vesting {"amount":1000000,"asset_id":1.3.1} vestingcreate "{\"to\":\"hello\",\"lock_duration\":30,\"release_duration\":120}" GXC true
unlocked >>> get_table_rows vesting vestingrule 0 -1
[{
    "account_id": 22,
    "vesting_amount": 1000000,
    "vested_amount": 0,
    "lock_time_point": 1542785150,
    "lock_duration": 30,
    "release_time_point": 1542785180,
    "release_duration": 120
  }
]
```
- **Release assets linearly**

```bash
// Release assets to the hello account
unlocked >>> call_contract nathan vesting null vestingclaim "{\"who\":\"hello\"}" GXC true
unlocked >>> list_account_balances hello
11 GXC
```
#### 1.1 Compile contract


```bash
#The path of linear_vesting_asset.cpp needs to be replaced with your own path.
./gxx -g /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.abi /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.cpp

#The path of linear_vesting_asset.cpp needs to be replaced with your own path.
./gxx -o /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.wast /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.cpp
```

#### 1.2 Deploy contract

```bash
#you need to replace the path of the smart contract with your own path
deploy_contract vesting nathan 0 0 /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset GXC true
```

#### 1.3 Call contract
```bash
// Release the assets to the hello account after freezing 30s, and release all the assets after 120s.
call_contract nathan vesting {"amount":1000000,"asset_id":1.3.1} vestingcreate "{\"to\":\"hello\",\"lock_duration\":30,\"release_duration\":120}" GXC true

// Claim the released assets (it must be claimed after 30s, 30s is the freezing time)
call_contract nathan vesting null vestingclaim "{\"who\":\"hello\"}" GXC true
```

### 2. Code
- The vestingrule table stores fields such as the number of locked assets, lock time, release time, etc.
```cpp
//@abi table vestingrule i64
struct vestingrule {
    uint64_t account_id;        //Claiming the id of the account, two tasks cannot release assets to the same account

    int64_t vesting_amount;     //Release of assets
    int64_t vested_amount;      //Released assets

    int64_t lock_time_point;    //Lock start time
    int64_t lock_duration;      //Locked time
    int64_t release_time_point; //Release start time
    int64_t release_duration;   //Released time

    uint64_t primary_key() const { return account_id; }

    GRAPHENE_SERIALIZE(vestingrule,
       (account_id)(vesting_amount)(vested_amount)(lock_time_point)(lock_duration)(release_time_point)(release_duration))
};
```

- `vestingcreate` is used to create a linear release asset task; `vestingclaim` is used to claim linearly released assets

```cpp
/// @abi action
/// @abi payable
void vestingcreate(std::string to, int64_t lock_duration, int64_t release_duration)
{
    //  Only support 'GXC'
    graphene_assert(contract_asset_id == get_action_asset_id(), "not supported asset");
    contract_asset ast{get_action_asset_amount(), contract_asset_id};
    int64_t to_account_id = get_account_id(to.c_str(), to.size());
    // Verify the claim account is valid and  the claim account has an locked asset
    graphene_assert(to_account_id >= 0, "invalid account_name to");
    auto lr = vestingrules.find(to_account_id);
    graphene_assert(lr == vestingrules.end(), "have been locked, can only lock one time");

    vestingrules.emplace(0, [&](auto &o) {
        o.account_id = to_account_id;
        o.vesting_amount = ast.amount;
        o.vested_amount = 0;
        o.lock_time_point = get_head_block_time();
        o.lock_duration = lock_duration;
        o.release_time_point = o.lock_time_point + o.lock_duration;
        o.release_duration = release_duration;
    });
}

/// @abi action
void vestingclaim(std::string who)
{   
    // Verify that the claim account id is valid
    int64_t who_account_id = get_account_id(who.c_str(), who.size());
    graphene_assert(who_account_id >= 0, "invalid account_name to");

    // Verify that the account has locked assets to be released
    auto lr = vestingrules.find(who_account_id);
    graphene_assert(lr != vestingrules.end(), "current account have no locked asset");

    // Verify that the asset is in the release period and obtain the number of assets that can be claimed
    uint64_t now = get_head_block_time();
    graphene_assert(now > lr->release_time_point, "within lock duration, can not release");
    int percentage = (now - lr->release_time_point) * 100 / lr->release_duration;
    if (percentage > 100)
        percentage = 100;
    int64_t vested_amount = (int64_t)(1.0f * lr->vesting_amount * percentage / 100);
    vested_amount = vested_amount - lr->vested_amount;
    graphene_assert(vested_amount > 0, "vested amount must > 0");

    // Withdrawal of assets to the claim account
    withdraw_asset(_self, who_account_id, contract_asset_id, vested_amount);

    // Modify the vesting_amount, vested_amount fields
    vestingrules.modify(lr, 0, [&](auto &o) {
        o.vested_amount += vested_amount;
    });
    if (lr->vesting_amount == lr->vested_amount) {
        vestingrules.erase(lr);
    }
}
```
