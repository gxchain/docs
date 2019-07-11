# 全节点账户历史插件使用教程

## 1. 插件概述

由于`witness_node`程序自身的`account_history_plugin`插件将账户交易历史保存到内存对象中，如果跟踪所有链上账户，并记录每个账户的所有交易记录，必然会造成极大的内存开销。为了保存全节点的账户交易历史，并降低节点配置要求，参考`bitshares`的ES插件，采用`elastic_search`数据库来保存所有交易记录。

插件名：`elastic_search_plugin`

数据库：`Elastic Search`

所需最低配置：

| 网络 | 内存 | 磁盘 |
| :--- | :--- | :-- |
| 主网 | 32G | 1T |
| 测试网 | 16G | 500G |

## 2. 插件的编译与启动

### 2.1 编译插件

#### 1. 安装依赖

默认发布的release程序，并未包含该插件。如需使用该插件，请按照如下步骤编译带插件的`witness_node`程序。

安装libcurl库
```bash
sudo apt-get install libcurl4-openssl-dev
```

#### 2. 开启编译选项

按如下方式修改`gxb-core/CMakeLists.txt`文件，开启编译选项

```cpp
set( LOAD_ELASTICSEARCH_PLUGIN 1) 
```

#### 3. 编译带插件的witness_node程序

在Ubuntu环境下编译：[Build Ubuntu](https://github.com/gxchain/gxb-core/wiki/BUILD_UBUNTU)

在MacOS环境下编译：[Build OSX](https://github.com/gxchain/gxb-core/wiki/BUILD_OS_X)

### 2.2 启动插件

#### 1. 创建账户，使用非root账户(Ubuntu)

注：`Elastic Search`数据库只运行在非root账户下
``` bash
sudo useradd -m myaccount -d /home/myaccount -s /bin/bash
sudo passwd myaccount
```

#### 2. 安装java
```bash
# 1.执行
sudo apt-get update
# 2.下载jre和jdk
sudo apt-get install default-jre
sudo apt-get install default-jdk
```
#### 3. 安装elastic_search
```bash
# 1 elasticsearch插件只能在非root账户下运行，切换到myaccount账户
su myaccount
# 2 下载安装包
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.2.0.zip
# 3 解压安装包
unzip elasticsearch-6.2.0.zip
```
::: warning 提示
如果未安装unzip，请切换到root账户下安装

`sudo apt-get install unzip`
:::

#### 4. 配置Elastic Search数据库

修改`total heap space`大小
```bash
vim ./elasticsearch-6.2.0/config/jvm.options
#修改前:
-Xms1g
-Xmx1g
#修改后:
-Xms8g
-Xmx8g
```

#### 5. 启动Elastic Search数据库

```bash
#后台模式启动
cd elasticsearch-6.2.0/
./bin/elasticsearch --daemonize
```

#### 6. 查看Elastic Search数据库日志

```bash
tail -f ./logs/elasticsearch.log
```

#### 7. 配置并启动全节点插件

elastic_search插件支持多项参数配置

```json
# Elastic Search database node url(http://localhost:9200/)
# elasticsearch-node-url =

# Number of bulk documents to index on replay(10000)
# elasticsearch-bulk-replay =

# Number of bulk documents to index on a syncronied chain(100)
# elasticsearch-bulk-sync =

# Pass basic auth to elasticsearch database('')
# elasticsearch-basic-auth =

# Add a prefix to the index(gxchain)
# elasticsearch-index-prefix =

# Save operation as object(true)
# elasticsearch-operation-object =

# Start doing ES job after block(0)
# elasticsearch-start-es-after-block = 

# Maximum number of operations per account will be kept in memory
elasticsearch-max-ops-per-account = 1000
```

启动`witness_node`程序时，添加`plugins`参数，参数如下：

```bash
--plugins "witness elastic_search data_transaction"
```

#### 8. 验证插件是否正常工作

默认配置情况下，在重放区块过程中，插件每5000条记录，发送到Elastic Search数据库中，可以使用如下查询语句，获取数据库中的条数。

```bash
curl -X GET 'http://localhost:9200/gxchain*/data/_count?pretty=true' -H 'Content-Type: application/json' -d '
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
#返回数据，结构类似如下：
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

## 3. 插件的使用说明

通过插件查询账户交易历史数据，可以通过多种类型的查询方式，查询语法参考`Elastic Search`数据库，[查看语法](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/query-dsl-query-string-query.html)。

以下为一些常用查询方式，举例如下：

### 3.1 通过txid查询交易历史

```bash
curl -X GET 'http://localhost:9200/gxchain*/data/_search?pretty=true' -H 'Content-Type: application/json' -d '
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
                "key_auths_str" : "[[\"GXC6cdTzGgTLv7VohhT76o82WmZmTwvijrkr5hJ3k8G2dEREee6wV\",1]]"  #注：所有json结构中的数组类型，在储存时，均被转义为了string类型，在恢复时注意。
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

### 3.2 通过账户id查询交易历史
```bash
curl -X GET 'http://localhost:9200/gxchain*/data/_search?pretty=true' -H 'Content-Type: application/json' -d '
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
### 3.3 通过operation类型查询交易历史
```bash
curl -X GET 'http://localhost:9200/gxchain*/data/_search?pretty=true' -H 'Content-Type: application/json' -d '
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

