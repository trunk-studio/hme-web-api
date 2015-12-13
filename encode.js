console.log('hello');

/* 建立 3 Bytes 的記憶體空間 */
var buf = new Buffer(3);

var buff = new Buffer([128,1,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0])

console.log(buff);


var WordTo3Byte = function (u16word) {
  console.log('WordTo3Byte');
 // serialPort.write(0x05);
}

var initTest2 = function () {
  console.log('initTest2');
 // serialPort.write(0x05);
}

initTest1();

initTest2();

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
