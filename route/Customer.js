const express=require('express');
const Customer=require("../model/Customer");

const router=express.Router()
require('dotenv').config();
router.use(express.json())
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

router.post('/register',async(req,res)=>{
 console.log("Is this code excuted");
    try{
       const{first_name,last_name,email,password}=req.body; 

       if(!(email&&password&&last_name&&first_name)){
           res.status(400).send("All input is required");
       }

       const oldUser=await Customer.findOne({email})
       if(oldUser){
           return res.status(409).send("User Already Exist. Please Login")
       }
      const encryptedPassword= await bcrypt.hash(password,10);

      const customer= await Customer.create({
          first_name,
          last_name,
          email:email.toLowerCase(),
          password:encryptedPassword,
      })
      const token= jwt.sign(
          {customer_id: customer._id, email },
          "samuelismyname",
          {
              expiresIn: "3h",
          }
      );
      customer.token=token;
      res.status(201).json(customer)
    } catch(err){
       return res.send(err)
    }

})

router.post('/login',async(req,res)=>{

    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const customer = await Customer.findOne({ email });
    
        if (customer && (await bcrypt.compare(password, customer.password))) {
          // Create token
          const token = jwt.sign(
            { customer_id: customer._id, email },
            "samuelismyname",
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          customer.token = token;
    
          // user
          res.status(200).json(customer);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        res.send("error ",err)
      }
})

module.exports=router