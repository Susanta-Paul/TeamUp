import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const userAuthMiddleware= async function(req, res, next){
    try {
        const token=req.cookies?.token || req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({message: "Unauthorized: No token provided"})
        }

        const decoded=jwt.verify(token, process.env.JWTSECRET)
    
        const user=await userModel.findOne({username: decoded.username})
        if(!user){
            return res.status(404).json({message: "no user with this credential found"})
        }
        // check for valid token
        if(!user.token || user.token!=token){
            return res.status(401).json({message: "user is not loggedIn. Login First"})
        }

        req.user=user
        next()
        
    } catch (error) {
        res.status(500).json({message: "something went wrong!"})
    }
}