import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const authentication = async (req,res,next)=> {
  const token = req.headers.authorization;

  if(!token) {
    res.status(401).json({
        message : "Token Not Found"
    })
  }

  const data = jwt.verify(token, process.env.JWT_Secret);

  let user = await userModel.findById(data.id);

  req.user = user ;

  next();

}

export default authentication ;