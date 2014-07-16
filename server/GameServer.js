var net = require('net');  
var ClientManager = require('node-zebra/server/s-user/ClientManager.js');

var FlashBufferReader=require('node-zebra/net/FlashBufferReader.js'); 
var FlashBufferWriter=require('node-zebra/net/FlashBufferWriter.js'); 


var GameServer = function () {
    
    
    /*
    *用户客户端管理
    */
    this.clientManager 
    var server;
    var _this = this;

    //启动游戏服务器 
    this.start = function (ip, port) {
         server = net.createServer(listenerClientConnection);
         server.listen(port, ip);
         console.log("[服务器启动] IP:" + ip + "   Port:" + port);
    }

    this.startMySql =function(){
         Framework.MySQL.connect();
    }

    /*
     *  加载协议配置 json数据格式
     */
    this.loadProtocolData = function(jsonURL){
          this.clientManager = new ClientManager(jsonURL);
       }

    /*
     *  关闭服务器
     */
    this.stop = function () {
        server.close();
    }


/*
 * 
 * socket工作原理如下，以socket到10000端口为例：
1、AS3会首先尝试指定服务器的843端口是否开启，如果开启会进行连接进入步骤2，如果不成功进入步骤4
2、连接成功后，服务端需要发送安全配置文件，配置文件内容如下
<?xml version="1.0"?>
<cross-domain-policy>
 <allow-access-from domain="*" to-ports="*"/>
</cross-domain-policy>
使用utf-8编码发送，接收成功进入步骤3，失败进入步骤5
3、当as3接收到安全配置文件后，断开当前端口，尝试连接10000端口，连接启动成功
4、当843端口未开启，连接会直接10000端口。进入步骤2
5、安全配置文件接收失败抛出SecurityError
 */
    /**
    *  监听客户端联机
    *  @socket
    */
    var listenerClientConnection = function (socket) {
            socket.once('data', function (bytes) {
                    try{
                    var data =  bytes.toString("utf8", 0, bytes.length);
                    if ( data.indexOf('<policy-file-request/>') != -1){
                         //console.log("Flash 策略文件接入")
                         socket.write('<cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>');
                         socket.end();
                        }else{
                             console.log("[SERVER] 新客户端联机");
                             _this.clientManager.listenerClientConnection(socket);
                         }
                    }catch(e){
                        socket.end();
                    }
             });
    }
}

module.exports = GameServer;

