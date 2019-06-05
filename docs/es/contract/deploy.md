# Compilación implementación y invocación del contrato

##  Enfoque IDE de contrato inteligente

### 1. Cuenta registrada

Prueba de acceso [monedero en línea](https://testnet.wallet.gxchain.org/#/), registrar cuenta de billetera

### 2. Reclamar token de prueba

Se completa el registro, el navegador a `https://testnet.gxchain.org/gxc/get_token?Your_account_name` reclama la moneda de prueba. Reemplace your_account_name por el nombre de la cuenta de red de prueba.

### 3. Descarga IDE

Con el IDE de contrato inteligente, puede escribir, compilar, implementar e invocar contratos inteligentes.   [Haga clic para descargar](https://github.com/gxchain/gxchain-alpha/releases/latest)


### 4. Importar cuenta


Vaya a la [billetera en línea](https://testnet.wallet.gxchain.org/#/)) en el paso 1 para encontrar su clave privada para los permisos activos


![](../advanced/assets/ide/queryPvk.png)

![](../advanced/assets/ide/queryPvk2.png)

Vuelva a abrir el cliente, escriba la página Configuración e importe la cuenta


::: warning Nota
La contraseña no se cargará en el servidor. Si lo olvidas, debes quitar la cuenta y volver a importarla
:::

![](../advanced/assets/ide/import.png)

### 5. Selección de formulario

![](../advanced/assets/ide/addProject.png)

### 6. Compilación

![](../advanced/assets/ide/compile.png)

### 7. Implementación

La billetera debe desbloquearse antes de la implementación


![](../advanced/assets/ide/deploy.png)

![](../advanced/assets/ide/deploy2.png)

### 8. Invocación

Al igual que con la implementación, debe desbloquear la billetera primero

![](../advanced/assets/ide/call.png)

![](../advanced/assets/ide/call2.png)

## El modo de línea de comandos local

### 1. GXChain compilación de código fuente

Si no desea usar un IDE de contrato inteligente, o desea crear un entorno de compilación más estable y confiable; El programa GXChain puede compilarse localmente, compilarse, implementarse e invocarse mediante el contrato inteligente de la línea de comandos; GXChain compilación de código fuente, actualmente son compatibles con el sistema Ubuntu y el sistema MAC:

- [Build on Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)
- [Build on OS X](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2. Utilice plantillas para crear contratos

Cree un contrato HelloWorld utilizando la plantilla de GXX 

```bash
gxx -n helloworld
```

### 3. Compilar el contrato para generar el wast y abi

Compile el contrato para generar archivos wast y wasm 

```bash
gxx -o helloworld/helloworld.wast helloworld/helloworld.cpp
```
Generar un archivo abi

```bash
gxx -g helloworld/helloworld.abi helloworld/helloworld.cpp
```

### 4. Implementación de contrato

Debe abrir cli_wallet para conectarse a un nodo local o a un nodo testnet remoto

```bash
./programs/cli_wallet/cli_wallet -swss://testnet.gxchain.org --chain-id c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4
```

Importe la clave privada de la billetera 

```bash
# # Si se trata de una nueva billetera, es necesario establecer una contraseña de desbloqueo, aquí es mylocalpassword

new >>> set_password mylocalpassword

# Desbloquear
locked >>> unlock mylocalpassword

# Importe la clave privada de la billetera
unlocked >>> import_key your_account_name your_private_key

# El nombre de la cuenta de monedero iniciada es your_accoutn_name. 0 y 0 son vm type y vm version, ./HelloWorld es la ruta de acceso al archivo wast/abi, GXC es el tipo de activo de cuota y true es el broadcast de inicio
unlocked >>> deploy_contract helloworld your_account_name 0 0 ./helloworld GXC true
```

### 5. Invocación de contrato
Después de que el contrato de implementación se realiza correctamente, el contrato se puede invocar mediante la interfaz call_contract


```bash
unlocked >>> call_contract nathan helloworld null hi "{\"user\":\"zhuliting\"}" GXC true
```

### 6. Actualización el contrato

```bash
unlocked >>> update_contract hello120301 zhao-123 /Users/zhaoxiangfei/code/contracts_work/example_contract_02/helloworld GXC true
```






