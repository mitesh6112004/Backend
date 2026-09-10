import dotenv from "dotenv";
dotenv.config() ;

const config = {
     MONGO_URI : process.env.MONGO_URI,
     ACCESS_JWT : process.env.ACCESS_JWT,
     REFRESH_JWT : process.env.REFRESH_JWT
}


export default config ;