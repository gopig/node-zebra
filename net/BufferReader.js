
var Int64 = require('node-zebra/util/Int64');
//Buffer copy用法
//已有数据的Buffer  复制到  需要写入数据的Buffer
//API:buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])

var BufferReader = function (data) {
    var _buffer = data
    var _encoding = 'utf8';
    this.position = 0;
    var _endian = 'B';

    //指定文字编码
    this.encoding = function (value) {
        _encoding = value;
        return this;
    };

    //指定字节流顺序
    this.endian = function (value) {
        _endian = value;
        return this;
    };



    //1字节 sbyte型代表有符号8位整数，取值范围在-128~127之间。
    this.readInt8 = function () {
        var value = _buffer.readInt8(this.position);
        this.position += 1;
        return value;
    }

    //1字节 bytet型代表无符号16位整数，取值范围在0~255之间。
    this.readUInt8 = function () {
        var value = _buffer.readUInt8(this.position);
        this.position += 1;
        return value;
    }



    //2字节 short型代表有符号16位整数，取值范围在-32,768~32,767之间。
    this.readInt16 = function () {
        var value;
        switch (_endian) {
            case "B":
                value = _buffer.readInt16BE(this.position);
                break;
            case "L":
                value = _buffer.readInt16LE(this.position);
                break;
        }
        this.position += 2;
        return value;
    }

    //2字节 ushort型代表无符号16位整数，取值范围在0~65,535之间。
    this.readUInt16 = function () {
        var value;
        switch (_endian) {
            case "B":
                value = _buffer.readUInt16BE(this.position);
                break;
            case "L":
                value = _buffer.readUInt16LE(this.position);
                break;
        }
        this.position += 2;
        return value;
    }



    //4字节 int型代表有符号32位整数，取值范围在-2,147,483,648~ 2,147,483,647之间
    this.readInt32 = function () {
        var value;
        switch (_endian) {
            case "B":
                value = _buffer.readInt32BE(this.position);
                break;
            case "L":
                value = _buffer.readInt32LE(this.position);
                break;
        }
        this.position += 4;
        return value;
    }

    //4字节 uint型代表无符号32位整数，取值范围在 0 ~ 4,294,967,295之间
    this.readUInt32 = function () {
        var value;
        switch (_endian) {
            case "B":
                value = _buffer.readUInt32BE(this.position);
                break;
            case "L":
                value = _buffer.readUInt32LE(this.position);
                break;
        }
        this.position += 4;
        return value;
    }

    //8字节 long型代表64位有符号整数，取值范围在-9,223,372,036,854,775,808~ 9,223,372,036,854,775,807之间
    this.readInt64 = function () {


             var value; 
             switch (_endian) {
                case "B":
                     value =  _buffer.readDoubleBE(this.position) 
                break;
                case "L":
                     value =  _buffer.readDoubleLE(this.position);
                break;                
                }
                this.position +=8;
            return value;
      /*   var int64 = new Int64(_buffer, this.position);
             this.position +=8;
            return int64.toNumber(true);*/
    };

    //8字节 ulong型为64位无符号整数，取值范围在0 ~ 18,446,744,073,709,551,615之间。
    this.readUInt64 = function () {
          var value; 
             switch (_endian) {
                case "B":
                     value =  _buffer.readDoubleBE(this.position) 
                break;
                case "L":
                     value =  _buffer.readDoubleLE(this.position);
                break;                
                }
            if(value<0) value = 0;
                this.position +=8;
            return value;


        /*var high, light, value;
        switch (_endian) {
            case "B":
                high = _buffer.readUInt32BE(this.position);
                this.position += 4;
                light = _buffer.readUInt32BE(this.position);
                this.position += 4;
                value = high * Math.pow(2, 32) + light;
                break;
            case "L":
                high = _buffer.readUInt32LE(this.position);
                this.position += 4;
                light = _buffer.readUInt32LE(this.position);
                this.position += 4;
                value = light * Math.pow(2, 32) + high;
                break;
        }
        return value;*/
    };


    //4字节
    this.readFloat = function () {
        var value;
        switch (_endian) {
            case "B":
                value = _buffer.readFloatBE(this.position);
                break;
            case "L":
                value = _buffer.readFloatLE(this.position);
                break;
        }
        this.position += 4;
        return value;
    }

    //8字节
    this.readDouble = function () {
        var value;
        switch (_endian) {
            case "B":
                value = _buffer.readDoubleBE(this.position);
                break;
            case "L":
                value = _buffer.readDoubleLE(this.position);
                break;
        }
        this.position += 8;
        return value;
    }


    //自定义字节
    this.readString = function () {
        var value, len;
        len = this.readUInt32(); //(4字节 string长度)
        value = _buffer.toString(_encoding, this.position, this.position + len);
        this.position += len;
        return value;
    };
 
 
}


module.exports = BufferReader;