import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function generateToken({ userId }){

    const accessToken = jwt.sign({id : userId}, config.ACCESS_JWT ,{expiresIn : "15m"})
    const refreshToken = jwt.sign({id : userId}, config.REFRESH_JWT ,{expiresIn : "7d"})

    return {
        accessToken, 
        refreshToken

    }
        
    
}

export function verifyAccessToken(token){

    const decoded = jwt.verify(token, config.ACCESS_JWT);
    return decoded;
}

export function verifyRefreshToken(token) {
    const decoded = jwt.verify(token, config.REFRESH_JWT) ; 
    return decoded ;
}