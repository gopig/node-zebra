var BufferWriter = function () {
    var _buffer;
    var _encoding = 'utf8';
    var _endian = 'B';
    var _length = 0;
    var _writerObject = []
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
    this.writeInt8 = function (value) {
        if (value < -128) {
            value = -128;
        }
        if (value > 127) {
            value = 127;
        }
        _buffer = new Buffer(1)
        _buffer.writeInt8(value, 0)
        _writerObject.push(_buffer);
        _length++;
    }

    //1字节 bytet型代表无符号16位整数，取值范围在0~255之间。
    this.writeUInt8 = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 255) {
            value = 255;
        }
        _buffer = new Buffer(1)
        _buffer.writeUInt8(value, 0)
        _writerObject.push(_buffer);
        _length++;
    }



    //2字节 short型代表有符号16位整数，取值范围在-32,768~32,767之间。
    this.writeInt16 = function (value) {
        if (value < -32768) {
            value = -32768;
        }
        if (value > 32767) {
            value = 32767;
        }
        _buffer = new Buffer(2)
        switch (_endian) {
            case "B":
                _buffer.writeInt16BE(value, 0);
                break;
            case "L":
                _buffer.writeInt16LE(value, 0);
                break;
        }
        _writerObject.push(_buffer);
        _length += 2;
    }

    //2字节 ushort型代表无符号16位整数，取值范围在0~65,535之间。
    this.writeUInt16 = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 65535) {
            value = 65535;
        }
        _buffer = new Buffer(2)
        switch (_endian) {
            case "B":
                _buffer.writeUInt16BE(value, 0);
                break;
            case "L":
                _buffer.writeUInt16LE(value, 0);
                break;
        }
        _writerObject.push(_buffer);
        _length += 2;
    }



    //4字节 int型代表有符号32位整数，取值范围在-2,147,483,648~ 2,147,483,647之间
    this.writeInt32 = function (value) {
        if (value < -2147483648) {
            value = -2147483648
        }
        if (value > 2147483647) {
            value = 2147483647
        }
        _buffer = new Buffer(4)
        switch (_endian) {
            case "B":
                _buffer.writeInt32BE(value, 0);
                break;
            case "L":
                _buffer.writeInt32LE(value, 0);
                break;
        }
        _writerObject.push(_buffer);
        _length += 4;

    }

    //4字节 uint型代表无符号32位整数，取值范围在 0 ~ 4,294,967,295之间
    this.writeUInt32 = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 4294967295) {
            value = 4294967295;
        }

        _buffer = new Buffer(4)
        switch (_endian) {
            case "B":
                _buffer.writeUInt32BE(value, 0);
                break;
            case "L":
                _buffer.writeUInt32LE(value, 0);
                break;
        }
        _writerObject.push(_buffer);
        _length += 4;
    }

    //8字节 long型代表64位有符号整数，取值范围在-9,223,372,036,854,775,808~ 9,223,372,036,854,775,807之间
    this.writeInt64 = function (value) {
        this.writeUInt64(value);
    };

    //8字节 ulong型为64位无符号整数，取值范围在0 ~ 18,446,744,073,709,551,615之间。
    //Node.js 最大到 922 3372 0368 5477 6000 只能整数

    /**
    * 写入64位
    * @value
    */
    this.writeUInt64 = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 10000000000000000000) {
            value = 10000000000000000000;
        }
        _buffer = new Buffer(8);
        var high, light;
        if (value < Math.pow(2, 32)) {
            high = 0;
            light = value;
        } else {
            //high = Math.floor(value / Math.pow(2, 32));
            high = parseInt(value / Math.pow(2, 32), 10)
            light = value - high * Math.pow(2, 32);
        }

        switch (_endian) {
            case "B":
                _buffer.writeUInt32BE(high, 0);
                _buffer.writeUInt32BE(light, 4);
                break;
            case "L":
                _buffer.writeUInt32LE(light, 0);
                _buffer.writeUInt32LE(high, 4);
                break;
        }
        _writerObject.push(_buffer);
        _length += 8;
    };

    //4字节
    this.writeFloat = function (value) {
        _buffer = new Buffer(4)
        switch (_endian) {
            case "B":
                _buffer.writeFloatBE(value, 0);
                break;
            case "L":
                _buffer.writeFloatLE(value, 0);
                break;
        }
        _writerObject.push(_buffer);
        _length += 4;
    }

    //8字节
    this.writeDouble = function (value) {
        _buffer = new Buffer(8);
        switch (_endian) {
            case "B":
                _buffer.writeDoubleBE(value, 0);
                break;
            case "L":
                _buffer.writeDoubleLE(value, 0);
                break;
        }
        _writerObject.push(_buffer);
        _length += 8;
    }

    //字符串
    this.writeString = function (value) {
        //先写入长度
        var stringBf = new Buffer(value);
        var strBuflen = 4; //(4字节 string长度)
        _buffer = new Buffer(strBuflen);
        switch (_endian) {
            case "B":
                _buffer.writeUInt32BE(stringBf.length, 0);
                break;
            case "L":
                _buffer.writeUInt32LE(stringBf.length, 0);
                break;
        }
        _writerObject.push(_buffer);
        _length += strBuflen;
 
 
 
        _writerObject.push(stringBf);
        _length += stringBf.length;

    };

    //打包并返回Buffer对象数据
    this.pack = function () {
        var buffer = new Buffer(_length);
        var position = 0;
        for (var i = 0; i < _writerObject.length; i++) {
            _writerObject[i].copy(buffer, position);
            position += _writerObject[i].length;
        }
        return buffer;
    }

 
}


module.exports = BufferWriter;