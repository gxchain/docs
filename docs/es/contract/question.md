# Las opciones adicionales


## Inicie la cadena privada localmente

Refiera a la construcción de la cadena privada


## Implemente nodos de red de prueba


Red de prueba de referencia

## Número aleatorio en el contrato


En la cadena de bloques, no se pueden generar números aleatorios verificables. Es necesario seleccionar semillas fijas para generar números aleatorios. En general, las secuencias aleatorias se generan mediante el algoritmo hash sha256. Así que la seguridad de números aleatorios, y la selección de semillas es crucial. Si las variables disponibles en la cadena se seleccionan como números aleatorios, como ID de bloque, número de bloque, saldo de activos, etc., una vez que se filtre el algoritmo aleatorio del contrato, el número aleatorio se puede obtener antes de la cadena de bloques, y por lo tanto el negocio se pueden predecir los resultados relacionados con el número aleatorio. Por lo tanto, el algoritmo de número aleatorio debe ser lo más complejo posible, o explorar la posibilidad de obtener datos fuera de la cadena como la semilla del número aleatorio. A continuación se muestra un ejemplo de cómo generar números aleatorios a partir de datos fuera de la cadena：


- 1. Cada una de las partes opuestas (Alice y Bob) crea un número aleatorio y calcula su valor hash.

```bash
#Alice:Cree una cadena aleatoria, como "I am Alice"", y genere el valor hash sha256
zhaoxiangfei@zhaoxiangfeideMacBook-Pro:~$ echo "I am Alice" | shasum -a 256
da161d9ee3c116083030737d5a4d478ee1a7654f8ea51e0513020937a9206b0f

#Bob:Cree una cadena aleatoria, como "I am Bob"", y genere el valor hash sha256
zhaoxiangfei@zhaoxiangfeideMacBook-Pro:~$ echo "I am Bob" | shasum -a 256
77f3bfe06cc926329510b60eba56f80a8d32cf35496587d1444fc690c806c0f9
```
- 2. Cada entidad de contrapartida genera su propio número aleatorio y valor hash, y ambas partes envían el valor hash a la cadena en la primera interacción 

```
Una vez que el valor de hash se envía a la cadena, la cadena aleatoria correspondiente al valor de hash también se corrige, pero la otra parte no puede invertir su propia cadena aleatoria de acuerdo con el valor de hash

```

- 3. Ambas partes envían sus propias cadenas aleatorias y el contrato se comprueba con la cadena enviada contra el último valor hash enviado. Dos valores hash y dos cadenas aleatorias se empataron para generar una secuencia hash como un número aleatorio.


```bash 
sha256("da161d9ee3c116083030737d5a4d478ee1a7654f8ea51e0513020937a9206b0f"+"77f3bfe06cc926329510b60eba56f80a8d32cf35496587d1444fc690c806c0f9"+"I am Alice"+"I am Bob")
```

- 4. Genere una secuencia aleatoria mediante dos interacciones. Cuando la primera interacción (cuando se envían los valores de hash de ambos lados, se determina el contenido que se va a enviar para la segunda interacción, pero no se ha determinado la secuencia aleatoria final). Esto evita que la otra parte engañe.


## Una combinación de contrato y almacenamiento distribuido


El contrato inteligente ofrece la posibilidad de descentralizar la lógica empresarial compleja y puede almacenar datos empresariales relevantes en la cadena para desarrollar DAPP descentralizada. El almacenamiento en la cadena utiliza recursos RAM, que es adecuado para la lectura de alta frecuencia y datos de escritura. El costo del almacenamiento de RAM en la cadena es alto, y algunos archivos grandes no son necesarios para ser almacenados en la memoria RAM en la cadena. El servicio de almacenamiento distribuido proporcionado por GXChian se puede utilizar para hospedar archivos grandes en el almacenamiento BaaS

## Cálculo de honorarios de contrato


Cadena de recursos con el fin de uso razonable de los bloques, cada llamada al contrato inteligente debe estar quemando una tarifa minera, las tasas consisten en tres partes: los gastos básicos (fijo), el costo de memoria (basado en la facturación de uso de almacenamiento persistente), el costo de la CPU (de acuerdo con la llamada la cantidad de tiempo de CPU), el precio de 3 tipos de carga e invocar el límite de CPU del contrato puede ajustarse dinámicamente por Consejo. Reglas de cálculo de honorarios de contrato inteligentes:

Tarifa de implementación de contrato: cargo base + tamaño del cuerpo de la transacción * tarifa de KB de unidad

```cpp
deploy_fee = basic_fee+transaction_size*price_per_kb 
```

Cuota de llamada de contrato: cuota base + uso de memoria + uso de CPU

```cpp
transaction_fee = basic_fee + ram_usage * price_per_kb + cpu_usage * price_per_ms
```


## La API integrada llama al contrato de ejemplo


```cpp
#include <graphenelib/system.h>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/print.hpp>
#include <graphenelib/types.h>
#include <graphenelib/multi_index.hpp>
#include <graphenelib/global.h>
#include <graphenelib/asset.h>
#include <graphenelib/crypto.h>

using namespace graphene;

class example : public contract
{
  public:
    example(uint64_t id)
        : contract(id){}

    //current_receiver 
    // @abi action
    void examcurr(){
        uint64_t ins_id = current_receiver();
        print("current contract account id: ", ins_id);
    }

    //get_action_asset_id 
    // @abi action
    // @abi payable
    void examgetast(){
        uint64_t ast_id = get_action_asset_id();
        print("call action asset id: ",ast_id);
    }

    //get_action_asset_amount 
    // @abi action
    // @abi payable
    void examgetamo(){
        uint64_t amount = get_action_asset_amount();
        print("call action asset amount: ",amount);      
    }
    
    //deposit
    // @abi action
    // @abi payable
    void examdepo(){
        uint64_t ast_id = get_action_asset_id();
        int64_t amount = get_action_asset_amount();
        
        print("call action asset id: ",ast_id);
        print("\n");
        print("call action asset amount: ",amount);  
    }
    //withdraw_asset 
    // @abi action
    void examwith(uint64_t to, uint64_t asset_id, int64_t amount){
        withdraw_asset(_self,to,asset_id,amount);
        print("withdraw_asset example");
    }

    //get_balance 
    // @abi action
    void examgetbl(int64_t account, int64_t asset_id){
        int64_t balance = get_balance(account, asset_id);
        print("account balance: ",balance);
    }
    //sha256 
    // @abi action
    void examsha25(std::string data){
        checksum256 hash;
        sha256(data.c_str(),data.length(),&hash);
        printhex(hash.hash,32);
    }

    //sha512 
    // @abi action
    void examsha512(std::string data){
        checksum512 hash;
        sha512(data.c_str(),data.length(),&hash);
        printhex(hash.hash,64);
    }

    //ripemd160 
    // @abi action
    void examripemd(std::string data){
        checksum160 hash;
        ripemd160(data.c_str(),data.length(),&hash);
        printhex(hash.hash,20);
    }

    //verify_signature (other example: redpacket)
    // @abi action
    void examverify(std::string data,signature sig,std::string pk){
        bool result;
        result = verify_signature(data.c_str(), data.length(), &sig, pk.c_str(), pk.length());
        print("verify result: ",result);
    }

    //get_head_block_num 
    // @abi action
    void examgetnum(){
        int64_t head_num = get_head_block_num();
        print("head block num: ",head_num);
    }

    //get_head_block_id 
    // @abi action
    void examgetid(){
        checksum160 block_hash;
        get_head_block_id(&block_hash);
        printhex(block_hash.hash,20);
    }

    //get_block_id_for_num 
    // @abi action
    void examidnum(uint64_t num){
        checksum160 block_hash;
        get_block_id_for_num(&block_hash,num);             
        printhex(block_hash.hash,20);
    }

    //get_head_block_time 
    // @abi action
    void examgettime(){
        int64_t head_time;
        head_time = get_head_block_time();
        print("head block time: ",head_time);
    }

    //get_trx_sender 
    // @abi action
    void examgettrx(){
        int64_t sender_id;
        sender_id = get_trx_sender();
        print("call action instance id: ",sender_id);
    }

    //get_account_id 
    // @abi action
    void examgetacid(std::string data){
        int64_t acc_id;
        acc_id = get_account_id(data.c_str(), data.length());
        print("account id: ",acc_id);
    }

    //get_account_name_by_id 
    // @abi action
    void examgetname(int64_t accid){
        char data[13]={0};
        int64_t result;
        result = get_account_name_by_id(data,13,accid);
        prints(data);
    }

    //get_asset_id 
    // @abi action
    void examassid(std::string data){
        int64_t assid;
        assid = get_asset_id(data.c_str(),data.length());
        print("asset id: ",assid);
    }

    //read_transaction
    // @abi action
    void examreadtrx(){
        int dwsize;
        dwsize =transaction_size();
        char* pBuffer = new char[dwsize];
        uint32_t size = read_transaction(pBuffer,dwsize);
        print("hex buffer: ");
        printhex(pBuffer,dwsize);
        delete[] pBuffer;
    }
    
    // @abi action
    void examtrxsize(){
        int dwsize;
        dwsize =transaction_size();
        print("the size of the serialize trx: ",dwsize);
    }

    //expiration 
    // @abi action
    void exampira(){
        uint64_t timenum = expiration();
        print("the expiration time: ", timenum);
    }

    //tapos_block_num 
    // @abi action
    void examtapnum(){
        uint64_t tapos_num;
        tapos_num = tapos_block_num();
        print("ref block num: ",tapos_num);
    }

    //tapos_block_prefix
    // @abi action
    void examtappre(){
        uint64_t tapos_prefix;
        tapos_prefix = tapos_block_prefix();
        print("ref block id: ",tapos_prefix);
    }

    //graphene_assert 
    // @abi action
    void examassert(){
        uint64_t number=1;
        graphene_assert(number == 1, "wrong!");
    }

    //graphene_assert_message 
    // @abi action
    void examassmsg(){
        uint64_t number=1;
        std::string msg = "wrong!!!";
        graphene_assert_message(number == 1, msg.c_str(),msg.length()); 
    }

    //print
    // @abi action
    void examprint(){
        print("example example example!!!");
    }
};

GRAPHENE_ABI(example,(examcurr)(examgetast)(examgetamo)(examdepo)(examwith)(examgetbl)(examsha25)(examsha512)(examripemd)(examverify)(examgetnum)(examgetid)(examidnum)(examgettime)(examgettrx)(examgetacid)(examgetname)(examassid)(examreadtrx)(examtrxsize)(exampira)(examtapnum)(examtappre)(examassert)(examassmsg)(examprint))

```
