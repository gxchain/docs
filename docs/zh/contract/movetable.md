# 合约Table迁移

在更新合约过程中，如果对Table数据结构进行了变动，会造成旧结构中的数据，无法修改和访问。为了合理使用智能合约持久化存储表，可以按照以下步骤，对合约升级过程中的Table变动进行修改。

## 1、创建新Table

新创建的Table类型，需要兼容旧的Table类型。首先在合约中添加新的Table类型，并保留旧的Table类型，例如：

```cpp
class movetable : public contract
{
  public:
    movetable(uint64_t id)
        : contract(id),accounts(_self,_self),accountnews(_self,_self){}

    //@abi action
    void setstat(bool states){
        ...
        auto itor = stats.find(0);
        if(itor == stats.end()){
            stats.emplace(_self,[&](auto &o) {
                o.id = stats.available_primary_key();;
                o.isable = states;
            });
        }else{
            stats.modify(_self,itor,[&](auto &o) {
                o.id = stats.available_primary_key();;
                o.isable = states;
            });
        }
        ...
    }
    //@abi action
    void add(std::string name){
        accounts.emplace(_self, [&](auto &o) {
            o.id = accounts.available_primary_key();;
            o.name = name;
        });
    }
  private:
    //@abi table stat i64
    struct stat {
        uint64_t id;
        uint64_t isable;
        uint64_t primary_key() const { return id; }
        GRAPHENE_SERIALIZE(stat, (id)(isable))
    };
    typedef graphene::multi_index<N(stat), stat> stat_index;
    stat_index stats;

    // 旧的Table类型
    //@abi table account i64
    struct account {
        uint64_t id;
        std::string name;
        uint64_t primary_key() const { return id; }
        GRAPHENE_SERIALIZE(account, (id)(name))
    };
    typedef graphene::multi_index<N(account), account> account_index;
    account_index accounts;

    // 新的Table类型
    //@abi table accountnew i64
    struct accountnew {
        uint64_t id;
        std::string name;
        uint64_t age;
        uint64_t primary_key() const { return id; }
        GRAPHENE_SERIALIZE(accountnew, (id)(name)(age))
    };
    typedef graphene::multi_index<N(accountnew), accountnew> accountnew_index;
    accountnew_index accountnews;
};
```
## 2、将旧Table中数据迁移至新Table

迁移数据之前，需要先设置参数isable为FALSE，禁止向旧的Table中插入数据，然后增加move函数，将旧Table中的数据拷贝到新Table中，示例代码如下：

```cpp
class movetable : public contract
{
  public:
    movetable(uint64_t id)
        : contract(id),accounts(_self,_self),accountnews(_self,_self){}
    ...
    //@abi action
    void add(std::string name){
        auto itor = stats.find(0);
        graphene_assert(itor->isable, "now can't add data to table");
        accounts.emplace(_self, [&](auto &o) {
            o.id = accounts.available_primary_key();
            o.name = name;
        });
    }
    //@abi action
    void move(){
        auto itor = stats.find(0);
        stats.modify(_self,itor, [&](auto &o) {
            o.isable = FALSE;
        });
        for(auto i =accounts.begin(); i!=accounts.end(); i++){
            accountnews.emplace(_self, [&](auto &o) {
                o.id = i->id;
                o.name = i->name;
                o.age = 0;
            });
        }
    }
  private:
    ...
    accountnew_index accountnews;
};
```

## 3、删除旧Table数据

在数据迁移完成之后，需要先校验新Table中数据是否与旧Table中数据一致。如一致，则删除旧Table数据，新数据插入到新Table中。修改合约状态stat为TRUE，修改add接口，并添加delete接口，示例代码如下:

```cpp
class movetable : public contract
{
  public:
    movetable(uint64_t id)
        : contract(id),accounts(_self,_self),accountnews(_self,_self){}
    ...
    //@abi action
    void add(std::string name){
        auto itor = stats.find(0);
        graphene_assert(itor->isable, "now can't add data to table");
        accountnews.emplace(_self, [&](auto &o) {
            o.id = accountnews.available_primary_key();
            o.name = name;
        });
    }
    ...
    //@abi action
    void delete(){
        for(auto i =accounts.begin(); i!=accounts.end(); i++){
            accounts.erase(i);
        }
    }
  private:
    ...
    accountnew_index accountnews;
};
