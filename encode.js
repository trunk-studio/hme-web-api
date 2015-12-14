console.log('hello');

/* 建立 3 Bytes 的記憶體空間 */
var buf = new Buffer(3);

var buff = new Buffer([128,1,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]);

console.log(buff);


var WordTo3Byte = function (u16word) {
  console.log('WordTo3Byte');
  //用於將1Word資料編碼為3Byte

  //u8Byte:用於存放轉好的資料,元素=Bytet,長度=3
  var u16ByteLHbuf = new Buffer([0x0,0x0]);
  //var u8Byte3buf = new Buffer([0x0,0x0,0x0]);
  var u8ByteArry = [0x0,0x0,0x0];
  u16ByteLHbuf.writeUInt16LE(u16word, 0);
  //console.log('u16Buf='+u16ByteLHbuf.toString('hex'));
  u8ByteArry[2] = u16ByteLHbuf[1] >> 6  ;
  u8ByteArry[0] = u16ByteLHbuf[0] & 0x7f;
  u16word = ( u16word << 1) & 0x7f00
  u16ByteLHbuf.writeUInt16LE(u16word, 0);
  u8ByteArry[1] = u16ByteLHbuf[1]
  //console.log(u8Byte3buf);
  // [FEAB]=>[2B, 7D, 03]
  console.log('WordTo3Byte= '+u8ByteArry);
  return(u8ByteArry);
}

var u3ByteToWord = function (u3Byte) {
	//將經編碼之3Byte資料解碼為1Word
	return(u3Byte[0] + ((u3Byte[1]<<7)&0xff) + (((u3Byte[1]>>1) + (u3Byte[2]<<6))* 0x100));
}

//?未測試
var WordListToAdd3ByteList = function(WordDatat_list, Data_list) {
	//用於將WordTypeList編碼為3Byte,並加入3ByteTypeList中
  for (var i = 0; i < WordDatat_list.length; i++) {
		Data_list += WordTo3Byte(WordDatat_list[i]);
  } ;
	return(Data_list);
}
//?未測試
var DataListToChkSum3ByteList = function(DataList) {
	u16ChkSum = 0;
	for(var i = 0; i < DataList.length; i++){
		u16ChkSum = u16ChkSum + DataList[i];
  }
	u16ChkSum = u16ChkSum & 0xffff;
	return(WordTo3Byte(u16ChkSum));
}


var CopBitModify = function(DevID, FuncCT, DataNum, Addr_list, DataIn_list, Mask_list){
	// var Header = 0x80;

  var Headerbuf = new Buffer([0x80]);
  var DevIDbuf = WordTo3Byte(DevID);
  var FuncCTbuf = new Buffer([FuncCT]);
  var DataNumbuf = WordTo3Byte(DataNum);

  var FuncCTbuf = new Buffer([FuncCT]);
  var buf = new Buffer([]);

	// var DataOut_list = new Buffer([]);
	// var u16ChkSum = 0;
	// DataOut_list.append(Header) ;
	// DataOut_list = DataOut_list + WordTo3Byte(DevID);
	// DataOut_list.append( FuncCT );
	// DataOut_list = DataOut_list + WordTo3Byte(DataNum);
	// DataOut_list = WordListToAdd3ByteList(Addr_list, DataOut_list);
	// DataOut_list = WordListToAdd3ByteList(DataIn_list, DataOut_list);
	// DataOut_list = WordListToAdd3ByteList(Mask_list, DataOut_list);
	// DataOut_list += DataListToChkSum3ByteList(DataOut_list);
	// return (DataOut_list);
}

// var WordBufTo3ByteBuf = function(WordB) {
// 	//用於將WordTypeList編碼為3Byte,並加入3ByteTypeList中
//   var ByteBuf = new Buffer(0);
//   for (var i = 0; i < WordB.length; i++) {
//     var buffers = [ByteBuf,WordTo3Byte(WordB[i])];
//     ByteBuf = Buffer.concat(buffers, totalLength);
//   } ;
// 	return(ByteBuf);
// }

// var initTest2 = function () {
//   var Headerbuf = 0xEA;
//   var Abuf = new Buffer([1,2]);
//   var Bbuf = new Buffer([3,4,5]);
//   var Headerbuf = new Buffer([Headerbuf]);
//   var buffers = [Headerbuf, Abuf, Bbuf];
//
//   var totalLength = 0;
//   for (var i = 0; i < buffers.length; i++) {
//     totalLength += buffers[i].length;
//   }
//
//   var bufA = Buffer.concat(buffers, totalLength);
//
//   console.log(Headerbuf);
//   console.log('initTest2');
//   console.log(bufA);
//  // serialPort.write(0x05);
// }

var initTest2 = function () {
  var Headerbuf = 0xEA;
  var Abuf = new Buffer([0xffef,0xdbca]);
  var Bbuf = new Buffer([3,4,5]);
  var a = [0xfecb,0xFBBA]

  console.log('initTest2:');
  console.log(a);
  console.log(Bbuf);
 // serialPort.write(0x05);
}

var data = 0xfeab;
// [FEAB]=>[2B, 7D, 03]
console.log(WordTo3Byte(data));

initTest2();
//WordBufTo3ByteBuf();

//serialPort.open();

/*
serialPort.on ('open', function (error) {
	console.log('/dev/ttyUSB0 is open');


	  if ( error ) {
		console.log('failed to open: '+error);
	  } else {
		console.log('open');
		serialPort.on('data', function(data) {
		  console.log('data received: ' + data);
		});
		serialPort.write("ls\n", function(err, results) {
		  console.log('err ' + err);
		  console.log('results ' + results);
		});
	  }


    var initTest = function () {
		console.log('initTest');
      //serialPort.write(0x05);
    }

    var initTest2 = function () {
		console.log('initTest2');
     // serialPort.write(0x05);
    }

    //initTest();



    // serialPort.on ('data', function( data ) {
    //     console.log("data" + data.toString());
    // });
});

 serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });
	*/
