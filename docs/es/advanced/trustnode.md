# ¿Cómo volverse un candidato para los Nódulos Leales?

Esta página explica como volverse un Nódulo Leal en el red de GXChain.

## Etapas

1. Cree un nódulo público a través de la cartera leal pública
2. Implemente y ejecute el programa de nodo público
3. Vea recompensas de bloque de nódulos de crédito públicos

### 1.Cree Nódulo Leal

#### Compre Suscripción de Por Vida
Descargue la versión más reciente de light wallet, o vaya a Cartera Digital y siga las siguientes etapas para comprar una suscripción de por vida.

#### Vuélvase en Candidato para los Nódulos Leales
Clique “Vuélvase en Candidato para los Nódulos Leales” para promoverse a candidato para Nódulos Leales en una pulsación.

#### Encuentre witness_id
Witness id es la id de un Nódulo Leal. Antes de volverse un candidato de los Nódulos Leales, se puede encontrar su ``witness_id`` en la página.

::: warning
witness_id es un parámetro cuando prenda un witness_node
:::

### 2.Implemente
#### Configuración de sistema recomendada

- Sistema: Ubuntu 14.04 64-bit, 4.4.0-63-generic
- Memoria: 32 GB+
- Capacidad: 200 GB+

::: warning Dependencia

* instale ntp
``` bash
sudo apt-get install ntp
```

* instale libstdc++-7-dev
```bash
# 
apt-get update
apt-get install software-properties-common
add-apt-repository ppa:ubuntu-toolchain-r/test
apt-get update
apt-get install libstdc++-7-dev
```

:::


#### Prenda TrustedNode
```bash
# 
curl 'https://raw.githubusercontent.com/gxchain/gxb-core/dev_master/script/gxchain_install.sh' | bash
```

#### Introducción de parámetro

```bash
export LC_ALL=C

nohup ./programs/witness_node/witness_node --data-dir=trusted_node -w '"1.6.10"' \
--private-key '["GXC73Zyj56MHUxxxxxx", "5JainounrsmxxxxxxPhz2R7Pg8yaZh9Ks"]' 1>nohup.out 2>&1 &
```


::: tip Parameter introduction
--data-dir directorio para los datos

-w witness_id
--private-key [active_public_key, active_private_key] Los parámetros encima necesitan ser correctos; si no, afectará la producción de bloques.

& daemon mode
:::

Toma más o menos 24 horas para sincronizar completamente el bloque. Se puede ver el progreso de sincronización de bloques en el archivo de registro witness_node_dat_dir/logs/witness.log, y vaya al Block Explorer para ver el bloque más reciente. 

#### Mire el Nódulo Leal de la recompensa del bloque

Si es electo Nódulo Leal activo, cada paquete tendrá una recompensa de GXC correspondiente. La recompensa de bloque será depositado en el saldo pendiente de la cuenta, y necesita solicitarla. Se puede mirar y reclamar la recompensa usando cartera de PC o cartera de web.