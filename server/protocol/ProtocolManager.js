var List = require('node-zebra/system/collections/List.js');


var ProtocolManager = function(){
       this.rootDir =process.cwd();
       var prolist = new List(); 

       /*
        * 读取配置协议的文件
        */
       this.readConfig = function(jsonURL){
                //var proData=require(this.rootDir+"/"+jsonURL);
                var proData=require(jsonURL);
                for(var i=0;i<proData.data.length;i++){
                       prolist.insert(proData.data[i]);
                    }
             } 
        
       this.getClassFile = function(clientuser,flashbuffer){
                   	/*var filterdata:Object = {
								//age: { ">=":5, "<=":10 },
								age:[5,7], 
								name:{"like":"_"}
								 // columnName:{"=":1} 
				                }*/

           	    var filterdata = {
					 command:[flashbuffer.mainId+"-"+flashbuffer.childId]
				       } 
         
                    var data = prolist.findFirsetOne(filterdata);
                    if(data==null){
                            console.log("无效客户端数据");
                            clientuser.offline();
                           }else{
   
                        	   var cls = Framework.import(data.class);
                                    if(cls!=null)
                                        cls.initialize(clientuser,flashbuffer);
                                     else
                                        console.log("协议出错 {0}-{1}".format(flashbuffer.mainId,flashbuffer.childId));
                           }
             }        
    }

module.exports = ProtocolManager;
