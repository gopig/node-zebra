var FlashBufferWriter = require('node-zebra/net/FlashBufferWriter.js')
var uuid = require('node-zebra/system/collections/uuid.js')

var FlashProtocolReader = function(){
      this.flashBufferData;
      this.clientuser;
      /*
       * 初始化数据 buffer & clientuser
       */
	  this.initialize=function (user,data) {
          try{
                this.clientuser = user;
                this.flashBufferData=data;
                this.parseBufferData();
                this.execute();
            }catch(e){
               this.clientuser.offline();
            }
        }
      
        
      this.parseBufferData = function(){

        } 

      this.execute = function(){

        }

    }

module.exports = FlashProtocolReader;