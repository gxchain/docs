# Contract development

## Built-in type
The contract provides built-in types in addition to the basic types.

### contract\_asset

contract_asset class
```cpp
int64_t     amount;
uint64_t    asset_id;
```
Verify that the contract_asset amount is valid, use the `is_amount_within_range` member method
```cpp
bool is_amount_within_range() const { 
    return -max_amount <= amount && amount <= max_amount; 
}
```


::: warning Note
`amount` indicates the number of assets, and uses large numbers of storage in the chain. For example, the accuracy of GXC assets is 5,1 GXC actually needs to be expressed as 1 * 100000 = 100000, that is, amount is 100000

The asset_id indicates the instance_id of the asset (for example, if the asset id is 1.3.1, its instance_id is 1).
:::

For an example of the use of the `contract_asset` type, refer to the `Bank` contract.

### signature

signature class
```cpp
struct signature {
   uint8_t data[65];
};
```

example：
```cpp
void verify(std::string raw_string, std::string pub_key, signature sig)
{   
    print("string, ", raw_string, "\n");
    print(pub_key, "\n");
    bool flag = verify_signature(raw_string.c_str(), raw_string.length(), &sig, pub_key.c_str(), pub_key.length());
    print("ret code, ", flag, "\n");
} 
 ```


### public\_key
public_key class
```cpp
struct public_key {
   char data[33];
};
```


### checksum256
checksum256 class
```cpp
struct ALIGNED(checksum256) {
   uint8_t hash[32];
};
```

example：
```cpp
void issue(const std::string& question, const checksum256& hashed_answer)
{   
    uint64_t owner = get_trx_sender();
    records.emplace(owner, [&](auto &p) {
            p.issuer = owner;
            p.question = question;
            p.hashed_answer = hashed_answer;
    }); 
}  
```


### checksum160
checksum160 class
```cpp
struct ALIGNED(checksum160) {
   uint8_t hash[20];
};
```

### checksum512
checksum512 class
```cpp
struct ALIGNED(checksum512) {
   uint8_t hash[64];
};
```

### block\_id\_type
block_id_type class
```cpp
typedef struct checksum160      block_id_type;
```
## Built-in API

| belong | api name | description |
| --- | --- | --- |
| <graphenelib/action.h> | current_receiver | Returns the instance_id of the current contract account |
| <graphenelib/action.h> | get_action_asset_id | Returns the asset instance_id sent to the contract by this call |
| <graphenelib/action.h> | get_action_asset_amount | Returns the number of assets sent to the contract by this call |
| <graphenelib/asset.h> | withdraw_asset | Transfer assets from the current contract account to the other account |
| <graphenelib/asset.h> | get_balance | Get the balance of an asset in the account on the chain |
| <graphenelib/crypto.h> | sha1 | Obtain the encrypted data of the sha1 algorithm |
| <graphenelib/crypto.h> | sha256 | Obtain the encrypted data of the sha256 algorithm |
| <graphenelib/crypto.h> | sha512 | Obtain the encrypted data of the sha512 algorithm |
| <graphenelib/crypto.h> | ripemd160 | Obtain the encrypted data of the ripemd160 algorithm |
| <graphenelib/crypto.h> | verify_signature | Verification signature |
| <graphenelib/global.h> | get_head_block_num | Get the head block number |
| <graphenelib/global.h> | get_head_block_id | Get the head block hash |
| <graphenelib/global.h> | get_block_id_for_num | Get the specified block hash |
| <graphenelib/global.h> | get_head_block_time | Get the time of the block, return the value in seconds |
| <graphenelib/global.h> | get_trx_sender | Get the instance_id of the account that called the contract |
| <graphenelib/global.h> | get_account_id | Get the instance_id of the account by the account name |
| <graphenelib/global.h> | get_account_name_by_id | Obtain an account name by the account instance id |
| <graphenelib/global.h> | get_asset_id | Get the instance_id of the asset by the asset name |
| <graphenelib/global.h> | read_transaction | Read the current transaction serialized data |
| <graphenelib/global.h> | transaction_size | The length of the data of the current transaction is serialized |
| <graphenelib/global.h> | expiration | Get transaction expiration time |
| <graphenelib/global.h> | tapos_block_num | Returns the block number referenced by the transaction |
| <graphenelib/global.h> | tapos_block_prefix | Returns the block ID of the transaction reference (the second 32 digits) |
| <graphenelib/action.h> | read_action_data | Read current action data |
| <graphenelib/action.h> | action_data_size | Returns the number of bytes required to read the current action data |
| <graphenelib/action.hpp> | unpack_action_data | Deserialize the current action data into a defined action object |
| <graphenelib/system.h> | graphene_assert | If the assertion fails, interrupt the execution of this contract and roll all states |
| <graphenelib/system.h> | graphene_assert_message | If the assertion fails, interrupt the execution of this contract and roll all states |
| <graphenelib/system.h> | print | Print log |



### current\_receiver

**Function:** `uint64_t current_receiver()`

**Head file:** `<graphenelib/action.h>`

**Description:** Returns the instance_id of the current contract account

**Return value:** instance_id 

```cpp
// @abi action
void examcurr(){
    uint64_t ins_id = current_receiver();
    print("current contract account id: ", ins_id);
}
```



### get\_action\_asset\_id

**Function:** `uint64_t get_action_asset_id()`

**Head file:** `<graphenelib/action.h>`

**Description:** Returns the asset instance_id sent to the contract by this call

**Return value:** Action does not attach assets, returns 0, otherwise returns instance_id    

```cpp
// @abi action
void examgetast(){
    uint64_t ast_id = get_action_asset_id();
    print("call action asset id: ",ast_id);
}
```

### get\_action\_asset\_amount

**Function:** `int64_t get_action_asset_amount()`

**Head file:** `<graphenelib/action.h>`

**Description:** Returns the number of assets sent to the contract by this call

**Return value:** Action does not attach assets, returns 0, otherwise returns amount   

```cpp
//get_action_asset_amount 
// @abi action
void examgetamo(){
    int64_t amount = get_action_asset_amount();
    print("call action asset amount: ",amount);      
}
```


### withdraw\_asset

**Function:** `void withdraw_asset(uint64_t from, uint64_t to, uint64_t asset_id, int64_t amount)`

**Head file:** `<graphenelib/asset.h>`

**Description:** Transfer assets from the current contract account to the other account

**params:**

`<uint64_t> from`  Must be \_self

`<uint64_t> to` The instance_id of the receiver account

`<uint64_t> asset_id` Asset id used to transfer

`<int64_t> amount` transfer amount

```cpp
// @abi action
void examwith(uint64_t from,uint64_t to, uint64_t asset_id, int64_t amount){
    withdraw_asset(from,to,asset_id,amount);
    print("withdraw_asset example");
}
```


### get\_balance

**Function:** `int64_t get_balance(int64_t account, int64_t asset_id)`

**Head file:** `<graphenelib/asset.h>`

**Description:** Get the balance of an asset in the account on the chain

**Return value:** the balance



**params:**

`<int64_t> account` Account's instace_id

`<int64_t> asset_id` Asset's instance_id

```cpp
// @abi action
void examgetbl(int64_t account, int64_t asset_id){
    int64_t balance = get_balance(account, asset_id);
    print("account balance: ",balance);
}
```

### sha1

**Function:** `void sha1(const char *data, uint32_t length, checksum160 *hash)`

**Head file:** `<graphenelib/crypto.h>`

**Description:** Obtain the encrypted data of the sha1 algorithm 


**params:**

`<const char *> data` data start address

`<uint32_t> length` data length

`<checksum160 *> hash` hash value

```cpp
// @abi action
void examsha1(std::string data){
    checksum160 hash;
    sha1(data.c_str(),data.length(),&hash);
    printhex(hash.hash,20);
}
```

### sha256

**Function:** `void sha256(const char *data, uint32_t length, checksum256 * hash)`

**Head file:** `<graphenelib/crypto.h>`

**Description:** Obtain the encrypted data of the sha256 algorithm


**params:**

`<const char *> data` data start address

`<uint32_t> length` data length

`<checksum256 *> hash` hash value

```cpp
// @abi action
void examsha25(std::string data){
    checksum256 hash;
    sha256(data.c_str(),data.length(),&hash);
    printhex(hash.hash,32);
}
```


### sha512

**Function:** `void sha512(const char *data, uint32_t length, checksum512 * hash)`

**Head file:** `<graphenelib/crypto.h>`

**Description:** Obtain the encrypted data of the sha512 algorithm


**params:**

`<const char *> data` data start address

`<uint32_t> length` data length

`<checksum512 *> hash` hash value

```cpp
// @abi action
void examsha512(std::string data){
    checksum512 hash;
    sha512(data.c_str(),data.length(),&hash);
    printhex(hash.hash,64);
}
```


### ripemd160

**Function:** `void ripemd160(const char *data, uint32_t length, checksum160 * hash)`

**Head file:** `<graphenelib/crypto.h>`

**Description:** Obtain the encrypted data of the ripemd160 algorithm


**params:**

`<const char *> data` data start address

`<uint32_t> length` data length

`<checksum160 *> hash` hash value

```cpp
// @abi action
void examripemd(std::string data){
    checksum160 hash;
    ripemd160(data.c_str(),data.length(),&hash);
    printhex(hash.hash,20);
}
```


### verify\_signature

**Function:** `bool verify_signature(const char *data, uint32_t datalen, const signature *sig, const char * pub_key, uint32_t pub_keylen)`

**Head file:** `<graphenelib/crypto.h>`

**Description:** Verification signature

**Return value:** Verification result (bool value)


**params:**

`<const char *> data` data start address

`<uint32_t> datalen` data length

`<const signature *> sig` signature

`<const char *> pub_key` public key

`<uint32_t> pub_keylen` public key length

```cpp
//verify_signature (other example: redpacket)
// @abi action
void examverify(std::string data,signature sig,std::string pk){
    bool result;
    result = verify_signature(data.c_str(), data.length(), &sig, pk.c_str(), pk.length());
    print("verify result: ",result);
}
```



### get\_head\_block\_num

**Function:** `int64_t get_head_block_num()`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the time of the block, return the value in seconds

**Return value:** the head block number

```cpp
// @abi action
void examgetnum(){
    int64_t head_num = get_head_block_num();
    print("head block num: ",head_num);
}
```

### get\_head\_block\_id

**Function:** `void get_head_block_id(checksum160* hash)`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the head block hash

**params:**

`<checksum160 *> hash` the head block hash value

```cpp
// @abi action
void examgetid(){
    checksum160 block_hash;
    get_head_block_id(&block_hash);
    printhex(block_hash.hash,20);
}
```


### get\_block\_id\_for\_num

**Function:** `void get_block_id_for_num(checksum160* hash, uint32_t block_num)`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the specified block hash

**params:**

`<checksum160 *> hash` the specified block hash

`<uint32_t> blcok_num` block num

```cpp
// @abi action
void examidnum(){
    checksum160 block_hash;
    get_block_id_for_num(&block_hash,1);             //get the hash of first block 
    printhex(block_hash.hash,20);
}
```


### get\_head\_block\_time

**Function:** `int64_t get_head_block_time()`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the time of the block, return the value in seconds

**Return Value:** the time of the block

```cpp
// @abi action
void examgettime(){
    int64_t head_time;
    head_time = get_head_block_time();
    print("head block time: ",head_time);
}
```


### get\_trx\_sender

**Function:** `uint64_t get_trx_sender()`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the instance_id of the account that called the contract

**Return Value:** instance_id of the account

```cpp
// @abi action
void examgettrx(){
    uint64_t sender_id;
    sender_id = get_trx_sender();
    print("call action instance id: ",sender_id);
}
```


### get\_account\_id

**Function:** `int64_t get_account_id(const char * data, uint32_t length)`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the instance_id of the account by the account name

**Return Value:** Returns the instance_id of the account if the account exists, or -1 if the account does not exist

**params:**

`<const char *> data` account name

`<uint32_t> length` account name length


```cpp
// @abi action
void examgetacid(std::string data){
    int64_t acc_id;
    acc_id = get_account_id(data.c_str(), data.length());
    print("account id: ",acc_id);
}
```

### get\_account\_name\_by\_id

**Function:** `int64_t get_account_name_by_id(array_ptr<char> data, size_t buffer_size, int64_t account_id)`

**Head file:** `<graphenelib/global.h>`

**Description:** Obtain an account name by the account instance id

**Return Value:** Returns 0 if the account exists, or -1 if the account does not exist

**params:**

`<const char *> data` account name

`<uint32_t> length` account name length

`<int64_t> account_id` account instance_id


```cpp
// @abi action
void examgetname(int64_t accid){
    char data[65]={0};
    int64_t result;
    result = get_account_name_by_id(data,65,accid);
    prints(data);
}
```

### get\_asset\_id

**Function:** `int64_t get_asset_id(const char * data, uint32_t length)`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the instance_id of the asset by the asset name

**Return Value:** Returns the instance_id of the asset if the asset exists, or -1 if the asset does not exist

**params:**

`<const char *> data` asset name

`<uint32_t> length` asset name length

```cpp
// @abi action
void examassid(std::string data){
    int64_t assid;
    assid = get_asset_id(data.c_str(),data.length());
    print("asset id: ",assid);
}
```

### read\_transaction

**Function:** `int read_transaction(char* dst, uint32_t dst_size)`

**Head file:** `<graphenelib/global.h>`

**Description:** Read the current transaction serialized data

**Return Value:** If dst_size is 0, the number of bytes required for reading is returned; if dst_size is not 0, the number of bytes actually read is returned.

**params:**

`<char*> dst` buffer address

`<uint32_t> dst_size` read size

```cpp
// @abi action
void examreadtrx(){
    int dwsize;
    dwsize =transaction_size();
    char* pBuffer = new char[dwsize];
    uint32_t size = read_transaction(pBuffer,dwsize);
    delete[] pBuffer;
}
```

### transaction\_size

**Function:** `int transaction_size()`

**Head file:** `<graphenelib/global.h>`

**Description:** Get the length of the data of the current transaction is serialized

**Return Value:** The length of the data

```cpp
// @abi action
void examtrxsize(){
    int dwsize;
    dwsize =transaction_size();
    print("the size of the serialize trx: ",dwsize);
}
```

### expiration

**Function:** `uint64_t expiration()`

**Head file:** `<graphenelib/global.h>`

**Description:** Get transaction expiration time

**Return Value:** the transaction expiration time

```cpp
// @abi action
void exampira(){
    uint64_t timenum = expiration();
    print("the expiration time: ", timenum);
}
```


### tapos\_block\_num

**Function:** `int tapos_block_num()`

**Head file:** `<graphenelib/global.h>`

**Description:** Returns the block number referenced by the transaction

**Return Value:** the block number

```cpp
// @abi action
void examtapnum(){
    uint64_t tapos_num;
    tapos_num = tapos_block_num();
    print("ref block num: ",tapos_num);
}
```


### tapos\_block\_prefix

**Function:** `uint64_t tapos_block_prefix()`

**Head file:** `<graphenelib/global.h>`

**Description:** Returns the block ID of the transaction reference (the second 32 digits)

**Return Value:** Returns the block ID of the transaction reference (the second 32 digits)

```cpp
// @abi action
void examtappre(){
    uint64_t tapos_prefix;
    tapos_prefix = tapos_block_prefix();
    print("ref block id: ",tapos_prefix);
}
```


### read\_action\_data

**Function:** `uint32_t read_action_data( void* msg, uint32_t len )`

**Head file:** `<graphenelib/action.h>`

**Description:** Read current action data

**Return Value:** read size

**params:**

`<void* > msg` buffer address

`<uint32_t> len` buffer size

```cpp
// @abi action
void examract(uint64_t num,std::string number){
    auto size = action_data_size();
    char *buffer = static_cast<char*>(malloc(size));
    read_action_data((void*)buffer,size);
    printhex(buffer,size);
}
```

### action\_data\_size

**Function:** `uint32_t action_data_size()`

**Head file:** `<graphenelib/action.h>`

**Description:** Returns the number of bytes required to read the current action data

**Return Value:** the number of bytes

```cpp
// @abi action
void examrasize(uint64_t num,std::string number){
    auto size = action_data_size();
    print("size: ", size);
}
```

### unpack\_action\_data

**Function:** `T unpack_action_data()`

**Head file:** `<graphenelib/action.hpp>`

**Description:** Deserialize the current action data into a defined action object

**Return Value:** action object

```cpp
struct myaction {
    uint64_t num;
    std::string name;
  
    GRAPHENE_SERIALIZE(myaction,(num)(name))
};
// @abi action
void examupact(uint64_t num,std::string name){
    auto my = unpack_action_data<myaction>();
    print(my.name);
}
```

### graphene\_assert

**Function:** `void graphene_assert(uint32_t test, const char* msg)`

**Head file:** `<graphenelib/system.h>`

**Description:** If the assertion fails, interrupt the execution of this contract and roll all states


**params:**

`<uint32_t> test` assertion

`<const char*> msg` message

```cpp
// @abi action
void examassert(){
    uint64_t number=1;
    graphene_assert(number == 1, "wrong!");
}
```


### graphene\_assert\_message

**Function:** `void graphene_assert_message(uint32_t test, const char* msg, uint32_t msg_len)`

**Head file:** `<graphenelib/system.h>`

**Description:** If the assertion fails, interrupt the execution of this contract and roll all states


**params:**

`<uint32_t> test` assertion

`<const char*> msg` message

`<uint32_t> msg_len` message size

```cpp
// @abi action
void examassmsg(){
    uint64_t number=1;
    std::string msg = "wrong!!!";
    graphene_assert_message(number == 1, msg.c_str(),msg.length()); 
}
```


### print

**Function:** `void print(const char* ptr)`

**Head file:** `<graphenelib/system.h>`

**Description:** Print log（Please click [Contract Debugging](debug.html#print)）


**params:**

`<const char*> ptr`  log

```cpp
// @abi action
void examprint(){
    print("example example example!!!");
}
```

### example

The sample contract for api usage has been deployed to the test network, which can be tested by the IDE client, click to view [contract source](./question.html#Built-in_api_example),contract name is `apitest`


## Multi-index table

#### <a name="index"></a>index
* [Introduction to multi-index table](#smart_contract_storage_brief_introduction)
* [Example](#example)
* [Define_type](#define_type)
* [Emplace](#add)
* [Erase](#delete)
* [Find](#find)
* [Modify](#modify)


### <a name="smart_contract_storage_brief_introduction"></a>Introduction to multi-index table 
The data must be stored in units of C++ class instances, so the stored C++ classes must be defined in the contract. Each class has a table, similar to a single table in the sql database. The difference is that it has the following characteristics: 
>Support for multi index   

>Joint indexing is not supported  

>Only the primary key is unique  

>Index type only supports uint64_t type 

>If you want to use a string as an index, you must use the `uint64_t string_to_name(string str)` in the contract library to convert the string to uint64_t. The string length is limited to 12 characters and can only include ([az].[1 -5]) A total of 32 characters 

>For indexes other than the primary key, when there are multiple record index values, the acquired object is the earliest inserted record.  

>Support for additions and deletions   


### <a name="example"></a>example code
```cpp
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/multi_index.hpp>
#include <graphenelib/print.hpp>

using namespace graphene;

class multindex : public contract
{
    struct offer;

  public:
    multindex(uint64_t id)
        : contract(id)
        , offers(_self, _self)
    {
    }

    //@abi action
    void additem(uint64_t i1, uint64_t i2, std::string name)
    {
        uint64_t pk = offers.available_primary_key();
        print("pk=", pk);
        offers.emplace(0, [&](auto &o) {
            o.id = pk;
            o.idx1 = i1;
            o.idx2 = i2;
            o.stringidx = graphenelib::string_to_name(name.c_str());
        });
    }

    //@abi action
    void getbypk(uint64_t key)
    {
        auto it = offers.find(key);
        if (it != offers.end()) {
            dump_item(*it);
        }
    }

    //@abi action
    void getbyidx1(uint64_t key)
    {
        auto idx = offers.template get_index<N(idx1)>();
        auto matched_offer_itr = idx.lower_bound(key);
        if (matched_offer_itr != idx.end()) {
            dump_item(*matched_offer_itr);
        }
    }

    //@abi action
    void getbyidx2(uint64_t key)
    {
        auto idx = offers.template get_index<N(idx2)>();
        auto matched_offer_itr = idx.lower_bound(key);
        if (matched_offer_itr != idx.end()) {
            dump_item(*matched_offer_itr);
        }
    }
    
    //@abi action
    void getbystring(std::string key)
    {
        auto idx = offers.template get_index<N(stringidx)>();
        auto matched_offer_itr = idx.lower_bound(N(key));
        if (matched_offer_itr != idx.end()) {
            dump_item(*matched_offer_itr);
        }
    }

  private:
    void dump_item(const offer &o)
    {
        print("offer.id:", o.id, "\n");
        print("offer.idx1:", o.idx1, "\n");
        print("offer.idx2:", o.idx2, "\n");
        graphenelib::name n;
        n.value = o.stringidx;
        print("offer.stringidx:", n.to_string().c_str(), "\n");
    }

  private:
    //@abi table offer i64
    struct offer {
        uint64_t id;
        uint64_t idx1;
        uint64_t idx2;
        uint64_t stringidx;

        uint64_t primary_key() const { return id; }

        uint64_t by_index1() const { return idx1; }

        uint64_t by_index2() const { return idx2; }
        
        uint64_t by_stringidx() const {return stringidx; }

        GRAPHENE_SERIALIZE(offer, (id)(idx1)(idx2)(stringidx))
    };

    typedef multi_index<N(offer), offer,
                        indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,
                        indexed_by<N(idx2), const_mem_fun<offer, uint64_t, &offer::by_index2>>,
                        indexed_by<N(stringidx), const_mem_fun<offer, uint64_t, &offer::by_stringidx>>>
        offer_index;

    offer_index offers;
};

GRAPHENE_ABI(multindex, (additem)(getbypk)(getbyidx1)(getbyidx2)(getbystring))

```


### <a name="define_type"></a>Define type
```cpp
private:
    //@abi table offer i64
    struct offer {
        uint64_t id;
        uint64_t idx1;
        uint64_t idx2;
        uint64_t stringidx;

        uint64_t primary_key() const { return id; }

        uint64_t by_index1() const { return idx1; }

        uint64_t by_index2() const { return idx2; }
        
        uint64_t by_stringidx() const {return stringidx; }

        GRAPHENE_SERIALIZE(offer, (id)(idx1)(idx2)(stringidx))
    };

    typedef multi_index<N(offer), offer,
        indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,
        indexed_by<N(idx2), const_mem_fun<offer, uint64_t, &offer::by_index2>>,
        indexed_by<N(stringidx), const_mem_fun<offer, uint64_t, &offer::by_stringidx>>> offer_index;
    offer_index offers;
```

Must add comments //@abi table offer i64    

`offer` is table name, Can't exceed 12 characters and can only be `[a-z] 1-5] .` 

`i64` is an index type.

`GRAPHEN_SERIALIZE`(typename, (field1)(field2)(field3)(field4)...)

`uint64_t primary_key() const { return id; }` Specify a unique primary key, The other 3 functions are used to define the secondary index. 

Definition index 
```cpp
typedef multi_index<N(offer), offer,  
    indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,  
    indexed_by<N(idx2), const_mem_fun<offer, uint64_t, &offer::by_index2>>,  
    indexed_by<N(stringidx), const_mem_fun<offer, uint64_t, &offer::by_stringidx>>>  offer_index;  

`offer` is consistent with the offer in '//@abi table offer i64', `offer` is used to specify the type name previously defined
``` 

```cpp
indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,
    const_mem_fun<offer, uint64_t, &offer::by_index1>

// Define a secondary index, a table can define up to 16 secondary indexes 
// N(idx1) used to define the index name 
```

In the contract constructor you need to use the contract's \_self (contract id) to initialize an instance of a multi-index type.
```cpp
    multindex(uint64_t id)
        : contract(id)
        , offers(_self, _self)
    {}
```
[go_back](#index)  


#### <a name="add"></a>Emplace
```cpp
uint64_t pk = offers.available_primary_key();
print("pk=", pk);
offers.emplace(0, [&](auto &o) {
    o.id = pk;
    o.idx1 = i1;
    o.idx2 = i2;
    o.stringidx = graphenelib::string_to_name(name.c_str());
});
```
`uint64_t pk = offers.available_primary_key()` The next legal primary key used to obtain the auto-increment primary key, or you can specify it yourself 

```cpp
offers.emplace(0, [&](auto &o) {  
    o.id = pk;  
    o.idx1 = i1;  
    o.idx2 = i2;  
    o.stringidx = graphenelib::string_to_name(name.c_str());  
});
```

`o.stringidx = graphenelib::string_to_name(name.c_str())`Implementing a string type as an index

[go_back](#index)  


#### <a name="delete"></a>Erase
Please read first [Find](#find)  
Usually iterated by the table, you need to find the iterator of the object you want to delete.

`offers.erase(it)` 'it' is an iterator that finds the returned object

[go_back](#index)  


#### <a name="find"></a>Find
```cpp
auto idx = offers.template get_index<N(stringidx)>();
auto matched_offer_itr = idx.lower_bound(N(key));
if (matched_offer_itr != idx.end()) {
    dump_item(*matched_offer_itr);
}
```

`auto idx = offers.template get_index<N(stringidx)>()`Get the index of the offer table name as `stringidx`, the offer table has 4 indexes, one is the primary key index, and the other 3 secondary levels are `idx1`, `idx2`, `stringidx`  

`auto matched_offer_itr = idx.lower_bound(N(key))`Find the object of the string key by the primary key index and return its iterator `matched_offer_itr` 

[go_back](#index)  


#### <a name="modify"></a>Modify

Modifying an object is usually modified by the object's iterator and lambda expression.

```cpp
offers.modify(it, 0, [&](auto &o) {
  o.idx1 = 1000;
});
```
[go_back](#index)  
