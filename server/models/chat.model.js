import mongoose, {Schema} from "mongoose"

const chatSchema=new Schema({
    participants: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        validate: [val => val.length === 2, "A chat must have exactly 2 participants"],
        required: true
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "message"
    },
    lastMessageAt: {
        type: Date,
    },
    isActive:{
        type: Boolean,
        default: false
    }

}, {timestamps: true})

const chatModel=mongoose.model("Chat", chatSchema)

export default chatModel