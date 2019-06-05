# Introducción a la tarifa de contrato inteligente


En GXChain, hay diferentes cantidades de cargos para implementar, actualizar e invocar contratos. Este documento explica los honorarios asociados con los contratos inteligentes.


## La tarifa del contrato de implementación


La cuota del contrato de despliegue es pagada por el llamador y se calcula como sigue:
:

```cpp
// base_fee es 0.01GXC，contract_size es el tamaño del contrato，price_per_kbyte es el costo de 1kb ram，actualmente es 0.2GXC
fee = base_fee + contract_size / 1024 * price_per_kbyte
```

## La tarifa de renovación


La cuota para la actualización del contrato es pagada por el llamador y se calcula de la siguiente manera:


```cpp
// base_fee es 0.01GXC，contract_size es el tamaño del contrato，price_per_kbyte es el costo de 1kb ram，actualmente es 0.2GXC
fee = base_fee + new_contract_size / 1024 * price_per_kbyte
```

## Tarifa de contrato de llamada


El contrato de llamada es gratuito, pero habrá una tarifa de manejo cuando se llame. La tasa de tramitación consta de tres partes, ram_fee, cpu_fee y base_fee, que se devolverán más tarde.


- **ram_fee**

Cuando se crea o modifica un objeto en la table del contrato, ram_fee puede especificar una cuenta asociada para pagarlo. Ram_fee método de cálculo：


```cpp
// ram_bytes为占用的内存字节数，price_per_kbyte_ram为1kb ram的费用，当前为0.2GXC
ram_fee = ram_bytes / 1024 * price_per_kbyte_ram 
```

| ram_fee payer | Instrucciones |
| --- | --- | 
| 0 | Cuenta del contrato (ibid.\_ slef) |
| \_self | Cuenta de contrato (igual que 0)） |
| sender | Cuenta de llamada de contrato |
| original | La cuenta de invocación original del contrato, que se llama a través del contrato, es la cuenta de invocación inicial |

Ram_fee restitución: después de eliminar el objeto en la table, la tasa incurrida en el momento de la creación será devuelta inmediatamente al payer donde pertenece la memoria.


- **cpu_fee**

El precio unitario actual de cpu_fee es 0


- **base_fee**

El contrato de llamada, además de usar cpu_fee y ram_fee, tiene una tarifa base de 0.001 GXC.

Devolución de base_fee: la cuota básica generada por la invocación del contrato será devuelta al saldo no congelado del usuario, que debe ser recogido por el usuario manualmente.
El método de cálculo de invocar una tarifa de contrato inteligente es el siguiente:

```cpp
// base_fee es 0.001GXC，Ram_fee se calcula en función de la memoria ocupada por el pagador y cpu_fee es 0
fee = base_fee + ram_fee + cpu_fee
```

