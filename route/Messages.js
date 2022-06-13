const express=require('express')
const router=express.Router()
router.use(express.json())

const Messages=require('../model/Messages')

router.post('/message',async(req,res)=>{  // creating Driver acount for the first time
    console.log(req.body.date);
const createMessage=new Messages({
    
    date:req.body.date,
    senderId:req.body.id,
    receiverId:req.body.receiverId,
    body:req.body.body
})
  try{
     const value=await createMessage.save()
     res.json(value)
  }
catch(err){
    res.json('error'+err)
}
})
router.get('/totalMessage',async(req,res)=>{
    console.log("message route excuted");
  try{
      const returnValue= await Messages.find()
      res.json(returnValue)
  }
  catch(err){
      res.send("error"+err)
  }
}
)
router.post('/getMessage',async(req,res)=>{
    const {senderId,receiverId}=req.body

  try{
    //   const value1= await Messages.find({senderId:senderId,receiverId:receiverId})
    //   const value2= await Messages.find({senderId:receiverId,receiverId:senderId})
    //   const returnValue=value1.concat(value2)
    const returnValue=await Messages.find( { $or: [ { senderId:senderId }, { receiverId: senderId } ] } )
      res.json(returnValue)
  }
  catch(err){
      res.send("error"+err)
  }
}
)
// router.get('/:id',async(req,res)=>{   // retriving driver acount strored in database
//     const {id}=req.params
//     console.log('id'+id);
//   try{
//       const returnvalue= await Driver.findOne({
//           UserId:id
//       })
//       res.json(returnvalue)
//   }
//   catch(err){
//       res.json("error : "+err)
//   }
// })

// router.get('/getAllocation/:id',async(req,res)=>{
//     const {id}=req.params
//     console.log("id :"+id);
//     try{
//         const returnvalue=await dutyAllocation.findOne({
//             DriverWorkId:id
//         })
//         res.json(returnvalue)
//     }
// catch(err){
//     res.send('error :'+err)
// }
// })

module.exports=router