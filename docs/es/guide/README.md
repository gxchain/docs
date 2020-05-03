# Inicio rapido

## Conoce GXChain


GXChain es una cadena pública de gobierno descentralizada, de alto rendimiento y ecológica. En el ecosistema de GXChain, el consejo, el nodo de confianza pública y los tenedores de la moneda completan conjuntamente el gobierno de la cadena.


- **La Junta de Directores**:Los **11** miembros principales del nodo de confianza pública fueron elegidos como miembros de la Junta de Directores de GXChain, principalmente responsables de la modificación de los parámetros dinámicos de la cadena de bloques.
- **Nodo de crédito público**:responsable de empaquetar bloques, verificar transacciones, contar los votos cada **1** hora y seleccionar los primeros **21** como nodos de confianza pública de acuerdo con el número de votos.
- **Titular**:Una persona o institución que posee cualquier número de GXC. El titular puede participar en la Ecología de GXChain y votar por el nodo de confianza pública.

La capa inferior de GXChain utiliza una arquitectura de grafeno basada en el mecanismo de consenso de DPoS para un mayor rendimiento.

- **Tiempo de generación del bloque**:**3** s
- **TPS**:mil nivel

## Requerimientos ambientales

- Sistema: **macOS / Ubuntu 14.04 64-bit**, **4.4.0-63-genérico** arriba del kernel
- Memoria: 16GB+
- Disco duro: 100GB+
- Red: 20MB+ ancho de banda

::: warning Instalacion dependiente

* Instalar ntp
``` bash
sudo apt-get install ntp
# macOS instalar ntp:  brew install ntp
```

* instalar libstdc++-7-dev
```bash
# Ubuntu sistema se lo necesita instalar, macOS no se necesita
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```

:::

## Instalacion de nodos


Los siguientes pasos demuestran el inicio del nodo de red principal.

- Si eres un desarrollador y quieres una experiencia rápida, ve a la [red de prueba](../advanced/testnet.html)
- Si desea construir una cadena privada basada en GXChain, puede ir a la [cadena privada para construir](../advanced/private_chain.html)


### 1. Descargar el paquete de lanzamiento

``` bash
# La ejecución de este script de shell descargará automáticamente el último programa web principal de github y lo extraerá al directorio actual.
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```

### 2. Iniciar nodo, sincronizar datos

``` bash
nohup ./programs/witness_node/witness_node --data-dir=trusted_node --rpc-endpoint="127.0.0.1:28090" 1>nohup.out 2>&1 &
```

El comando anterior:
- Comenzó a escuchar un servicio RPC el `127.0.0.1:28090`
- La información de bloque especificada se guarda en el directorio `./trusted_node`.

::: tip Recordatorio amistoso
- El bloque de sincronización tarda aproximadamente **30 horas**, lo que, por supuesto, tiene algo que ver con su red.
- Antes de que se complete la sincronización de bloques, solo tiene que esperar pacientemente, durante el cual puede leer la documentación.
:::

### 3. Revisar el registro y esperar a que se sincronicen los datos

``` bash
tail -f trusted_node/logs/witness.log
```

Una vez que se completa la sincronización de nodos, el registro se ve así (reciba 1 bloque nuevo de la red cada 3 segundos):

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

## Registro de cuenta

GXChain utiliza un modelo de cuenta e introduce un mecanismo de registro de referencias, por lo que registrar una cuenta en GXChain requiere los siguientes tres elementos:

- **Referente**,el referente es una cuenta existente en la cadena y usará su nombre de cuenta y clave pública para ayudarlo a registrar una cuenta.
- **El nombre de la cuenta**,el nombre de la cuenta es único en la cadena, así que recuerde que en GXChain, el nombre de la cuenta es la dirección (por ejemplo, gxchain-genius)
- **Clave pública de ECC**,comenzando con GXC, clave pública de ECC codificada en Base64 (¿Cómo generar una clave pública? No se preocupe, mire hacia atrás)

Hay dos formas de completar el registro de su cuenta:

### 1. Billetera online

Complete los pasos anteriores en la interfaz utilizando la cartera en línea [https://wallet.gxb.io](https://wallet.gxb.io)


### 2. Registro manual.

Se recomienda que los desarrolladores con mayores requisitos de seguridad de clave privada utilicen este método para completar el registro y garantizar que la clave privada esté fuera de línea.

#### Paso 1: genere un par de claves públicas y privadas a través de cli_wallet

``` bash
./programs/cli_wallet/cli_wallet --suggest-brain-key
{
  "brain_priv_key": "SHAP CASCADE AIRLIKE WRINKLE CUNETTE FROWNY MISREAD MOIST HANDSET COLOVE EMOTION UNSPAN SEAWARD HAGGIS TEENTY NARRAS",
  "wif_priv_key": "5J2FpCq3UmvcodkCCofXSNvHYTodufbPajwpoEFAh2TJf27EuL3",
  "pub_key": "GXC75UwALPEFECfHLjHyNSxCk1j7XzSvApQiXKEbanWgr7yvXXbdG"
}
```

::: tip Explicación del campo
- brain_priv_key: mnemonic, el texto original de la clave privada, que puede ser restaurado por la mnemotécnica
- wif_priv_key: clave privada, utilizada en el programa
- pub_key: clave pública para el registro en la cadena.
:::

####  Paso 2: Completa el registro de la cuenta a través del grifo.


1. Quiero un nombre de cuenta único (account_name), como `gxchain-genius`
2. Reemplace `<nombre_decuenta>` y `<public_key>` en el comando curl a continuación y ejecútelo en el terminal:

``` bash
curl 'https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”<account_name>”,”owner_key”:”<public_key>”,”active_key”:”<public_key>”,”memo_key”:”<public_key>”,”refcode”:null,”referrer”:null}}’
```
