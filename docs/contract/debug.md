# Debug

In the process of developing smart contracts, debugging is also very important. At present, the way to debug smart contracts is mainly to print the logs to the witness console using the interface provided by the GXChain blockchain, so build a private chain or synchronize the test network locally. For the debugging of smart contracts is very necessary.

To start debugging, you need 2 operations:
#### 1. Modify the local config.ini file as follows:
```
[logger.default]
level=debug
appenders=stderr,FILE
```

#### 2. When the witness_node starts, bring the parameters ``` --contracts-console ```

The print debugging method implements overloaded implementation of multiple parameter types. Support for strings, int types, floating point numbers, hexadecimal, etc.



## print

![](./png/print.jpg)

## prints
```cpp
//Print string： const char*
prints("hello");
Output: hello
```

## prints_l
```cpp
//Print the first few characters of a string
prints_l("hello",3);
Output: hel
```
## printi
```cpp
//Print signed number with int64_t type
printi(-1);
Output: -1
```
## printui
```cpp
//Print unsigned number with parameter uint64_t
printui(-1);
Output: 18446744073709551615
```

## printdf
```cpp
//Print floating point number, the parameter is double
printdf(3.14159);
Output: 3.141590000000000e+00
```

## printn
```cpp
//Print base32 encrypted results
printn(N(hello));
Output: hello
```

## printhex
```cpp
//Print hexadecimal
std::string str="hello";
checksum256 sum;
sha256(str.c_str(),str.length(),&sum);
printhex(sum.hash,32);
Output：2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```
