import mongoose, {Schema} from "mongoose"

const matchSchema=new Schema({
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum:{
            values: ["pending", "matched", "rejected"],
            message: '{VALUE} is not a supported status'
        },
        required: true
    },
}, {timestamps: true})


const matchModel=mongoose.model("Match", matchSchema)

export default matchModel