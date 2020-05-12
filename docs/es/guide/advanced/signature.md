# ¿Cómo firmar una transacción?

## Firma de GXChain

En[¿Cómo crear las claves pública y privada?](./keypair.md)presentamos las claves pública y privada de GXChain basadas en la criptografía de curva elíptica (ECC) y curvas secp256k1, entonces la firma de GXChain es basada en el algoritmo de firma digital de la curva elíptica (ECDSA), compuesto de un recover_id de 1 byte, un valor r de 32 bytes, y un valor s de 32 bytes.

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

## Maleabilidad de firma

Para evitar el doble gasto, además de los requisitos de BIP62, GXChain impone restricciones más estrictas sobre los valores de r y s:

``` js
function isCanonical(r,s){
    return !(r[0] & 0x80)
        && !(r[0] == 0 && !(r[1] & 0x80))
        && !(s[0] & 0x80)
        && !(s[0] == 0 && !(s[1] & 0x80))
}
```

Es decir el rango de r y s es [2^247, 2^255]

Después de que devuelve la subrutina isCanonical, el modo sign es así:

``` js
function sign(message, private_key){
    byte[65] signature = ec_sign(message,private_key);
    while(!isCanonical(signature.slice(1,33),signature.slice(33,65))){
        signature = ec_sign(message,private_key);
    }
    return signature;
}
```

## Discusión y fuentes

- [bip-0062.mediawiki](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki)
- [bitshares1-core/issues/1129](https://github.com/bitshares/bitshares1-core/issues/1129)
- [bitshares-fc/compare/68d3ff57bfb28a699751f0b61251be8116e62b21...cb66666edddb9d553ebbd5dbcfe6eb00d94b86f1](https://github.com/bitshares/bitshares-fc/compare/68d3ff57bfb28a699751f0b61251be8116e62b21...cb66666edddb9d553ebbd5dbcfe6eb00d94b86f1)


## Fuentes de código

- [gxclient-java](https://github.com/gxchain/common-signature/blob/master/src/main/java/com/gxchain/common/signature/crypto/ec/GxcPrivateKey.java#L129)
- [bepalcore-java](https://github.com/Bepal/bepalcore-java/blob/master/src/main/java/pro/bepal/core/bitcoin/SecpECKey.java#L87)
- [gxclient-node](https://github.com/gxchain/gxbjs/blob/master/lib/ecc/src/signature.js#L77)
- [gxclient-ios](https://github.com/gxchain/gxclient-ios/blob/master/gxclient-ios/lib/ecc/GXPrivateKey.m#L82)

