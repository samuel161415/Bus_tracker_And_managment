

const express=require('express')
var app=express()
var mongoose=require('mongoose')
let bus=require('./model/Bus')

require('dotenv').config()
mongoose.connect(process.env.url)
const con=mongoose.connection
con.on('error',(error)=>{
    console.log(error);
})
con.on('open',()=>{console.log("am connected properly");})

// the following code will be 
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


//createDatabase("Sheger","5","Megenagna","Bole",location)
console.log("what is ");
// Read data from the serial port 
let m=parser.on('data',(data)=>{
  console.log("latitude is ")
  Data=JSON.parse(data);
  let latitude=Data.Latitude
  let longitude=Data.Longitude
  location=[latitude,longitude]
  console.log(Data);
  console.log("Latitude"+latitude+" longtiude "+longitude);
  createDatabase("Sheger","10","Merkato","Kaliti",location)
}

);

console.log("value in main is "+  m);


const createDatabase=async(name,id,sPlace,busDes,location)=>{
	console.log("updating");
	try{
		const update=await bus.updateOne(
			   { busId: id },
			   { $set: { busType:name,
				busId:id,
				startingPlace:sPlace,
				destination:busDes,
				currentLocation:location } }, // use this format for update or updateOne. 
			  //it changes the values in upadate and leaves the other fileds unchanged
				 { upsert: true }  // used to insert if the object not found
			)
	
	   
	}
	catch(err){
		console.log("error "+err);
	}

	
}

