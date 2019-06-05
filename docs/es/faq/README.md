
# las preguntas frecuentes del inicio de witness_node


## 1. Cómo iniciar el programa witness_node correctamente
  Se recomienda iniciar el programa con la siguiente línea de comandos (modifique el valor del parámetro y el número de Puerto apropiadamente según su propia situación):
  
```bash
export LC_ALL=C

nohup ./programs/witness_node/witness_node --data-dir=trusted_node  --rpc-endpoint="0.0.0.0:28090" --p2p-endpoint="0.0.0.0:6789" --track-account "\"1.2.241993\"" --max-ops-per-account=-1  --fast-replay 1>nohup.out 2>&1 &
 ```
 Si usted comienza como arriba, la salida de la consola será redirigidos a nohup. out, y si hay una excepción en el inicio, usted puede ser que pueda ver nohup. out para localizar el problema.
 
## 2. Cómo saber si el witness_node se está ejecutando correctamente
   Vea el archivo de registro de fondo `trusted_node/logs/witness.log`, Si el registro continúa recibiendo bloques en la red, indica que el nodo se está ejecutando normalmente, como se muestra a continuación
   ```
2018-08-23T07:10:39 th_a:invoke handle_block         handle_block ] Got block: #6939202 time: 2018-08-23T07:10:39 latency: 29 ms from: init6  irreversible: 6939194 (-8)		application.cpp:487
2018-08-23T07:10:42 th_a:invoke handle_block         handle_block ] Got block: #6939203 time: 2018-08-23T07:10:42 latency: 30 ms from: init4  irreversible: 6939195 (-8)		application.cpp:487
2018-08-23T07:10:45 th_a:invoke handle_block         handle_block ] Got block: #6939204 time: 2018-08-23T07:10:45 latency: 32 ms from: init0  irreversible: 6939195 (-9)		application.cpp:487
2018-08-23T07:10:48 th_a:invoke handle_block         handle_block ] Got block: #6939205 time: 2018-08-23T07:10:48 latency: 34 ms from: init5  irreversible: 6939197 (-8)		application.cpp:487
2018-08-23T07:10:51 th_a:invoke handle_block         handle_block ] Got block: #6939206 time: 2018-08-23T07:10:51 latency: 34 ms from: init1  irreversible: 6939198 (-8)		application.cpp:487
2018-08-23T07:10:54 th_a:invoke handle_block         handle_block ] Got block: #6939207 time: 2018-08-23T07:10:54 latency: 36 ms from: bob  irreversible: 6939199 (-8)			application.cpp:487
2018-08-23T07:10:57 th_a:invoke handle_block         handle_block ] Got block: #6939208 time: 2018-08-23T07:10:57 latency: 37 ms from: init1  irreversible: 6939200 (-8)		application.cpp:487
2018-08-23T07:11:00 th_a:invoke handle_block         handle_block ] Got block: #6939209 time: 2018-08-23T07:11:00 latency: 39 ms from: init7  irreversible: 6939200 (-9)		application.cpp:487
2018-08-23T07:11:03 th_a:invoke handle_block         handle_block ] Got block: #6939210 time: 2018-08-23T07:11:03 latency: 41 ms from: bao  irreversible: 6939201 (-9)			application.cpp:487
2018-08-23T07:11:06 th_a:invoke handle_block         handle_block ] Got block: #6939211 time: 2018-08-23T07:11:06 latency: 41 ms from: init8  irreversible: 6939202 (-9)		application.cpp:487
2018-08-23T07:11:09 th_a:invoke handle_block         handle_block ] Got block: #6939212 time: 2018-08-23T07:11:09 latency: 44 ms from: init2  irreversible: 6939203 (-9)		application.cpp:487
2018-08-23T07:11:12 th_a:invoke handle_block         handle_block ] Got block: #6939213 time: 2018-08-23T07:11:12 latency: 45 ms from: init4  irreversible: 6939204 (-9)
   ```
## 3. Error de sincronización de bloque
   Vea el archivo de registro de fondo `trusted_node/logs/witness.log`, si el registro continúa reportando un error, como `"unlinkable block"`, `"block does not link to known chain"`, es un error de sincronización de bloques.

   Soluciones:
   * Cierre el programa primero, reinícielo con `--replay-blockchain`, espere a que finalice el inicio y observe si el witness.log es normal. 
   * Si todavía falla, podría ser una excepción de sincronización de blockchain, o el archivo blockchain local podría estar dañado. Debe detener el programa witness_node y, a continuación, eliminar el trusted_node y reiniciar el witness_node. 
   * O en lugar de quitar el directorio trusted_node, inicie el comando con el parámetro --resync-blockchain y el bloque se resincronizará.
## 4. Cómo cerrar el witness_node normalmente
   witness_node escribe todos los datos en la memoria como un objeto. Cuando el programa sale normalmente, los datos en la memoria se escribirán en el disco. Así que no puede cerrar el proceso por la fuerza, o la base de datos en memoria va a ir mal.
   * Si el witness_node no se ejecuta en segundo plano, ejecute Ctrl + C durante una vez y espere a que el programa guarde los datos de memoria y se sale automáticamente.
   * Si el witness_node se está ejecutando en segundo plano, ejecute `kill -s SIGINT $(pgrep witness_node)` y espere a que el programa guarde los datos de memoria. No puede usar Kill-9, o el siguiente lanzamiento reconstruirá el índice y comenzará lentamente.
## El proceso de witness_node es normal pero no recibe bloques de la red

   * Compruebe el archivo de registro en segundo plano y no busque ningún mensaje de error, y el nodo no recibe un nuevo bloque de la red. Esto es probablemente porque la versión del witness_node es antigua. Por favor, visite la página de lanzamiento de [github](https://github.com/gxchain/gxb-core/releases/latest) para descargar el paquete más reciente. 
   * Puede comprobar el número de versión del witness_node con el parámetro-v :

   ```bash
   $./programs/witness_node/witness_node -v
   Version: 1.0.180713-379-g4c9a2f4
   SHA: 4c9a2f4e168503abe3ce1432c699f88b8babe356
   Timestamp: 4 hours ago
   SSL: OpenSSL 1.0.2o  27 Mar 2018
   Boost: 1.67
   Websocket++: 0.7.0
   ```
## 6.¿Qué sistema operativo utiliza BP y cuáles son los requisitos para el hardware, incluido el ancho de banda? 
   * ubuntu14,04 sistema de 64 bits
   * 4 núcleos 32G memoria disco duro 200G, 50MB + ancho de banda, de acuerdo con el flujo de facturación, doble copia de seguridad ante desastres
   * Puede utilizar un servidor en la nube

## 7. witness_node iniciado con un puerto de informe de errores
   Compruebe que el servidor ha iniciado más de un witness_node, lo que resulta en conflictos de puerto.

```bash
ps xf | grep witness_node
```
   Si se ha iniciado más de un witness_node, por favor apague y reinicie::
```bash
for i in $(pgrep witness_node); do echo kill -9 $i; done
```
   
## 8. Error de inicio de witness_node, no hay registro para el proceso
Modifique el archivo config. ini local de la siguiente manera:
```
[logger.default]
level=debug
appenders=stderr,FILE
```
A continuación, reinicie y el mensaje de error se imprimirá en la consola

