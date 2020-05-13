# Empezar con GXChain

## Qué es GXChain

GXChain es una cadena de bloques pública, que es descentralizada, y de alto rendimiento que puede contener un ecosistema enorme y diverso. El ecosistema de GXChain se compone de el Comité, los Nodo de Confianza, y los accionistas. 

 **Comité**：Los 11 Nodo de Confianza que reciben la mayor cantidad de votos se vuelven miembros del GXChain Comité, responsable de la modificación de los parámetros dinámicos de la cadena de bloques.
- **Nodos de Confianza**：Un Nodo de Confianz es responsable de empaquetar bloques y verificar transacciones. Los Nodos de Confianza contan votos cada hora. Hay 21 de ellos que son públicos.
- **Accionistas**：Individuales u instituciones que tienen GXC (la criptomoneda) pueden participar en el ecosistema de GXChain y votar por los Nodos de Confianza.

GXChain es basada en ingeniería de graphene que implementa consenso distribuido de DPoS para mayor rendimiento.

- **Cuanto tiempo toma crear un nuevo bloque**：**3** s
- **TPS**：3000+

## Requisitos

- **macOS / Ubuntu 14.04 64-bit**, **4.4.0-63-generic** o más reciente
- RAM: 16GB+
- Capacidad: 100GB+


* install ntp
``` bash
sudo apt-get install ntp
for macOS:  brew install ntp
```

* install libstdc++-7-dev
```bash
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```


## Instalar

Cómo prender un nódulo primario del red:

- Si Ud. es un desarrollador y quiere una experiencia rápida, vaya a TestNet(../advanced/testnet.html)
- Si quiere crear una cadena privada basada en GXChain, vaya a Cadena Privada(../advanced/private_chain.html)

### 1.Descargue

``` bash
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```

### 2.Prenda

``` bash
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="127.0.0.1:28090" 1>nohup.out 2>&1 &
```

Las instrucciones encima:
- Ésto prende un servicio RPC escuchando a 
- El directorio de la base de datos del bloque es 

::: Note
- La sincronización toma más o menos 30 horas, pero la duración exacta depende de la velocidad del red.
- Antes de completar la sincronización, solamente debería esperar.
:::

### 3. chequee el registro:

``` bash
tail -f trusted_node/logs/witness.log
```

Cuando el nódulo está listo, el registro debe parecerse así (recibiendo un bloque nuevo del red cada 3 segundos):

``` bash
2018-06-28T03:43:03 th_a:invoke handle_block         handle_block ] Got block: #10731531 time: 2018-06-28T03:43:03 latency: 60 ms from: miner11  irreversible: 10731513 (-18)			application.cpp:489
2018-06-28T03:43:06 th_a:invoke handle_block         handle_block ] Got block: #10731532 time: 2018-06-28T03:43:06 latency: 16 ms from: taffy  irreversible: 10731515 (-17)			application.cpp:489
2018-06-28T03:43:09 th_a:invoke handle_block         handle_block ] Got block: #10731533 time: 2018-06-28T03:43:09 latency: 49 ms from: david12  irreversible: 10731515 (-18)			application.cpp:489
2018-06-28T03:43:12 th_a:invoke handle_block         handle_block ] Got block: #10731534 time: 2018-06-28T03:43:12 latency: 42 ms from: miner6  irreversible: 10731516 (-18)			application.cpp:489
2018-06-28T03:43:15 th_a:invoke handle_block         handle_block ] Got block: #10731535 time: 2018-06-28T03:43:15 latency: 10 ms from: sakura  irreversible: 10731516 (-19)			application.cpp:489
2018-06-28T03:43:18 th_a:invoke handle_block         handle_block ] Got block: #10731536 time: 2018-06-28T03:43:18 latency: 57 ms from: miner9  irreversible: 10731517 (-19)			application.cpp:489
2018-06-28T03:43:21 th_a:invoke handle_block         handle_block ] Got block: #10731537 time: 2018-06-28T03:43:21 latency: 56 ms from: robin-green  irreversible: 10731517 (-20)			application.cpp:489
2018-06-28T03:43:24 th_a:invoke handle_block         handle_block ] Got block: #10731538 time: 2018-06-28T03:43:24 latency: 17 ms from: kairos  irreversible: 10731522 (-16)			application.cpp:489
2018-06-28T03:43:27 th_a:invoke handle_block         handle_block ] Got block: #10731539 time: 2018-06-28T03:43:27 latency: 21 ms from: dennis1  irreversible: 10731524 (-15)			application.cpp:489
2018-06-28T03:43:30 th_a:invoke handle_block         handle_block ] Got block: #10731540 time: 2018-06-28T03:43:30 latency: 17 ms from: aaron  irreversible: 10731524 (-16)			application.cpp:489
2018-06-28T03:43:33 th_a:invoke handle_block         handle_block ] Got block: #10731541 time: 2018-06-28T03:43:33 latency: 23 ms from: caitlin  irreversible: 10731526 (-15)			application.cpp:489
```

## Registrar una cuenta

GXChain usa un account-based model (no es UTXO).Para crear una cuenta en GXChain, hay 3 requisitos:

- Referente, una cuenta existente en GXChain, necesita pagar el costo de la transmición de la transacción 
- Nombre de la cuenta (p. ej. gxchain-genius)
- Clave pública ECC (cifrada con Base64, empieza con GXC…)

Hay 2 opciones para registrar una cuenta en GXChain.

### 1.Cartera digital

Siga las instrucciones en: https://wallet.gxb.io

### 2.Registro manual

Este modo es aconsejado si quiere mantener la clave privada sin conexión.

#### Etapa 1) Cree las claves privada y pública

``` bash
./programs/cli_wallet/cli_wallet --suggest-brain-key
{
  "brain_priv_key": "SHAP CASCADE AIRLIKE WRINKLE CUNETTE FROWNY MISREAD MOIST HANDSET COLOVE EMOTION UNSPAN SEAWARD HAGGIS TEENTY NARRAS",
  "wif_priv_key": "5J2FpCq3UmvcodkCCofXSNvHYTodufbPajwpoEFAh2TJf27EuL3",
  "pub_key": "GXC75UwALPEFECfHLjHyNSxCk1j7XzSvApQiXKEbanWgr7yvXXbdG"
}
```

::: tip Consejos
- brain_priv_key: clave privada, mantenga en secreto
- wif_priv_key: clave privada, mantenga en secreto
- pub_key: su clave pública en GXChain
:::

####  Etapa 2) Registre por Faucet

1. Cree un nombre de cuenta único, p. ej`gxchain-genius`
2. Sustituya los marcadores de posición  `<account_name>`  y `<public_key>` y probe el comando de curl abajo:

``` bash
curl 'https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json' -d '{"account":{"name":"<account_name>","owner_key":"<public_key>","active_key":"<public_key>","memo_key":"<public_key>","refcode":null,"referrer":null}}'
```
