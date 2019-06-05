# API Reference

Los nodos de GXChain proporcionan interfaces WebSocket y JSONRPC

## Cadena relacionada

### `get_chain_id`
Obtener la cadena ID

#### Especificación de parámetro

<table>
    <tr>
        <th rowspan="1">Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_chain_id</td>
    </tr>
    <tr>
        <td>API Parameters</td>
        <td colspan="2" align="center">空</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_chain_id", []],
        "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id":1,
        "jsonrpc":"2.0",
        "result":"4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8" // chain id
}
```

### `get_dynamic_global_properties`
Obtenga el objeto dinámico global, incluido el número de bloque más reciente, el último id de bloque, el tiempo de encabezado de bloque y otra información

####  Especificación de parámetro

<table>
    <tr>
        <th rowspan="1">Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_dynamic_global_properties</td>
    </tr>
    <tr>
        <td>API Parameters</td>
        <td colspan="2" align="center">空</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_dynamic_global_properties", []],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id":1,
        "jsonrpc":"2.0",
        "result":{
            "id":"2.1.0",
            "head_block_number":16757465, // el número de bloque más reciente
            "head_block_id":"00ffb2d9f6e344f2190a8dfba58baaadd49e76c4", // el último id de bloque
            "time":"2019-01-28T06:08:00", // el tiempo de encabezado de bloque
            "current_witness":"1.6.52", // Empaquete el witness id del head block actual 
            "next_maintenance_time":"2019-01-28T06:40:00", // Siguiente tiempo de ciclo de mantenimiento
            "last_budget_time":"2019-01-28T05:40:00", // Último tiempo de ciclo de mantenimiento
            "witness_budget":3065824, // El presupuesto de nodo restante para el ciclo de mantenimiento actual
            "accounts_registered_this_interval":2,
            "recently_missed_count":0, // El último bloque que falta de un nodo
            "current_aslot":16958091,
            "recent_slots_filled":"340282366920938463463374607431768211455",
            "dynamic_flags":0,
            "last_irreversible_block_num":16757449 // El último número de bloque irreversible
        }
}
```


## Bloque relacionado

### `get_block`

Obtener información de bloque por número de bloque

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_block</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>block_num</td>
        <td>Número de bloque/altura de bloque</td>
    </tr>
</table>


#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_block", [10000]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": {
            "previous": "0000270f5b219bc4c6996f2cca89b23ef653a2b0", // block id(block hash) del bloque anterior
            "timestamp": "2017-06-10T22:53:45", // timestamp del bloque actual
            "witness": "1.6.23", // Empaquetar el witness id del bloque actual
            "transaction_merkle_root": "0000000000000000000000000000000000000000", // En el bloque actual, la raíz de merkle de la transacción
            "extensions": [],
            "witness_signature": "204e95ba3f871d8f670cc8088d5f563704c9c0c8acd42a80077bd7c6a47ecde095633e6a614c7f73830d972c3b617d5c01e8e0e151bfc489a327103597d3f0c244", // la firma del witness
            "transactions": [], // Lista de transacciones
            "block_id": "000027100ef5386d4ea4481dc302401de66fe358", // el block id actual
            "signing_key": "GXC7ouC3miJyKrLf1XyeyDv6u5W9Q8BT3WdbJbJYACiFm2Zx8vPna", // el signing key de witness actual 
            "transaction_ids": [] // tx id correspondiente a la lista de Trading
        }
}
```

### `get_block_header`

Obtener información de bloque por número de bloque

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_block_header</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>block_num</td>
        <td>Número de bloque/altura de bloque</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_block_header", [10000]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": {
            "previous": "0000270f5b219bc4c6996f2cca89b23ef653a2b0", // block id(block hash) del bloque anterior
            "timestamp": "2017-06-10T22:53:45", // timestamp del bloque actual
            "witness": "1.6.23", // Empaquetar el witness id del bloque actual
            "transaction_merkle_root": "0000000000000000000000000000000000000000", // En el bloque actual, la raíz de merkle de la transacción
            "extensions": []
        }
}
```
## Transacción relacionada

### `get_transaction_hex`

Devuelve la cadena serializada de la transacción en formato hexadecimal

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_transaction_hex</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>transaction</td>
        <td>Cuerpo de transacción</td>
    </tr>
</table>

#### Ejemplo

**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_transaction_hex", [{"ref_block_num":53237,"ref_block_prefix":892361345,"expiration":"2019-03-07T06:07:21","operations":[[0,{"fee":{"amount":50000,"asset_id":"1.3.1"},"from":"1.2.17","to":"1.2.6","amount":{"amount":100000,"asset_id":"1.3.1"},"extensions":[]}]],"extensions":[],"signatures":[]}]], "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```
{"id":1,"jsonrpc":"2.0","result":"f5cf815a303519b5805c010050c3000000000000011106a0860100000000000100000000"}
```

## Objetos relacionados

En GXChain, almacene diferentes tipos de datos por diferentes objetos. Haga clic aquí para ver [tipos de objeto en GXChain] (objetos ./#_2-gxchain)

### `get_objects`

Obtenga la información del objeto en función del ID del objeto

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_objects</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>[id del objeto]</td>
        <td>Matriz, puede pasar en varios IDs correspondientes</td>
    </tr>
</table>

#### Ejemplo

**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_objects", [["1.3.1","2.3.1"]]], "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": [{ // 1.3.1对象
            "id": "1.3.1",
            "symbol": "GXC",
            "precision": 5,
            "issuer": "1.2.0",
            "options": {
                "max_supply": "10000000000000",
                "market_fee_percent": 0,
                "max_market_fee": 0,
                "issuer_permissions": 69,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 100000,
                        "asset_id": "1.3.1"
                    },
                    "quote": {
                        "amount": 100000,
                        "asset_id": "1.3.1"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "whitelist_markets": [],
                "blacklist_markets": [],
                "description": "{\"main\":\"GXC es el token emitido por la Fundación GXB en GXChain. No sólo tiene valor circulante, sino que también necesita pagar o quemar GXC al desarrollar, autenticar y usar el servicio de cadena (como la tarifa del minero para transferir dinero en la cadena) y el uso del servicio BaaS. GXC es el token utilizado por la aplicación en la cadena. En la Ciudad de Block, GXC también se puede utilizar convenientemente para el pago y la liquidación. Por ejemplo, los residentes utilizan GXC para liquidar cuentas entre sí, los servicios públicos urbanos deben ser liquidados con GXC, y los servicios prestados por las empresas necesitan ser comprados con GXC\",\"short_name\":\"\",\"market\":\"\"}",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.3.1"
        }, { // 2.3.1 objeto
            "id": "2.3.1",
                "current_supply": "9958303550217",
                "confidential_supply": 0,
                "accumulated_fees": 0,
                "fee_pool": 0
        }]
}
```

## Cuenta relacionada


### `get_account_count`

Obtiene el número total de cuentas de la cadena

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_account_count</td>
    </tr>
    <tr>
        <td>API Parameters</td>
        <td colspan="2" align="center">空</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_account_count", []],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": 1118627 // el número total de cuentas de la cadena
}
```

### `get_account_by_name`

Obtener información de 'cuenta' de acuerdo con 'account_name', * * no contiene la información de * * objetos asociados, tales como saldo de activos de cuenta, saldo que se deben descongelar, saldo congelado de plan de lealtad, etc
#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_account_by_name</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>account_name</td>
        <td>Nombre de cuenta</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_account_by_name", ["nathan"]],
        "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": {
            "id": "1.2.17", // id de cuanta
            "membership_expiration_date": "2106-02-07T06:28:15", // no es 1970-01-01T00:00:00， La membresía de vida
            "merchant_expiration_date": "1970-01-01T00:00:00", // no es1970-01-01T00:00:00， Comerciantes
            "datasource_expiration_date": "1970-01-01T00:00:00", // no es1970-01-01T00:00:00， Origen de datos
            "data_transaction_member_expiration_date": "1970-01-01T00:00:00", // 不为1970-01-01T00:00:00， Autoridad de validación de transacciones está disponible en DES 1,0
            "registrar": "1.2.17", // El registrante de cuenta
            "referrer": "1.2.17", // El recomendador de cuenta
            "lifetime_referrer": "1.2.17", // El recomendador de miembro de la vida
            "merchant_auth_referrer": "1.2.0", // El recomendador del comerciante
            "datasource_auth_referrer": "1.2.0", // El recomendador del origen de datos
            "network_fee_percentage": 2000, // Poundage compartido, la cuota de red
            "lifetime_referrer_fee_percentage": 8000, // Poundage compartido, la cuota del recomendador de miembro de la vida
            "referrer_rewards_percentage": 0, // Poundage compartido, la cuota del recomendador 
            "name": "nathan", // Nombre de cuenta
            "vm_type": "", //Tipo de vm, campos reservados
            "vm_version": "", // Versión de vm, campos reservados
            "code": "", // El código para las cuentas de contrato aplicables
            "code_version": "", // El código hash
            "abi": { //la abi corresponde de code, que se aplica a la cuenta de contrato aplicable
                "version": "gxc::abi/1.0",
                "types": [],
                "structs": [],
                "actions": [],
                "tables": [],
                "error_messages": [],
                "abi_extensions": []
            },
            "owner": { //  Permisos de propietario de cuenta, que se pueden usar para modificar los permisos de cuenta
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    ["GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV", 1]
                ],
                "address_auths": []
            },
            "active": { // Permisos activos en las cuentas, que se pueden usar para gastar fondos de cuenta
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    ["GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV", 1]
                ],
                "address_auths": []
            },
            "options": {
                "memo_key": "GXC6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV", // memo key
                "voting_account": "1.2.5",
                "num_witness": 0,
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.17", // Objeto de estadísticas de cuenta
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "cashback_vb": "1.13.246", // ID de objeto de cashback
            "owner_special_authority": [0, {}],
            "active_special_authority": [0, {}],
            "top_n_control_flags": 0
        }
}
```

### `get_full_accounts`

Obtener información completa de la cuenta de acuerdo con ' account_ids o account_names ', * * contiene información sobre * * objetos asociados, tales como saldo de activos de cuenta, saldo congelado, etc.
#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_full_accounts</td>
    </tr>
    <tr>
        <td rowspan="4" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>[Nombre o ID de cuanta ]</td>
        <td>Matriz, para pasar el nombre de cuenta o el ID de cuenta</td>
    </tr>
    <tr>
        <td>bool tipo</td>
        <td>Suscribirse o no</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_full_accounts", [["blockcitybp"],false]],
        "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
    "id":1,
        "jsonrpc":"2.0",
        "result":[
            [
                "blockcitybp",
            {
                "account":{
                    "id":"1.2.1089881",
                    "membership_expiration_date":"2106-02-07T06:28:15", // no es 1970，es cuenta de miembro de vida
                    "merchant_expiration_date":"1970-01-01T00:00:00", // no es 1970， es comerciantes
                    "datasource_expiration_date":"1970-01-01T00:00:00", // no es 1970， es origen  de datos
                    "data_transaction_member_expiration_date":"1970-01-01T00:00:00",
                    "registrar":"1.2.1089881", //  El registrante de cuenta
                    "referrer":"1.2.1089881", // El recomendador de cuenta
                    "lifetime_referrer":"1.2.1089881",
                    "merchant_auth_referrer":"1.2.0",
                    "datasource_auth_referrer":"1.2.0",
                    "network_fee_percentage":2000,
                    "lifetime_referrer_fee_percentage":8000,
                    "referrer_rewards_percentage":1000,
                    "name":"blockcitybp", // Nombre de cuenta
                    "vm_type":"",
                    "vm_version":"",
                    "code":"",  // code no está vacío, es una cuenta de contrato inteligente
                    "code_version":"",
                    "abi":{
                        "version":"gxc::abi/1.0",
                        "types":[

                        ],
                        "structs":[

                        ],
                        "actions":[

                        ],
                        "tables":[

                        ],
                        "error_messages":[

                        ],
                        "abi_extensions":[

                        ]
                    },
                    "owner":{
                        "weight_threshold":1,
                        "account_auths":[

                        ],
                        "key_auths":[
                            [
                                "GXC8XrrSD9LE4UuUvB1QtTA1EhUfjQeJLZwgeP7br56Koh1zrxez7",
                        1
                            ]
                        ],
                        "address_auths":[

                        ]
                    },
                    "active":{
                        "weight_threshold":1,
                        "account_auths":[

                        ],
                        "key_auths":[
                            [
                                "GXC8XrrSD9LE4UuUvB1QtTA1EhUfjQeJLZwgeP7br56Koh1zrxez7",
                        1
                            ]
                        ],
                        "address_auths":[

                        ]
                    },
                    "options":{
                        "memo_key":"GXC8XrrSD9LE4UuUvB1QtTA1EhUfjQeJLZwgeP7br56Koh1zrxez7",
                        "voting_account":"1.2.5",
                        "num_witness":0,
                        "num_committee":0,
                        "votes":[

                        ],
                        "extensions":[

                        ]
                    },
                    "statistics":"2.6.1089881",
                    "whitelisting_accounts":[

                    ],
                    "blacklisting_accounts":[

                    ],
                    "whitelisted_accounts":[

                    ],
                    "blacklisted_accounts":[

                    ],
                    "cashback_vb":"1.13.278",
                    "owner_special_authority":[
                        0,
                    {

                    }
                    ],
                    "active_special_authority":[
                        0,
                    {

                    }
                    ],
                    "top_n_control_flags":0
                },
                "statistics":{
                    "id":"2.6.1089881",
                    "owner":"1.2.1089881",
                    "most_recent_op":"2.9.201931750",
                    "total_ops":13,
                    "removed_ops":0,
                    "total_core_in_orders":0,
                    "lifetime_fees_paid":5153414,
                    "pending_fees":0,
                    "pending_vested_fees":0
                },
                "registrar_name":"blockcitybp",
                "referrer_name":"blockcitybp",
                "lifetime_referrer_name":"blockcitybp",
                "votes":[

                ],
                "cashback_balance":{ // El saldo devuelto, es parte del saldo que se va a descongelar
                    "id":"1.13.278",
                    "owner":"1.2.1089881",
                    "balance":{
                        "amount":1932, // La precisión de amount es 5, convertida a la cantidad normal es1932/100000
                        "asset_id":"1.3.1" // 1.3.1 correspondiente GXC
                    },
                    "policy":[ // Estrategia de descongelamiento, 0 significa lineal, 1 significa día de la moneda
                        1,
                    {
                        "vesting_seconds":2592000,
                        "start_claim":"1970-01-01T00:00:00",
                        "coin_seconds_earned":"5007744000",
                        "coin_seconds_earned_last_update":"2019-01-16T07:40:00"
                    }
                    ]
                },
                "balances":[ // El saldo
                {
                    "id":"2.5.456853",
                    "owner":"1.2.1089881",
                    "asset_type":"1.3.1",
                    "balance":265386
                }
                ],
                "locked_balances":[

                ],
                "vesting_balances":[ // Saldo que se deben descongelar
                {
                    "id":"1.13.171",
                    "owner":"1.2.1089881",
                    "balance":{
                        "amount":0,
                        "asset_id":"1.3.1"
                    },
                    "policy":[
                        1,
                    {
                        "vesting_seconds":7776000,
                        "start_claim":"1970-01-01T00:00:00",
                        "coin_seconds_earned":"0",
                        "coin_seconds_earned_last_update":"2018-12-27T03:04:21"
                    }
                    ]
                },
                {
                    "id":"1.13.259",
                    "owner":"1.2.1089881",
                    "balance":{
                        "amount":265747140,
                        "asset_id":"1.3.1"
                    },
                    "policy":[
                        1,
                    {
                        "vesting_seconds":86400,
                        "start_claim":"1970-01-01T00:00:00",
                        "coin_seconds_earned":"22960140940800",
                        "coin_seconds_earned_last_update":"2019-01-28T06:11:57"
                    }
                    ]
                },
                {
                    "id":"1.13.278",
                    "owner":"1.2.1089881",
                    "balance":{
                        "amount":1932,
                        "asset_id":"1.3.1"
                    },
                    "policy":[
                        1,
                    {
                        "vesting_seconds":2592000,
                        "start_claim":"1970-01-01T00:00:00",
                        "coin_seconds_earned":"5007744000",
                        "coin_seconds_earned_last_update":"2019-01-16T07:40:00"
                    }
                    ]
                }
                ],
                "pledge_balances":[ // El saldo de activos hipotecados por el nodo de GXB
                {
                    "id":"1.26.1",
                    "owner_account":"1.2.1089881",
                    "amount":{
                        "amount":1000000000,
                        "asset_id":"1.3.1"
                    }
                }
                ],
                "limit_orders":[

                ],
                "call_orders":[

                ],
                "settle_orders":[

                ],
                "proposals":[

                ],
                "assets":[

                ],
                "withdraws":[

                ]
            }
    ]
        ]
}
```

### `is_account_registered`
Compruebe si el nombre de cuenta está registrado. Devuelve true si se registra, false si no está registrado o si el nombre de cuenta es ilegal

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">is_account_registered</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>account_name</td>
        <td>Nombre de cuenta</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "is_account_registered", ["nathan"]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": true // true indica que la cuenta está registrada
}
```

### `get_key_references`
En función de la clave pública, consulte la cuenta asociada y devuelva el id de cuenta asociado

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_key_references</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>[la clave pública]</td>
        <td>Matriz, a pasar una serie de claves públicas</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_key_references", [["GXC7mmfnZWUYtz2tjNGqduZRe2w5x79GCjuoMiVkmEGRE94Vq7gAo"]]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [
		["1.2.26", "1.2.26"] // Account id relacionado con la clave pública
	]
}
```

## Activos relacionados

### `list_assets`

Consulte el recurso para devolver un objeto de activo mayor que el parámetro pasado en

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">list_assets</td>
    </tr>
    <tr>
        <td rowspan="4" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>El nombre del activo</td>
        <td>Un símbolo de activo o una primera cadena, por ejemplo G</td>
    </tr>
    <tr>
        <td>limit</td>
        <td>Número de resultados devueltos</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "list_assets", ["G", 2]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.3.11", // Devuelve el activo1.3.11
		"symbol": "GBA", // El nombre de activo GBA
		"precision": 5, // Precisión
		"issuer": "1.2.1110589", // El emisor de activos
		"options": {
			"max_supply": "200000000000000", // Máximo suministro de activos
			"market_fee_percent": 0,
			"max_market_fee": 0,
			"issuer_permissions": 0,
			"flags": 0,
			"core_exchange_rate": { // Tipo de cambio con GXC
				"base": {
					"amount": 100000,
					"asset_id": "1.3.1"
				},
				"quote": {
					"amount": 1000000,
					"asset_id": "1.3.11"
				}
			},
			"whitelist_authorities": [],
			"blacklist_authorities": [],
			"whitelist_markets": [],
			"blacklist_markets": [],
			"description": "{\"main\":\"Green Building Asset，o GBA, es la distribución gratuita del 50 por ciento de los activos verdes basados en la cadena de cartas públicas.\",\"market\":\"\"}",
			"extensions": []
		},
		"dynamic_asset_data_id": "2.3.11" // La propiedad dinámica correspondiente al activo corresponde al ID
	}, {
		"id": "1.3.5", // activo1.3.5
		"symbol": "GCNY", // Nombre de  activo GCNY
		"precision": 5,
		"issuer": "1.2.785392",
		"options": {
			"max_supply": "1000000000000000",
			"market_fee_percent": 0,
			"max_market_fee": 0,
			"issuer_permissions": 79,
			"flags": 0,
			"core_exchange_rate": {
				"base": {
					"amount": 1000000,
					"asset_id": "1.3.1"
				},
				"quote": {
					"amount": 100000,
					"asset_id": "1.3.5"
				}
			},
			"whitelist_authorities": [],
			"blacklist_authorities": [],
			"whitelist_markets": [],
			"blacklist_markets": [],
			"description": "",
			"extensions": []
		},
		"dynamic_asset_data_id": "2.3.5"
	}]
}
```

### `lookup_asset_symbols`

Obtener detalles de activos por nombre de activo

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">lookup_asset_symbols</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>[Nombre de activo]</td>
        <td>Matriz, símbolo de activo o primera cadena, por ejemplo GXC</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "lookup_asset_symbols", [["GXC"]]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
El resultado es el mismo que list_assets

### `get_account_balances`
Obtenga el saldo de la cuenta en función del ID de cuenta y del ID de activo, y devuelva el saldo de activos completo si no se especifica el ID de activo

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_account_balances</td>
    </tr>
    <tr>
        <td rowspan="4" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>account_id</td>
        <td>id de cuenta</td>
    </tr>
    <tr>
        <td>[asset id]</td>
        <td>Matriz, id de activo</td>
    </tr>
</table>

####Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_account_balances", ["1.2.42", ["1.3.0", "1.3.1"]]],
        "id": 1
}' https://node1.gxb.io/rpc

```

**response:**
```json
{
    "id":1,
        "jsonrpc":"2.0",
        "result":[
        {
            "amount":"79795227868",
            "asset_id":"1.3.0"  // 1.3.0 es activo de NULL
        },
        {
            "amount":"3949999988445", // La precisión de los activos de GXChain es 5 y la cantidad real es 39499999.88445
            "asset_id":"1.3.1" // 1.3.1 es activo de GXChain
        }
        ]
}
```

### `get_named_account_balances`

Obtenga el saldo de la cuenta en función del nombre de cuenta y el ID de activo, y devuelva el saldo de activos completo si no se especifica el ID de activo

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_named_account_balances</td>
    </tr>
    <tr>
        <td rowspan="4" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>account_name</td>
        <td>Nombre de cuenta</td>
    </tr>
    <tr>
        <td>[asset id]</td>
        <td>Matriz, id de activo</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_named_account_balances", ["gxbfoundation", ["1.3.0", "1.3.1"]]],
        "id": 1
}' https://node1.gxb.io/rpc

```

**response:**
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"amount": "79795227868", // 1.3.0 El saldo de activo
		"asset_id": "1.3.0"
	}, {
		"amount": "3949999988445", // 1.3.1 El saldo de activo, es el activo de GXChain, como la precisión de los activos de GXChain es 5, la cantidad real es3949999988445 / 100000
		"asset_id": "1.3.1"
	}]
}
```

### `get_vesting_balances`

Obtiene todos los saldos que se deben descongelar de la cuenta en función del identificador de cuenta

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_vesting_balances</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>account_id</td>
        <td>id de cuenta</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_vesting_balances", ["1.2.748971"]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id":1,
        "jsonrpc":"2.0",
        "result":[
        {
            "id":"1.13.89",
            "owner":"1.2.748971",
            "balance":{
                "amount":0,
                "asset_id":"1.3.0"
            },
            "policy":[
                1,
            {
                "vesting_seconds":7776000,
                "start_claim":"1970-01-01T00:00:00",
                "coin_seconds_earned":"0",
                "coin_seconds_earned_last_update":"2018-11-09T11:29:30"
            }
            ]
        },
        {
            "id":"1.13.123",
            "owner":"1.2.748971",
            "balance":{
                "amount":24657392,
                "asset_id":"1.3.1"
            },
            "policy":[
                1,
            {
                "vesting_seconds":7776000,
                "start_claim":"1970-01-01T00:00:00",
                "coin_seconds_earned":"191735880192000",
                "coin_seconds_earned_last_update":"2018-12-04T07:40:00"
            }
            ]
        },
        {
            "id":"1.13.237",
            "owner":"1.2.748971",
            "balance":{
                "amount":1907009,
                "asset_id":"1.3.1"
            },
            "policy":[
                1,
            {
                "vesting_seconds":2592000,
                "start_claim":"1970-01-01T00:00:00",
                "coin_seconds_earned":"4942967328000",
                "coin_seconds_earned_last_update":"2019-01-28T00:40:00"
            }
            ]
        }
    ]
}
```

## nodo de GXChain relacionado

### `get_trust_nodes`

Obtiene los identificadores de cuenta a los que pertenecen todos los nodos de GXChain

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_trust_nodes</td>
    </tr>
    <tr>
        <td>API Parameters</td>
        <td colspan="2" align="center">空</td>
    </tr>
</table>


#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_trust_nodes", []],
        "id": 1
}' https://node1.gxb.io/rpc
```
**response:**
```json
{
   "id":1,
   "jsonrpc":"2.0",
   "result":[
      "1.2.3429",
      "1.2.3431",
      "1.2.3432",
      "1.2.3433",
      "1.2.3434",
      "1.2.748971",
      "1.2.1090296",
      "1.2.1090419",
      "1.2.1061353",
      "1.2.1090653",
      "1.2.1090792",
      "1.2.1090458",
      "1.2.1091083",
      "1.2.1092168",
      "1.2.1106749"
   ]
}
```
### `get_witness_by_account`

De acuerdo con 'account_id', se obtiene información de ' nodo de GXChain', incluyendo clave pública de nodo, votos totales, número de bloques perdidos, etc 

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_witness_by_account</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>account_id</td>
        <td>id de cuenta</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_witness_by_account", ["1.2.748971"]],
        "id": 1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id":1,
        "jsonrpc":"2.0",
        "result":{
            "id":"1.6.35",
            "witness_account":"1.2.748971", // cuenta
            "last_aslot":0,
            "signing_key":"GXC5YFfb3LtUDnHCu4bTfSMUxoVMz2xwnCbTT99oAdVPCcB2nMKz9", // la clave pública que firma el bloque
            "vote_id":"1:56", // witness的vote id
            "total_votes":"82099555219", // votos totales
            "url":".",
            "total_missed":0, // número total de bloques perdidos
            "last_confirmed_block_num":0, // Último bloque empaquetado 
            "is_valid":true // witness状态
        }
}
```

### `lookup_vote_ids`

De acuerdo con vote_id, devuelva la información del nodo de GXchian y el objeto de worker correspondiente 

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">lookup_vote_ids</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>[vote_id]</td>
        <td>Matriz, id de votar</td>
    </tr>
</table>


#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "lookup_vote_ids", [["1:22", "0:72"]]],
        "id": 1
}' https://node1.gxb.io/rpc
```


## contrato inteligente relacionado

### `serialize_contract_call_args`
Devuelve una cadena serializada de parámetros de llamada de contrato inteligente en formato hexadecimal
#### Especificación de parámetro
<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">serialize_contract_call_args</td>
    </tr>
    <tr>
        <td rowspan="5" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>contract_name</td>
        <td>Nombre de cuenta del contrato</td>
    </tr>
    <tr>
        <td>method</td>
        <td>Nombre de método</td>
    </tr>
    <tr>
        <td>json_args</td>
        <td>El parámetro correspondiente al método de contrato, la cadena key-value json, se puede ser ""</td>
    </tr>
</table>


#### Ejemplo
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "serialize_contract_call_args", ["gxc-redpacket", "issue", "{\"pubkey\":\"GXC5NEGqM8BTnMm5NT7Vv2Shxh4eg4tk1kfmAUf3EGHtksig5vZdN\", \"number\":10}"]],
        "id": 1
}' https://node1.gxb.io
```

**response:**
```
{"id":1,"jsonrpc":"2.0","result":"35475843354e4547714d3842546e4d6d354e54375676325368786834656734746b316b666d41556633454748746b73696735765a644e0a00000000000000"}
```

### `get_table_rows_ex`
interfaz de extensión ' get_table_rows ', proporciona una función de consulta más enriquecida. (los valores predeterminados se utilizan cuando no se pasan los campos de parámetro)

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_table_rows_ex</td>
    </tr>
    <tr>
        <td rowspan="5" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>contract_name</td>
        <td>nombre de cuenta del contrato</td>
    </tr>
    <tr>
        <td>table_name</td>
        <td>nombre de table</td>
    </tr>
    <tr>
        <td>get_table_rows_params</td>
        <td>objeto de parámetro, puede ser{}</td>
    </tr>
</table>

Especificación de parámetro de get_table_rows_params：
```
lower_bound, el valor mínino del key especificado para la consulta, el valor predeterminado es 0
upper_bound es el valor máximo del key especificado en la consulta, que por defecto es-1, el entero sin signo más grande
limit，cuando se devuelve la barra de limit especificada de la consulta, la devolución predeterminada es 10
index_position，el index especificado en la consulta, el valor predeterminado es 1, el primer índice
reverse，el resultado de la consulta se emite en orden inverso según el key, y el valor predeterminado es 0, es decir, salida de pequeño a grande de acuerdo con la clave
get_table_rows_params, todos los parámetros tienen valores predeterminados. Si no necesita cambiar los valores predeterminados, puede dejar de pasarlos en
```

#### Ejemplo
**request:**
```bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [0, "get_table_rows_ex", ["gdice", "prizepool", {"lower_bound":0,"upper_bound":-1,"limit":20}]],
        "id": 1
}' https://node1.gxb.io
```

**response:**
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"rows": [{
			"pool": {
				"amount": "3294138495",
				"asset_id": 1
			},
			"totalbet": "30845491144",
			"betcount": 38425,
			"wincount": 31459,
			"minbet": 50000,
			"minbank": 10000000,
			"investtotalpercent": 2643728290,
			"profit": 462683014
		}, {
			"pool": {
				"amount": 0,
				"asset_id": 2
			},
			"totalbet": 0,
			"betcount": 0,
			"wincount": 0,
			"minbet": 1000000,
			"minbank": 100000000,
			"investtotalpercent": 0,
			"profit": 0
		}, {
			"pool": {
				"amount": "100000000000",
				"asset_id": 14
			},
			"totalbet": 0,
			"betcount": 0,
			"wincount": 0,
			"minbet": 10000000,
			"minbank": 1000000000,
			"investtotalpercent": 100000000,
			"profit": 0
		}],
		"more": false
	}
}
```

## La interfaz de gestión de radiodifusión

### `get_required_fees`

Dependiendo del contenido de la transacción, obtenga el monto de las tasas requeridas para pagar por la estructura de la transacción

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">0</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">get_required_fees</td>
    </tr>
    <tr>
        <td rowspan="4" >API Parameters</td>   
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>operations</td>
        <td>Estructura de transacción</td>
    </tr>
    <tr>
        <td>asset_id</td>
        <td>número de activo</td>
    </tr>
</table>


#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc":"2.0",
    "method":"call",
    "params":[0,"get_required_fees",[[[0,{"fee":{"amount":1000,"asset_id":"1.3.1"},"from":"1.2.955603","to":"1.2.1122226","amount":{"amount":40000,"asset_id":"1.3.1"},"extensions":[]}]],"1.3.1"]],
    "id":1
}' https://node1.gxb.io/rpc
```

**response:**
```json
{
    "id":1,
    "jsonrpc":"2.0",
    "result":[
        {
            "amount":1000,
            "asset_id":"1.3.1"
        }
    ]
}
```



## La interfaz radiodifusión

### `broadcast_transaction`

Asincronice la api , difunde una transacción firmada a la red sin esperar el resultado de la ejecución de la transacción

::: tip Tips
[¿Cómo iniciar transacciones en la cadena？](../advanced/send_transaction.md)
:::

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">2</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">broadcast_transaction</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>signed_trx</td>
        <td>Cuerpo de transacción firmado</td>
    </tr>
</table>

#### Ejemplo
**request:**
``` bash
curl --data '{
    "jsonrpc": "2.0",
        "method": "call",
        "params": [2,"broadcast_transaction",[{"ref_block_num":3698,"ref_block_prefix":1780126622,"expiration":"2018-12-18T10:56:09","operations":[[0,{"fee":{"amount":1000,"asset_id":"1.3.1"},"from":"1.2.17","to":"1.2.6","amount":{"amount":1000000,"asset_id":"1.3.1"},"extensions":[]}]],"extensions":[],"signatures":["204444e23dff4e911e33d4059b36c91f7d4f85022c90ebd3e509f9b2caeb6bca273c8616ebd4f0786ac03b3ef2796a56d754de301e97aff0e43df6f3dfb12d1e62"]}]],
        "id": 1
}' https://node23.gxb.io/rpc
```api

### `broadcast_transaction_synchronous`

Sincronice la API, transmita una transacción firmada a la red y espere el resultado de la transacción sincrónicamente, dependiendo de la red y la confirmación de la transacción y otros factores, espere unos 2 segundos

::: tip Tips
[¿Cómo iniciar transacciones en la cadena？](../advanced/send_transaction.md)
:::

#### Especificación de parámetro

<table>
    <tr>
        <th>Petición de parámetro</th>
        <th colspan="2">Petición de especificación de parámetro</th>
    </tr>
    <tr>
        <td>API Id</td>
        <td colspan="2" align="center">2</td>
    </tr>
    <tr>
        <td>API Name</td>
        <td colspan="2" align="center">broadcast_transaction_synchronous</td>
    </tr>
    <tr>
        <td rowspan="3" >API Parameters</td>
    </tr>
    <tr>
        <th>Parámetro de API</th>
        <th>Especificación de parámetro de API</th>
    </tr>
    <tr>
        <td>signed_trx</td>
        <td>Cuerpo de transacción firmado</td>
    </tr>
</table>


#### Ejemplo
**request:**
``` bash
    curl --data '{
        "jsonrpc": "2.0",
            "method": "call",
            "params": [2,"broadcast_transaction_synchronous",[{"ref_block_num":63524,"ref_block_prefix":3478923091,"expiration":"2019-01-21T07:59:24","operations":[[0,{"fee":{"amount":1000,"asset_id":"1.3.1"},"from":"1.2.22","to":"1.2.18","amount":{"amount":100000,"asset_id":"1.3.1"},"extensions":[]}]],"extensions":[],"signatures":["20165321fabdce0ca561370ba547738be12a33b929b17889845ab9b8c1a4ed2fa04bc555205bc945cf6f0129765a0f1c06265437c111957a4008167ef720c49f71"]}]],
            "id": 1
    }' https://node23.gxb.io/rpc
```

**response:**
```json
{
    "id": 1,
        "jsonrpc": "2.0",
        "result": {
            "id": "8e2a0d30d68a6a34f58cece5b7879d8a8ec123bd", // txid
            "block_num": 10680361,
            "trx_num": 0,
            "trx": {
                "ref_block_num": 63524,
                "ref_block_prefix": 3478923091,
                "expiration": "2019-01-21T07:59:24",
                "operations": [
                    [0, {
                        "fee": {
                            "amount": 1000,
                            "asset_id": "1.3.1"
                        },
                        "from": "1.2.22",
                        "to": "1.2.18",
                        "amount": {
                            "amount": 100000,
                            "asset_id": "1.3.1"
                        },
                        "extensions": []
                    }]
                ],
                "extensions": [],
                "signatures": ["20165321fabdce0ca561370ba547738be12a33b929b17889845ab9b8c1a4ed2fa04bc555205bc945cf6f0129765a0f1c06265437c111957a4008167ef720c49f71"],
                "operation_results": [
                    [0, {}]
                ]
            }
        }
}
```
