import mongoose, {Schema} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema= new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [4, "username must be at least 4 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [10, "Email must be at least 14 characters long"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password must be at least 6 characters long"],
        select: false
    },
    token: {
        type: String,
        default: null
    },
    fullname: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        default: ""
    },
    location:{
        city: String,
        state: String,
        country: String
    },
    skills:{
        type: [String]
    },
    interests:{
        type: [String]
    },
    goal: {
        type: String,
        enum: {
            values: ["Hackathon", "Study Buddy", "Co-Founder"],
            message: '{VALUE} is not a supported goal'
        }
    },
    isOnline:{
        type: Boolean,
        required: true,
        default: false
    },
    lastSeen:{
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

// Statics vs. Methods:

// .statics are methods called on the Model (e.g., User.comparePassword()).

// .methods are called on a document instance (e.g., user.comparePassword()).

// Since password comparison and token generation need access to a specific user's data 
// (this.password or this._id), they should be methods.

userSchema.statics.hashPassword=async function (password){
    return await bcrypt.hash(password, 10)
}
userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken= function(){
    return jwt.sign({_id: this._id, username: this.username}, process.env.JWTSECRET)
}
userSchema.statics.verifyToken= function(token){
    return jwt.verify(token, process.env.JWTSECRET)
}

const userModel=mongoose.model("User", userSchema)

export default userModel