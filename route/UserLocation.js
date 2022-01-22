
const express=require('express')
const router=express.Router()
let UserLocation=require('../model/User')

router.use(express.json())

// router.get('/getUserLocation',async(req,res)=>{
// var value=await UserLocation.findOne({
    
// })
// })
router.post('/setLocationName',async(req,res)=>{
var value=new UserLocation(
    {
        UserLocationName:req.body.LocationName,
        UsercurrentLocation:req.body.Location,
        UserDestination:req.body.Destination,
    })
    try{
        const returnVaue=await value.save()   // used to save data to database
        res.json(returnVaue)

    }
    catch(err){
        res.send("err:"+err)

    }

})
