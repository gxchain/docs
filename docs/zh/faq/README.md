# FAQs

## witness_node启动常见问题

### 1. 如何判断witness_node在正常运行
   观察后台日志文件`trusted_node/logs/witness.log`,  如果日志持续在网络上接收区块，表示节点在正常运行, 如下
   ```
2018-08-23T07:10:39 th_a:invoke handle_block         handle_block ] Got block: #6939202 time: 2018-08-23T07:10:39 latency: 29 ms from: init6  irreversible: 6939194 (-8)		application.cpp:487
2018-08-23T07:10:42 th_a:invoke handle_block         handle_block ] Got block: #6939203 time: 2018-08-23T07:10:42 latency: 30 ms from: init4  irreversible: 6939195 (-8)		application.cpp:487
2018-08-23T07:10:45 th_a:invoke handle_block         handle_block ] Got block: #6939204 time: 2018-08-23T07:10:45 latency: 32 ms from: init0  irreversible: 6939195 (-9)		application.cpp:487
2018-08-23T07:10:48 th_a:invoke handle_block         handle_block ] Got block: #6939205 time: 2018-08-23T07:10:48 latency: 34 ms from: init5  irreversible: 6939197 (-8)		application.cpp:487
2018-08-23T07:10:51 th_a:invoke handle_block         handle_block ] Got block: #6939206 time: 2018-08-23T07:10:51 latency: 34 ms from: init1  irreversible: 6939198 (-8)		application.cpp:487
2018-08-23T07:10:54 th_a:invoke handle_block         handle_block ] Got block: #6939207 time: 2018-08-23T07:10:54 latency: 36 ms from: bob  irreversible: 6939199 (-8)			application.cpp:487
2018-08-23T07:10:57 th_a:invoke handle_block         handle_block ] Got block: #6939208 time: 2018-08-23T07:10:57 latency: 37 ms from: init1  irreversible: 6939200 (-8)		application.cpp:487
2018-08-23T07:11:00 th_a:invoke handle_block         handle_block ] Got block: #6939209 time: 2018-08-23T07:11:00 latency: 39 ms from: init7  irreversible: 6939200 (-9)		application.cpp:487
2018-08-23T07:11:03 th_a:invoke handle_block         handle_block ] Got block: #6939210 time: 2018-08-23T07:11:03 latency: 41 ms from: bao  irreversible: 6939201 (-9)			application.cpp:487
2018-08-23T07:11:06 th_a:invoke handle_block         handle_block ] Got block: #6939211 time: 2018-08-23T07:11:06 latency: 41 ms from: init8  irreversible: 6939202 (-9)		application.cpp:487
2018-08-23T07:11:09 th_a:invoke handle_block         handle_block ] Got block: #6939212 time: 2018-08-23T07:11:09 latency: 44 ms from: init2  irreversible: 6939203 (-9)		application.cpp:487
2018-08-23T07:11:12 th_a:invoke handle_block         handle_block ] Got block: #6939213 time: 2018-08-23T07:11:12 latency: 45 ms from: init4  irreversible: 6939204 (-9)
   ```
### 2. 块同步时报错
   观察后台日志文件`trusted_node/logs/witness.log`,  如果日志持续报错，如`"unlinkable block", "block does not link to known chain"`，这是区块同步出错了。

   解决方法：
   * 区块同步异常，有可能本地的区块链文件坏掉了。需要停止witness\_node程序，然后删除trusted\_node， 重新启动witness\_node。
   * 或者不需要删除trusted\_node目录，启动命令加上参数`--resync-blockchain`， 会重新同步区块。
### 3. 如何正常关闭witness\_node
   witness_node将所有数据以对象的形式保存在内存，程序正常退出时，会将内存中的数据写入到磁盘，所以不能强行kill掉进程，否则内存数据库会坏掉。
   * 如果witness\_node没有后台运行，则执行一次Ctrl + C,  然后等待程序保存内存数据后自动退出。
   * 如果witness\_node运行在后台， 执行`kill -s SIGINT $(pgrep witness_node)`，等待程序保存内存数据后自动退出。不能使用kill -9， 否则下次启动会重建索引，启动比较慢。
### 4. witness_node进程正常，但不从网络接收区块
   * 检查后台日志文件, 发现无报错信息, 并且节点没有从网络中接收新区块。此时可能是你的witness_node版本比较低，请及时访问[github release 页面](https://github.com/gxchain/gxb-core/releases/latest) 下载最新的程序包。
   * 可以通过-v参数，查看witness_node版本号 :
   ```
$./programs/witness_node/witness_node -v
Version: 1.0.180713-379-g4c9a2f4
SHA: 4c9a2f4e168503abe3ce1432c699f88b8babe356
Timestamp: 4 hours ago
SSL: OpenSSL 1.0.2o  27 Mar 2018
Boost: 1.67
Websocket++: 0.7.0
   ```
### 5.BP使用什么操作系统，对硬件包括带宽有什么要求
   * ubuntu 14.04 64位系统
   * 4核32G内存200G硬盘，50MB+带宽，按流量计费，双机灾备
   * 可以使用云服务器

### 6. witness_node启动时，报端口错误
   检查服务器上是不是启动了多个witness_node, 导致端口冲突。
```
ps xf | grep witness_node
```


