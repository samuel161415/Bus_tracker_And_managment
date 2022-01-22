const express=require('express')
const router=express.Router()
router.use(express.json())
let ID

const Driver=require('../model/Driver')
const dutyAllocation=require('../model/DutyAllocation')

router.post('/createAcount',async(req,res)=>{  // creating Driver acount for the first time
const createDriveAcount=new Driver({
    UserName:req.body.driverName,
    UserId:req.body.id
})
  try{
     const value=await createDriveAcount.save()
     res.json(value)
  }
catch(err){
    res.json('error'+err)
}
})


router.get('/:id',async(req,res)=>{   // retriving driver acount strored in database
    const {id}=req.params
    console.log('id'+id);
  try{
      const returnvalue= await Driver.findOne({
          "UserId":id
      })
      res.json(returnvalue)
  }
  catch(err){
      res.json("error : "+err)
  }
})

router.get('/getAllocation/:id',async(req,res)=>{
    const {id}=req.params
    console.log("id :"+id);
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
module.exports=router