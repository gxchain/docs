# 附加选项


## 本地启动私链
参考[私有链搭建](../guide/private_chain.html)

## 部署测试网节点

参考[测试网络](../guide/testnet.html)

## 合约中的随机数

在区块链上，无法生成可验证的随机数。需要选取固定的种子来生成随机数，一般通过sha256等哈希算法生成随机序列。所以随机数的安全与否，与种子的选取至关重要。如果选用链上可获取的变量作为随机数，例如区块id、区块数量、资产余额等，合约的随机算法一旦泄露出去，那么完全可以先于区块链得到随机数，并因此能够预测随机数相关的业务结果。所以，随机数算法应该尽可能复杂，或者探索获取链外数据作为随机数种子的可能。
下面是通过链外数据生成随机数的例子
- 1. 对手双方（Alice与Bob）每一方创建一个随机数，并计算其hash值。
```bash
Alice:随机创建一个字符串，例如:"I am Alice"，并生成sha256哈希值
zhaoxiangfei@zhaoxiangfeideMacBook-Pro:~$ echo "I am Alice" | shasum -a 256
da161d9ee3c116083030737d5a4d478ee1a7654f8ea51e0513020937a9206b0f

Bob:随机创建一个字符串，例如:"I am Bob"，并生成sha256哈希值
zhaoxiangfei@zhaoxiangfeideMacBook-Pro:~$ echo "I am Bob" | shasum -a 256
77f3bfe06cc926329510b60eba56f80a8d32cf35496587d1444fc690c806c0f9
```
- 2. 对手方各自生成了自己的随机数与哈希值，第一次交互双方均将哈希值提交到链上
```
将哈希值提交到链上之后，哈希值对应的随机字符串也是固定的，但是对方并不能根据哈希值逆推出自己的随机字符串
```

- 3. 对手双方提交自己的随机字符串，合约根据提交的字符串与上一次提交的哈希值做校验。然后使用两个哈希值、两个随机字符串进行拼接后生成哈希序列作为随机数。
```bash 
sha256("da161d9ee3c116083030737d5a4d478ee1a7654f8ea51e0513020937a9206b0f"+"77f3bfe06cc926329510b60eba56f80a8d32cf35496587d1444fc690c806c0f9"+"I am Alice"+"I am Bob")
```

- 4. 通过两次交互来生成一个随机序列。当第一次交互（提交双方哈希值时，第二次交互要提交的内容就确定了，但是最终的随机序列尚未确定）。这样防止了对手方作弊的可能性。

## 合约与分布式存储的结合

智能合约为复杂业务逻辑的去中心化带来了可能性，并可以在链上存储相关业务数据，开发去中心化的DAPP。链上存储使用的是RAM资源，适合存储高频读写的数据，链上RAM存储代价高昂，部分大文件没必要存储在链上ram中，可以使用GXChian提供的分布式存储服务，将大文件存储托管在[BaaS存储上](../baas-api/)

## 合约手续费计算

为了合理利用区块链资源，每次调用智能合约都需要燃烧一定的矿工费，费用由 3 部分组成：基础费用 ( 固定 )，内存费用 ( 根据持久存储使用量计费 )，CPU 费用 (根据本次调用占用的 CPU 时间计费 )，3 种费用的价格和调用合约的 CPU 上限均可通过理事会动态调整。智能合约费用计算规则：

合约部署手续费：基准手续费 + 交易消息体大小 * 单位 KB 费用

```cpp
deploy_fee = basic_fee+transaction_size*price_per_kb 
```

合约调用手续费： 基准手续费 + 内存使用量 + cpu 使用量

```cpp
transaction_fee = basic_fee + ram_usage * price_per_kb + cpu_usage * price_per_ms
```


## Built-in_api_example

```cpp
#include <graphenelib/system.h>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/print.hpp>
#include <graphenelib/types.h>
#include <graphenelib/multi_index.hpp>
#include <graphenelib/global.h>
#include <graphenelib/asset.h>
#include <graphenelib/crypto.h>

using namespace graphene;

class example : public contract
{
  public:
    example(uint64_t id)
        : contract(id){}

    //current_receiver 
    // @abi action
    void examcurr(){
        uint64_t ins_id = current_receiver();
        print("current contract account id: ", ins_id);
    }

    //get_action_asset_id 
    // @abi action
    // @abi payable
    void examgetast(){
        uint64_t ast_id = get_action_asset_id();
        print("call action asset id: ",ast_id);
    }

    //get_action_asset_amount 
    // @abi action
    // @abi payable
    void examgetamo(){
        uint64_t amount = get_action_asset_amount();
        print("call action asset amount: ",amount);      
    }
    
    //deposit
    // @abi action
    // @abi payable
    void examdepo(){
        uint64_t ast_id = get_action_asset_id();
        int64_t amount = get_action_asset_amount();
        
        print("call action asset id: ",ast_id);
        print("\n");
        print("call action asset amount: ",amount);  
    }
    //withdraw_asset 
    // @abi action
    void examwith(uint64_t to, uint64_t asset_id, int64_t amount){
        withdraw_asset(_self,to,asset_id,amount);
        print("withdraw_asset example");
    }

    //get_balance 
    // @abi action
    void examgetbl(int64_t account, int64_t asset_id){
        int64_t balance = get_balance(account, asset_id);
        print("account balance: ",balance);
    }
    //sha256 
    // @abi action
    void examsha25(std::string data){
        checksum256 hash;
        sha256(data.c_str(),data.length(),&hash);
        printhex(hash.hash,32);
    }

    //sha512 
    // @abi action
    void examsha512(std::string data){
        checksum512 hash;
        sha512(data.c_str(),data.length(),&hash);
        printhex(hash.hash,64);
    }

    //ripemd160 
    // @abi action
    void examripemd(std::string data){
        checksum160 hash;
        ripemd160(data.c_str(),data.length(),&hash);
        printhex(hash.hash,20);
    }

    //verify_signature (other example: redpacket)
    // @abi action
    void examverify(std::string data,signature sig,std::string pk){
        bool result;
        result = verify_signature(data.c_str(), data.length(), &sig, pk.c_str(), pk.length());
        print("verify result: ",result);
    }

    //get_head_block_num 
    // @abi action
    void examgetnum(){
        int64_t head_num = get_head_block_num();
        print("head block num: ",head_num);
    }

    //get_head_block_id 
    // @abi action
    void examgetid(){
        checksum160 block_hash;
        get_head_block_id(&block_hash);
        printhex(block_hash.hash,20);
    }

    //get_block_id_for_num 
    // @abi action
    void examidnum(uint64_t num){
        checksum160 block_hash;
        get_block_id_for_num(&block_hash,num);             
        printhex(block_hash.hash,20);
    }

    //get_head_block_time 
    // @abi action
    void examgettime(){
        int64_t head_time;
        head_time = get_head_block_time();
        print("head block time: ",head_time);
    }

    //get_trx_sender 
    // @abi action
    void examgettrx(){
        int64_t sender_id;
        sender_id = get_trx_sender();
        print("call action instance id: ",sender_id);
    }

    //get_account_id 
    // @abi action
    void examgetacid(std::string data){
        int64_t acc_id;
        acc_id = get_account_id(data.c_str(), data.length());
        print("account id: ",acc_id);
    }

    //get_account_name_by_id 
    // @abi action
    void examgetname(int64_t accid){
        char data[13]={0};
        int64_t result;
        result = get_account_name_by_id(data,13,accid);
        prints(data);
    }

    //get_asset_id 
    // @abi action
    void examassid(std::string data){
        int64_t assid;
        assid = get_asset_id(data.c_str(),data.length());
        print("asset id: ",assid);
    }

    //read_transaction
    // @abi action
    void examreadtrx(){
        int dwsize;
        dwsize =transaction_size();
        char* pBuffer = new char[dwsize];
        uint32_t size = read_transaction(pBuffer,dwsize);
        print("hex buffer: ");
        printhex(pBuffer,dwsize);
        delete[] pBuffer;
    }
    
    // @abi action
    void examtrxsize(){
        int dwsize;
        dwsize =transaction_size();
        print("the size of the serialize trx: ",dwsize);
    }

    //expiration 
    // @abi action
    void exampira(){
        uint64_t timenum = expiration();
        print("the expiration time: ", timenum);
    }

    //tapos_block_num 
    // @abi action
    void examtapnum(){
        uint64_t tapos_num;
        tapos_num = tapos_block_num();
        print("ref block num: ",tapos_num);
    }

    //tapos_block_prefix
    // @abi action
    void examtappre(){
        uint64_t tapos_prefix;
        tapos_prefix = tapos_block_prefix();
        print("ref block id: ",tapos_prefix);
    }

    //graphene_assert 
    // @abi action
    void examassert(){
        uint64_t number=1;
        graphene_assert(number == 1, "wrong!");
    }

    //graphene_assert_message 
    // @abi action
    void examassmsg(){
        uint64_t number=1;
        std::string msg = "wrong!!!";
        graphene_assert_message(number == 1, msg.c_str(),msg.length()); 
    }

    //print
    // @abi action
    void examprint(){
        print("example example example!!!");
    }
};

GRAPHENE_ABI(example,(examcurr)(examgetast)(examgetamo)(examdepo)(examwith)(examgetbl)(examsha25)(examsha512)(examripemd)(examverify)(examgetnum)(examgetid)(examidnum)(examgettime)(examgettrx)(examgetacid)(examgetname)(examassid)(examreadtrx)(examtrxsize)(exampira)(examtapnum)(examtappre)(examassert)(examassmsg)(examprint))

```
