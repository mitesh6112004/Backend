import mongoose from "mongoose"
import config  from "./config.js";

export async function ConnectDB(){
   
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB Connected");
    
}