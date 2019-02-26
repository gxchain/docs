# How to sign a transaction

## GXChain Signature

In [How to generate key pair](./keypair.md), we introduce the public-private key pair of GXChain based on the `elliptic curve cryptography (ECC)` and `secp256k1` curves, so the signature of GXChain is based on the `elliptic curve digital signature algorithm (ECDSA)`, consists of a 1-byte `recover_id`, a 32-byte `r` value, and a 32-byte `s` value.

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

## Signature malleability

In order to prevent the double-spend problem, in addition to the requirements of BIP62, GXChain imposes stricter restrictions on the values ​​of `r` and `s`:

``` js
function isCanonical(r,s){
    return !(r[0] & 0x80)
        && !(r[0] == 0 && !(r[1] & 0x80))
        && !(s[0] & 0x80)
        && !(s[0] == 0 && !(s[1] & 0x80))
}
```

That is, the range of `r` and `s` is [2^247, 2^255)

After the judgment of `isCanonical', the `sign` method is like this:

``` js
function sign(message, private_key){
    byte[65] signature = ec_sign(message,private_key);
    while(!isCanonical(signature.slice(1,33),signature.slice(33,65))){
        signature = ec_sign(message,private_key);
    }
    return signature;
}
```

## Discussion and Reference

- [bip-0062.mediawiki](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki)
- [bitshares1-core/issues/1129](https://github.com/bitshares/bitshares1-core/issues/1129)
- [bitshares-fc/compare/68d3ff57bfb28a699751f0b61251be8116e62b21...cb66666edddb9d553ebbd5dbcfe6eb00d94b86f1](https://github.com/bitshares/bitshares-fc/compare/68d3ff57bfb28a699751f0b61251be8116e62b21...cb66666edddb9d553ebbd5dbcfe6eb00d94b86f1)


## Code Reference

- [gxclient-node](https://github.com/gxchain/gxbjs/blob/master/lib/ecc/src/signature.js#L77)
- [gxclient-ios](https://github.com/gxchain/gxclient-ios/blob/master/gxclient-ios/lib/ecc/GXPrivateKey.m#L82)
