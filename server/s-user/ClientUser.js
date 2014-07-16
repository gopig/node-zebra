//var FlashBufferWriter=require('./jZebra/net/FlashBufferWriter.js');
var BufferReader=require('node-zebra/net/BufferReader.js'); 
var FlashBufferReader=require('node-zebra/net/FlashBufferReader.js'); 
var FlashBufferWriter=require('node-zebra/net/FlashBufferWriter.js'); 
var BufferManager=require('node-zebra/net/BufferManager.js');
var Client = require('node-zebra/server/s-user/ClientManager.js');
var uuid = require('node-zebra/system/collections/uuid.js')
var userVO = require('node-zebra/server/s-user/UserVO.js')
var util = require("util");
/*
*  用户类
*  @clients  管理类
*  @socket   socket对象
*/
var ClientUser = function (clientManager, socket) {
    
    userVO.call(this,clientManager, socket);

    var _bufferManager = new BufferManager(4);
    var _this = this;
    


    //处理客户端数据
    /***************************************************************/
     socket.on('data', function (bytes) {
        var isBuffer = Buffer.isBuffer(bytes);
        if (isBuffer) {            
                   _bufferManager.receive(bytes);
             }
     });
  


    socket.on('close', function (bytes) { 
        console.log('socket close:' +  _this.id);

        _this.clientManager.removeClientUser(_this)

        //登录上来的用户离线派发给所有用户
        /*if(_this.Islogin){
        var offlineBuffer = new FlashBufferWriter();
            offlineBuffer.writeString(_this.id);
           _this.clientManager.sendAllUser(offlineBuffer.pack(0,3))
        }*/

        console.log('还有{0}人在线'.format(_this.clientManager.userlist.getLength()));
     });

    //数据错误事件
    socket.on('error', function (exception) {
        console.log('socket error:' + exception);
        socket.end();
     });

    _bufferManager.on('data', function (dataReader) {
             var reader = new FlashBufferReader(dataReader);
             _this.clientManager.pro.getClassFile(_this,reader);          
     });

    _bufferManager.on('error', function (data) {
           console.log("未规定的协议");
     })

    /*
     *向该用户发送数据
     */
    this.send=function(data){
           if(this.socket!=null){
                 this.socket.write(data);
              }
        }
    
    /*
     * 用户离线
     */
    this.offline= function(){
           this.clientManager.removeClientUser(this);        
        }
    /***************************************************************/

}

util.inherits(ClientUser, userVO);
module.exports = ClientUser;