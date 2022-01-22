const express=require('express')
var app=express()
var mongoose=require('mongoose')

require('dotenv').config()
mongoose.connect(process.env.url)
const con=mongoose.connection
con.on('error',(error)=>{
    console.log(error);
})

con.on('open',()=>{console.log("am connected properly");})

// importing router controller class
const user=require('./route/user')
const Driver=require('./route/Driver')
const Manager=require('./route/Manager')
const Bus=require('./route/Bus')
const UserLocation=require('./route/UserLocation')
const distance=require('./route/DistanceCalcu')
app.use('/User',user)
app.use('/Driver',Driver)
 app.use('/Manager',Manager)
 app.use('/Bus',Bus)
 app.use('/distance',distance)
// app.use("/UserLocation",UserLocation)
app.listen(5000,()=>{
    console.log("server is listning on port 5000");
})

