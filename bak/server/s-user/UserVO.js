var Client = require('node-zebra/server/s-user/ClientManager.js');
var uuid = require('node-zebra/system/collections/uuid.js'); 

/*
*  用户类
*  @clients  管理类
*  @socket   socket对象
*/
var  UserVO = function (clientManager, socket) { 
    this.clientManager = clientManager;
    this.socket = socket;
    this.Islogin = false; 
    this.id = uuid.v4();
    this.width=0;
    this.height =0;
    this.ip="0.0.0.0"
    this.isEditor=0;
    this.osName="";
};

module.exports = UserVO;
 