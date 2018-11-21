# 合约调试

在开发智能合约过程中，调试也是非常重要的，目前，调试智能合约的方式，主要是使用GXChain区块链提供的接口print打印相关日志到witness控制台，所以本地搭建一个私链或者本地启动一个同步测试网的节点，对于智能合约的调试是非常必要的。

print调试方式，实现了多种参数类型的重载实现。支持字符串、int型、浮点数、十六进制等

## print

会根据参数的不同重载不同的print函数，内部调用以下函数，如图是一个不同类型的打印结果
![](./png/print.jpg)

## prints
```cpp
//打印字符串 const char*
prints("hello");
输出: hello
```

## prints_l
```cpp
//打印字符串的前几个字符
prints_l("hello",3);
输出：hel
```
## printi
```cpp
//打印有符号数，参数为int64_t类型
printi(-1);
输出：-1
```
## printui
```cpp
//打印无符号数，参数为uint64_t类型
printui(-1);
输出：18446744073709551615
```

## printdf
```cpp
//打印浮点数，参数为double类型
printdf(3.14159);
输出：3.141590000000000e+00
```

## printn
```cpp
//打印uint64类型base32加密后的结果
printn(N(hello));
输出：hello
```

## printhex
```cpp
//打印16进制
const char* str="hello";
printhex(str,5);
输出：68656c6c6f
```
