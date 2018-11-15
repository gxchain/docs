# 附加选项

## 开发常见错误
在开发过程中，可能会遇到多种多样的错误，所以此篇教程将会长期收录遇到的各种问题。

### 1. VsCode 头文件错误
使用vscode开发智能合约时，出现无法发现头文件错误时。错误原因多是由于源码编译没有成功，导致合约依赖的头文件没有添加到环境变量。所以需要在vscod软件中手动设置，
.vscode目录--》c_cpp_properties.json  编辑如下：

```
"includePath": [
    "${workspaceFolder}/**",
    "/Users/zhaoxiangfei/code/gxb-core/contracts",  //替换为自己的合约头文件路径
    "/Users/zhaoxiangfei/code/gxb-core/externals/magic_get/include" //替换为自己的路径
],
```

#### todo


## ABI文件解析

#### todo

## 部署测试网节点

#### todo

## 合约中的随机数

#### todo

## 合约与分布式存储的结合
