import { validationResult } from "express-validator";
import userModel from "../models/user.model.js"
import { createUserService } from "../services/index.services.js";


export const registerController= async function(req, res){
    const validationErrors= validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({
            message: validationErrors.array()
        })
    }

    const {username, email, password}=req.body

    // check if there any other user with this email and username
    const existingUser= await userModel.findOne({$or: [{username}, {email}]})
    if(existingUser){
        return res.status(400).json({
            message: "user with this username and/or email already exists"
        })
    }
    // hash the password
    const hashedPasword= await userModel.hashPassword(password)
    // create new user
    try {
        const user= await createUserService({username, email, hashedPasword})

        // create token
        const token=await user.generateToken()

        //set token to cookies
        res.cookie('token', token, {httpOnly: true})

        res.status(201).json({user, token, message: "user Created Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Something went Wrong!"})
    }
}

export const loginController= async (req, res)=>{
    const validationErrors= validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({
            message: validationErrors.array()
        })
    }
}