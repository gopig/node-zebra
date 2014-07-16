var List = require('node-zebra/system/collections/List.js');
var ClientUser = require('node-zebra/server/s-user/ClientUser.js');
var protocolManager = require('node-zebra/server/protocol/ProtocolManager.js');



var ClientManager = function(jsonURL){
     this.pro =new protocolManager();
     this.pro.readConfig(jsonURL);
     this.userlist = new List();

    /*
    * 监听到新客户端联接，分配一个ClientUser对象
    * @socket socekt
    */
    this.listenerClientConnection = function (socket) {    
        var user = new ClientUser(this, socket);
        this.userlist.insert(user); 
    }

    this.find = function (value) {
        this.userlist.find(value);
    }

    this.removeClientUser = function (user) {
        this.userlist.remove(user);
        user.socket.end();
    }

    this.sendAllUser = function(bufferdata){
         this.userlist.each(function(user){
                        user.socket.write(bufferdata);
                      });
    }

    this.sendAllLoginUser = function(bufferdata){
        // var exceptUser=arguments[1]?arguments[1]:null;  //0可以替换成默认值
         this.userlist.each(function(user){
                            if(user.Islogin){
                                    //if(user!=exceptUser)
                                    user.socket.write(bufferdata);
                                }     
                      });
    }



}

module.exports = ClientManager;