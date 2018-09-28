# Private Chain

## 1. Download

[**The latest program**](https://github.com/gxchain/gxb-core/releases/latest)

```bash
wget https://github.com/gxchain/gxb-core/releases/download/testnet-1.0.180926/gxb_ubuntu_1.0.180926.testnet.tar.gz -O gxb_ubuntu_1.0.180926.testnet.tar.gz
tar zxvf gxb_ubuntu_1.0.180926.testnet.tar.gz
cd gxb
```

## 2. Generate Key Pairs

#### generate via cli wallet

``` bash
./programs/cli_wallet/cli_wallet --suggest-brain-key
{
  "brain_priv_key": "SHAP CASCADE AIRLIKE WRINKLE CUNETTE FROWNY MISREAD MOIST HANDSET COLOVE EMOTION UNSPAN SEAWARD HAGGIS TEENTY NARRAS",
  "wif_priv_key": "5J2FpCq3UmvcodkCCofXSNvHYTodufbPajwpoEFAh2TJf27EuL3",
  "pub_key": "GXC75UwALPEFECfHLjHyNSxCk1j7XzSvApQiXKEbanWgr7yvXXbdG"
}
```

::: tip Fields explanation
- brain_priv_key: Mnemonic words are the original text of the private key, which can be restored by mnemonic words
- wif_priv_key: Private key, using it to encrypt and sign a blockchain transaction in your program
- pub_key: Public key for account registration on the chain
:::

The following sections explain how to use the above private key and how to define your genisis.json.

## 3. create genesis.json

::: tip About genisis.json
- `genisis.json` is the genesis file
- Each chain has a unique genesis.json
- `genesis.json` specifies the configuration information necessary for the genesis block and initialization parameters for node startup
- Any change in a character will result in a different chain_id
- A different chain_id will result in an inability to communicate with seed_node
- Therefore: **do not change genisis.json, unless you want to run a** [Private-hain](/zh/guide/private_chain)
:::

Run this command to create an initial file called `my-genesis.json`:

```bash
./programs/witness_node/witness_node --create-genesis-json my-genesis.json
```

The file 1my-genesis.json` will be stored in the root directory of your private key folder. After running this command, all the witness nodes will complete the command themselves.

If you want to customize the initialization, open `my-genesis.json` and you can make the following changes:

* modify the account in the original file, as well as the account name and public key
* blockchain assets and initial distribution (including core assets)
* the initial baseline of private chain parameters (including fees)
* the initial witness's account signature secret key4 start private node

## 4. Start private node

Run the command:

```bash
./programs/witness_node/witness_node --data-dir data --genesis-json my-genesis.json
```

> --data-dir specifies that the block output directory is `./data` folder
> --genesis-json specifies that the initial parameter of the startup node is from `my-genesis.json`

View logs:

```bash
tail -f data/logs/witness.log
```

When this message appears:

```log
3501235ms th_a main.cpp:165 main] Started witness node on a chain with 0 blocks.
3501235ms th_a main.cpp:166 main] Chain ID is 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824
```

::: warning WARNING
Note that your Chain ID will be different from the one in the example above. Please note your Chain ID, which you will use later
:::

Initialization is complete, press ctrl-c to close the witness node

Here you have:

- Created a chain of your own and start the first node
- The initialization data of this node is from `my-genisis.json`
- As long as other nodes use `my-genisis.json` and specify your Chain ID in the startup parameter, you can join your private blockchain network

After closing the node, we observed that a new file `config.ini` was generated under the data directory, and all *startup parameters* can be configured in `data/config.ini`

## 5. Witness configurations

Open the `data/config.ini` just generated with the text editor, and make the following Settings. Don't comment the code if necessary:

```ini
rpc-endpoint = 127.0.0.1:11011
genesis-json = my-genesis.json
enable-stale-production = true
```

Locate the following statement in `data/config.ini`:

```bash
# ID of witness controlled by this node (e.g. "1.6.5", quotes are required, may specify multiple times)
```

And add the following entry:

```ini
witness-id = "1.6.1"
witness-id = "1.6.2"
witness-id = "1.6.3"
witness-id = "1.6.4"
witness-id = "1.6.5"
witness-id = "1.6.6"
witness-id = "1.6.7"
witness-id = "1.6.8"
witness-id = "1.6.9"
witness-id = "1.6.10"
witness-id = "1.6.11"
```

The above list authorizes the witness node to generate blocks with the witness ID

Let's navigate to the next line of configuration

```
# Tuple of [PublicKey, WIF private key] (may specify multiple times)
private-key = ["GXC6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV","5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"]
```

::: tip TIPS
- Under normal circumstances, the node of each witness is different
- However, in the private chain, we will first set all witnesses to produce the block at the same node
- The private keys of the witness ids (used to sign blocks) have been provided in `data/config.ini`:
:::

## 6. Generate blocks with witness account

By following these steps, you can produce the first block based on your private chain, running the following commands in witness node:

```
./programs/witness_node/witness_node --data-dir data
```

After that, the blocks of the private chain will begin to be generated, and you will see the following instructions:

```
********************************
*                              *
*   ------- NEW CHAIN ------   *
*   - Welcome to Graphene! -   *
*   ------------------------   *
*                              *
********************************
```

The data/log/witness.log file will have more log generation of successfully generated blocks:

```
2322793ms th_a  main.cpp:176     main    ] Started witness node on a chain with 0 blocks.
2322794ms th_a  main.cpp:177     main    ] Chain ID is 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824
2324613ms th_a  witness.cpp:185  block_production_loo ] Generated block #1 with timestamp 2016-01-21T22:38:40 at time 2016-01-21T22:39:40
2344604ms th_a  witness.cpp:185  block_production_loo ] Generated block #2 with timestamp 2016-01-21T22:39:00 at time 2016-01-21T22:39:45
2349616ms th_a  witness.cpp:185  block_production_loo ] Generated block #3 with timestamp 2016-01-21T22:39:05 at time 2016-01-21T22:39:50
2354605ms th_a  witness.cpp:185  block_production_loo ] Generated block #4 with timestamp 2016-01-21T22:39:10 at time 2016-01-21T22:39:55
```

If the witness.log is generated without a log, the log can be printed to the console, and the data/config.ini file can be modified as follows, and then we can restart the elaborate _node

```
[logger.default]
level=debug
appenders=stderr
```

## 7. Usage(cli_wallet)

You can now associate the client with your private chain's witness node. First, make sure your witness node is running and run the following command in another CMD:

```
./programs/cli_wallet/cli_wallet --wallet-file=my-wallet.json --chain-id 8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824 -sws://127.0.0.1:11011
```

::: tip TIPS
* Please make sure that in **your own private chain blockchain ID** instead of the above `ID8b7bd36a146a03d0e5d0a971e286098f41230b209d96f92465cd62bd64294824`.
* If you see the `set_password` prompt, it means your client (cli_wallet) has successfully connected to the witness node.
:::

### 1) Create a new wallet

First you need to create a new password for your wallet. This password is used to encrypt the private key of all wallets. In this tutorial, we use the following password: `supersecret`

But you can use a combination of letters and numbers to create a password that belongs to you. Create your password with the following commands:

```
>>> set_password supersecret
```

Now you can unlock your new wallet:

```
unlock supersecret
```

### 2) Claim initial balance

The asset account is included in the wallet account. To add the wallet account to your wallet, you need to know the account name and the private key of the account. In the example, we will import the nathan account initialized in `my-genesis.json` into the existing wallet with the `import_key` command：

```
import_key nathan 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
```

::: warning
* `nathan` will be used in the initial file to define the account name, and if you have modified the `my-genesies.json` file, you can fill in a different name. Also, please note `5kqwrpbwdl6phxujxw37fssqz1jiwsst4cqqzdeyxtp79zkvfd3` is private key defined in the `config.ini`
:::

Now that we have imported the private key into the wallet, the balance initialized in `my-genesis.json`, is claimed through the `import_balance` command without declaring the fee:

```
import_balance nathan ["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"] true
```

You can view your account through the following command:

```
get_account nathan
```

Obtain the account balance with the following command:

```
list_account_balances nathan
```

### 3) Create an account

Now let's create a new account `alpha` so we can transfer money back and forth between `nathan` and `alpha`.

Usually, we use an existing account to create a new account because the registrar has to pay the registration fee. Also, the registry's account needs to go into. Also, there is the requirement lifetime member \(LTM\) state. Therefore, we must first upgrade the account nathan to LTM state before creating a new account, and use the `upgrade_account` command to upgrade the account:

```
upgrade_account nathan GXC true
```
In the information returned, next to `membership_expiration_date` you will find `2106-02-07T06:28:15`. If you see `1970-01-01T00:00:00`, that indicates that the previous operation was wrong and `nathan` failed to upgrade successfully.

After the successful upgrade, we can register the new account through `nathan`, but first, we need to have the public key of the new account. This is done by using the `suggest_brain_key` command:

```
suggest_brain_key
```
Then the `register\_account` / `register\_account2` interface is called to create a new account

```
register_account alpha GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ GXC6vQtDEgHSickqe9itW8fbFyUrKZK5xsg4FRHzQZ7hStaWqEKhZ nathan nathan 10
```

Finally, there is the following reply:

```
list_account_balances alpha
```
