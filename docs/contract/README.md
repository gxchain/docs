# Quick start
## Overview

This tutorial provides guidance for GXChain smart contract development, including contract development, deployment, debugging, and common errors.

The GXChain smart contract is developed in C++, compiled by the [Webassembly](https://webassembly.org/) virtual machine and deployed on the GXChain blockchain network. The compiled smart contract includes the abi file and the wast file, the `abi` file is the interface file defined by the contract, and the `wast` file is the bytecode file executed by the Webassembly virtual machine.  

**Before developing a smart contract, you need to do the following:**

- Experience in C++ language development
- Experience with Linux or Mac
- Compile the source to start the local private chain or download the release program to connect to the test network (source compilation tutorial point [here](https://github.com/gxchain/gxb-core)）


### 1. Start witness_node

You need to compile the source code to start the private chain, and then switch to the directory where the witness_node program is located, use the following command to start the node, the `data` directory to save the configuration information, the generated block information, etc. Start the private chain tutorial click [here](../guide/private_chain.md )

```bash
./witness_node -d data
```

**It is recommended to synchronize the test network node and then develop the contract. Start the test network node tutorial click [here](../guide/testnet.md)**


![](./png/chain_id.jpg)

Switch to the `cli_wallet` directory, start the `cli_wallet` client and connect to the `witness_node`. The `cli_wallet` program features include creating accounts, deploying contracts, calling contracts, and more. (`chain-id` is replaced with your `chain-id`)

```bash
./cli_wallet -sws://localhost:11011 --chain-id=679beed54a9081edfd3ede349a0aa1962ea2dc9d379808fecce56226cb199c84
```

![](./png/cli_wallet.jpg)


### 2. Create a new wallet


You need to create a new password for your wallet, and the wallet password is used to unlock your wallet. In the tutorial we use the following password: `supersecret`, you can also use a combination of letters and numbers to create your own password.

```bash
>>> set_password supersecret
```

Now you can unlock your new wallet:

```bash
unlock supersecret
```

### 3. Claim initial balances

To add assets to your wallet, you need the account name and the private key of the account.
In the example, we will import the `nathan` account initialized in `my-genesis.json` into the existing wallet by the `import_key` command:

```bash
import_key nathan 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
```

::: warning note
* `nathan` will be used to define the account name in the initial file. If you have modified the `my-genesies.json` file, you can fill in a different name. Also, please note that `5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3` is the private key defined in `config.ini`
:::

Now that we have imported the private key into the wallet, the balance initialized in `my-genesis.json` needs to be claimed by the `import_balance` command.

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
In the returned information, you will find `2106-02-07T06:28:15` on the side of `membership_expiration_date`. If you see `1970-01-01T00:00:00`, it means that the previous operation has an error and the `nathan` upgrade failed.

After a successful upgrade, we can register a new account with `nathan`, but first we need to have the public key for the new account. Generate a public-private key pair by using the `suggest_brain_key` command:

```bash
suggest_brain_key
```

Call the `register_account` / `register_account2` interface to create a new account.

```bash
register_account alpha GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ nathan nathan 10 true
```

Transfer some assets to the account using the `transfer3` command

```bash
transfer3 nathan alpha 1000 GXC test GXC true
```

Use the following command to get the asset balance:

```bash
list_account_balances alpha
```
## Hello World

Before reading this tutorial, assume that you have already read the [Overview](#overview)

### 1. Function introduction

####  1.0 Introduction

[Hello World](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/helloworld)
This is the simplest GXChain contract, and we can master the basic process of smart contract development through this contract. The contract implements a `hi` action, which is the interface provided by the contract to the external call. The function is to print the `hi user ` string to the console twice. 

![](./png/console_print.jpg)

####  1.1 Compile contract
Smart contracts include xxx.hpp files and xxx.cpp files, which need to be compiled into xxx.wast files and xxx.abi files to be deployed on the blockchain. You can compile the wast and abi files using the gxx tool provided by GXChain, which can be found in the directory `~/gxb-core/build/tools/gxx`.

```bash
./gxx -o /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.wast /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.cpp

./gxx -g /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.abi /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld/helloworld.hpp
```
####  1.2 Deployment contract

You can deploy the Hello World contract, `hello` for the contract username, `nathan` for the account that pays the fee, `0 0` for the virtual machine type and version, `/Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld` is the contract path, GXC indicates the fee type, and true indicates the broadcast.

```bash
deploy_contract hello nathan 0 0 /Users/zhaoxiangfei/code/gxb-core/contracts/examples/helloworld GXC true
```

::: warning note
* When deploying the contract, the account that pays the fee must have imported the private key (the above payment account is `nathan`), and the account balance is sufficient to pay the handling fee.
:::

####  1.3 Call contract

You can attach assets when you call the contract interface. This will send the asset to the contract account. The assets of the contract account can only be controlled by the contract's own code.

```bash

call_contract nathan hello null hi "{\"user\":\"gxchain!!!\"}" GXC true

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

The `Hello World` Smart Contract contains only one action and is the simplest smart contract.

The development contract requires **to define a contract class and provide an apply interface**, which can be defined using the system-provided `GRAPHENE_ABI`.

![](./png/hello_code.jpg)

The directory where the header file is located is `/Users/zhaoxiangfei/code/gxb-core/contracts/graphenelib` (change to your directory). After importing the header file, you can use the built-in type of the contract and the built-in api function. The next tutorial analyzes a more complex smart contract - red packet contract.

## Red Packet

Before reading this tutorial, assume that you have already read the [Overview](#overview)

### 1. Function introduction

####  1.0 Introduction

[Red Packet](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/redpacket)is a relatively complex contract, we can learn the multi-index table, built-in API calls and other functions to pass the contract.

> Note: Calling the issue action can be accompanied by an asset; if the red packet is not grabbed, the issuer can close the red packet and the balance is refunded.

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
# View the contract account assets, the current contract only issued one red packet, the balance is 11 GXC
unlocked >>> list_account_balances redpacket
11 GXC

# View the contract table, 'subpackets' are randomly divided into 5 sub-red packets, 'pub_key' is used to verify the signature
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

Opening the red packet requires knowing the private key of the password (public key). The known password is: `GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b`, then you need to know the private key of the password (`5J9vj4XiwVQ2HNr22uFrxgaaerqrPN7xZQER9z2hwSPeWdbMKBM`). Then use the private key to sign the user instanceid (using the `sign_string` interface provided by `cli_wallet` to sign, the instanceid is the last field of the account id, for example, the account id of `nathan` is `1.2.17`, and the instanceid is 17)

```bash
#Sign the instanceid with a private key
unlocked >>> get_account_id nathan
"1.2.17"
unlocked >>> sign_string 5J9vj4XiwVQ2HNr22uFrxgaaerqrPN7xZQER9z2hwSPeWdbMKBM 17
"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2"

#Open red packet
call_contract nathan redpacket null open "{\"issuer\":\"nathan\",\"sig\":\"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2\"}" GXC true

#Balance of contract account
list_account_balances redpacket
unlocked >>> list_account_balances redpacket
7.09409 GXC

#The sub-red packet sequence is reduced from 5 to 4, and the reduced item is 390591, which means 3.90591 GXC is taken away.
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

```bash
# Close red packet
unlocked >>> call_contract nathan redpacket null close "{}" GXC true

# Get the balance of the contract account
unlocked >>> list_account_balances redpacket
0 GXC
```

#### 1.1 Compile contract


```bash
./gxx -g /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.abi /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.cpp

./gxx -o /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.wast /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket/redpacket.cpp
```

#### 1.2  Deployment contract

```bash
deploy_contract redpacket nathan 0 0 /Users/zhaoxiangfei/code/gxb-core/contracts/examples/redpacket GXC true
```

#### 1.3  Call contract

```bash
# Issue red packet 
unlocked >>> call_contract nathan redpacket {"amount":1100000,"asset_id":1.3.1} issue "{\"pubkey\":\"GXC81z4c6gEHw57TxHfZyzjA52djZzYGX7KN8sJQcDyg6yitwov5b\",\"number\":5}" GXC true

# Open red packet
unlocked >>> call_contract nathan redpacket null open "{\"issuer\":\"nathan\",\"sig\":\"1f1d104d5750beba9fd4b0637ce69cf54721a57cce91ca81904653307eb72b0a840bd8a80c58df0a7be206a4c5c5b1fa0d96d497667e54579e717d499d0a3498b2\"}" GXC true

# Close red packet
unlocked >>> call_contract nathan redpacket null close "{}" GXC true
```

### 2. Code

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

[Bank](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/bank)contracts can deposit and withdraw assets. There are two action interfaces, one is the 'deposit'. When the user calls the interface, the additional token assets are the assets that the user needs to deposit. The second is to withdraw assets and can be withdrawn to the account. Contains an `account table`, including a list of user ids and their deposited assets.

```bash
// Call the 'deposit' interface to deposit 10GXC to the bank contract
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
// Call the cash 'withdraw' interface to withdraw 1GXC to the hello account
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
./gxx -g /Users/zhaoxiangfei/code/contracts_work/bank/bank.abi /Users/zhaoxiangfei/code/contracts_work/bank/bank.cpp

./gxx -o /Users/zhaoxiangfei/code/contracts_work/bank/bank.wast /Users/zhaoxiangfei/code/contracts_work/bank/bank.cpp
```

####  1.2 Deployment contract


```bash
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

Table stores the user id and the list of assets
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
'deposit' is an interface with no parameters. You can deposit by attaching assets. The interface function includes obtaining additional asset information (asset id, asset quantity), traversing 'table', and adding asset information to the table.

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

[Riddle合约](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/riddle)is a guessing contract, including two action interfaces. The user can create a puzzle via the `issue` interface and save the hash of the answer to the blockchain. The `reveal` interface is used to verify that the answer to the puzzle is correct.

- **Create puzzles and hash of answers**

```bash
//Generate a sha256 hash of the answer, the answer is '4'
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
- **Verify that the submitted response is correct, the output succeeds or fails**


![](./png/wrong_answer.jpg)

![](./png/right_answer.jpg)

####  1.1 Compile contract

```bash
./gxx -g /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.abi /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.cpp

./gxx -o /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.wast /Users/zhaoxiangfei/code/contracts_work/riddle/riddle.cpp
```

####  1.2 Deployment contract

```bash
# 需要将智能合约所在路径替换为你自己的路径
deploy_contract riddle nathan 0 0 /Users/zhaoxiangfei/code/contracts_work/riddle GXC true
```

####  1.3 Call contract

```bash
生成答案的sha256哈希值
echo -n "4" | shasum -a 256
# Generate the sha256 hash of the answer
call_contract nathan riddle null issue "{\"question\":\"2 + 2 = ?\", \"hashed_answer\":\"4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a\"}" GXC true

# Submit incorrect answers
call_contract nathan riddle null reveal "{\"issuer\":\"nathan\", \"answer\":\"3\"}" GXC true
# Submit the correct answer
call_contract nathan riddle null reveal "{\"issuer\":\"nathan\", \"answer\":\"4\"}" GXC true
```

### 2. Code

The 'record table' stores the puzzle and the hash of the answer. When the puzzle is cracked, the puzzle item in the table is deleted. The table primary key is instance_id, which is unique, so each user can only create a puzzle on the chain. The contract consists of two actions, the function is to create puzzles and submit answers.

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

- Create puzzles, submit puzzle content and hash values of answers, generate hashes using sha256 algorithm
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
- Submit the answer and verify that the submitted answer is correct
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

    // After the puzzle is cracked, it is deleted from the table.
    if (iter->hashed_answer == hashed_answer) {
        print("reveal success! \n");
        records.erase(iter);
    } else {
        print("answer is wrong! \n");
    }
}
```

## linear\_vesting\_asset合约简介

在阅读本篇教程之前，假定您已经阅读完了[入门指导](#入门指导)

### 1. 功能简介与部署调用

####  1.0 合约功能

[linear_vesting_asset合约](https://github.com/gxchain/gxb-core/tree/dev_master/contracts/examples/linear_vesting_asset)的功能是向某一个账户按时间线性释放资产。用户可以创建一个资产释放项，包含接收释放资产的账户，冻结时间，释放时间。描述为：账户A通过合约向账户B线性释放一笔资产。可以指定冻结xx时间（xx表示冻结时间）后，开始释放，总共xx时间（xx表示释放时间）释放完，资产释放是线性的。

- **创建线性释放资产项**
```bash
// 创建一个到hello账户的线性资产释放项，冻结时间为30s，释放时间为120s
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
- **线性解冻合约**

```bash
// 解冻资产到hello账户
unlocked >>> call_contract nathan vesting null vestingclaim "{\"who\":\"hello\"}" GXC true
unlocked >>> list_account_balances hello
11 GXC
```
####  1.1 编译合约

您可以使用如下命令编译智能合约的abi文件和wast文件

```bash
# 其中的linear_vesting_asset.cpp所在路径需要替换为你自己的路径
./gxx -g /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.abi /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.cpp

# 其中的linear_vesting_asset.cpp所在路径需要替换为你自己的路径
./gxx -o /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.wast /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset/linear_vesting_asset.cpp
```

#### 1.2  部署合约

您可以使用如下命令部署vesting线性释放资产合约

```bash
# 需要将智能合约所在路径替换为你自己的路径
deploy_contract vesting nathan 0 0 /Users/zhaoxiangfei/code/contracts_work/linear_vesting_asset GXC true
```

#### 1.3 调用合约
```bash
// 合约名 vesting，附加的资产为10 GXC（资产id为1.3.1），释放的账户为hello账户，冻结30s之后开始释放，经过120s的时间之后，完全完所有的资产。
call_contract nathan vesting {"amount":1000000,"asset_id":1.3.1} vestingcreate "{\"to\":\"hello\",\"lock_duration\":30,\"release_duration\":120}" GXC true

// 认领释放的资产到hello账户（必须30s之后才可以认领，30s为冻结时间）
call_contract nathan vesting null vestingclaim "{\"who\":\"hello\"}" GXC true
```

### 2.代码解析
- 该合约包含一个table（vestingrule，持久化存储保存了锁定资产数量、锁定时间、释放时间等字段）
```cpp
//@abi table vestingrule i64
struct vestingrule {
    uint64_t account_id;        //认领账户的id 主键，不能同时有两项向同一账户释放资产

    int64_t vesting_amount;     //初始锁定资产
    int64_t vested_amount;      //已释放资产

    int64_t lock_time_point;    //锁定开始时间
    int64_t lock_duration;      //锁定多久开始释放
    int64_t release_time_point; //释放开始时间
    int64_t release_duration;   //释放多久全部释放完毕

    uint64_t primary_key() const { return account_id; }

    GRAPHENE_SERIALIZE(vestingrule,
       (account_id)(vesting_amount)(vested_amount)(lock_time_point)(lock_duration)(release_time_point)(release_duration))
};
```

- 包含两个action（vestingcreate action用来创建一个线性释放资产项；vestingclaim action用来认领线性释放的资产）

```cpp
/// @abi action
/// @abi payable
void vestingcreate(std::string to, int64_t lock_duration, int64_t release_duration)
{
    // contract_asset_id是一个自定义变量，表示GXC资产，线性释放资产只支持GXC
    graphene_assert(contract_asset_id == get_action_asset_id(), "not supported asset");
    contract_asset ast{get_action_asset_amount(), contract_asset_id};
    int64_t to_account_id = get_account_id(to.c_str(), to.size());
    // 验证认领账户是否有效 以及该认领账户是否有已经锁定的资产
    graphene_assert(to_account_id >= 0, "invalid account_name to");
    auto lr = vestingrules.find(to_account_id);
    graphene_assert(lr == vestingrules.end(), "have been locked, can only lock one time");

    //创建资产释放项，在vestingrule table中添加一项，使用emplace接口
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
    // 验证认领账户id是否有效
    int64_t who_account_id = get_account_id(who.c_str(), who.size());
    graphene_assert(who_account_id >= 0, "invalid account_name to");

    // 验证该账户是否存在锁定待释放的资产
    auto lr = vestingrules.find(who_account_id);
    graphene_assert(lr != vestingrules.end(), "current account have no locked asset");

    // 验证资产是否经过了冻结时间，并计算可以认领的资产数量
    uint64_t now = get_head_block_time();
    graphene_assert(now > lr->release_time_point, "within lock duration, can not release");
    int percentage = (now - lr->release_time_point) * 100 / lr->release_duration;
    if (percentage > 100)
        percentage = 100;
    int64_t vested_amount = (int64_t)(1.0f * lr->vesting_amount * percentage / 100);
    vested_amount = vested_amount - lr->vested_amount;
    graphene_assert(vested_amount > 0, "vested amount must > 0");

    // 提现资产到认领账户
    withdraw_asset(_self, who_account_id, contract_asset_id, vested_amount);

    // 提现之后，修改资产认领项的vesting_amount、vested_amount字段
    vestingrules.modify(lr, 0, [&](auto &o) {
        o.vested_amount += vested_amount;
    });
    if (lr->vesting_amount == lr->vested_amount) {
        vestingrules.erase(lr);
    }
}
```






