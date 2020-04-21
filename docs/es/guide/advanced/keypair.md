# ¿Cómo crear las claves pública y privada?

La clave privada en GXChain es un BigInteger aleatorio, y la clave pública es el producto de G y Clave Privada en ECC (criptografía de curva elíptica). Como la mayor parte de sistemas de cadenas de bloques, las claves pública y privada de GXChain son basadas en la curva secp256k1. La relación entre la clave privada [p] y la clave pública [P] es expresado así:

``` js
P = secp256k1.G.multiply(p)
```

## BIP39 y nemotecnia

BIP39 es una abreviatura de Bitcoin Improvement Proposal No.0039. El contenido de la propuesta es definir un sistema para crear una clave privada usando nemotecnias, y resolver la dificultad de recordar la clave privada en su forma original. La solución es obtener una lista de palabras aleatorias en el diccionario. La clave privada es la semilla aleatoria. La nemotecnia de GXChain es compuesto de 16 palabras aleatorias, p. ej.:

```
truvat amyrin cuss tulare redcoat reckla arratel cladose deedbox receipt overwin quasi kan bout joe rompish
```

## Clave Privada

Como describimos encima, la clave privada de GXChain es básicamente un BigInteger, y la relación entre la nemotecnia (m) y la clave privada (p) es:

``` js
p = sha256(sha512(m+' '+i));
```

::: tip Consejos
Si i es la lista, cuando se cambia i, una nemotecnia puede crear múltiples claves privadas
:::

Para evitar omisión accidental durante la reproducción, la clave privada es compuesto del número de la versión (valor fijo 0x80), la clave privada p en sí, checksum (la clave privada cifrada 2 veces con sha256), expresado así: 

``` js
p' = Base58(Buffer.concat([0x80, p, sha256(sha256(p)).slice(0,4)]))
```

Para facilitar la copia y la expresión en texto más breve, ciframos las tres partes encima con Base58, que se llama Wallet Import Format (WIF). p. ej.:

```
5JrWo7xtBXSQybihT9wmepNxaNyxMyETPiUSAVMdEBEmotwocS4
```

## Clave Pública

Como describimos encima, la relación entre las claves pública y privada es:

``` js
P = secp256k1.G.multiply(p)
```

Similarmente, para facilitar replicación y evitar omisiones de replicación, el checksum calculado por el identificador central de activos GXC y calculado por RIPEMD160 es usado como sufijo, y la clave pública y la parte checksum son cifradas en la forma de Base58, expresado así:

``` js
P' = GXC+Base58(Buffer.concat([P,ripemd160(p).slice(4)]))
```

Ejemplo:

```
GXC8jfLPQcaNEzz1HGL5pHPzM7ZPuDKaCLiiXxTkU7ec63WDoJQiL
```

## Fuentes

- BIP39: [https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

## Fuentes de implementaciones

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
* [https://github.com/libbitcoin/libbitcoin-system/blob/master/src/wallet/mnemonic.cpp](https://github.com/libbitcoin/libbitcoin-system/blob/master/src/wallet/mnemonic.cpp)

C (with Python/Java/Javascript bindings):
* [https://github.com/ElementsProject/libwally-core](https://github.com/ElementsProject/libwally-core)
