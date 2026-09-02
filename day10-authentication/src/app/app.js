import express from "express"; 
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json()); 

app.post("/user", (req,res) => {

   let {name, email, password} = req.body ; 

   let data = jwt.sign(
     {
       name,
       email,
     },

     "9815157334ee6316acc03cb8d6e9ded6e0119ea29e98167b3d27e29182522e8bed7f7ca5",
   );

   res.status(201).json({
    message : "Data Create Successfully",
    data : {
        name,
        email
    }, 
    token : data
   })

})

export default app ; 