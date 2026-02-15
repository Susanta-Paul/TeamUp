import {validationResult} from "express-validator"
import userModel from "../models/user.model.js"

export const userGetProfileController= async function(req, res){
    return res.status(200).json({user: req.user})
}

export const userProfileUpdateController=async function(req, res){
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const inputs=req.body

    try {
        const user= await userModel.findOneAndUpdate(
            {username: req.user.username},
            {
                fullname: inputs.fullname || req.user.username,
                skills: inputs.skills || [],
                interests: inputs.interests || [],
                goal: inputs.goal,
                location:{
                    city: inputs.city || "",
                    state: inputs.state || "",
                    country: inputs.country || ""
                }
            },
            {upsert: true, new: true}
        )

        return res.status(201).json({message: "User Updated Successfully", user})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong!"})
    }
}

export const userChangePasswordController= async function(req, res){

    const validationErrors=validationResult(req)
    if(!validationErrors.isEmpty()){
        return res.status(400).json({message: validationErrors.array()})
    }

    try {

        const {oldPassword, newPassword}=req.body

        const user= await userModel.findOne({username: req.user.username}).select("+password")

        const isMatch=await user.comparePassword(oldPassword)
        if(!isMatch){
            return res.status(400).json({message: "Incorrect current password"})
        }

        const newHashedPassword= await userModel.hashPassword(newPassword)

        await userModel.findOneAndUpdate(
            {username: req.user.username},
            {password: newHashedPassword}
        )

        return res.status(201).json({message: "Password changed successfully"})

    } catch (error) {
        return res.status(500).json({message: "Something went wrong!"})
    }
}