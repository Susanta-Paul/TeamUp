import userModel from "../models/user.model.js"

export const createUserService= async function({username, email, password}){
    if(!username || !email || !password){
        throw new Error("All fields are required")
    }

    try {
        const newUser= await userModel.create({
            username, email, password
        })

        return newUser
    } catch (error) {
        throw error
    }
}