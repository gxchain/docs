# 三、接口定义

## 3.1 DES市场接口定义

### 3.1.1 账户绑定

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

### 3.1.2 发布类目（Internal）

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

### 3.1.3 发布产品

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
        "assetId":"1.3.1"
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

### 3.1.4 邀请/申请成为产品数据源

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

### 3.1.6 更新产品信息

```bash
POST /market/product/:productId/update
{
    "productName": "KYC认证",
    "logoImgBase64": "Base64.encode(imgByte)", //产品logo，需前端进行大小限制
    "briefDesc": "通过姓名、身份证号和自拍照验证是否一致",
    "price":{
        "amount":990000,
        "assetId":"1.3.1"
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

### 3.1.7 产品信息变更投票

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

### 3.1.8 产品列表
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
            "assetId":"1.3.1"
        }
    }]
}
```

### 3.1.9 产品详情

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
            "assetId":"1.3.1"
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

### 3.1.10 产品对应投票列表

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

### 3.1.11 产品投票详情

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
            "assetId":"1.3.1"
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
            "assetId":"1.3.1"
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

### 3.1.12 消费明细

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

### 3.1.13 数据查询

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

### 3.1.14 月度账单

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

### 3.1.15 月度账户信息

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

### 3.1.16 最近30天消费信息（7天截取使用）

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

### 3.1.17 账户总览信息

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
