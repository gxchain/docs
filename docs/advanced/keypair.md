# Key Pair Generations

Private key on GXChain is a Random BigInteger, and the public key is the product of G and PrivateKey on ECC (elliptic curve cryptography). The token is a point on the elliptic curve. Like most blockchain systems, GXChain's public-private key pair is based on the secp256k1 curve. The relationship between private key `p` and public key `P` is expressed as:

``` js
P = secp256k1.G.multiply(p)
```

## BIP39 and mnemonic

BIP39 is short for Bitcoin Improvement Proposal No.0039. The content of the proposal is to define a scheme for generating a private key through mnemonics, and to solve the problem that the private key is difficult to record by text. The method is to obtain a series of random words in the dictionary. Come to the seed generated as a private key. GXChain's mnemonic is composed of 16 random words, examples are as follows:

```
truvat amyrin cuss tulare redcoat reckla arratel cladose deedbox receipt overwin quasi kan bout joe rompish
```

## Private Key

As described at the beginning of the article, the private key of GXChain is essentially a BigInteger, and the relationship between the mnemonic (m) and the private key (p) is:

``` js
p = sha256(sha512(m+' '+i));
```

::: tip Tips
Where i is the sequence, by changing i, one mnemonic can generate multiple private keys
:::

In order to prevent accidental omission during replication, the private key consists of the version number (fixed value **0x80**), private key p itself, checksum (2 times sha256 encoded private key), expressed as

``` js
p' = Base58(Buffer.concat([0x80, p, sha256(sha256(p)).slice(0,4)]))
```

In order to facilitate copying and expression in shorter text, we encode the above three parts by Base58, which is called Wallet Import Format (WIF). An example is as follows:

```
5JrWo7xtBXSQybihT9wmepNxaNyxMyETPiUSAVMdEBEmotwocS4
```

## Public Key

As mentioned at the beginning of the article, the relationship between the public key and the private key is

``` js
P = secp256k1.G.multiply(p)
```

Similarly, in order to facilitate replication and prevent replication omissions, the checksum calculated by the core asset identifier GXC and calculated by RIPEMD160 is used as a suffix, and the public key and the checksum part are encoded in the form of Base58, expressed as:

``` js
P' = GXC+Base58(Buffer.concat([P,ripemd160(p).slice(4)]))
```

eg.

```
GXC8jfLPQcaNEzz1HGL5pHPzM7ZPuDKaCLiiXxTkU7ec63WDoJQiL
```

## References

- BIP39: [https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

## Reference implementations

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
