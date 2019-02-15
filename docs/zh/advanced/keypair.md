# 公私钥生成

GXChain的私钥(Private)是一个随机大整形(Random BigInteger)，而公钥是ECC(椭圆曲线密码学)上的G和PrivateKey的乘积，代币着椭圆曲线上的一个点。和大多数区块链系统一样，GXChain的公私钥对是建立在secp256k1这个曲线上的，私钥`p`和公钥`P`的关系表达为：

``` js
P = secp256k1.G.multiply(p)
```

## BIP39和助记词

BIP39是比特币优化提案第0039号提案，其内容为定义一种通过助记词生成私钥的方案，解决私钥难以通过文本方式记录的问题，其方法是通过获取字典中的一系列随机单词来作为私钥生成的seed。GXChain的助记词是由16个随机单词组成的，示例如下：

```
truvat amyrin cuss tulare redcoat reckla arratel cladose deedbox receipt overwin quasi kan bout joe rompish
```

## 私钥

如文章开头所描述，GXChain的私钥本质是一个BigInteger，而助记词`m`和私钥`p`的关系是

``` js
p = sha256(sha512(m+' '+i));
```

::: tip Tips
其中i为sequence，通过改变i，一个助记词就可以生成多把私钥
:::

为了保证复制过程中不小心遗漏，私钥由`版本号`(固定值**0x80**)、`私钥p`本身、`checksum`(2次sha256编码的私钥)三部分组成，表达为

``` js
p' = Base58(Buffer.concat([0x80, p, sha256(sha256(p)).slice(0,4)]))
```

为了方便复制，以及用更短的文本进行表达，我们通过Base58的方式对以上三部分进行编码，称为钱包导入格式(Wallet Import Format)，简称WIF，示例如下：

```
5JrWo7xtBXSQybihT9wmepNxaNyxMyETPiUSAVMdEBEmotwocS4
```

## 公钥

如文章开头提到，公钥和私钥的关系是

``` js
P = secp256k1.G.multiply(p)
```

同样，为了方便复制和防止复制遗漏，采用以核心资产标识符GXC为前缀，以RIPEMD160计算的checksum为后缀，并以Base58的方式对公钥和checksum部分进行编码，表达为：

``` js
P' = GXC+Base58(Buffer.concat([P,ripemd160(p).slice(4)]))
```

示例:

```
GXC8jfLPQcaNEzz1HGL5pHPzM7ZPuDKaCLiiXxTkU7ec63WDoJQiL
```

## 参考文献

- BIP39: [https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

## 参考代码

Python:
* [http://github.com/trezor/python-mnemonic](http://github.com/trezor/python-mnemonic)

Go:
* [https://github.com/tyler-smith/go-bip39](https://github.com/tyler-smith/go-bip39)

Elixir:
* [https://github.com/izelnakri/mnemonic](https://github.com/izelnakri/mnemonic)

Objective-C:
* [https://github.com/nybex/NYMnemonic](https://github.com/nybex/NYMnemonic)

Haskell:
* [https://github.com/haskoin/haskoin](https://github.com/haskoin/haskoin)

.NET C# (PCL):
* [https://github.com/Thashiznets/BIP39.NET](https://github.com/Thashiznets/BIP39.NET)

.NET C# (PCL):
* [https://github.com/NicolasDorier/NBitcoin](https://github.com/NicolasDorier/NBitcoin)

JavaScript:
* [https://github.com/bitpay/bitcore-mnemonic](https://github.com/bitpay/bitcore-mnemonic)
* [https://github.com/bitcoinjs/bip39](https://github.com/bitcoinjs/bip39)

Ruby:
* [https://github.com/sreekanthgs/bip_mnemonic](https://github.com/sreekanthgs/bip_mnemonic)

Rust:
* [https://github.com/infincia/bip39-rs](https://github.com/infincia/bip39-rs)

Swift:
* [https://github.com/CikeQiu/CKMnemonic](https://github.com/CikeQiu/CKMnemonic)
* [https://github.com/yuzushioh/WalletKit](https://github.com/yuzushioh/WalletKit)

C++:
* [https://github.com/libbitcoin/libbitcoin/blob/master/include/bitcoin/bitcoin/wallet/mnemonic.hpp](https://github.com/libbitcoin/libbitcoin/blob/master/include/bitcoin/bitcoin/wallet/mnemonic.hpp)

C (with Python/Java/Javascript bindings):
* [https://github.com/ElementsProject/libwally-core](https://github.com/ElementsProject/libwally-core)
