# Troubles

In the development process, you may encounter a variety of errors, so this tutorial will be long-term inclusion of various problems (including common problems in contract development and C++ development related issues).

## 1. VsCode head file wrong
The cause of the error: Mostly due to the unsuccessful compilation of the source code, the header file that the contract depends on is not added to the environment variable.

Solution: Can be manually set in the vscode software, .vscode directory --> c_cpp_properties.json file editing

```json
"includePath": [
    "${workspaceFolder}/**",
    "/Users/zhaoxiangfei/code/gxb-core/contracts",  //Replace with your own contract header file path
    "/Users/zhaoxiangfei/code/gxb-core/externals/magic_get/include" //Replace with your own path
],
```

## 2. The generated abi file is missing items
The cause of the error: It may be because there is no action or table on the external call, no comments are added, causing the gxx tool to scan and generate the abi file missing. (abi file analysis click [here](#abi-parsing))

Solution: Add comments to action and table, examples are as follows:
```cpp
// Action without attached assets
// @abi action
void hi(std::string user){
	...
}

// Action with attached assets
// @abi action
// @abi payable
void issue(std::string pubkey, uint64_t number){
	...
}

// multi-index table
//@abi table packet i64
struct packet {
    ...
};

```

## 3. Failed to operate multi-index table (increase, change)
The cause of the error: The parameter of the lambda expression that may be passed is not a reference to the object, resulting in a copy of the object being modified.

Solution: Modify the parameters of the lambda expression to a reference to the object.

```cpp
offers.emplace(0, [&](auto &o) {
    o.id = offers.available_primary_key();;
    ...
});
```
## 4. Error calling an action in the contract
The cause of the error: In addition to checking the logic of the action itself, you still need to check the error in the abi file and the error of GRAPHENE_ABI.

Solution: Check if the action exists in abi and whether the GRAPHENE_ABI macro contains the action.

```cpp
// If you do not include an action, the contract can still be deployed successfully, but the contract will not be able to process the called action when called.
GRAPHENE_ABI(hello,(hi))
```

## 5. Compile with gxx tool, "head file not found"
The cause of the error: Same as question 1, because the source code was not successfully compiled or the execution of `sudo make install` was unsuccessful, the header file was not copied to the system-related directory.

Solution: Compile the code correctly, source compile tutorial click [here](https://github.com/gxchain/gxb-core), if there is a problem with the compiled source, please submit the issue on the source github page.

## 6. Update contract causes table serialization error
Cause: The update contract deletes or modifies the fields in the table, causing serialization errors.

Solution: Update the contract, do not modify the original table, add a new table to ensure that the field order is consistent with the serialization order.
```cpp
struct packet {
    uint64_t                issuer;
    std::string             pub_key;
    contract_asset          total_amount;
    uint32_t                number;
    vector<int64_t>         subpackets;

    uint64_t primary_key() const { return issuer; }
    
     //The serialization order needs to be consistent with the order in which the fields are defined
    GRAPHENE_SERIALIZE(packet, (issuer)(pub_key)(total_amount)(number)(subpackets))
};
```
