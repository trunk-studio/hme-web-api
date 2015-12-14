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

var WordListToAdd3ByteList = function(WordDatat_list, Data_list) {
	//用於將WordTypeList編碼為3Byte,並加入3ByteTypeList中
  for (var i = 0; i < WordDatat_list.length; i++) {
		Data_list = Data_list.concat(WordTo3Byte(WordDatat_list[i]));
  } ;
	return(Data_list);
}
//?未測試
var DataListToChkSum3ByteList = function(Data_Arry) {
	u16ChkSum = 0;
	for(var i = 0; i < Data_Arry.length; i++){
		u16ChkSum = u16ChkSum + Data_Arry[i];
  }
	u16ChkSum = u16ChkSum & 0xffff;
  console.log('u16ChkSum='+u16ChkSum);
	return(WordTo3Byte(u16ChkSum));
}


var CopBitModify = function(u8DevID, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry){
  var u8DataOut_arry =[];
	var u8Header = 0x80;
  u8DataOut_arry.push(u8Header);
  u8DataOut_arry = u8DataOut_arry.concat(WordTo3Byte(u8DevID));
  u8DataOut_arry.push(u8FuncCT);
  u8DataOut_arry = u8DataOut_arry.concat(WordTo3Byte(u8DataNum));
  u8DataOut_arry = WordListToAdd3ByteList(u8Addr_Arry, u8DataOut_arry);
  u8DataOut_arry = WordListToAdd3ByteList(u8DataIn_Arry, u8DataOut_arry);
  u8DataOut_arry = WordListToAdd3ByteList(u8Mask_Arry, u8DataOut_arry);
	u8DataOut_arry = u8DataOut_arry.concat(DataListToChkSum3ByteList(u8DataOut_arry));
	return (u8DataOut_arry);

  //CopBitModify(1, 17, 2, [1,235], [2,253], [233,222])
  //[128,1,0,0,17,2,0,0,1,0,0,107,1,0,2,0,0,125,1,0,105,1,0,94,1,0,74,4,0]
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

var initTest2 = function (DevID,FuncCT,DataNum,Addr_list) {
  DataOut_list = [];
  Header = 0x80;
  DataOut_list.push(Header);
  DataOut_list = DataOut_list.concat(WordTo3Byte(DevID));
  DataOut_list.push(FuncCT);
  DataOut_list = DataOut_list.concat(WordTo3Byte(DataNum));
  DataOut_list = WordListToAdd3ByteList(Addr_list, DataOut_list);
  return  (DataOut_list);
}
var data = 0xfeab;
// [FEAB]=>[2B, 7D, 03]
console.log(WordTo3Byte(data));

//console.log(initTest2(0x0180,0xab,0xfeab,[0xfecc,0xfeab]));
//console.log(CopBitModify(1, 17, 2, [1,2], [2,3], [233,156]));
console.log(CopBitModify(1, 17, 2, [1,235], [2,253], [233,222]))
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
