const express=require('express')
const router=express.Router()
const Route=require('../model/Route')
router.use(express.json())



router.post("/insertRoute",async(req,res)=>{  // creating new bus's Information for first time
    console.log("please");
    const{busId,routes}=req.body
    const value=new Route({
        busId:busId,
       routes:routes
      })

try{
  const returnValue=await value.save()   // used to save data to database
  res.json(returnValue)
}
catch(error){
res.send('error'+ error)
}
})


    module.exports=router
