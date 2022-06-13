const express=require('express')
const router=express.Router()
router.use(express.json())
const multer=require('multer')
const Driver=require('../model/Driver')
const dutyAllocation=require('../model/DutyAllocation')
const Reports=require('../model/Messages')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const Bus=require('../model/Bus')
const BusLocation=require('../model/BusLocation')
const Route=require('../model/Route')
const { param } = require('express/lib/request')
require('dotenv').config();

router.use('/uploads', express.static(__dirname +'/uploads'));
var storage = multer.diskStorage({    
    destination:"uploads",
       
    filename: function (req, file, cb) {      
    cb(null, file.originalname)    
    }  
    })
    const upload=multer({storage:storage}).single('myFile');


 

    
router.post('/createAcount',(req,res)=>{  // creating Driver acount for the first time
    upload(req,res,async(err)=>{
        const Id=req.body.driverId
        try{
            const oldDriver=await Driver.findOne({driverId:req.body.driverId})
            if(oldDriver){
                return res.status(409).send("User Already Exist. Please Login")
            }
           const encryptedPassword= await bcrypt.hash(req.body.password,10);
                 const driver=await Driver.create({
                     driverName:req.body.driverName,
                     password:encryptedPassword,
                     driverId:req.body.driverId,
                     image:{
                         data:req.file.filename,
                         contentType:'image/jpg'
                     }
                   
             })
             const token = jwt.sign(
                { driver_id: driver._id, Id },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              driver.token = token;
          
              // return new user
              res.status(201).json(driver);

        }
        catch(err){
            res.send('error',err);
        }
        
       
        
    })
    
})

// for login authentication

router.post("/login",async(req,res)=>{
    try{
    const {driverId,password}=req.body
    // validate user input
    if(!(driverId&&password)){
       return res.status(400).send("All input is required")
    }
    // validate if user exist in our database
    const driver=await Driver.findOne({driverId:driverId})
    if(driver&&(await bcrypt.compare(password,driver.password))){
        // create token
        const token=jwt.sign(
            {driver_id:driver._id,driverId},
            process.env.TOKEN_KEY,
            {
                expiresIn:"3h"
            }
            )
            driver.token=token
          return  res.status(200).json(driver)

    }
        return res.status(400).send("Invalid Credentials")

    }
    catch(err){

res.send('error',err)
    }
})
    


const verifyToken=(req,res,next)=>{
    var token=req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth:false,message:"No token provided"})
    
    jwt.verify(token,process.env.TOKEN_KEY,function(err,decoded){
        if(err) return res.status(500).send({auth:false,message:"Failed to authenticate token"})
    })
    next()
   }

  
router.get('/totalDrivers',async(req,res)=>{
    console.log("drivers");
  try{
      const returnValue= await Driver.find()
     return res.json(returnValue)
  }
  catch(err){
     return res.send("error"+err)
  }
}
)
router.get('/:driverId',verifyToken, async(req,res)=>{   // retriving driver acount strored in database
    const {driverId}=req.params
    
  try{
      const returnvalue= await Driver.findOne({
          driverId:driverId
      })
      res.json(returnvalue)
  }
  catch(err){
      res.json("error : "+err)
  }
})

router.get('/getAllocation/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const returnvalue=await dutyAllocation.findOne({
            DriverWorkId:id
        })
        res.json(returnvalue)
    }
catch(err){
    res.send('error :'+err)
}
})
router.post('/reports',async(req,res)=>{  // creating Driver acount for the first time
    const createReport=new Reports({
        date:new Date(req.body.date),
        UserName:req.body.UserName,
        message:req.body.message
    })
      try{
         const value=await createReport.save()
         res.json(value)
      }
    catch(err){
        res.json('error'+err)
    }
    })
    router.get('/getDriverBus/:driverId', async(req,res)=>{   // retriving driver acount strored in database
       console.log("driverId",req.params.driverId);
       const driverId=req.params.driverId
      try{
          const businfo= await Bus.find({
             driverId
          })
          const busId=businfo[0].busId
        
          const route=await Route.findOne({
            busId
          })
       
          const busLocation=await BusLocation.findOne({
            busId
          })
          const returnvalue=businfo.concat(route).concat(busLocation)
       return   res.json(returnvalue)
      }
      catch(err){
        return  res.json("error : "+err)
      }
    })

module.exports=router