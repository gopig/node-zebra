
//Buffer copy用法
//已有数据的Buffer  复制到  需要写入数据的Buffer
//API:buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])

//data is BufferReader
var FlashBufferReader = function (bufferReader) {
    
    var _buffer = bufferReader
    var _encoding = 'utf8';
    this.position = 6;
    var _endian = 'B';

    this.packLength = bufferReader.readUInt32();
    this.mainId = bufferReader.readInt8();
    this.childId = bufferReader.readInt8();


 

    //1字节 sbyte型代表有符号8位整数，取值范围在-128~127之间。
    this.readInt8 = function () {
        return _buffer.readInt8();
    }

    //1字节 bytet型代表无符号16位整数，取值范围在0~255之间。
    this.readUInt8 = function () {
        return  _buffer.readUInt8();
    }



    //2字节 short型代表有符号16位整数，取值范围在-32,768~32,767之间。
    this.readInt16 = function () {
       return _buffer.readInt16();
    }

    //2字节 ushort型代表无符号16位整数，取值范围在0~65,535之间。
    this.readUInt16 = function () {
         return _buffer.readUInt16();
    }



    //4字节 int型代表有符号32位整数，取值范围在-2,147,483,648~ 2,147,483,647之间
    this.readInt32 = function () {
         return _buffer.readInt32();
    }

    //4字节 uint型代表无符号32位整数，取值范围在 0 ~ 4,294,967,295之间
    this.readUInt32 = function () {
         return _buffer.readUInt32();
    }

    //8字节 long型代表64位有符号整数，取值范围在-9,223,372,036,854,775,808~ 9,223,372,036,854,775,807之间
    this.readInt64 = function () {
        return _buffer.readInt64();
    };

    //8字节 ulong型为64位无符号整数，取值范围在0 ~ 18,446,744,073,709,551,615之间。
    this.readUInt64 = function () {
        return _buffer.readUInt64();
    };


    //4字节
    this.readFloat = function () {
         return _buffer.readFloat();
    }

    //8字节
    this.readDouble = function () {
         return _buffer.readDouble();
    }


    //自定义字节
    this.readString = function () {
         return _buffer.readString();
    }




}


module.exports = FlashBufferReader;