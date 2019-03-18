# Smart contract fee introduction

In GXChain, deploy contracts, update contracts, and call contracts will result in different amounts of fees. This document describes the fees associated with smart contracts.

## Deploy contract fee

The deployment contract fee is paid by the caller, and the payment fee is calculated as follows:

```cpp
// base_fee is 1GXC, contract_size is the contract size, price_per_kbyte is the cost of 1kb ram, currently 1GXC
fee = base_fee + contract_size / 1024 * price_per_kbyte
```

## Update contract fee

The renewal contract fee is paid by the caller, and the payment fee is calculated as follows:

```cpp
// base_fee is 1GXC, contract_size is the contract size, price_per_kbyte is the cost of 1kb ram, currently 1GXC
fee = base_fee + new_contract_size / 1024 * price_per_kbyte
```

## Call contract fee

The calling contract fee consists of two parts, ram_fee, cpu_fee and fee.

- **ram_fee**

Generated when an object is created or modified in the contract's table, ram_fee can specify the associated account to pay. How ram_fee is calculated:

```cpp
// ram_bytes is the number of bytes of memory occupied, price_per_kbyte_ram is the cost of 1kb ram, currently 0.5GXC
ram_fee = ram_bytes / 1024 * price_per_kbyte_ram 
```

| ram_fee payer | Description |
| --- | --- | 
| 0 | Contract account itself (same as \_slef) |
| \_self | Contract account itself (same as 0） |
| sender | Contract call account |
| original | Contract original call account, cross-contract call, call the account for the start |

Return of ram_fee: After deleting the object in the table, the fee charged at the time of creation will be returned to the payer to which the memory belongs.

- **cpu_fee**

cpu_fee current unit price is 0

- **fee**

In addition to using cpu_fee and ram_fee, the base contract fee is 0.01GXC. Therefore, the calculation method for calling the smart contract fee is:

```cpp
// base_fee is 0.01GXC, ram_fee is calculated according to the payer and occupied memory, cpu_fee is 0
fee = base_fee + ram_fee + cpu_fee
```
