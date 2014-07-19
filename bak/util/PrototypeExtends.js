//___________________________________________________________________________________Object prototype
/*Object.prototype.extend = function(object) {
for (property in object) {
this[property] = object[property];
}
return this;
}*/
//___________________________________________________________________________________String prototype
String.prototype.format = function() 
{ 
var p = arguments;
			return this.replace(/(\{\d+\})/g,function(){
				return p[arguments[0].replace(/\D/g,"")];
			});		

};
//___________________________________________________________________________________Array prototype
	Array.prototype.ConvertJsDatabase=function(){
			var a=[];
				for(var i=0;i<this.length;i++){
					a.push($.Json(this[i]));
			};
			return a;
		};
     Array.prototype.sum = function(){
     	for(var i=0,sum=0;i<this.length;sum+=this[i++]);
     	return sum;
      };
     Array.prototype.maxNumber = function(){
     	return Math.max.apply({},this);
     };
     Array.prototype.minNumber = function(){
     	return Math.min.apply({},this);
     };
     Array.prototype.max = function () {
		if (this.length == 0) return undefined;
		var n = Number(this[0]);
		for (var i=1; i<this.length; i++) {n = Math.max(n, this[i]);};
		return n;
	};
	Array.prototype.clone=function(){ 
		var a=[]; 
		for(var i=0,l=this.length;i<l;i++){ 
			a.push(this[i]); 
		};
		return a; 
	};


	Array.prototype.clear=function(){
		  for(var i=0;i<this.length;i++){
			  this.shift();
			  };			  
		};
	//返回该值在Array中的位置 如果-1 就是没有！
	Array.prototype.contain = function(value)
	{
		  for(var i=0; i<this.length; i++)
		  {
			var element = this[i];
			if(element == value) return i;
		  };
		  return -1;   
	};
	//删除数组中相同项目
	Array.prototype.removeSameItem = function () {	
		for(var i = 1; i < this.length; i++){
		if(this[i][0] == this[i-1][0]){
			this.splice(i,1);
		};
	};
   };
	// SortBy 一维数组的排序
	// type 参数
	// 0 字母顺序（默认）
	// 1 大小 比较适合数字数组排序
	// 2 拼音 适合中文数组
	// 3 乱序 有些时候要故意打乱顺序，呵呵
	// 4 带搜索 str 为要搜索的字符串 匹配的元素排在前面
	Array.prototype.SortBy=function(type,str)
	{	
		switch (type)
		{
			case 0:this.sort(); break;
			case 1:this.sort(function(a,b){ return a-b; }); break;
			//case 2:this.sort(function(a,b){ return a.localeCompare(b) }); break;
			case 2:this.sort(function(a,b){
				if(a.length>b.length)return 1;
				else if(a.length==b.length)return a.localeCompare(b);
				else return -1;});
			    break;
			case 3:this.sort(function(){ return Math.random()>0.5?-1:1; }); break;
			case 4:for(var i=0;i<this.length;i++){this[i]=this[i].toString()};this.sort(function(a,b){ return a.indexOf(str)==-1?1:-1; }); break;
			default:this.sort();
		};
	};

	//删除数组中相同项目
	Array.prototype.removeSameItem = function () {	
		for(var i = 1; i < this.length; i++){
		if(this[i][0] == this[i-1][0]){
			this.splice(i,1);
		};
	};
   };

   Array.prototype.each=function(fn){
		for (var i = 0; i < this.length; i++) {
			 if(fn(this[i]))break;
		};
	}



//___________________________________________________________________________________Array prototype

