const express=require('express')
const router=express.Router()
const bus=require('../model/Bus')
router.use(express.json())
const ds=require('../controller/distanceCalculator')

//

router.post('/bus',async(req,res)=>{
        var user_latitude=req.body.latitude1
         var user_longitude=req.body.longitude1
        var id=req.body.id
       
    try{
        const location=await bus.findOne({busId:id},
            {currentLocation:1,_id:0})

       console.log(location);
        const distance=ds(user_latitude,user_longitude,location.currentLocation[0],location.currentLocation[1],'K')
        
        res.send({
            distance:distance,
            location:location

        })
    }
    catch(err){
res.send('error'+err)
    }
    
//     var bus_longitude=result.
//    const distance= ds(latitude1,longitude1,latitude2,longitude2,'K')


})
module.exports=router