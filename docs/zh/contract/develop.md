# 合约开发和API介绍

## 内置类型
GXChain智能合约，除了C++语法支持的所有类型外，还提供了合约内置类型。

### contract\_asset
合约内的asset类型，包含2个字段：
```cpp
int64_t     amount;
uint64_t    asset_id;
```
验证contract_asset数额是否有效,使用`is_amount_within_range`成员方法
```cpp
bool is_amount_within_range() const { 
    return -max_amount <= amount && amount <= max_amount; 
}
```


::: warning 提示
contract_asset类型中，其中amount表示资产数量，在链上使用大数存储，举例来说，GXC资产精度为5，1 GXC实际需要表示为1 * 100000 = 100000， 即amount为100000

asset_id表示资产的instance id(比如资产id为1.3.1， 则其instance id最后的1)。
:::

contract_asset类型的合约示例，可参考bank合约。

### signature

合约内的signature类型， 结构体定义：
```cpp
struct signature {
   uint8_t data[65];
};
```

示例：
```cpp
void verify(checksum256 hash, std::string pub_key, signature sig)
{   
    print(pub_key, "\n");
    assert_recover_key(&hash, &sig, pub_key.c_str(), pub_key.length());
} 
 ```


### public\_key
合约内的public key类型, 结构体定义：
```cpp
struct public_key {
   char data[33];
};
```


### checksum256
合约内置的sha256类型， 结构体定义：
```cpp
struct ALIGNED(checksum256) {
   uint8_t hash[32];
};
```

示例：
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
合约内置的ripemd160类型，结构体定义：
```cpp
struct ALIGNED(checksum160) {
   uint8_t hash[20];
};
```

### checksum512
合约内的sha512类型, 结构体定义：
```cpp
struct ALIGNED(checksum512) {
   uint8_t hash[64];
};
```

### block\_id\_type
合约内置的block_id_type类型， 结构体定义：
```cpp
typedef struct checksum160      block_id_type;
```
## 内置API

在GXChain上开发智能合约，可以调用内置API来实现更加丰富的功能

| belong | api name | description |
| --- | --- | --- |
| <graphenelib/action.h> | current_receiver | 返回当前合约账号的instance id (即帐户id的最后一位) |
| <graphenelib/action.h> | get_action_asset_id | 返回本次调用向合约发送的资产instance id (即资产id的最后一位)|
| <graphenelib/action.h> | get_action_asset_amount | 返回本次调用向合约发送的资产数量 |
| <graphenelib/asset.h> | withdraw_asset | 将当前合约帐户的资产转移到链上账户 |
| <graphenelib/asset.h> | inline_transfer | 将当前合约帐户的资产转移到链上账户 |
| <graphenelib/asset.h> | get_balance | 获取链上账户的某资产余额 |
| <graphenelib/crypto.h> | sha1 | 计算数据的sha1 |
| <graphenelib/crypto.h> | sha256 | 计算数据的sha256 |
| <graphenelib/crypto.h> | sha512 | 计算数据的sha512 |
| <graphenelib/crypto.h> | ripemd160 | 计算数据的ripemd160 |
| <graphenelib/crypto.h> | assert_recover_key | 校验给定的签名和hash是否能够恢复公钥 |
| <graphenelib/global.h> | get_head_block_num | 获取最新区块号 |
| <graphenelib/global.h> | get_head_block_id | 获取最新区块hash |
| <graphenelib/global.h> | get_block_id_for_num | 获取指定区块hash |
| <graphenelib/global.h> | get_head_block_time | 获取最新区块的时间，返回值单位秒 |
| <graphenelib/global.h> | get_trx_sender | 获取调用合约的账号的instance_id |
| <graphenelib/global.h> | get_trx_origin | 获取原始调用者的instance_id |
| <graphenelib/global.h> | get_account_id | 根据账号名获取账号的instance_id |
| <graphenelib/global.h> | get_account_name_by_id | 根据账号instance id获取账号名 |
| <graphenelib/global.h> | get_asset_id | 根据资产名获取资产的instance_id |
| <graphenelib/global.h> | read_transaction | 读取当前transaction序列化后的数据 |
| <graphenelib/global.h> | transaction_size | 当前transaction序列化后的数据的长度 |
| <graphenelib/global.h> | expiration | 获取交易到期时间 |
| <graphenelib/global.h> | tapos_block_num | 返回交易引用的区块号 |
| <graphenelib/global.h> | tapos_block_prefix | 返回交易引用的区块ID（第二个32位数） |
| <graphenelib/action.h> | read_action_data | 读取当前action数据 |
| <graphenelib/action.h> | action_data_size | 返回当前action数据读取所需字节数 |
| <graphenelib/action.h> | send_inline      | 内联调用action |
| <graphenelib/action.hpp> | unpack_action_data | 将当前action数据反序列化为定义的action对象 |
| <graphenelib/system.h> | graphene_assert | 如果条件不满足，中断本次合约的执行并会滚所有状态 |
| <graphenelib/system.h> | graphene_assert_message | 如果条件不满足，中断本次合约的执行并会滚所有状态 |
| <graphenelib/system.h> | print | 用于调试时日志的打印 |



### current\_receiver

**函数类型:** `uint64_t current_receiver()`

**头文件:** `<graphenelib/action.h>`

**功能说明:** 返回当前合约账号的instance id (即帐户id的最后一位)

**返回值:** 返回当前合约账号的instance id

**示例:**

```cpp
// @abi action
void examcurr(){
    uint64_t ins_id = current_receiver();
    print("current contract account id: ", ins_id, "\n");
}
```



### get\_action\_asset\_id

**函数类型:** `uint64_t get_action_asset_id()`

**头文件:** `<graphenelib/action.h>`

**功能说明:** 返回本次调用向合约发送的资产instance id (即资产id的最后一位)

**返回值:** 返回0表示action无附带资产，返回非0表示资产的instance id   

**示例:**    

```cpp
// @abi action
void examgetast(){
    uint64_t ast_id = get_action_asset_id();
    print("call action asset id: ",ast_id,"\n");
}
```

### get\_action\_asset\_amount

**函数类型:** `int64_t get_action_asset_amount()`

**头文件:** `<graphenelib/action.h>`

**功能说明:** 返回本次调用向合约发送的资产数量

**返回值:** 返回0表示合约无附带资产，返回非0表示附带资产数量，数量需要除以10万

**示例:**

```cpp
//get_action_asset_amount 
// @abi action
void examgetamo(){
    int64_t amount = get_action_asset_amount();
    print("call action asset amount: ",amount,"\n");      
}
```

### inline\_transfer

**函数类型:** `void inline_transfer(uint64_t from, uint64_t to, uint64_t asset_id, int64_t amount, const char* data, uint32_t length);`

**头文件:** `<graphenelib/asset.h>`

**功能说明:** 将当前合约的资产转移到外部账户

**params:**

参数 | 类型 | 描述
---|---|---
from | uint64_t | 从哪个账号转账，一般是_self
to   | uint64_t | 转账到哪个外部账户，必须只传账号的instance_id，比如外部账户是1.2.33，那么传33即可
asset_id | uint64_t | 指定转账的资产id，必须只传资产id的instance_id, 比如资产id是1.3.0， 那么传0即可
amount | int64_t | 转账金额，这个数字包含了资产的精度，比如想转1个GXC，那么应该写100000
data | const char* | data字符串首地址（memo）
length | uint32_t | data字符串的长度

**示例:**

```cpp
// @abi action
void examwith(uint64_t from,uint64_t to, uint64_t asset_id, int64_t amount){
    std::string memo = "withdraw";
    inline_transfer(from,to,asset_id,amount, memo.c_str(), memo.size());
    print("inline_transfer example\n");
}
```


### withdraw\_asset

**函数类型:** `void withdraw_asset(uint64_t from, uint64_t to, uint64_t asset_id, int64_t amount)`

**头文件:** `<graphenelib/asset.h>`

**功能说明:** 将当前合约的资产转移到外部账户

**params:**

参数 | 类型 | 描述
---|---|---
from | uint64_t | 从哪个账号转账，一般是_self
to   | uint64_t | 转账到哪个外部账户，必须只传账号的instance_id，比如外部账户是1.2.33，那么传33即可
asset_id | uint64_t | 指定转账的资产id，必须只传资产id的instance_id, 比如资产id是1.3.0， 那么传0即可
amount | int64_t | 转账金额，这个数字包含了资产的精度，比如想转1个GXC，那么应该写100000

**示例:**

```cpp
// @abi action
void examwith(uint64_t from,uint64_t to, uint64_t asset_id, int64_t amount){
    withdraw_asset(from,to,asset_id,amount);
    print("withdraw_asset example\n");
}
```


### get\_balance

**函数类型:** `int64_t get_balance(int64_t account, int64_t asset_id)`

**头文件:** `<graphenelib/asset.h>`

**功能说明:** 获取链上帐户的某资产余额

**返回值:** 返回链上帐户的某资产余额

**params:**

参数 | 类型 | 描述
---|---|---
account | int64_t | 链上账户的instace_id
asset_id | int64_t | 指定资产的instance_id

**示例:**

```cpp
// @abi action
void examgetbl(int64_t account, int64_t asset_id){
    int64_t balance = get_balance(account, asset_id);
    print("account balance: ",balance,"\n");
}
```

### sha1

**函数类型:** `void sha1(const char *data, uint32_t length, checksum160 *hash)`

**头文件:** `<graphenelib/crypto.h>`

**功能说明:** 计算数据的sha1

**params:**

参数 | 类型 | 描述
---|---|---
data | const char* | 用于计算sha1的字符串首地址
length | uint32_t | data字符串的长度
hash | checksum160* | 出参 用于存储计算的sha1

**示例:**

```cpp
// @abi action
void examsha1(std::string data){
    checksum160 hash;
    sha1(data.c_str(),data.length(),&hash);
    printhex(hash.hash,20);
    print("\n");
}
```

### sha256

**函数类型:** `void sha256(const char *data, uint32_t length, checksum256 * hash)`

**头文件:** `<graphenelib/crypto.h>`

**功能说明:** 计算数据的sha256


**params:**

参数 | 类型 | 描述
---|---|---
data | const char* | 用于计算sha256的字符串首地址
length | uint32_t | data字符串的长度
hash | checksum256* | 出参 用于存储计算的sha256

**示例:**

```cpp
// @abi action
void examsha25(std::string data){
    checksum256 hash;
    sha256(data.c_str(),data.length(),&hash);
    printhex(hash.hash,32);
    print("\n");
}
```


### sha512

**函数类型:** `void sha512(const char *data, uint32_t length, checksum512 * hash)`

**头文件:** `<graphenelib/crypto.h>`

**功能说明:** 计算数据的sha512


**params:**

参数 | 类型 | 描述
---|---|---
data | const char* | 用于计算sha512的字符串首地址
length | uint32_t | data字符串的长度
hash | checksum512* | 出参 用于存储计算的sha512

**示例:**

```cpp
// @abi action
void examsha512(std::string data){
    checksum512 hash;
    sha512(data.c_str(),data.length(),&hash);
    printhex(hash.hash,64);
    print("\n");
}
```


### ripemd160

****函数类型:**** `void ripemd160(const char *data, uint32_t length, checksum160 * hash)`

**头文件:** `<graphenelib/crypto.h>`

**功能说明:** 计算数据的ripemd160


**params:**

参数 | 类型 | 描述
---|---|---
data | const char* | 用于计算ripemd160的字符串首地址
length | uint32_t | data字符串的长度
hash | checksum160* | 出参 用于存储计算的ripemd160

**示例:**

```cpp
// @abi action
void examripemd(std::string data){
    checksum160 hash;
    ripemd160(data.c_str(),data.length(),&hash);
    printhex(hash.hash,20);
    print("\n");
}
```

### assert\_recover\_key

**函数类型:** `void assert_recover_key(const checksum256 *digest,const signature *sig,
                              const char *pub, uint32_t publen);`

**头文件:** `<graphenelib/crypto.h>`

**功能说明:** 校验给定的签名和hash是否能够恢复公钥


**params:**

参数 | 类型 | 描述
---|---|---
data | const checksum256* | sha256 hash值
sig | const signature* | 对原字符串签名后的数据
pub | const char* | 公钥(16进制格式：[见gxbjs/src/ecc/PublicKey.js](https://github.com/gxchain/gxbjs/blob/master/lib/ecc/src/PublicKey.js#L161))
publen | uint32_t | 公钥长度

**示例:**

```cpp
// @abi action
void examrecover(checksum256 hash,signature sig,std::string pkey)
{
    assert_recover_key(&hash, &sig, pkey.c_str(), pkey.length());
}
```

### get\_head\_block\_num

**函数类型:** `int64_t get_head_block_num()`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 返回最新区块号

**返回值:** 返回最新区块数

**示例:**

```cpp
// @abi action
void examgetnum(){
    int64_t head_num = get_head_block_num();
    print("head block num: ",head_num, "\n");
}
```

### get\_head\_block\_id

**函数类型:** `void get_head_block_id(checksum160* hash)`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取最新区块hash

**params:**

参数 | 类型 | 描述
---|---|---
hash | checksum160* | 获取最新区块的hash值

**示例:**

```cpp
// @abi action
void examgetid(){
    checksum160 block_hash;
    get_head_block_id(&block_hash);
    printhex(block_hash.hash,20);
    print("\n");
}
```


### get\_block\_id\_for\_num

**函数类型:** `void get_block_id_for_num(checksum160* hash, uint32_t block_num)`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取指定区块hash

**params:**

参数 | 类型 | 描述
---|---|---
hash | checksum160* | 获取指定区块的hash值
block_num | uint32_t | 指定的区块号

**示例:**

```cpp
// @abi action
void examidnum(){
    checksum160 block_hash;
    get_block_id_for_num(&block_hash,1);             //get the hash of first block 
    printhex(block_hash.hash,20);
    print("\n");
}
```


### get\_head\_block\_time

**函数类型:** `int64_t get_head_block_time()`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取最新区块的时间，返回值单位秒

**返回值:** 返回最新区块时间

**示例:**

```cpp
// @abi action
void examgettime(){
    int64_t head_time;
    head_time = get_head_block_time();
    print("head block time: ",head_time,"\n");
}
```


### get\_trx\_sender

**函数类型:** `uint64_t get_trx_sender()`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取调用合约的账号的instance id

**返回值:** 返回调用账户的instance id

**示例:**

```cpp
// @abi action
void examgettrx(){
    uint64_t sender_id;
    sender_id = get_trx_sender();
    print("call action instance id: ",sender_id,"\n");
}
```

### get\_trx\_origin

**函数类型:** `uint64_t get_trx_origin();`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取原始调用者的instance id

**返回值:** 返回原始调用者的instance id

**示例:**

```cpp
// @abi action
void examgetori(){
    uint64_t origin_id;
    origin_id = get_trx_origin();
    print("original instance id: ",origin_id,"\n");
}
```

### get\_account\_id

**函数类型:** `int64_t get_account_id(const char * data, uint32_t length)`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 根据账号名获取账号的instance_id

**返回值:** 返回-1表示无此帐户名，返回值>=0 表示帐户的instance id

**params:**

参数 | 类型 | 描述
---|---|---
data | const char* | 账号名，例如nathan
length | uint32_t | 账号名的长度，例如nathan的长度是6

如果帐户存在，返回帐户的instance_id，如果帐户不存在，则返回-1

**示例:**

```cpp
// @abi action
void examgetacid(std::string data){
    int64_t acc_id;
    acc_id = get_account_id(data.c_str(), data.length());
    print("account id: ",acc_id,"\n");
}
```

### get\_account\_name\_by\_id

**函数类型:** `int64_t get_account_name_by_id(array_ptr<char> data, size_t buffer_size, int64_t account_id)`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 根据账号instance id获取账号名

**返回值:** 返回-1表示无此帐户，返回值0 表示获取帐户名成功

**params:**

参数 | 类型 | 描述
---|---|---
data | const char* | 账号名，例如nathan
length | uint32_t | 账号名的长度，例如nathan的长度是6
account_id | int64_t | account的instance id或者id

如果帐户存在，返回值为0，如果帐户不存在，则返回-1

**示例:**

```cpp
// @abi action
void examgetname(int64_t accid){
    char data[65]={0};
    int64_t result;
    result = get_account_name_by_id(data,65,accid);
    print(static_cast<const char*>data,"\n");
}
```

### get\_asset\_id

**函数类型:** `int64_t get_asset_id(const char * data, uint32_t length)`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 根据资产名获取资产的instance_id

**返回值:** 返回-1表示无此资产名，返回值>=0 表示资产的instance id

**params:**

参数 | 类型 | 描述
---|---|---
data | const char* | 资产名
length | uint32_t | 资产名的长度，例如GXC的长度是3

**示例:**

```cpp
// @abi action
void examassid(std::string data){
    int64_t assid;
    assid = get_asset_id(data.c_str(),data.length());
    print("asset id: ",assid,"\n");
}
```

### read\_transaction

**函数类型:** `int read_transaction(char* dst, uint32_t dst_size)`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 读取当前transaction序列化后的数据到dst中

**返回值:** 当dst_size为0时，返回读取所需的字节数；当dst_size不为0时，返回实际读取的字节数（dst_size与transaction size的最小值）

**params:**

参数 | 类型 | 描述
---|---|---
dst | char* | 接收读取到的数据buffer的指针
dst_size | uint32_t | 要读取的长度

**示例:**

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

**函数类型:** `int transaction_size()`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取当前transaction序列化后的数据的长度

**返回值:** 返回序列化后的数据的长度

**示例:**

```cpp
// @abi action
void examtrxsize(){
    int dwsize;
    dwsize =transaction_size();
    print("the size of the serialize trx: ",dwsize,"\n");
}
```

### expiration

**函数类型:** `uint64_t expiration()`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取交易到期时间

**返回值:** 返回交易到期时间

**示例:**

```cpp
// @abi action
void exampira(){
    uint64_t timenum = expiration();
    print("the expiration time: ", timenum,"\n");
}
```


### tapos\_block\_num

**函数类型:** `int tapos_block_num()`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取交易引用的区块号

**返回值:** 返回交易引用的区块号

**示例:**

```cpp
// @abi action
void examtapnum(){
    uint64_t tapos_num;
    tapos_num = tapos_block_num();
    print("ref block num: ",tapos_num,"\n");
}
```


### tapos\_block\_prefix

**函数类型:** `uint64_t tapos_block_prefix()`

**头文件:** `<graphenelib/global.h>`

**功能说明:** 获取交易引用的区块ID（第二个32位数）

**返回值:** 返回交易引用的区块ID（第二个32位数）

**示例:**

```cpp
// @abi action
void examtappre(){
    uint64_t tapos_prefix;
    tapos_prefix = tapos_block_prefix();
    print("ref block id: ",tapos_prefix,"\n");
}
```


### read\_action\_data

**函数类型:** `uint32_t read_action_data( void* msg, uint32_t len )`

**头文件:** `<graphenelib/action.h>`

**功能说明:** 读取当前action数据

**返回值:** 返回实际读取的字节数，如果len为0返回读取所需要的字节数

**params:**

参数 | 类型 | 描述
---|---|---
msg | void* | 接收buffer指针
len | uint32_t | 读取的长度

**示例:**

```cpp
// @abi action
void examract(uint64_t num,std::string number){
    auto size = action_data_size();
    char *buffer = static_cast<char*>(malloc(size));
    read_action_data((void*)buffer,size);
    printhex(buffer,size);
    print("\n");
}
```

### action\_data\_size

**函数类型:** `uint32_t action_data_size()`

**头文件:** `<graphenelib/action.h>`

**功能说明:** 读取当前action数据所需的字节数

**返回值:** 返回读取所需要的字节数

**示例:**

```cpp
// @abi action
void examrasize(uint64_t num,std::string number){
    auto size = action_data_size();
    print("size: ", size,"\n");
}
```

### send\_inline

**函数类型:** `void send_inline(char *serialized_action, size_t size)`

**头文件:** `<graphenelib/action.h>`

**功能说明:** 内联执行action（一般通过构造action，并通过其send成员方法来内联执行action，其内部实现为send\_inline，[跨合约调用](#跨合约调用)）

### unpack\_action\_data

**函数类型:** `T unpack_action_data()`

**头文件:** `<graphenelib/action.hpp>`

**功能说明:** unpack当前action data

**返回值:** 返回unpack后的action结构

**示例:**

```cpp
struct myaction {
    uint64_t num;
    std::string name;
  
    GRAPHENE_SERIALIZE(myaction,(num)(name))
};
// @abi action
void examupact(uint64_t num,std::string name){
    auto my = unpack_action_data<myaction>();
    print(my.name,"\n");
}
```

### graphene\_assert

**函数类型:** `void graphene_assert(uint32_t test, const char* msg)`

**头文件:** `<graphenelib/system.h>`

**功能说明:** 如果条件不满足，中断本次合约的执行并会滚所有状态


**params:**

参数 | 类型 | 描述
---|---|---
test | uint32_t | 验证条件
msg | const char* | 条件不满足时，回滚输出的消息

**示例:**

```cpp
// @abi action
void examassert(){
    uint64_t number=1;
    graphene_assert(number == 1, "wrong!");
}
```


### graphene\_assert\_message

**函数类型:** `void graphene_assert_message(uint32_t test, const char* msg, uint32_t msg_len)`

**头文件:** `<graphenelib/system.h>`

**功能说明:** 如果条件不满足，中断本次合约的执行并会滚所有状态


**params:**

参数 | 类型 | 描述
---|---|---
test | uint32_t | 验证条件
msg | const char* | 条件不满足时，回滚输出的消息
msg_len | uint32_t | 消息内容的长度

**示例:**

```cpp
// @abi action
void examassmsg(){
    uint64_t number=1;
    std::string msg = "wrong!!!";
    graphene_assert_message(number == 1, msg.c_str(),msg.length()); 
}
```


### print

**函数类型:** `void print(const char* ptr)`

**头文件:** `<graphenelib/system.h>`

**功能说明:** 用于调试时日志的打印（详细用法，请查看[合约调试](debug.html#print)）


**params:**
参数 | 类型 | 描述
---|---|---
ptr | const char* | 调试的消息体内容

**示例:**

```cpp
// @abi action
void examprint(){
    print("example example example!!!\n");
}
```

### 示例

关于api使用的示例合约已经部署到了测试网络，可以通过IDE客户端引入合约进行测试，点击查看[合约源码](./question.html#内置api调用示例合约)，合约账户`apitest`

![](./png/apitest.jpg)

## 跨合约调用

### 说明
GXChain支持合约间调用，并支持设置ram费用的支付账户。跨合约调用示例如`User --> contract_A --> contract_B`，对于合约`contract_B`，`User`为原始调用者，`contract_A`为sender。

跨合约调用层数限制：调用链中，不超过三个合约。即：`User --> contract_A --> contract_B --> contract_C`，超过调用层数，则会终止执行。（如果调用链形成了循环调用，同样会终止执行）

合约中使用到的ram资源，支付账户可以设置为以下4种身份：

| ram_fee payer | 说明 |
| --- | --- | 
| 0 | 合约账户自身（同\_slef） |
| \_self | 合约账户自身（同0） |
| sender | 合约调用账户 |
| original | 合约原始调用账户，跨合约调用中，为起始调用账户 |


### 示例
`contract_A --> contract_B`，`contract_A`合约调用`contract_B`合约。
1. 在`contract_A`中构造action，包含`contract_B`账户id/账户名、action名、参数、调用账户（\_self）、附加资产
2. 调用action的send方法，完成跨合约调用。

```cpp
#contract_b合约
···
void hi(std::string name,uint64_t number)
{
    ···
}
···
#contract_A合约
···
struct param {
    std::string name;
    uint64_t number;
};


void inlinecall(uint64_t con_b_id, std::string con_b_name){

    param par{"hello", 100};

    // 方式1：构造action时，使用合约账户id
    action contract_b_id(con_b_id, N(hi), std::move(par), _self, {1000, 1});
    contract_b_id.send();

    // 方式2：构造action时，使用合约账户名
    action contract_b_name(con_b_name, N(hi), std::move(par), _self, {1000,1});
    contract_b_name.send();
}
···
```


## 多索引表

#### <a name="index"></a>index
* [合约存储简介](#smart_contract_storage_brief_introduction)
* [示例代码](#example)
* [定义存储类型](#define_type)
* [增](#add)
* [删](#delete)
* [查](#find)
* [改](#modify)


### <a name="smart_contract_storage_brief_introduction"></a>合约存储简介
用于持久化存储合约数据  
数据必须以c++类的实例为单位存储，所以必须在合约中定义存储的c++类，每个类一张表，类似于关系型数据库的单表，不同的是他有以下特点：  
>支持多索引   
不支持联合索引   
只有主键是唯一的   
索引类型只支持uint64_t类型   
如果想要将字符串作为索引，必须用合约库中的uint64_t string_to_name(string str)将字符串转为uint64_t，字符串长度限制为12个字符以内，只能包括([a-z].[1-5])共32个字符   
对于除主键以外的索引，当有多条记录索引值一样时，获取的对象是最早插入存储的记录   
支持增删查改操作  

后面的内容围绕example来说明  
[go_back](#index)  


### <a name="example"></a>示例代码
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


### <a name="define_type"></a>定义存储类型
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

类型必须要带注释//@abi table offer i64  
@abi table固定写法  
offer是表名字，根据业务需求自定义不能超过12个字符并且只能是[a-z][1-5].共32种字符，以字母和.开头  
i64是索引类型，固定写i64即可  

对于struct offer{...}就是普通的c++类，最下面的GRAPHENE_SERIALIZE(offer, (id)(idx1)(idx2)(stringidx))用于序列化  
GRAPHEN\_SERIALIZE(类型名, (字段名1)(字段名2)(字段名3)(字段名4)...)  

uint64_t primary\_key() const { return id; } 这段代码的函数名和类型都是固定的，不能改动，用于指定唯一主键，这里把id作为主键  

其他3个函数用于定义二级索引时使用  

下面的代码用于根据定义的c++类来定义索引：  
```cpp
typedef multi_index<N(offer), offer,  
    indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,  
    indexed_by<N(idx2), const_mem_fun<offer, uint64_t, &offer::by_index2>>,  
    indexed_by<N(stringidx), const_mem_fun<offer, uint64_t, &offer::by_stringidx>>>  offer_index;  

typedef multi_index<N(offer), offer,这一行代码N(offer)与注释'//@abi table offer i64'中的offer要一致  
, offer用于指定之前定义的类型名字 
``` 

```cpp
indexed_by<N(idx1), const_mem_fun<offer, uint64_t, &offer::by_index1>>,
    const_mem_fun<offer, uint64_t, &offer::by_index1>

// 这段代码用于定义一个二级索引，一个表可以定义最多16个二级索引，这里定义了3个  
// N(idx1)用于定义索引名  
// 尖括号中第一个参数是之前定义的offer类型名，第二个参数是索引的类型，第三个参数是索引调用的offer类中的函数名  
```

最后需要在合约中定义索引的实例变量offer_index offers， 在合约的构造函数中需要使用合约的_self(合约id)来初始化：   
```cpp
    multindex(uint64_t id)
        : contract(id)
        , offers(_self, _self)
    {}
```
[go_back](#index)  


#### <a name="add"></a>增
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
`uint64_t pk = offers.available_primary_key()` 用于获取自增主键的下一个合法主键，也可以自己指定  

```cpp
offers.emplace(0, [&](auto &o) {  
    o.id = pk;  
    o.idx1 = i1;  
    o.idx2 = i2;  
    o.stringidx = graphenelib::string_to_name(name.c_str());  
});
```

插入对象用lambda表达式来给新增的对象o赋值

`o.stringidx = graphenelib::string_to_name(name.c_str())`这里就是用字符串类型作为索引的实现方式，不支持直接用字符串作为索引

[go_back](#index)  


#### <a name="delete"></a>删
请先阅读[查](#find)  
删除一般通过表的迭代器删除，一般先调用find来找到需要删除的对象的迭代器来删除

`offers.erase(it)` it是查找返回的对象的迭代器
[go_back](#index)  


#### <a name="find"></a>查
```cpp
auto idx = offers.template get_index<N(stringidx)>();
auto matched_offer_itr = idx.lower_bound(N(key));
if (matched_offer_itr != idx.end()) {
    dump_item(*matched_offer_itr);
}
```

`auto idx = offers.template get_index<N(stringidx)>()`获取offer表名字为`stringidx`的索引，offer表有4个索引，一个是主键索引，其他3个二级分别是`idx1`，`idx2`,`stringidx`，主键索引的查找更方便一些，不需要通过索引的名字先获取索引，再根据索引查找对应的key，而是直接`offers.find(pk)`，同样也是返回对象的迭代器。  

`auto matched_offer_itr = idx.lower_bound(N(key))`通过索引查找字符串key对应的主键对象，并返回相应的迭代器`matched_offer_itr`  
[go_back](#index)  


#### <a name="modify"></a>改

请请先阅读[查](#find)  

修改对象一般是通过对象的迭代器和lambda表达式来修改

```cpp
offers.modify(it, 0, [&](auto &o) {
  //这里是对象的修改代码
  o.idx1 = 1000;
});
```
[go_back](#index)  
