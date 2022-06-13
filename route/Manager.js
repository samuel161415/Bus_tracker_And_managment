const express=require('express')
const router=express.Router()
router.use(express.json())
//const Driver=require('../model/Driver')
const Manager=require('../model/Manager')
const dutyAllocation=require('../model/DutyAllocation')
const Reports =require('../model/Messages')
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();

// for registration

router.post('/register',async(req,res)=>{ // for creating manager acount
    const{userName,password}=req.body
 console.log("userName is ",req.body.userName);
 try{
    const oldManager=await Manager.findOne({userName:req.body.userName})
    if(oldManager){
        return res.status(409).send("User Already Exist. Please Login")
    }
    const encryptedPassword= await bcrypt.hash(req.body.password,10);
    const manager=await Manager.create({
        userName:req.body.userName,
        password:encryptedPassword,
        auth:true
      
})
    const token = jwt.sign(
    { manager: manager._id, userName },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
 console.log("token",token);
  manager.token = token;
  res.status(201).json(manager);

 }
 catch(err){
     res.send("error : "+err)
 }
    
})

// to login 

router.post('/login',async(req,res)=>{
    const {userName,password}=req.body
 
    if(!(userName&&password)){
        return res.status(400).send("All input is required")
     }
   console.log("password",password);
   
   
    try{
        //const driver=await Manager.findOne({driverId:driverId})
        const manager= await Manager.findOne({userName:userName})
        if(manager&&(await bcrypt.compare(password,manager.password))){
            // create token
            const token=jwt.sign(
                {manager_id:manager._id,userName},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"3h"
                }
                )
                manager.token=token
              return  res.status(200).json(manager)
             
        }
        return res.status(400).send("Invalid Credentials")
        // if(value.length>0) res.send(true)
        // else res.send(false)
    }
    catch(err){
        res.send('error', err)
    }
})


// to set daily duty allocation of bus drivers
const verifyToken=(req,res,next)=>{
    var token=req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth:false,message:"No token provided"})
    
    jwt.verify(token,process.env.TOKEN_KEY,function(err,decoded){
        if(err) return res.status(500).send({auth:false,message:"Failed to authenticate token"})
    })
    next()
   }
router.patch('/dutyAllocation',verifyToken,async(req,res)=>{   
  
    try{
        const update=await dutyAllocation.updateOne(
               { UserName: req.body.UserName },
               { $set: { startPosition: req.body.startPosition ,
                   endPosition:req.body.endPosition, 
                   busNumber:req.body.busNumber
        } }, 
                                                                                            
                 { upsert: true }  
            )
            res.send(update)
       
    }
    catch(err){
        res.send('error'+err)
    }
    })
    router.get('/reports',verifyToken,async(req,res)=>{
        try{
            const returnValue= await Reports.find()
            res.json(returnValue)
        }
        catch(err){
            res.send(err)
        }
    })

   
    // Ther also be controlling of bus status 
    module.exports=router