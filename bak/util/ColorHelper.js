﻿var ColorHelper=function(){
 
      this.random=function(){ 
          return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
      } 

     
}


module.exports = ColorHelper;