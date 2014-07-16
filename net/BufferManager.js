var util = require("util");
var events = require("events");//EventEmitter通过events模块来访问
var BufferReader=require('./BufferReader.js');

/**
*   Socket Buffer管理类
*   @headlegnth  设置包头长度
*/
var BufferManager = function (headlength) {
    events.EventEmitter.call(this);
   
    //this.writePostion = 0;
   //this.readPostion = 0;
    var _endian = 'B';
    var _headLength ;
    var _self = this;
    var _serverBuffer= new Buffer(0);
    var _timerID =null;
    var _timerInterval = 0;
    /***************************************************************/
         if(headlength==null)
           _headLength=4;
           else
           _headLength = headlength;

    /***************************************************************/
    //接受数据
    this.receive = function (buffer) {
        try{
               if(buffer.length>0){
                   _serverBuffer =  Buffer.concat([_serverBuffer,buffer]);
                    //Framework.logger.debug("接受到数据:"+_serverBuffer.length);
                   _self.startSendBuffer();
               }
        }catch(e){
             //未规定协议处理
              console.log(e);
             this.emit("error", e);//解析错误[列:未规定的协议],抛出一个error事件。
        }
    }
 
    /*
     * 解析数据给客户端
     */
    this.parseBufferDataToClient = function(){
             if(_serverBuffer.length==0){
                  _self.stopSendBuffer();
                 }else{
                  //Framework.logger.debug("包的数据位置长度:"+_serverBuffer.length+"   "+getPackBodyLength(_serverBuffer));
                  var bufferCount = _serverBuffer.length;
                  var packBodyLen = getPackBodyLength(_serverBuffer);
                     if (bufferCount >= packBodyLen) {                        
                            var sendClientBuffer = new Buffer(packBodyLen);
                                _serverBuffer.copy(sendClientBuffer,0,0,packBodyLen);
                                _self.emit("data",  new BufferReader(sendClientBuffer));
                                _serverBuffer = _serverBuffer.slice(packBodyLen,bufferCount);
                               //Framework.logger.debug("结束后长度:"+_serverBuffer.length);
                    }
               }
        }
    
    /*
     * 开始发送字节到客户端
     */
    this.startSendBuffer = function(){
             if(_timerID==null){
                _timerID = setInterval(this.parseBufferDataToClient,_timerInterval);
             }
        }
    /*
     * 停止发送字节到客户端
     */
    this.stopSendBuffer = function(){
              clearInterval(_timerID);
              _timerID = null;
        }

    /*
    * 获得包体长度
    * @buffer
    */
    var getPackBodyLength = function (buffer) {
        var value;
        switch (_endian) {
            case "B":
                value = buffer.readUInt32BE(0);
                break;
            case "L":
                value = buffer.readUInt32LE(0);
                break;
        }
        return value;
    }
}

util.inherits(BufferManager, events.EventEmitter);
module.exports = BufferManager;