const SerialPort =require('serialport')
const Readline=require('@serialport/parser-readline')
let Data
let Latitude
console.log("working")
const port=new SerialPort('COM2',{
    baudRate:9600,
})

const parser=new Readline()
port.pipe(parser);

// Read data from the serial port 
let m=parser.on('data',(data)=>{
  console.log("latitude is ")
  Data=JSON.parse(data);
  console.log(Data);
  Latitude=Data.Latitude
  
}

);

console.log("value in main is "+  m);


// write data to serial port
//port.write('L')

//module.exports=Latitude