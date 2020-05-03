# Errores comunes de desarrollo

Hay muchos tipos de errores que pueden ocurrir durante el desarrollo, por lo que este tutorial cubrirá muchos de ellos a lo largo del tiempo (incluyendo el desarrollo de contratos comunes y los problemas relacionados con el desarrollo de C++).

## 1. Error en el archivo de encabezado VsCode

Motivo del error: dado que la compilación de origen ha fallado, el archivo de encabezado dependiente del contrato no se agregó a la variable de entorno.

Solución: puede establecla manualmente en el software vscode y editar el directorio . vscode--> c_cpp_properties. json

```json
"includePath": [
    "${workspaceFolder}/**",
    "/Users/zhaoxiangfei/code/gxb-core/contracts",  //Reemplace con su propia ruta de archivo de encabezado de contrato
    "/Users/zhaoxiangfei/code/gxb-core/externals/magic_get/include" //Reemplaza con tu propio camino.
],
```

## 2. El archivo abi generado carece de entradas

Motivo del error: no se agregó ningún comentario a la acción o tabla para las llamadas externas, lo que posiblemente resultaría en la falta de archivos abi analizados por la herramienta gxx. 

Solución: agregue comentarios a la acción y la tabla, como se muestra a continuación:
```cpp
// Invoque la acción sin recursos adicionales 
// @abi action
void hi(std::string user){
	...
}

//  Invoque la acción con recursos adicionales
// @abi action
// @abi payable
void issue(std::string pubkey, uint64_t number){
	...
}

// La tabla de índice múltiple 
//@abi table packet i64
struct packet {
    ...
};

```

## 3. Error al operar tabla de índice múltiple (agregar, cambiar) 

Motivo del error: es posible que el argumento de la expresión lambda pasada no sea una referencia al objeto, sino que solo se modifique una copia del objeto.

Solución: cambie el argumento a la expresión lambda por una referencia al objeto.

```cpp
offers.emplace(0, [&](auto &o) {
    o.id = offers.available_primary_key();;
    ...
});
```
## 4. Se ha producido un error al llamar a una acción en el contrato

Motivo de error: además de la causa lógica de la acción en sí, todavía es necesario comprobar si hay errores en el archivo abi y los errores en el GRAPHENE_ABI

Solución: Compruebe si la acción existe en la abi y si la macro GRAPHENE_ABI contiene la acción

```cpp
// Si no se incluye una acción, el contrato todavía se puede implementar correctamente, salvo que no puede controlar la acción invocada cuando se invoca 
GRAPHENE_ABI(hello,(hi))
```

## 5. Compilado usando la herramienta gxx, "no se encontraron archivos de cabecera" 

Motivo de error: como en el problema 1, el archivo de encabezado no se copió en el directorio del sistema porque la compilación del código fuente falló o la realización de `sudo make install` no tuvo éxito.
Solución: compile correctamente el código, tutorial de compilación de código fuente haga [clic aquí](https://github.com/gxchain/gxb-core), si hay problemas en la compilación del código fuente, envíe los problemas en la página de github del código fuente.


## 6. El contrato de actualización provocó un error de serialización de tabla 

Motivo de error: el contrato de actualización elimina o modifica los campos de la tabla, lo que genera un error de serialización

Solución: actualizar el contrato para no modificar la tabla original, agregar nueva tabla necesita para asegurarse de que el orden de campo y el orden de serialización.
```cpp
struct packet {
    uint64_t                issuer;
    std::string             pub_key;
    contract_asset          total_amount;
    uint32_t                number;
    vector<int64_t>         subpackets;

    uint64_t primary_key() const { return issuer; }
    
    //El orden de serialización debe ser coherente con el orden de definición de campo
    GRAPHENE_SERIALIZE(packet, (issuer)(pub_key)(total_amount)(number)(subpackets))
};
```
