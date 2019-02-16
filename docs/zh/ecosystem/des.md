# 数据交换服务(DES)
## 项目背景

在公信宝数据交易所1.0是全球首个落地的去中心化数据交易所，通过区块链技术实现了去中心化、可靠、可信的数据交易的完整流程，并引入数据源权益保护、数据版权存证、个人隐私保护、信用贡献证明\(POCS\)等机制，在对数据交易的流程优化后，完整交易流程可在500ms完成，数据交易的效率媲美于传统中心化交易方式。

在1.0版本正式上线以及商业化推进一段时间后，也发现了一些不足，主要体现在以下几个方面：
1. 接入方需要部署单独box，增加了架构复杂度
2. 大量广播操作在GXChain中进行，总区块大小增加较快，而很多广播的内容存储在区块中意义不大
3. 大量功能依赖于主链，主链升级频繁会造成节点管理者维护成本增加，而产品灵活性受限
3. 区块链节点和数据交易Box通过Websocket方式进行双向通信，单节点负载和稳定性比较难控制
4. 联盟市场数据交易中，接入方恶意数据造假问题

数据交易2.0版本的设计，将在保证去中心化、稳定、功能一致性的前提下，进一步简化数据交易的流程，提供更可靠、高效、稳定的服务，新的版本将带来以下特性：
1. SDK安装，http方式调用，减少架构复杂度
2. 提供单独的数据交换服务DES，减少链上广播，降低主链负载，减少区块大小
3. http方式调用，DES支持负载均衡，保证数据交易流程的稳定性
4. 引入BaaS服务，通过侧链来存证数据，提供存证和验证接口，通过存证、数据校验等方式来进一步提高数据造假难度，减少数据造假动机

## 数据交易2.0技术架构

### **2.1 架构图2-1**

![](./assets/architecture.jpg)

### **2.2 参与者说明**

* Merchant: 商户，即数据买方;

* DES\(Data Exchange Service\): 数据交换服务，提供预扣费、数据暂存等功能;

* Datasource: 数据源，即数据卖方;

### **2.3 过程描述**

![](./assets/flow.png)

下面描述一个数据交易的完整流程:

- 步骤1:【数据源】向DES注册服务
- 步骤2:【商户】调用_产品信息接口_
- 步骤3:【DES】返回产品信息以及在线数据源列表
- 步骤4:【商户】调用_交易创建接口_创建数据交易，指定查询数据源，并使用数据源public\_key对入参进行加密
- 步骤5:【DES】验证商户签名,验证余额是否充足,创建数据交易，生成唯一request\_id并返回
- 步骤6:【DES】带上商户发起数据交易消息，向指定数据源发送数据交易请求
- 步骤7:【数据源】接收请求，解密消息体，处理请求，使用买方public_key加密数据后回传DES
- 步骤8:【DES】拿到加密数据，存IPFS，调用代理记账
- 步骤9:【DES】数据和request\_id建立映射
- 步骤10:【商户】通过request\_id获取数据

## 1 DES市场接口定义

### 1.1 账户绑定

```bash
POST /market/account/bind
{
    "accountId":"1.2.11", //账户id
    "merchantId":14, //平台用户id
    "serviceUrl":"http://gxb.io/service", //数据源服务地址
    "timestamp":150918591212, //时间戳
    "signature":"Private.sign('1.2.11|14|http://gxb.io/service|150918591212')" //签名
}

{
    "code":1,
    "msg":"成功"
}
```

### 1.2 发布类目（Internal）

```bash
POST /market/category/create
{
    "categoryName":"普惠金融"
}

{
    "code":1,
    "msg":"成功",
    "data":{
        "categoryId": 1,
        "categoryName": "普惠金融"
    }
}
```

### 1.3 发布产品

```bash
POST /market/product/create
{
    "productName": "KYC认证",
    "logoImgBase64": "Base64.encode(imgByte)", //产品logo，需前端进行大小限制
    "brieDesc": "123",
    "voteThrehold":0.7, // 投票阈值，0.7代表70%投票通过则操作生效
    "categoryId": 1, // 类目
    "price": { // 价格
        "amount": 100000,
        "assetId":"1.1"
    },
    "privacy":false, // 是否涉及用户隐私
    "input":{ // 入参定义
        "name": {
            "type": "string",
            "desc": "姓名",
            "required":true,
            "sample": "张三"
        },
        "idcard": {
            "type": "string",
            "desc": "身份证号",
            "required":true,
            "sample": "330102128901016666"
        },
        "photo": {
            "type": "string",
            "desc": "自拍照base64",
            "required":true,
            "sample": "6Ieq5ouN54WnYmFzZTY0..."
        }
    },
    "output":{ // 出参定义
        "result": {
            "type": "boolean",
            "desc": "是否匹配",
            "sample": true
        }
    }
}

{
    "code":1,
    "msg":"成功"
}
```

### 1.4 邀请/申请成为产品数据源

> 验证逻辑：当前账号如果已经在产品members列表中，则为邀请成员加入，members中自动过滤已存在的成员；当前账号如果未在产品members列表中，则为申请加入，忽略members参数，发起申请加入的投票
>
> 通知逻辑：1. 邮件通知现有的members 2. 通知中心
>
> 更严格的限制：同一个账号不可多次发起相同的申请，连续被拒绝5次的账号将在3天内无法发起加入申请，被邀请的账号必须绑定过链上账户

```bash
POST /market/product/:productId/members/add
{
    "members":[14,15]
}

{
"code":1,
    "msg":"成功",
    "data":{
        "voteId":1,
        "expireAt":1501230180812, //过期时间 = timestamp + 2*24*3600 //2天内有效
    }
}
```

### 1.6 更新产品信息

```bash
POST /market/product/:productId/update
{
    "productName": "KYC认证",
    "logoImgBase64": "Base64.encode(imgByte)", //产品logo，需前端进行大小限制
    "briefDesc": "通过姓名、身份证号和自拍照验证是否一致",
    "price":{
        "amount":990000,
        "assetId":"1.1"
    },
    "categoryId": 1, // 类目
    "privacy":false, // 是否涉及用户隐私
    "input":{ // 入参定义
        "name": {
            "type": "string",
            "desc": "姓名",
            "sample": "张三"
        },
        "idcard": {
            "type": "string",
            "desc": "身份证号",
            "sample": "330102128901016666"
        },
        "photo": {
            "type": "string",
            "desc": "自拍照base64",
            "sample": "6Ieq5ouN54WnYmFzZTY0..."
        }
    },
    "output":{ // 出参定义
        "result": {
            "type": "boolean",
            "desc": "是否匹配",
            "sample": true
        }
    }
}

{
    "code":1,
    "msg":"成功",
    "data":{
        "voteId":1,
        "expireAt":1501230180812, //过期时间 = timestamp + 2*24*3600 //2天内有效
    }
}
```

### 1.7 产品信息变更投票

```bash
POST /market/product/vote
{
    "agree": 1, // 同意: 1, 不同意: 0
    "voteId": 1
}

{
    "code":1,
    "msg":"成功"
}
```

### 1.8 产品列表
> shareStatus=1为自由市场，0为联盟市场

```bash
GET /market/product/list/:categoryId/:shareStatus?page=1&limit=20
{
    "code":1,
    "msg":"成功",
    "total":15, //共15条记录
    "data":[{
        "productId":1,
        "productName":"KYC认证",
        "logoUrl": "https://des-developer-test.oss-cn-hangzhou.aliyuncs.com/product/logo/logo_20180627205612_L8Ky6BKr.png",
        "briefDesc": "通过姓名、身份证号和自拍照验证是否一致",
        "privacy":false, // 是否涉及用户隐私
        "price":{
            "amount":"990000",
            "assetId":"1.1"
        }
    }]
}
```

### 1.9 产品详情

```bash
GET /market/product/:productId

{
    "code":1,
    "msg":"成功",
    "data":{
        "productName": "KYC认证",
        "logoUrl": "https://des-developer-test.oss-cn-hangzhou.aliyuncs.com/product/logo/logo_20180627205612_L8Ky6BKr.png",
        "briefDesc": "通过姓名、身份证号和自拍照验证是否一致",
        "price":{
            "amount":"990000",
            "assetId":"1.1"
        },
        "categoryId": "1", // 类目
        "privacy":false, // 是否涉及用户隐私
        "input":{ // 入参定义
            "name": {
                "type": "string",
                "desc": "姓名",
                "sample": "张三"
            },
            "idcard": {
                "type": "string",
                "desc": "身份证号",
                "sample": "330102128901016666"
            },
            "photo": {
                "type": "string",
                "desc": "自拍照base64",
                "sample": "6Ieq5ouN54WnYmFzZTY0..."
            }
        },
        "output":{ // 出参定义
            "result": {
                "type": "boolean",
                "desc": "是否匹配",
                "sample": true
            }
        }
    }
}
```

### 1.10 产品对应投票列表

```bash
GET /market/product/<:productId>/votes/:type?page=1&limit=20 //productId为all则获取全部, type=0(未投票) 1(已通过) 2（已拒绝）

{
    "code":1,
    "msg":"成功",
    "total":25, //共25条记录
    "data":[{
        "voteId":1,
        "productId":1,
        "productName":"kyc认证",
        "createDate":"2018-03-12T12:23:10",//创建时间
        "status":"INPROGRESS" //INPROGRESS|PASS|REJECT 投票中|同意|拒绝
        "requester":14,//申请企业
        "type": "APPLY" //APPLY|ADD_MEMBER|UPDATE_PRODUCT 申请加入|邀请加入|更新产品
    }]
}
```

### 1.11 产品投票详情

```bash
GET /market/product/votes/:voteId

{
    "code":1,
    "msg":"成功",
    "data":<item>
}

// ============================ item可能结果枚举 ===============================

{
    "voteId":1,
    "productId":1,
    "status":"INPROGRESS" //INPROGRESS|PASS|REJECT
    "requester":14,
    "type": "APPLY", //申请加入
    "members":[{
        "merchantId":14,
        "authorizerName": "草虫", //法人姓名
        "merchantName": "杭州存信数据科技有限公司", //公司名称
        "logoUrl": "http://www.gxb.io/files/merchant/201610/11/1_yzXExf.jpg", //logo
        "merchantAddress": "https://gxb.io", // 公司网站
    }]
}

{
    "voteId":1,
    "productId":1,
    "requester":14,
    "type": "ADD_MEMBER", //邀请加入
    "members":[{
        "merchantId":16,
        "authorizerName": "草虫", //法人姓名
        "merchantName": "杭州存信数据科技有限公司", //公司名称
        "logoUrl": "http://www.gxb.io/files/merchant/201610/11/1_yzXExf.jpg", //logo
        "merchantAddress": "https://gxb.io", // 公司网站
        },{
        "merchantId":15,
        "authorizerName": "草虫", //法人姓名
        "merchantName": "杭州存信数据科技有限公司", //公司名称
        "logoUrl": "http://www.gxb.io/files/merchant/201610/11/1_yzXExf.jpg", //logo
        "merchantAddress": "https://gxb.io", // 公司网站
    }]
}

{
    "voteId":1,
    "productId":1,
    "requester":14,
    "type": "UPDATE_PRODUCT", // 更新产品
    "from":{
        "productName": "KYC认证",
        "briefDesc": "通过姓名、身份证号和自拍照验证是否一致",
        "price":{
            "amount":990000,
            "assetId":"1.1"
        },
        "categoryId": 1, // 类目
        "privacy":false, // 是否涉及用户隐私
        "input":{ // 入参定义
            "name": {
                "type": "string",
                "desc": "姓名",
                "required":true,
                "sample": "张三"
            },
            "idcard": {
                "type": "string",
                "desc": "身份证号",
                "required":true,
                "sample": "330102128901016666"
            },
            "photo": {
                "type": "string",
                "desc": "自拍照base64",
                "required":true,
                "sample": "6Ieq5ouN54WnYmFzZTY0..."
            }
        },
        "output":{ // 出参定义
            "result": {
                "type": "boolean",
                "desc": "是否匹配",
                "sample": true
            }
        }
    },
    "to":{
        "productName": "KYC认证",
        "briefDesc": "通过姓名、身份证号和自拍照验证是否一致",
        "price":{
            "amount":990000,
            "assetId":"1.1"
        },
        "categoryId": 1, // 类目
        "privacy":false, // 是否涉及用户隐私
        "input":{ // 入参定义
            "name": {
                "type": "string",
                "desc": "姓名",
                "required":true,
                "sample": "张三"
            },
            "idcard": {
                "type": "string",
                "desc": "身份证号",
                "required":true,
                "sample": "330102128901016666"
            },
            "photo": {
                "type": "string",
                "desc": "自拍照base64",
                "required":true,
                "sample": "6Ieq5ouN54WnYmFzZTY0..."
            }
        },
        "output":{ // 出参定义
            "result": {
                "type": "boolean",
                "desc": "是否匹配",
                "sample": true
            }
        }
    }
}
```

### 1.12 消费明细

```bash
GET /market/dataexchange/log?gmtCreatedFrom=2018-01-01&gmtCreatedTo=2018-01-02&productId=1&pageNo=1&pageSize=20

{
    "code": 1,
    "msg": "",
    "data": [{
        "id": 16,
        "requestId": "Qma2L9V1rVHBAMMSNLrqCRS1wicv7mhFWtou8JJDL5khCh", //请求 id
        "productId": 1, //消费项
        "productName": "学历信息1", //消费项
        "amount": 0, // 消费金额
        "gmtCreated": 1523416611000 //消费时间
    }],
    "total": null
}
```

### 1.13 数据查询

```bash
GET /market/dataexchange/detail?gmtCreatedFrom=2018-01-01&gmtCreatedTo=2018-01-02&toAccount=1.2.11&requestId=fb17941dce8dc78d6275b04afbb4a5202f7fd4defca4918cf21c913abe706d4e&txid=fb17941dce8dc78d6275b04afbb4a5202f7fd4defca4918cf21c913abe706d4e

{
    "code": 1,
    "msg": "",
    "data": [{
        "id": 16,
        "gmtCreated": 1523416611000, //日期
        "fromAccount": "1.2.19", //数据源账户
        "toAccount": "1.2.323", //发起账户
        "requestId": "Qma2L9V1rVHBAMMSNLrqCRS1wicv7mhFWtou8JJDL5khCh", //请求id
        "txid": "d150b067f5f740ef8e0c755a6ee1e462f63d4ecf" //交易id
    }],
    "total": null
}
```

### 1.14 月度账单

```bash
GET /market/bill/month?date=2018-05-01

{
    "code": 1,
    "msg": "",
    "data": {
        "code": 0,
        "msg": null,
        "data": [{
            "productId": 1, //消费项Id
            "productName": "学历信息1", //消费项
            "transferCount": 16, //月度调用次数
            "unitPrice": 0.001, //单价
            "consumeAmount": 0.016 //消费金额
        },{
            "productId": 2,
            "productName": "学历信息2", //消费项
            "transferCount": 1,
            "unitPrice": 1,
            "consumeAmount": 1
        }],
        "total": null
    },
    "total": null
}
```

### 1.15 月度账户信息

```bash
GET /market/bill/monthTotal?date=2018-05-01

{
    "code": 1,
    "msg": "",
    "data": {
        "date": null,
        "consumeAmount": 0.022, //消费总额
        "incomeAmount": 106.91608, //充值金额
        "transferCount": 3, //交易总数
        "balance": 0, // 账户余额
        "average": null
    },
    "total": null
}
```

### 1.16 最近30天消费信息（7天截取使用）

```bash
GET /market/bill/recent

#按照日期倒序展示
{
    "code": 1,
    "msg": "",
    "data": [{
            "date": 1527350400000,
            "consumeAmount": 0, // 消费总额
            "incomeAmount": 0, // 充值金额
            "transferCount": 0, // 交易次数
            "balance": null,
            "average": null
        },{
            "date": 1527264000000,
            "consumeAmount": 0,
            "incomeAmount": 0,
            "transferCount": 0,
            "balance": null,
            "average": null
    }],
    "total": null
}
```

### 1.17 账户总览信息

```bash
GET /market/bill/total

{
    "code": 1,
    "msg": "",
    "data": {
        "overview": {
            "date": null,
            "consumeAmount": 1.06, //消费总额
            "incomeAmount": null,
            "transferCount": null,
            "balance": 0, //账户余额
            "average": 0.02465 //日平均消费
        },
        "productList": [{
                "productId": 1, //消费项 id
                "productName": "学历信息1", //消费项
                "logoUrl": "https://des-developer-test.oss-cn-hangzhou.aliyuncs.com/product/logo/logo_20180627205612_L8Ky6BKr.png",
                "transferCount": 22, //总调用次数
                "unitPrice": 0.001, //单价
                "consumeAmount": 0.06 //消费总额
            },{
                "productId": 2,
                "productName": "学历信息2",
                "logoUrl": "https://des-developer-test.oss-cn-hangzhou.aliyuncs.com/product/logo/logo_20180627205612_L8Ky6BKr.png",
                "transferCount": 1,
                "unitPrice": 1,
                "consumeAmount": 1
        }]
    },
    "total": null
}
```

## 2 DES接口定义

### 2.1 数据源注册服务

数据源的sdk或者box启动的时候，向DES注册服务，声明在线

> 客户端需要30s发一次心跳，过期时间为50s，50s内未收到注册请求，则数据源状态变成离线

```bash
POST /api/datasource/heartbeat
{
    "account":"1.2.11",
    "products":[1,2],
    "timestamp":15089110248010, // 3秒内有效
    "signature":"d787ad8d787ad8d787ad8d787ad8d787ad8d787ad8d787ad8d787ad8d787ad8d787ad8d787ad8" // Private.sign("1.2.11|15089110248010")
}
```

### 2.2 查询数据产品信息

商户向DES查询数据产品信息

```bash
GET /api/product/:product_id
```

返回结果：

```bash
{
    "product": {
        "productId": 1,
        "productName": "KYC认证",
        "briefDesc": "123",
        "categoryId": 1,
        "price": {
            "amount": 100000,
            "asset_id":"1.1"
        },
        "datasources":["1.2.10","1.2.12","1.2.15","1.2.18"], // 联盟成员
        "issuer": 14, // 发行商户id
        "privacy":false, // 是否涉及用户隐私
        "input":{ // 入参定义
            "name": {
                "type": "string",
                "desc": "姓名",
                "required":true,
                "sample": "张三"
            },
            "idcard": {
                "type": "string",
                "desc": "身份证号",
                "required":true,
                "sample": "330102128901016666"
            },
            "photo": {
                "type": "string",
                "desc": "自拍照base64",
                "required":true,
                "sample": "6Ieq5ouN54WnYmFzZTY0..."
            }
        },
        "output":{ // 出参定义
            "result": {
                "type": "boolean",
                "desc": "是否匹配",
                "sample": true
            }
        }
    },
    "des":{
        "account_id":"1.2.17",
        "percent":10000
    },
    "onlineDatasources": [
        {"account_id":"1.2.10","publicKey":"GXC****"}
    ]
}
```

### 2.3 创建数据交易

商户发起数据交易请求

```bash
POST /api/request/create/:product_id/[/:version]
[{
    "params":"HUI712124DMOKF23F2G23H8FG1H8GH482GH34GH83H9KD1K0D1K0F10DQK0S0K1210E12E==", //加密请求参数数据包
    "nonce":150123121123123,
    "requestParams":{
        "from": "1.2.20", // 从该帐户转帐，转帐数量为amount
        "to": "1.2.11", // 转帐至该帐户, 数据源账户
        "proxy_account":"1.2.17", // 代理记帐方
        "percent":10000, // amount的百分比，转至proxy_account
        "amount": { //转帐数量
            "amount": 50000, // 同上面的fee
            "asset_id": "1.1"
        },
        "memo": "68b329da9893e34099c7d8ad5cb9c940", // 请求参数的MD5值
        "expiration": "2017-12-09T07:58:39", // 授权过期时间， 也是signatures的有效期，expiration < now + maximum_time_until_expiration
        "signatures": [
            "xxxx" // 调用方(授权方)用自己的私钥对request_params结构体进行签名
        ]
    }
}]
```

返回结果:

```bash
{
    "request_id":"f4d6d30fb9d33813e801869723cfe75d20380f71dca43079b72a9c580fd3732e"
}
```

### 2.4 查询数据交易状态

商户通过request\_id获取交易状态

```bash
GET /api/request/:request_id
```

返回结果:

```bash
{
    "status":"IN_PROGRESS", // IN_PROGRESS, FINISHED
    "total": 4, // 向4个数据源发起请求，应该有4条结果
    "datasources":[{
        "status":"SUCCESS", //SUCCESS, FAIL, NONE, TIMEOUT
        "comment": "余额不足",
        "datasource":"1.2.11", //数据源id
        "nonce":150123121123123,
        "data":"<encrypted_data>", //用商户公钥加密的数据
        "txid":"f4d6d30fb9d33813e801869723cfe75d20380f71dca43079b72a9c580fd3732e" // 交易id，可以通过区块浏览器进行查询
    }]
}
```

## 3 witness接口定义

witness增加代理记帐的操作proxy\_transfer, 由DES发起对应的交易广播

### 3.1 proxy\_transfer

```js
{
        "proxy_memo": "QmbTuAu2zM53Rj8rk8J2o7mCzHJr6vf8WdjYyiq5SNaDBF", // 由proxy_count 填写
        "fee": {  // 手续费，由proxy_account支付
          "amount": 166015, // int64_t
          "asset_id": "1.3.0"
        },
        "request_params": {  // 调用方(授权方)发起
          "from": "1.2.20",  // 从该帐户转帐，转帐数量为amount
          "to": "1.2.11",    // 转帐至该帐户
          "proxy_account":"1.2.17", // 代理记帐方
          "percent":10000,    // amount的百分比，转至proxy_account
          "amount": {    //转帐数量
            "amount": 50000,  // 同上面的fee
            "asset_id": "1.1"
          },
          "memo": "68b329da9893e34099c7d8ad5cb9c940", // string
          "expiration": "2017-12-09T07:58:39", // 授权过期时间， 也是signatures的有效期，expiration < now + maximum_time_until_expiration
          "signatures": [
            "xxxx" // 调用方(授权方)用自己的私钥对request_params结构体进行签名
          ]
        },
        "extensions": []
      }   "extensions": []
}
```

## 4 数据源接口定义

数据源应该遵循特定的接口定义，以响应由DES发起的数据交易请求

::: tip 规则
有数据返回http状态码200，无数据返回http状态码404
:::

### 4.1 数据源接口

推荐接口定义：

```
POST /data/request
```

入参：

```js
{
    "params" : "HUI712124DMOKF23F2G23H8FG1H8GH482GH34GH83H9KD1K0D1K0F10DQK0S0K1210E12E", //加密请求参数数据包
    "publicKey": "GXC7XzFVivuBtuc2rz3Efkb41JCN4KH7iENAx9rch9QkowEmc4UvV", // 请求方公钥
    "productId": 1, // 产品ID
}
```

出参（返回数据转成JSON String, 调用DESClient.encrypt\(jsonString\) 生成）：

```js
{
    "data": "HUI712124DMOKF23F2G23H8FG1H8GH482GH34GH83H9KD1K0D1K0F10DQK0S0K1210E12E" //加密返回数据包
}
```