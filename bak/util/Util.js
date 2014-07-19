var Util=function(){


        //判断是否是数组的函数
		var isArray= function (obj) {
		   return obj instanceof Array;
		};

		/*var filterdata:Object = {
								//age: { ">=":5, "<=":10 },
								age:[5,7], 
								name:{"like":"_"}
								 // columnName:{"=":1} 
				                }*/
		/**
		 * 根据条件判断数据
		 * @param	resource
		 * @param   filterdata
		 * @return
		 */
		 this.filter = function(resource,filterdata) {
		 	if(resource==null || filterdata==null)return false;
			var filterArray = _parse(filterdata);
			  for (var j = 0; j < filterArray.length; j++) {
				
				  if (isArray(filterArray[j][1])) {  
					if (!_ArrayHasValueMethond(filterArray[j][1], resource[filterArray[j][0]])) {
						return false;
						}
					
					}else { 
					//column:{">",value}
				  if (!_OperatorMethond(resource[filterArray[j][0]], filterArray[j][1], filterArray[j][2])) {
							return false;
							}
					}
				}
			return true;
			}	

		/**
		 * 解析条件队列到数组    Array 和 Object
		 * @param	filterdata
		 * @return
		 */
		 var _parse =function(filterdata) {
			var data =[];			
			for ( var  item in filterdata) {
                if (isArray(filterdata[item])) {	
					data.push([item,filterdata[item]])					
					}else{	
			      for (var itemChild in filterdata[item]) {
					  //[column,>,value]
				       data.push([item,itemChild,filterdata[item][itemChild]])
				  }
			   } 				
			}
			return data;
			}

			
		/**
		 * 数组是存在值
		 * @param	data
		 * @param	value
		 * @return
		 */	
		 var _ArrayHasValueMethond =function(data, value) {
			    for (var i = 0; i < data.length; i++) {
					   if (data[i] == value) {
						   return true;
						  }
					}
			return false;
		}



		/**
		 * 运算符方法处理 Object条件
		 * @param	data
		 * @param	Operator
		 * @param	value
		 * @return
		 */
		 var _OperatorMethond =function(data,Operator,value) {
			var b = true; 
			if (data == null) { return false; }		 
			switch (Operator) {
				 case ">":	
					if (!(data > value)) {  b = false; }			 
				 break;				 
				 case "<":	
					if (!(data < value)) { b = false;}
				 break;
				 case ">=":	
					if (!(data >= value)) { b = false;}
				 break;
				 case "<=":	
					if (!(data <= value)) { b = false;}
				 break;
				 case "=":	
					if (!(data == value)) { b = false;}
				 break;
				 case "!=":	
					if (!(data != value)) { b = false;}
				 break;
				 case "like": //含有
					 if ((data.toString()).indexOf(value)==-1) { b = false;}
				 break;
				 case "^":	 //含有 
					 if ((data.toString()).indexOf(value)==-1) { b = false;}
				 break;
				  case "^=":  //开头等于 
					 if ((data.toString()).indexOf(value)!=0) { b = false;}
				 break;				 
				 }				 
			  return b;
			}


}

module.exports = Util;