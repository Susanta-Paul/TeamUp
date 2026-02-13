import mongoose, {Schema} from "mongoose"

const messageSchema=new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: {
            values:["text", "image", "audio", "file"],
            message: '{VALUE} is not a supported type'
        },
        required: true
    },
    status:{
        type: String,
        enum:{
            values: ["sent", "delivered", "seen"],
            message: '{VALUE} is not a supported status'
        },
        required: true
    },

}, {timestamps: true})

const messageModel=mongoose.model("Message", messageSchema)

export default messageModel