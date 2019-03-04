# 如何对交易进行签名

## GXChain Signature的定义

在[如何生成公私钥对](./keypair.md)一文，我们介绍了GXChain的公私钥对基于`椭圆曲线密码学(ECC)`和`secp256k1`曲线，而GXChain的签名是基于`椭圆曲线数字签名算法(ECDSA)`的，GXChain的签名由1字节的`recover_id`、32字节的`r`值和32字节的`s`值组成。

``` js
function ec_sign(message, private_key){
    let sha256_buffer = sha256(message);
    ECSignature ecsig = ECDSA.sign_compact(sha256_buffer, private_key);
    byte[32] r = ecsig.r;
    byte[32] s = ecsig.s;
    int i = ecsig.recovery_id + 4 +27; // compressed public key
    byte[65] signature = Buffer.concat(i,r,s);
    return signature;
}
```

## Signature的要求

为了防止双花问题,除了BIP62的要求外，GXChain对`r`和`s`的值做了更严格的限制：

``` js
function isCanonical(r,s){
    return !(r[0] & 0x80)
        && !(r[0] == 0 && !(r[1] & 0x80))
        && !(s[0] & 0x80)
        && !(s[0] == 0 && !(s[1] & 0x80))
}
```

即`r`和`s`取值范围为[2^247,2^255)

加上`isCanonical`的判断后，`sign`方法是这样的

``` js
function sign(message, private_key){
    byte[65] signature = ec_sign(message,private_key);
    while(!isCanonical(signature.slice(1,33),signature.slice(33,65))){
        signature = ec_sign(message,private_key);
    }
    return signature;
}
```

## 讨论和参考

- [bip-0062.mediawiki](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki)
- [bitshares1-core/issues/1129](https://github.com/bitshares/bitshares1-core/issues/1129)
- [bitshares-fc/compare/68d3ff57bfb28a699751f0b61251be8116e62b21...cb66666edddb9d553ebbd5dbcfe6eb00d94b86f1](https://github.com/bitshares/bitshares-fc/compare/68d3ff57bfb28a699751f0b61251be8116e62b21...cb66666edddb9d553ebbd5dbcfe6eb00d94b86f1)


## 代码实现

- [gxclient-java](https://github.com/gxchain/common-signature/blob/master/src/main/java/com/gxchain/common/signature/crypto/ec/GxcPrivateKey.java#L129)
- [gxclient-node](https://github.com/gxchain/gxbjs/blob/master/lib/ecc/src/signature.js#L77)
- [gxclient-ios](https://github.com/gxchain/gxclient-ios/blob/master/gxclient-ios/lib/ecc/GXPrivateKey.m#L82)
