var path = require('path'); 
var fs = require('fs');
var nodejsUtil = require("util");
var utiltool = require("node-zebra/util/Util.js");
var events = require("events");//EventEmitter通过events模块来访问
var MathHelper = require('node-zebra/util/MathHelper.js')
var ColorHelper = require('node-zebra/util/ColorHelper.js')
var log4js = require('log4js/log4js.js');

var Framework=function(){
	var _THIS= this;
	//this.async = require('async');
	//this.task = this.async;
	this.rootDir =process.cwd();
	this.config = null;
	this.encode='utf8';
    this.mathHelper = new MathHelper();
    this.colorHelper = new ColorHelper();
	this.logger = log4js.getLogger();
 
	events.EventEmitter.call(this);

    /***********************************************************************/
    //设置MySQL数据库连接
    var _mysql = require('mysql');
    var config = require('node-zebra/config/zebra-config.json'); 

    this.MySQL = _mysql.createConnection({
            host     : config.mysql.host,
            user     : config.mysql.user,
            password : config.mysql.password,
            database : config.mysql.database
        });
   
    /***********************************************************************/
	 
    this.initialize=function(){}

	/*********************************************************************/
	/*
	*  动态创建类
	*/
	this.loadClass=function (classname,filepath) {
	 	try{
		   eval("var {0} = require(path.normalize(this.rootDir+'/{1}'));".format(classname,filepath));
		   return eval("new {0}()".format(classname));
		}catch(e){
		   console.log("动态分配类错误:{0} ".format(classname));
		   return null;
		}
	}


	this.import=function(packClassname){
		  var packname= packClassname.split(".");
		  var  path="";
		  var classname;
		  for (var i = 0; i < packname.length; i++) {
		  	    
		  	    if(i==packname.length-1){
					path += packname[i]+".js";
					classname = packname[i];
		  	    }else{
		  	    	path +=packname[i]+"/"
		  	    }
		  };
		    eval("var {0} = require('{1}');".format(classname,path));
		   return eval("new {0}()".format(classname));
              
          //return this.loadClass(classname,path);
	}


	/*
	* 动态解析协议*
	*/
	this.protocolReader=function(clientuser,data){
		/*if(data.mainId==null || data.childId==null) {
			throw "传入的协议数据有问题,可能不是FlashBufferReader";
		}
		console.log(data.mainId);
		console.log(data.childId);*/
	 	var cls = this.import("ZebraGame.protocol.{0}".format());
	 	if(cls!=null)
	 		cls.initialize(clientuser,data);
	 	else
	 		console.log("ProtocolReader Error {0}-{1}".format(mainId,childId));
	}



 	this.getType = function (o)
        {
          var _t; 
          return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
          /*
                    getType("abc")：string
                    getType(true)：boolean
                    getType(123)：number
                    getType([])：array
                    getType({})：object
                    getType(function(){})：function
                    getType(new Date())：date
                    getType(/\d/)：regexp
                    getType(null)：null
          */
        }

 
}


module.exports = Framework;
global.Framework = new Framework();

console.log("初始化框架，>>>>>>>>>>>>>>>>>>>>>");