::@echo off 
::if "%1" == "h" goto begin 
::mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit 
::begin 

::echo off
::转到当前盘符
%~d0
::打开当前目录
cd %~dp0 
 
node  app.js 

pause

::node.js
::start NodeServer\node.exe NodeServer\app.js   -nodebug -- %1   
