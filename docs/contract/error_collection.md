# 开发常见错误
在开发过程中，可能会遇到多种多样的错误，所以此篇教程将会长期收录遇到的各种问题（包括合约开发常见的以及C++开发相关的问题）。

## 1. VsCode 头文件错误
错误原因：多是由于源码编译没有成功，导致合约依赖的头文件没有添加到环境变量。

解决办法：可以在vscode软件中手动设置，.vscode目录 --> c_cpp_properties.json文件编辑

```json
"includePath": [
    "${workspaceFolder}/**",
    "/Users/zhaoxiangfei/code/gxb-core/contracts",  //替换为自己的合约头文件路径
    "/Users/zhaoxiangfei/code/gxb-core/externals/magic_get/include" //替换为自己的路径
],
```

## 2. 生成的abi文件缺少项
错误原因：可能是由于没有在给外部调用的action或者table上，没有添加注释，导致gxx工具扫描生成abi文件缺失。（abi文件解析点击[这里](#abi文件解析)）

解决办法：在action和table上添加注释，示例如下：
```cpp
// 调用不带附加资产的action
// @abi action
void hi(std::string user){
	...
}

// 调用带附加资产的action
// @abi action
// @abi payable
void issue(std::string pubkey, uint64_t number){
	...
}

// 多索引table
//@abi table packet i64
struct packet {
    ...
};

```

## 3. 操作多索引表时失败（增、改）
错误原因：可能传递的lambda表达式的参数不是对象的引用，导致修改的只是一份对象的拷贝。

解决办法：将lambda表达式的参数修改为对象的引用。

```cpp
offers.emplace(0, [&](auto &o) {
    o.id = offers.available_primary_key();;
    ...
});
```
## 4. 调用合约中的某个action出错
错误原因：除了检查action本身逻辑原因之外，仍然需要检查abi文件中的错误以及GRAPHENE_ABI的错误

解决办法：查看abi中是否存在该action和GRAPHENE_ABI宏是否包含该action

```cpp
// 如果不包含某个action，合约依然可以部署成功，只是在调用时，合约会无法处理调用的action
GRAPHENE_ABI(hello,(hi))
```

## 5. 使用gxx工具编译，“未发现头文件”
错误原因：同问题1，由于源码编译没有成功或者执行`sudo make install`没有成功，导致头文件没有拷贝到系统相关目录。

解决办法：正确编译代码，源码编译教程点击[这里](https://github.com/gxchain/gxb-core)，如果编译源码出现问题，请在源码github页面提交issues。

## 6. 更新合约造成table序列化错误
错误原因：更新合约删除或修改table中的字段，导致序列化错误

解决办法：更新合约不要修改原有table，添加新的table需要保证字段顺序与序列化顺序一致。
```cpp
struct packet {
    uint64_t                issuer;
    std::string             pub_key;
    contract_asset          total_amount;
    uint32_t                number;
    vector<int64_t>         subpackets;

    uint64_t primary_key() const { return issuer; }
    
     //序列化顺序需要与字段定义顺序保持一致
    GRAPHENE_SERIALIZE(packet, (issuer)(pub_key)(total_amount)(number)(subpackets))
};
```
