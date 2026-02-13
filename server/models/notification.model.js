import mongoose, {Schema} from "mongoose"

const notificationSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: {
            values:["match", "message", "like", "system"],
            message: '{VALUE} is not a supported type'
        },
        required: true
    },
    data: {
        chatId:{type:Schema.Types.ObjectId, ref:"Chat"},
        senderId:{type:Schema.Types.ObjectId, ref:"User"},
        matchId: {type:Schema.Types.ObjectId, ref:"Match"},
    },
    isRead:{
        type: Boolean,
        required: true,
        default: false,
    },

}, {timestamps: true})


const notificationModel=mongoose.model("Notification", notificationSchema)

export default notificationModel