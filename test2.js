console.log('hello');

//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/tty-usbserial1", {
//  baudrate: 57600
//}, false); // this is the openImmediately flag [default is true]
var SerialPort = require("serialport").SerialPort;


var serialPort = new SerialPort('/dev/ttyUSB0', {baudrate: 115200}, true);

serialPort.open()

serialPort.on ('open', function () {


    var initTest = function () {
      serialPort.write(0x05);
    }

    var initTest2 = function () {
      serialPort.write(0x05);
    }



    initTest();
    // serialPort.on ('data', function( data ) {
    //     console.log("data" + data.toString());
    // });
});



/////////////////////////////////
var WordTo3Byte = function (u16word) {
	//用於將1Word資料編碼為3Byte
	
	//u8Byte:用於存放轉好的資料,元素=Bytet,長度=3
    u8Byte = [0x00,0x00,0x00];

	
    u16Data = struct.pack("H", u16word);
    u16wByte0, u16wByte1 =  struct.unpack("2B", u16Data);

    //move to u8B[2]    ok
    u8Byte[2] = u16wByte1 >> 6;
    //move to u8B[0]    ok
    u8Byte[0] = u16wByte0 & 0x7f;
    //move to u8B[1]          
    u16word = ( u16word << 1) & 0x7f00;
    u16Data = struct.pack("H", u16word);
    u16wByte0, u16wByte1 =  struct.unpack("2B", u16Data);
    u8Byte[1] = u16wByte1;
    //print (hex(u8Byte[2]) )  
    //print (hex(u8Byte[1]) )
    //print (hex(u8Byte[0]) )
    cb u8Byte;
	}
	
var WordTo3Byte = function (u3Byte){
	//將經編碼之3Byte資料解碼為1Word
	cb u3Byte[0] + ((u3Byte[1]<<7)&0xff) + (((u3Byte[1]>>1) + (u3Byte[2]<<6))* 0x100);
}

////////////////////////////////