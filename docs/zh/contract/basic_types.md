## 内置类型
GXChain智能合约，除了C++语法支持的所有类型外，还提供了合约内置类型。

#### contract_asset
合约内的asset类型，包含2个字段：
```
    int64_t     amount;
    uint64_t    asset_id;
```
其中amount表示资产数量，asset_id表示资产的instance id(比如资产id为1.3.1， 则其instance id最后的1)。

contract_asset类型的合约示例，可参考bank合约。

#### signature

合约内的signature类型， 结构体定义：
```
struct signature {
   uint8_t data[65];
};
```

示例：
```c++
    void verify(std::string raw_string, std::string pub_key, signature sig)
    {   
        print("string, ", raw_string, "\n");
        print(pub_key, "\n");
        bool flag = verify_signature(raw_string.c_str(), raw_string.length(), &sig, pub_key.c_str(), pub_key.length());
        print("ret code, ", flag, "\n");
    } 
 ```


#### public_key
合约内的public key类型, 结构体定义：
```
struct public_key {
   char data[33];
};
```


#### checksum256
合约内置的sha256类型， 结构体定义：
```
struct ALIGNED(checksum256) {
   uint8_t hash[32];
};
```

示例：
```
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


#### checksum160
合约内置的ripemd160类型，结构体定义：
```
struct ALIGNED(checksum160) {
   uint8_t hash[20];
};
```

#### checksum512
合约内的sha512类型, 结构体定义：
```
struct ALIGNED(checksum512) {
   uint8_t hash[64];
};
```

#### block_id_type
合约内置的block_id_type类型， 结构体定义：
```
typedef struct checksum160      block_id_type;
```


## 下一步
[内置API介绍](./apis.html)