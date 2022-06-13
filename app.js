const express=require('express')
var http=require('http');
var app=express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var mongoose=require('mongoose')
const cors=require('cors')
app.use(cors())
require('dotenv').config()
console.log(process.env.url);
const con=mongoose.connection
con.on('error',(error)=>{
    console.log(error,"ere ewuy");
})

con.on('open',()=>{console.log("am connected properly");})


const {setup} = require('./sockets')
const User=require('./route/User')
const Driver=require('./route/Driver')
const Manager=require('./route/Manager')
const Bus=require('./route/Bus')
const BusLocation=require('./route/BusLocation')
const distance=require('./route/DistanceCalcu')
const Customer=require('./route/Customer')
const Messages=require('./route/Messages')
const DutyAllocation= require('./route/DutyAllocation')
const Route=require('./route/Route')

app.use('/User',User)
app.use('/Driver',Driver)
app.use('/Manager',Manager)
app.use('/Bus',Bus)
app.use('/Distance',distance)
app.use('/Customer',Customer)
app.use('/Messages',Messages)
app.use('/BusLocation',BusLocation)
app.use('/DutyAllocation',DutyAllocation)
app.use('/Route',Route)

require('./another')
// app.use("/UserLocation",UserLocation)

const server = http.createServer(app)
setup(server)
server.listen(5000,()=>{
    console.log("server is listning on port 5000");
})

