# Multi-signature tutorial

GXChain supports multiple signatures, this tutorial explains how to use multi-signature transfer on GXChain

## Use web wallet 

### Set up a multi-signed account

Use the web wallet to create an account, and open the web wallet permission page, add a sub-account to control the assets of the account, and update the account information.

![](./assets/mulsignature/wallet_sig.png)

The threshold value represents the sum of the weights required to control the funds of the account. Assuming the threshold is 2, the account assets can be controlled as long as the sum of any weights is added to the sub-account exceeding the threshold.

Create a `sign-001` account here and send the permissions to the two sub-accounts `sign-0011` and `sign-0012`, and import the two sub-accounts into different wallets. The weights of the two sub-accounts are respectively 1. A threshold of 2 means that only the two accounts agree, and the funds in the `sign-001` account can be transferred out.

### Initiate a transfer through a proposal

To control the assets of a multi-signed account, it is necessary to obtain the consent of multiple sub-accounts whose sum of weights is not lower than the threshold. We can initiate a transfer using the method of initiating a transfer and getting approval from the sub-account. First, we first use any account to initiate a proposal transaction. The transfer party of the transaction is the multi-sign account `sign-001`.

On the transfer page, set the transfer account to `sign-001`. If there is no permission for the account, you will be prompted (proposal) and click "Proposal" to initiate the proposal transaction.

![](./assets/mulsignature/click_proposed.png)

Click on the offer to initiate a proposal transaction

![](./assets/mulsignature/proposed.png)

At this point, on the `sign-001` account page, a proposal to be approved will be displayed, as shown below:

![](./assets/mulsignature/overview.png)

### Multi-sign account approval proposal

We use the `sign-0011` and `sign-0012` accounts to agree to the proposal to control the transfer of assets.

Approve the proposal under the `sign-0011` account

![](./assets/mulsignature/approve_1.png)

![](./assets/mulsignature/approve_2.png)

Both accounts are approved and approved, and the transfer is initiated.

![](./assets/mulsignature/approve.png)

## Operation through the command line

In addition to using the web wallet to operate multi-sign accounts, we can also use the command line tool to operate, the following is the use of the command line tool:

### Set up a multi-signed account

First import the account's ower public key into the wallet, only the ower permission can update the account information. Then call the update_account_multisig interface, set the threshold of the `up-acc` account to 2, the sub-accounts to `sign-0011` and `sign-0012`, and the weights are all 1. The examples are as follows:

```bash
unlocked >>> update_account_multisig up-acc active 2 ["sign-0011","sign-0012"] [1,1] GXC true
update_account_multisig up-acc active 2 ["sign-0011","sign-0012"] [1,1] GXC true
{
  "ref_block_num": 19363,
  "ref_block_prefix": 343029264,
  "expiration": "2019-04-11T12:09:39",
  "operations": [[
      6,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "account": "1.2.2588",
        "owner": {
          "weight_threshold": 1,
          "account_auths": [],
          "key_auths": [[
              "GXC7j49cCKfXVoNGSvW2ApDmYWx8xJ3AHmLiD8JiRSFcZHJpiyj3r",
              1
            ]
          ],
          "address_auths": []
        },
        "active": {
          "weight_threshold": 2,
          "account_auths": [[
              "1.2.2581",
              1
            ],[
              "1.2.2582",
              1
            ]
          ],
          "key_auths": [],
          "address_auths": []
        },
        "extensions": {}
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2041586e855597b2d8b042bb23f2ee7d780d6c3308b1419e3d02f26e79159fc60a7ed8dfa88c1b70144fcbd99dbbccb3eeab134b7527491a1d5c0c4327f84023b8",
    "205eae1625d57bb5aa5e5c5e9562661565233b65eb017fa3c9627a15c038995d7b2f12c9d9a382b4bf3ac7ecc7ba839813391661eb8be495104962cab0152ad978"
  ]
}
```

View account information

```bash
unlocked >>> get_account up-acc
get_account up-acc
{
  "id": "1.2.2588",
  "membership_expiration_date": "1970-01-01T00:00:00",
  "merchant_expiration_date": "1970-01-01T00:00:00",
  "datasource_expiration_date": "1970-01-01T00:00:00",
  "data_transaction_member_expiration_date": "1970-01-01T00:00:00",
  "registrar": "1.2.251",
  "referrer": "1.2.251",
  "lifetime_referrer": "1.2.251",
  "merchant_auth_referrer": "1.2.0",
  "datasource_auth_referrer": "1.2.0",
  "network_fee_percentage": 2000,
  "lifetime_referrer_fee_percentage": 3000,
  "referrer_rewards_percentage": 0,
  "name": "up-acc",
  "vm_type": "",
  "vm_version": "",
  "code": "",
  "code_version": "",
  "abi": {
    "version": "gxc::abi/1.0",
    "types": [],
    "structs": [],
    "actions": [],
    "tables": [],
    "error_messages": [],
    "abi_extensions": []
  },
  "owner": {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [[
        "GXC7j49cCKfXVoNGSvW2ApDmYWx8xJ3AHmLiD8JiRSFcZHJpiyj3r",
        1
      ]
    ],
    "address_auths": []
  },
  "active": {
    "weight_threshold": 2,
    "account_auths": [[
        "1.2.2581",
        1
      ],[
        "1.2.2582",
        1
      ]
    ],
    "key_auths": [],
    "address_auths": []
  },
  "options": {
    "memo_key": "GXC86XEStCe75CQfUovQhV9DfyigtDDDBQ1eVq8NEJTN9X2f8ZYmc",
    "voting_account": "1.2.5",
    "num_witness": 0,
    "num_committee": 0,
    "votes": [],
    "extensions": []
  },
  "statistics": "2.6.2475",
  "whitelisting_accounts": [],
  "blacklisting_accounts": [],
  "whitelisted_accounts": [],
  "blacklisted_accounts": [],
  "owner_special_authority": [
    0,{}
  ],
  "active_special_authority": [
    0,{}
  ],
  "top_n_control_flags": 0
}
```
### Initiate a transfer through a proposal

Use a different account to initiate a transfer proposal. The process of initiating a proposal can refer to [manually initiate a proposal](./cli_wallet.html#_2-7-initiate-a-proposal). The calling process is as follows:

```bash
unlocked >>> begin_builder_transaction
begin_builder_transaction
0

unlocked >>> add_operation_to_builder_transaction 0 [0,{"from":"1.2.2588","to":"1.2.426","amount":{"amount":3,"asset_id":"1.3.1"},"extensions":[]}]
add_operation_to_builder_transaction 0 [0,{"from":"1.2.2588","to":"1.2.426","amount":{"amount":3,"asset_id":"1.3.1"},"extensions":[]}]
null

unlocked >>> propose_builder_transaction2 0 zhao-123 "2019-04-12T09:05:50" 3600 false
propose_builder_transaction2 0 zhao-123 "2019-04-12T09:05:50" 3600 false
{
  "ref_block_num": 20541,
  "ref_block_prefix": 1834785891,
  "expiration": "2019-04-11T12:09:57",
  "operations": [[
      22,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "fee_paying_account": "1.2.426",
        "expiration_time": "2019-04-12T09:05:50",
        "proposed_ops": [{
            "op": [
              0,{
                "fee": {
                  "amount": 0,
                  "asset_id": "1.3.0"
                },
                "from": "1.2.2588",
                "to": "1.2.426",
                "amount": {
                  "amount": 3,
                  "asset_id": "1.3.1"
                },
                "extensions": []
              }
            ]
          }
        ],
        "review_period_seconds": 3600,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f1847dd87f3cf6fcb5b53c31a36594750abe736ef421f30a167f359cd2139fdc769e6f8932217f8358692910cc540c9cb369d2b98ac89a6b2e7773ad76023d8f9"
  ]
}
unlocked >>> set_fees_on_builder_transaction 0 GXC
set_fees_on_builder_transaction 0 GXC
{
  "amount": 100,
  "asset_id": "1.3.1"
}

unlocked >>> sign_builder_transaction 0 true
sign_builder_transaction 0 true
{
  "ref_block_num": 20550,
  "ref_block_prefix": 2020486643,
  "expiration": "2019-04-11T12:10:24",
  "operations": [[
      22,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "fee_paying_account": "1.2.426",
        "expiration_time": "2019-04-12T09:05:50",
        "proposed_ops": [{
            "op": [
              0,{
                "fee": {
                  "amount": 0,
                  "asset_id": "1.3.0"
                },
                "from": "1.2.2588",
                "to": "1.2.426",
                "amount": {
                  "amount": 3,
                  "asset_id": "1.3.1"
                },
                "extensions": []
              }
            ]
          }
        ],
        "review_period_seconds": 3600,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f66088961466d345442bd91e38f2c77caa7af0cb7ad1a6daac25691928cb27b7140d2c714a2d6d771231533fc69af21006ae779d7c75bcad5c6e8c30b7e28b8a7"
  ]
}
```

### Multi-sign account approval proposal

We import the `sign-0011` and `sign-0012` accounts into different wallets, approve the transfer proposal, and complete the transfer.

We first get the account `up-acc` information through the `get_full_accounts` interface, which contains the proposal to be approved.

```bash
# ~/code/testnet [20:43:01]
➜ curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_full_accounts", [["up-acc"],false]],
        "id": 1
}' https://testnet.gxchain.org | json_pp

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2614  100  2483  100   131  28412   1498 --:--:-- --:--:-- --:--:-- 28540
{
   "result" : [
      [
         "up-acc",
         {
            "assets" : [],
            "proposals" : [
               {
                  "available_active_approvals" : [],
                  "proposed_transaction" : {
                     "ref_block_num" : 0,
                     "expiration" : "2019-04-12T09:05:50",
                     "operations" : [
                        [
                           0,
                           {
                              "extensions" : [],
                              "from" : "1.2.2588",
                              "fee" : {
                                 "amount" : 0,
                                 "asset_id" : "1.3.0"
                              },
                              "amount" : {
                                 "amount" : 3,
                                 "asset_id" : "1.3.1"
                              },
                              "to" : "1.2.426"
                           }
                        ]
                     ],
                     "extensions" : [],
                     "ref_block_prefix" : 0
                  },
                  "available_owner_approvals" : [],
                  "available_key_approvals" : [],
                  "expiration_time" : "2019-04-12T09:05:50",
                  "review_period_time" : "2019-04-12T08:05:50",
                  "id" : "1.10.68",    //Pending proposal id
                  "required_active_approvals" : [
                     "1.2.2588"
                  ],
                  "required_owner_approvals" : []
               }
            ],
            "lifetime_referrer_name" : "testnet-opengateway",
            "settle_orders" : [],
            "pledge_balances" : [],
            "call_orders" : [],
            "votes" : [],
            "vesting_balances" : [],
            "withdraws" : [],
            "limit_orders" : [],
            "balances" : [
               {
                  "owner" : "1.2.2588",
                  "id" : "2.5.1183",
                  "balance" : 398900,
                  "asset_type" : "1.3.1"
               }
            ],
            "registrar_name" : "testnet-opengateway",
            "referrer_name" : "testnet-opengateway",
            "account" : {
               "vm_version" : "",
               "merchant_auth_referrer" : "1.2.0",
               "options" : {
                  "memo_key" : "GXC86XEStCe75CQfUovQhV9DfyigtDDDBQ1eVq8NEJTN9X2f8ZYmc",
                  "extensions" : [],
                  "voting_account" : "1.2.5",
                  "num_committee" : 0,
                  "num_witness" : 0,
                  "votes" : []
               },
               "code_version" : "",
               "lifetime_referrer_fee_percentage" : 3000,
               "network_fee_percentage" : 2000,
               "code" : "",
               "whitelisting_accounts" : [],
               "registrar" : "1.2.251",
               "statistics" : "2.6.2475",
               "whitelisted_accounts" : [],
               "abi" : {
                  "types" : [],
                  "actions" : [],
                  "error_messages" : [],
                  "structs" : [],
                  "abi_extensions" : [],
                  "tables" : [],
                  "version" : "gxc::abi/1.0"
               },
               "membership_expiration_date" : "1970-01-01T00:00:00",
               "name" : "up-acc",
               "data_transaction_member_expiration_date" : "1970-01-01T00:00:00",
               "vm_type" : "",
               "lifetime_referrer" : "1.2.251",
               "blacklisted_accounts" : [],
               "datasource_auth_referrer" : "1.2.0",
               "merchant_expiration_date" : "1970-01-01T00:00:00",
               "owner_special_authority" : [
                  0,
                  {}
               ],
               "referrer" : "1.2.251",
               "owner" : {
                  "account_auths" : [],
                  "address_auths" : [],
                  "key_auths" : [
                     [
                        "GXC7j49cCKfXVoNGSvW2ApDmYWx8xJ3AHmLiD8JiRSFcZHJpiyj3r",
                        1
                     ]
                  ],
                  "weight_threshold" : 1
               },
               "top_n_control_flags" : 0,
               "active_special_authority" : [
                  0,
                  {}
               ],
               "active" : {
                  "account_auths" : [
                     [
                        "1.2.2581",
                        1
                     ],
                     [
                        "1.2.2582",
                        1
                     ]
                  ],
                  "weight_threshold" : 2,
                  "address_auths" : [],
                  "key_auths" : []
               },
               "datasource_expiration_date" : "1970-01-01T00:00:00",
               "referrer_rewards_percentage" : 0,
               "id" : "1.2.2588",
               "blacklisting_accounts" : []
            },
            "statistics" : {
               "total_core_in_orders" : 0,
               "id" : "2.6.2475",
               "pending_fees" : 0,
               "lifetime_fees_paid" : 1100,
               "pending_vested_fees" : 0,
               "most_recent_op" : "2.9.203645",
               "removed_ops" : 0,
               "total_ops" : 5,
               "owner" : "1.2.2588"
            },
            "locked_balances" : []
         }
      ]
   ],
   "jsonrpc" : "2.0",
   "id" : 1
}
```

The pending proposal id is `1.10.68`, and then we approve the proposal via the `approve_proposal` interface.

```bash
#sign-0011 account
unlocked >>> approve_proposal sign-0011 1.10.68 {"active_approvals_to_add":["1.2.2581"],"active_approvals_to_remove":[],"owner_approvals_to_add":[],"owner_approvals_to_remove":[],"key_approvals_to_add":[],"key_approvals_to_remove":[]} true
approve_proposal sign-0011 1.10.68 {"active_approvals_to_add":["1.2.2581"],"active_approvals_to_remove":[],"owner_approvals_to_add":[],"owner_approvals_to_remove":[],"key_approvals_to_add":[],"key_approvals_to_remove":[]} true
{
  "ref_block_num": 21385,
  "ref_block_prefix": 327711213,
  "expiration": "2019-04-11T12:52:54",
  "operations": [[
      23,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "fee_paying_account": "1.2.2581",
        "proposal": "1.10.68",
        "active_approvals_to_add": [
          "1.2.2581"
        ],
        "active_approvals_to_remove": [],
        "owner_approvals_to_add": [],
        "owner_approvals_to_remove": [],
        "key_approvals_to_add": [],
        "key_approvals_to_remove": [],
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f6e013eb76dc4ee2003a3eb5cf7bb00fc3f4b65726dd806f677287a4355dc8f68324be2154453b624582b58eb391be45dcf54c2bac770b3891705746073c3cdf8"
  ]
}
#sign-0012 account
unlocked >>> approve_proposal sign-0012 1.10.68 {"active_approvals_to_add":["1.2.2582"],"active_approvals_to_remove":[],"owner_approvals_to_add":[],"owner_approvals_to_remove":[],"key_approvals_to_add":[],"key_approvals_to_remove":[]} true
approve_proposal sign-0012 1.10.68 {"active_approvals_to_add":["1.2.2582"],"active_approvals_to_remove":[],"owner_approvals_to_add":[],"owner_approvals_to_remove":[],"key_approvals_to_add":[],"key_approvals_to_remove":[]} true
{
  "ref_block_num": 21469,
  "ref_block_prefix": 4281063318,
  "expiration": "2019-04-11T12:57:06",
  "operations": [[
      23,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.1"
        },
        "fee_paying_account": "1.2.2582",
        "proposal": "1.10.68",
        "active_approvals_to_add": [
          "1.2.2582"
        ],
        "active_approvals_to_remove": [],
        "owner_approvals_to_add": [],
        "owner_approvals_to_remove": [],
        "key_approvals_to_add": [],
        "key_approvals_to_remove": [],
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f73b70d636477bb77346e0d9846d93bffa601ca13778fa10d1a4b87e7f55d951e396d9bee0843fb5c17fe94f3093e4253f22ff2cb639aa9965e74e3bfb3e1bb21"
  ]
}
```

At this point the two sub-accounts approved the proposal and the `up-acc` account transfer was successful.