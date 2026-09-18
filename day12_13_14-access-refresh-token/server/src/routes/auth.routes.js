import userModel from "../models/user.model.js";
import { Router } from "express";
import bcrypt from "bcryptjs"
import { generateToken, verifyAccessToken , verifyRefreshToken } from "../utils/auth.js";

const router = Router(); 

router.post("/register",async (req,res) => {
    let { name, email, password } = req.body;

    let isUserExist = await userModel.findOne({ email });

    if(isUserExist) {
       return res.status(400).json({
            message : "User Already exists",
            errors : [{
                path : "email",
                message : "User Already exists"
            }]
        })
    }

    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12)
    });

    let { accessToken, refreshToken } = generateToken({ userId: user._id });

    user.refreshToken = refreshToken ;
    await user.save() ;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    });

    res.status(201).json({
        message: "user registered successfully",
        data : {
            user : {
                name : user.name,
                email : user.email
            }
        }, 
        accessToken
    })


})

router.get("/me", async (req,res)=>{

    const accessToken = req.headers.authorization?.split(" ")[ 1 ] ;

    try {
        
        const decoded = verifyAccessToken(accessToken);

        const user = await userModel.findById(decoded.id);

          res.status(200).json({
            message: "user fetched successfully",
            data: {
              user: {
                name: user.name,
                email: user.email,
              },
            },
          });

    } catch (error) {
         return res.status(401).json({
           message: "Unauthorized, Invalid or expired access token",
         });
    }
})

router.post("/refresh", async (req,res) => {

    const refreshToken = req.cookies.refreshToken ;

    if(!refreshToken) {
        res.status(401).json({
            message : "Unauthorized, refresh token not  found."
        })
    }

    

    try {

        const decoded = verifyRefreshToken(refreshToken);

        const user = await userModel.findById(decoded.id);

        if(refreshToken !== user.refreshToken) {
            user.refreshToken = null ;
            await user.save();

            return res.status(401).json({
                message : "Unauthorized , refresh token mismatch."
            })
        }

        let { accessToken, refreshToken: newRefreshToken } = generateToken({
          userId: user._id,
    });

        res.cookie("refreshToken", newRefreshToken , {
            httpOnly: true
        }) ;
        
        user.refreshToken = newRefreshToken ; 
        await user.save();

        res.status(200).json({
            message : "Tokens refreshed succesfully",
            accessToken
        })
        
    } catch (error) {
        res.status(401).json({
          message: "Unauthorized,Invalid or expired Refresh Token.",
        });
    }


})

export default router; 