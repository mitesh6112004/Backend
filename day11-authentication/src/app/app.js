import express from "express"; 
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import authentication from "../middlewares/auth.middleware.js";
import becrypt from "bcryptjs"
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const app = express();

app.use(express.json()); 

app.post("/api/auth/register", async (req,res) => {

   const {name, email, password} = req.body ; 

   let userData = await userModel.create({
     name, email, password : await bcrypt.hash(password, 10)
   })


   const token = jwt.sign(
     {
       id : userData._id
     },

     process.env.JWT_Secret
   );

   res.status(201).json({
     message: "Data Create Successfully",
     data: {
       user: {
         userData
       },
     },
     token,
   });

})

app.get("/api/auth/me", authentication ,async (req,res) => {

  res.status(200).json({
    data : {
      user : req.user
    }
  })

  
  
  

})

app.post("/api/auth/login", async (req,res)=> {

  const { email , password} = req.body ;

  const user = await userModel.findOne({
    email
  })

  console.log(user.password);
  

  
  const isValid = await bcrypt.compare(password,user.password);

  console.log(isValid);
  

  if(!isValid) {
   return res.status(400).json({
    message: "Invalid email or password"
   })
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_Secret,
  );

   res.status(200).json({
     message: "You LoggedIn Successfully",
     data: {
       name: user.name,
       email: user.email,
     },
     token,
   });

})

export default app ; 