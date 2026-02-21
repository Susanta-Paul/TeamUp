import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js"
import mongoose from "mongoose";
import {emitSocketEvent} from "../socket/socket.js"
import {ChatEventEnum} from "../constants.js"


// needs to finish this controller
export const getAllMessagesController= async function(req, res){

    const {chatId}=req.params;
    try {
        const chat= await chatModel.findById(chatId)
        if(!chat){
            return res.status(404).json({message: "Chat does not exist"})
        }
    } catch (error) {
        
    }

}

export const sendMessageController= async function(req, res){

    const {chatId}=req.params;
    const {content}=req.body;
    try {

        const chat= await chatModel.findOne({
            _id: new mongoose.Types.ObjectId(chatId),
            participants: req.user._id
        })

        if(!chat){
            return res.status(400).json({message: "Chat does not exist"})
        }

        const newMessage= await messageModel.create({
            senderId: req.user?._id,
            chatId: chat._id,
            content: content,
            type: "text",
            status: "sent"
        })

        const newChat= await chatModel.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(chatId)},
            {
                $set:{lastMessage: newMessage._id}
            },
            {new: true}
        )

        newChat.participants.forEach((user)=>{
            if (user._id.toString()==req.user._id.toString()) return 
            emitSocketEvent(req, chatId,ChatEventEnum.MESSAGE_RECEIVED_EVENT,message)
        })
        return res.status(201).json({newChat, message: "Message Saved Successfully"})
        
    } catch (error) {
        
    }

}

export const deleteMessageController= async function(req, res){

    const {chatId, messageId}=req.params
    try {
        const chat= await chatModel.findOne({
            _id: new mongoose.Types.ObjectId(chatId),
            participants: req.user?._id
        })

        if(!chat){
            return res.status(404).json({message: "Chat does not exist"})
        }

        const message= await messageModel.findOne({
            _id: new mongoose.Types.ObjectId(messageId)
        })

        await messageModel.deleteOne({
            _id: new mongoose.Types.ObjectId(messageId)
        })

        if(chat.lastMessage._id.toString()===message._id.toString()){
            // update the last message of chat model
            const lastMessagePoint= await messageModel.findOne(
                {chatId: new mongoose.Types.ObjectId(chatId)},
                {},
                { sort: { createdAt: -1 } }
            )

            await chatModel.findByIdAndUpdate(chatId, {
                lastMessage: lastMessagePoint?._id || null
            })
        }

        chat.participants.forEach((user)=>{
            if (user._id.toString()==req.user._id.toString()) return 

            emitSocketEvent(req, chatId,ChatEventEnum.MESSAGE_DELETE_EVENT,message)
        })

        return res.status(200).json({message: "Message deleted successfully"})
        
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }

}