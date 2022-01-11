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
const user=require('./route/user')
app.use('/User',user)
app.listen(5000,()=>{
    console.log("server is listning on port 5000");
})

