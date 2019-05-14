# Full-node account history plugin tutorial

## 1. Overview

Since the `witness_node` program's own `account_history_plugin` plugin saves the account transaction history to the memory object, if you track all the chain accounts and record all the transaction records for each account, it will inevitably cause a huge memory overhead. In order to save the account transaction history of the whole node and reduce the node configuration requirements, refer to the `bitshares` ES plugin and use the `elastic_search` database to save all transaction records.

Plugin name: `elastic_search_plugin`

Database: `Elastic Search`

## 2. Compilation and startup

### 2.1 Compilation

#### 1. Install dependencies

include the plugin. To use the plugin, compile the `witness_node` program with the plugin as follows.

install libcurl
```bash
sudo apt-get install libcurl4-openssl-dev
```

#### 2. Open compile option, support leveldb plugin

Modify the `gxb-core/CMakeLists.txt` file as follows to enable compilation options

```cpp
set( LOAD_ELASTICSEARCH_PLUGIN 1) 
```

#### 3. Compile the witness_node program with plugins

Compile in Ubuntu environment: [Build Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)

Compile in MacOS environment: [Build OSX](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2.2 Start

#### 1. Create an account with a non-root account (Ubuntu)

Note: The `Elastic Search` database only runs under a non-root account.
``` bash
sudo useradd -m myaccount -d /home/myaccount -s /bin/bash
sudo passwd myaccount
```

#### 2. Install java
```bash
# 1.update
sudo apt-get update
# 2.install jre and jdk
sudo apt-get install default-jre
sudo apt-get install default-jdk
```
#### 3. Install elastic_search
```bash
# 1 download
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.2.0.zip

# 2 unpack 
unzip elasticsearch-6.2.0.zip
# If unzip is not installed, execute the following command:
sudo apt-get install unzip
```

#### 4. Start Elastic Search Database

```bash
#daemon mode
cd elasticsearch-6.2.0/
./bin/elasticsearch --daemonize
```

#### 5. Start fullnode plugin

Modify the `config.ini` file and start the `witness_node` program.

```json
# Plugin to save account history by elastic search database
load-elastic-search-plugin = true
```

#### 6. Verify that the plugin is working properly

In the default configuration, during the playback block process, the plugin sends every 5000 records to the Elastic Search database. You can use the following query to get the number of the database.

```bash
curl -X GET 'http://localhost:9200/gxchain/data/_count?pretty=true' -H 'Content-Type: application/json' -d '
{
	"query": {
		"bool": {
			"must": [{
				"match_all": {}
			}]
		}
	}
}
'
#Return the data, the structure is similar to the following:
{
  "count" : 58797397,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  }
}
```

## 3. Instructions for using the plugin

Through the plug-in query account transaction history data, you can query the syntax reference `Elastic Search` database through multiple types of query methods, [View Syntax](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/query-dsl-query-string-query.html)。

The following are some common query methods, examples are as follows:

### 3.1 Query transaction history via txid

```bash
curl -X GET 'http://localhost:9200/gxchain/data/_search?pretty=true' -H 'Content-Type: application/json' -d '
{
    "query" : {
        "bool" : { "must" : [{"term": { "block_data.trx_id": "f050d1956e365522a194e6514ff07336f8d371d8"}}] }
    }
}
'
{
  "took" : 67,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 15.578883,
    "hits" : [
      {
        "_index" : "gxchain",
        "_type" : "data",
        "_id" : "2.9.224",
        "_score" : 15.578883,
        "_source" : {
          "account_history" : {
            "id" : "2.9.224",
            "account" : "1.2.6",
            "operation_id" : "1.11.157",
            "sequence" : 3,
            "next" : "2.9.211"
          },
          "operation_history" : {
            "trx_in_block" : 0,
            "op_in_trx" : 0,
            "operation_result" : "[0,{}]",
            "virtual_op" : 202,
            "op" : "",
            "op_object" : {
              "fee" : {
                "amount" : 100000,
                "asset_id" : "1.3.0"
              },
              "account" : "1.2.6",
              "owner" : {
                "weight_threshold" : 1,
                "account_auths_str" : "[]",
                "address_auths_str" : "[]",
                "key_auths_str" : "[[\"GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV\",1]]"  #Note: The array types in all json structures are escaped as string types when stored, and you should be careful when recovering.
              },
              "active" : {
                "weight_threshold" : 1,
                "account_auths_str" : "[]",
                "address_auths_str" : "[]",
                "key_auths_str" : "[[\"GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV\",1]]"
              },
              "extensions" : { }
            }
          },
          "operation_type" : 6,
          "operation_id_num" : 157,
          "block_data" : {
            "block_num" : 472,
            "block_time" : "2017-06-10T14:19:42",
            "trx_id" : "f050d1956e365522a194e6514ff07336f8d371d8"
          }
        }
      }
    ]
  }
}
```

### 3.2 Query transaction history by account id
```bash
curl -X GET 'http://localhost:9200/gxchain/data/_search?pretty=true' -H 'Content-Type: application/json' -d '
{
	"query": {
		"bool": {
			"must": [{
				"term": {
					"account_history.account": "1.2.6"
				}
			}]
		}
	}
}
'
{
  "took" : 5062,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 3,
    "max_score" : 14.630579,
    "hits" : [
      {
        "_index" : "gxchain",
        "_type" : "data",
        "_id" : "2.9.106",
        "_score" : 14.630579,
        "_source" : {
          "account_history" : {
            "id" : "2.9.106",
            "account" : "1.2.6",
            "operation_id" : "1.11.54",
            "sequence" : 1,
            "next" : "2.9.0"
          },
          "operation_history" : {
            "trx_in_block" : 5,
            "op_in_trx" : 0,
            "operation_result" : "[0,{}]",
            "virtual_op" : 99,
            "op" : "",
            "op_object" : {
              "fee" : {
                "amount" : 100000,
                "asset_id" : "1.3.0"
              },
              "from" : "1.2.40",
              "to" : "1.2.6",
              "extensions_str" : "[]",
              "amount_" : {
                "amount" : 100000000,
                "asset_id" : "1.3.0"
              }
            }
          },
          "operation_type" : 0,
          "operation_id_num" : 54,
          "block_data" : {
            "block_num" : 128,
            "block_time" : "2017-06-10T13:58:54",
            "trx_id" : "5847aaf70a36bd76861690680fe0af36afc2b581"
          }
        }
      },
      {
        "_index" : "gxchain",
        "_type" : "data",
        "_id" : "2.9.211",
        "_score" : 14.630579,
        "_source" : {
          "account_history" : {
            "id" : "2.9.211",
            "account" : "1.2.6",
            "operation_id" : "1.11.144",
            "sequence" : 2,
            "next" : "2.9.106"
          },
          "operation_history" : {
            "trx_in_block" : 0,
            "op_in_trx" : 0,
            "operation_result" : "[0,{}]",
            "virtual_op" : 189,
            "op" : "",
            "op_object" : {
              "fee" : {
                "amount" : 2000000,
                "asset_id" : "1.3.0"
              },
              "witness" : "1.6.1",
              "witness_account" : "1.2.6",
              "new_signing_key" : "GXC6t45zFYbjiYxfx5CioTg2X2eSwUrUnViNKNK6wz5eQTf1wraaB"
            }
          },
          "operation_type" : 21,
          "operation_id_num" : 144,
          "block_data" : {
            "block_num" : 437,
            "block_time" : "2017-06-10T14:17:51",
            "trx_id" : "4a2ae40e84733aad18a15b30a301e421cc8775df"
          }
        }
      },
      {
        "_index" : "gxchain",
        "_type" : "data",
        "_id" : "2.9.224",
        "_score" : 14.630579,
        "_source" : {
          "account_history" : {
            "id" : "2.9.224",
            "account" : "1.2.6",
            "operation_id" : "1.11.157",
            "sequence" : 3,
            "next" : "2.9.211"
          },
          "operation_history" : {
            "trx_in_block" : 0,
            "op_in_trx" : 0,
            "operation_result" : "[0,{}]",
            "virtual_op" : 202,
            "op" : "",
            "op_object" : {
              "fee" : {
                "amount" : 100000,
                "asset_id" : "1.3.0"
              },
              "account" : "1.2.6",
              "owner" : {
                "weight_threshold" : 1,
                "account_auths_str" : "[]",
                "address_auths_str" : "[]",
                "key_auths_str" : "[[\"GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV\",1]]"
              },
              "active" : {
                "weight_threshold" : 1,
                "account_auths_str" : "[]",
                "address_auths_str" : "[]",
                "key_auths_str" : "[[\"GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV\",1]]"
              },
              "extensions" : { }
            }
          },
          "operation_type" : 6,
          "operation_id_num" : 157,
          "block_data" : {
            "block_num" : 472,
            "block_time" : "2017-06-10T14:19:42",
            "trx_id" : "f050d1956e365522a194e6514ff07336f8d371d8"
          }
        }
      }
    ]
  }
}
```
### 3.3 Query transaction history by operation type
```bash
curl -X GET 'http://localhost:9200/gxchain/data/_search?pretty=true' -H 'Content-Type: application/json' -d '
{
	"query": {
		"bool": {
			"must": [{
				"term": {
					"operation_type": "0"
				}
			}]
		}
	},
	"size":2
}
'
{
  "took" : 126,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 102418,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "gxchain",
        "_type" : "data",
        "_id" : "2.9.17829004",
        "_score" : 1.0,
        "_source" : {
          "account_history" : {
            "id" : "2.9.17829004",
            "account" : "1.2.7613",
            "operation_id" : "1.11.17788233",
            "sequence" : 4564,
            "next" : "2.9.17819488"
          },
          "operation_history" : {
            "trx_in_block" : 5,
            "op_in_trx" : 0,
            "operation_result" : "[0,{}]",
            "virtual_op" : 24891,
            "op" : "",
            "op_object" : {
              "fee" : {
                "amount" : 5000,
                "asset_id" : "1.3.1"
              },
              "from" : "1.2.14309",
              "to" : "1.2.7613",
              "extensions_str" : "[]",
              "amount_" : {
                "amount" : 19922140,
                "asset_id" : "1.3.1"
              }
            }
          },
          "operation_type" : 0,
          "operation_id_num" : 17788233,
          "block_data" : {
            "block_num" : 3783423,
            "block_time" : "2017-10-25T16:24:03",
            "trx_id" : "239031ae0478443b4004ece1c1fc2c4b41c25ff0"
          }
        }
      },
      {
        "_index" : "gxchain",
        "_type" : "data",
        "_id" : "2.9.17341967",
        "_score" : 1.0,
        "_source" : {
          "account_history" : {
            "id" : "2.9.17341967",
            "account" : "1.2.18193",
            "operation_id" : "1.11.17301275",
            "sequence" : 92,
            "next" : "2.9.17319315"
          },
          "operation_history" : {
            "trx_in_block" : 6,
            "op_in_trx" : 0,
            "operation_result" : "[0,{}]",
            "virtual_op" : 62221,
            "op" : "",
            "op_object" : {
              "fee" : {
                "amount" : 9493,
                "asset_id" : "1.3.1"
              },
              "from" : "1.2.7613",
              "to" : "1.2.18193",
              "memo" : {
                "from" : "GXC87jNEKkrZoCf6t4asJHnwnPNoakbaCSmp4uaxPcXZMS4f2BbNg",
                "to" : "GXC64zVLksmQTjNkDRBcqM7KKeNq6ETyZfnjcQmxeaSuV6WJoEgFu",
                "nonce" : "4757310066904077524",
                "message" : "f57507a6b0c9c3c07a6979e1ec9337ef"
              },
              "extensions_str" : "[]",
              "amount_" : {
                "amount" : 9796950,
                "asset_id" : "1.3.1"
              }
            }
          },
          "operation_type" : 0,
          "operation_id_num" : 17301275,
          "block_data" : {
            "block_num" : 3754450,
            "block_time" : "2017-10-24T15:53:21",
            "trx_id" : "1b8bf02f23dc72e99ebde50221072c5f3c3b145f"
          }
        }
      }
    ]
  }
}
```

