const express=require('express')
const router=express.Router()
const bus=require('../model/Bus')
router.use(express.json())
const ds=require('../controller/distanceCalculator')
const t=require('../controller/time')
const BusLocation=require('../model/BusLocation')
const { json } = require('express')

//

router.post('/getDistance',async(req,res)=>{
        var user_latitude=req.body.latitude
         var user_longitude=req.body.longitude
         var busId=req.body.busId
       
       
    try{
        const location=await BusLocation.findOne({busId:busId})

       console.log("location is ",location);
        const distance=ds(user_latitude,user_longitude,location.latitude,location.longitude,'K')

        const time=t(distance)
        res.send({
            distance:distance,
            time:time,
            speed:30,
            latitude:location.latitude,
            longitude:location.longitude,
            busId:busId

        })
        //return res.json(location)
    }
    catch(err){
res.send('error'+err)
    }
    
//     var bus_longitude=result.
//    const distance= ds(latitude1,longitude1,latitude2,longitude2,'K')


})
module.exports=router