
var Util = require("node-zebra/util/Util.js");

var List= function(){
	var util = new Util();

	var source=[];

    this.sources = source;

	this.getLength=function(){
		return source.length;
	};


    /*
     *  插入数据
     */
	this.insert=function(value){
		source.push(value)
	}

    
    /*
     *  遍历数据
     */
	this.each=function(fn){
		for (var i = 0; i < source.length; i++) {
			 if(fn(source[i]))break;
		};
	}

    /*
     * 移除数据
     */
	this.remove=function(value){
		for (var i = 0; i < source.length; i++) {
			if(source[i]==value){
			 source.splice(i,1);
			 break;
			}
		}
	}

    /*
     *  移除数据根据过滤条件
     */
	this.removefind=function(filterObject){
		for (var i=source.length; i>0 ; i--) {
			if(util.filter(source[i-1],filterObject)){
				source.splice(i-1,1);
			}
		}
	}


     /*
     *  查找数据根据过滤条件
     */
	this.find=function(filterObject){
		if(filterObject==null) return source;
		var data=[]; 
		for (var i=source.length; i>0 ; i--) {
			if(util.filter(source[i-1],filterObject)){
				data.push(source[i-1]);
			}
		}
		return data;
	}

    /*
     * 查找到第一条记录
     */
	this.findFirsetOne=function(filterObject){
		var data = this.find(filterObject);
		if(data.length>0)return data[0];
		return null;
	}
    
    /*
     * 查找到最后一条记录
     */
	this.findLastOne=function(filterObject){
		var data = this.find(filterObject);
		if(data.length>0)return data[data.length-1];
		return null;
	}

	/*
	*更新数据符合过滤条件的
	*/
	this.update=function(filterObject,value){
		if(value==null || filterObject==null)return;
		var arr=this.find(filterObject)
		for (var i = 0; i < arr.length; i++) {
			for(var item in value){
				if(arr[i].hasOwnProperty(item)){
					arr[i][item] = value[item]
				}
			}
		};
	}

	/*
	* 更新第一条数据符合过滤条件的
	*/
	this.updateOne=function(filterObject,value){
		if(value==null || filterObject==null)return;
		var data=this.findOne(filterObject)
		if(data!=null){
			for(var item in value){
				if(data.hasOwnProperty(item)){
					data[item] = value[item]
					}
			}
		}
	}

    /*
	* 更新最后一条数据符合过滤条件的
	*/
	this.updateLastOne=function(filterObject,value){
		if(value==null || filterObject==null)return;
		var data=this.findLastOne(filterObject)
		if(data!=null){
			for(var item in value){
				if(data.hasOwnProperty(item)){
					data[item] = value[item]
					}
			}
		}
	}


}

module.exports = List;