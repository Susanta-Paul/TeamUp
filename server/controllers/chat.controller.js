import chatModel from "../models/chat.model.js";
import mongoose from "mongoose"

export const getChatController= async function(req, res){

    const {chatId}=req.params;
    try {
        const chat= await chatModel.findOne({
            _id: new mongoose.Types.ObjectId(chatId),
            participants: req.user?._id
        })

        if(!chat){
            return res.status(400).json({message: "Chat doesn't exists"})
        }

        return res.status(200).json({chat})

    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }

}

export const deleteChatController= async function(req, res){
    
    const {chatId}=req.params;
    try {
        const chat= await chatModel.findOne({
            _id: new mongoose.Types.ObjectId(chatId),
            participants: req.user?._id
        })

        if(!chat){
            return res.status(400).json({message: "Chat doesn't exists"})
        }

        // delete the chat
        await chatModel.findByIdAndDelete(chat._id)

        return res.status(200).json({message: "Chat deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }
}

export const getAllChatsController= async function(req, res){
    
    try {
        const allChats= await chatModel.find({
            participants: req.user?._id
        })
        .populate("participants", "username photo")
        .sort({ updatedAt: -1 })

        return res.status(200).json({allChats})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }

}