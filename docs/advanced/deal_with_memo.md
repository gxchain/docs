# Deal with transfer memo

## 1. Construct memo

Let's review the transfer message constructed in the [How to send a transaction to GXChain?](./send_transaction.md) section.

``` json
{
  "ref_block_num": 54701, // an exist block num
  "ref_block_prefix": 2861949695, // The exist block id
  "expiration": "2019-01-18T03:35:54", // transaction expiration date, max expiration = current + 24hours
  "operations": [
   [
      0, // operation id
      { // operation
        "fee": {
          "amount": 1179,
          "asset_id": "1.3.1"
        },
        "from": "1.2.937396",
        "to": "1.2.19645",
        "amount": {
          "amount": 173600000,
          "asset_id": "1.3.1"
        },
        "memo": {
          "from": "GXC6cUP6LvdpcfC9G4TMre4yxB3PxttUjVK1ybybgt63ZtEKCXamC", // memo_key of from account
          "to": "GXC7o71VExYFoFJKtduFXEF15jgPdbmC1tdyT8BPCpnzCTeFiXEog", // memo_key of to account
          "nonce": 1, // nonce of encryption key
          "message": "15e06e19346d8f9c2d5355abcf5fffaa" // ECIES encrypted message
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": []
}
```

We can see that the `memo` of the transfer transaction consists of the following four parts:

- `from`: memo public key of from account
- `to`: memo public key of to account
- `nonce`: random uint64
- `message`:
Encrypted message

### Step1: Get memo public key of target account

request:
``` bash
curl --data '{
    "jsonrpc": "2.0",
    "method": "call",
    "params": [0, "get_account_by_name", [<to_account>]],
    "id": 1
}' https://node1.gxb.io/rpc
```

response:
``` json
{
        "id": "1.2.19645",
        "membership_expiration_date": "1970-01-01T00:00:00",
        "merchant_expiration_date": "1970-01-01T00:00:00",
        "datasource_expiration_date": "1970-01-01T00:00:00",
        "data_transaction_member_expiration_date": "1970-01-01T00:00:00",
        "registrar": "1.2.26",
        "referrer": "1.2.26",
        "lifetime_referrer": "1.2.26",
        "merchant_auth_referrer": "1.2.0",
        "datasource_auth_referrer": "1.2.0",
        "network_fee_percentage": 2000,
        "lifetime_referrer_fee_percentage": 3000,
        "referrer_rewards_percentage": 0,
        "name": "binance-1",
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
            "key_auths": [
                [
                    "GXC8XBces1ohTTVNeWB97HoyCHmRaTWNcFKdMWfdJqvMw8FmWjNqK",
                    1
                ]
            ],
            "address_auths": []
        },
        "active": {
            "weight_threshold": 1,
            "account_auths": [],
            "key_auths": [
                [
                    "GXC8FNySGvDBzRLTHyLTewWpiKbC718y7nZ3jU2Vbcx7XxF5z2SK3",
                    1
                ]
            ],
            "address_auths": []
        },
        "options": {
            "memo_key": "GXC7o71VExYFoFJKtduFXEF15jgPdbmC1tdyT8BPCpnzCTeFiXEog",
            "voting_account": "1.2.5",
            "num_witness": 0,
            "num_committee": 0,
            "votes": [],
            "extensions": []
        },
        "statistics": "2.6.19645",
        "whitelisting_accounts": [],
        "blacklisting_accounts": [],
        "whitelisted_accounts": [],
        "blacklisted_accounts": [],
        "owner_special_authority": [
            0,
            {}
        ],
        "active_special_authority": [
            0,
            {}
        ],
        "top_n_control_flags": 0
    }
```

we get:
``` js
let to_memo_key = to_account.options.memo_key
```

### Step2: Calculate Shared Secret

``` js
let shared = secp256k1.ecdhUnsafe(to_memo_key, from_private_key)
let S = shared.Q.x.toBuffer({size: 32}); // Q is instance of Point(x,y), get x axis as shared seed
if (S.length < 32) { // fill by 0 if length < 32
    let pad = new Buffer (32 - S.length).fill (0);
    S = Buffer.concat ([pad, S]);
}
let shared_secret = sha512(S);
```

### Step3: Generate Nonce

``` js
let nonce = randomUint64().toString();
```

### Step4: AES encrypt with checksum
``` js
let keyHash = sha512(nonce.toBytes().concat(shared_secret.toBytes()));
let iv = keyHash.slice(64, 96);
let key = keyHash.slice(0, 64);
let aes = new AES(iv,key);
let checksum = sha256(message).slice(0,4);
let payload = checksum.concat(message.toBytes());
let encryptedMessage = aes.encrypt(payload);
```

## 2. Decrypt memo

### Step1: Get memo public key of from account

``` js
let from_memo_key = transaction.operations[0][1].memo.from;
```

### Step2: Calculate Shared Secret

``` js
let shared = secp256k1.ecdhUnsafe(from_memo_key, to_private_key)
let S = shared.Q.x.toBuffer({size: 32}); // Q is instance of Point(x,y), get x axis as shared seed
if (S.length < 32) { // fill by 0 if length < 32
    let pad = new Buffer (32 - S.length).fill (0);
    S = Buffer.concat ([pad, S]);
}
let shared_secret = sha512(S);
```

### Step3: AES decrypt with checksum

``` js
let keyHash = sha512(transaction.operations[0][1].memo.nonce.toBytes().concat(shared_secret.toBytes()));
let iv = keyHash.slice(64, 96);
let key = keyHash.slice(0, 64);
let aes = new AES(iv,key);
let payload = aes.decrypt(transaction.operations[0][1].memo.message);
let checksum = payload.slice(0, 4);
let message = payload.slice(4).toString('utf8');
assert(sha256(message).slice(0,4) == checksum,'Invalid checksum');
```
