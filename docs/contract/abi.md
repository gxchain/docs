
# Abi Parsing

The abi file is the external interface that calls the smart contract action. It defines the parameters of the action and the fields of the table. (Note: there is no abi file to call the action in the contract, just need to modify the wallet client). When we call the action normally, the action call fails because of the lack of certain items in the abi file. Therefore, this section of the tutorial parses the abi file. When you encounter an abi file error during the development of the contract, you can also locate the cause of the problem.

he abi file mainly contains four important fields: types、structs、actions、tables。
![](./png/abi.jpg)

## types

The types field defines a custom alias for the type during contract development, for example:
```cpp
// The contract has the following definition
typedef std::string mystring;
// @abi action
void appyourcom(mystring comname,std::string compub);
...

// The generated abi is defined as follows
"types": [{
	"new_type_name": "mystring",
	"type": "string"
	}
],
```

## structs

The structs field defines the table name, the type of the field it contains, the name of the action, and the type of the parameter it contains.

```json
"structs": [{
	.......
	{
	  "name": "record",
	  "base": "",
	  "fields": [{
	      "name": "packet_issuer",
	      "type": "uint64"
	    },{
	      "name": "accounts",
	      "type": "account[]"
	    }
	  ]
	},{
	  "name": "issue",
	  "base": "",
	  "fields": [{
	      "name": "pubkey",
	      "type": "string"
	    },{
	      "name": "number",
	      "type": "uint64"
	    }
	  ]
	}
	......
}
```

## actions

The actions field includes the defined external interface name, type (same name), payable (bool type, whether the action is attached to the asset)

```json
"actions": [{
	"name": "issue",
	"type": "issue",
	"payable": true
},
.....
{
	"name": "close",
	"type": "close",
	"payable": false
}
],
```

## tables

The table field includes the defined multi-index table, name (table name), index_type (primary key index type, i64), key_names (primary key member name), key_types (primary key member type), type (table name)

```json
"tables": [{
	"name": "packet",
	"index_type": "i64",
	"key_names": [
		"issuer"
	],
	"key_types": [
		"uint64"
	],
	"type": "packet"
	}
	.....
],
```