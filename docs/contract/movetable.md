# Move Table

During the update of the contract, if the Table data structure is changed, the data in the old structure cannot be modified and accessed. You can upgrade the contract table by following the steps below.

## 1、Create New Table

The newly created Table type needs to be compatible with the old Table type. First add a new Table type to the contract and keep the old Table type.

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

    // Old Table
    //@abi table account i64
    struct account {
        uint64_t id;
        std::string name;
        uint64_t primary_key() const { return id; }
        GRAPHENE_SERIALIZE(account, (id)(name))
    };
    typedef graphene::multi_index<N(account), account> account_index;
    account_index accounts;

    // New Table
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
## 2、Copy the data 

Before migrating data, you need to set the parameter isable to FALSE to prohibit inserting data into the old Table. Then add the move function to copy the data from the old Table to the new Table. 

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

## 3、Delete Old Table

After the data migration is completed, you need to verify whether the data in the new table is consistent with the data in the old table. If they are consistent, the old Table data is deleted, and the new data is inserted into the new Table. Modify the contract status stat to TRUE, modify the add interface, and add the delete interface. The sample code is as follows:

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
