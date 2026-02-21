import cookie from "cookie-parser"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

const mountJoinChatEvent=(socket)=>{
    socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId)=>{
        console.log("User joined the chat 🤝. chatId:", chatId)
        socket.join(chatId);
    })
}

const startTypingEvent=(socket)=>{
    socket.on(ChatEventEnum.START_TYPING_EVENT, (chatId)=>{
        socket.in(chatId).emit(ChatEventEnum.START_TYPING_EVENT, chatId)
    })
}

const stopTypingEvent=(socket)=>{
    socket.on(ChatEventEnum.STOP_TYPING_EVENT, (chatId)=>{
        socket.in(chatId).emit(ChatEventEnum.STOP_TYPING_EVENT, chatId)
    })
}

export const socketConnection= (io)=>{
    return io.on("connection", async (socket)=>{
        console.log("successfully connected Socket:", socket.id)
        try {
            
            const cookies=cookie.parse(socket.handshake.headers?.cookie) || ""
            const token= cookies?.token || socket.handshake.auth?.token

            if(!token){
                throw new Error("Un-authorized handshake. Token is missing")
            }

            const decodedToken = jwt.verify(token, process.env.JWTSECRET);
            const user= await userModel.findById(decodedToken._id)

            if(!user || !user.token ){
                throw new Error("Un-authorized handshake. Token is invalid")
            }

            socket.user=user
            socket.join(user._id.toString())
            console.log("Socket Connected Successfully")

            mountJoinChatEvent(socket)
            startTypingEvent(socket)
            stopTypingEvent(socket)

        } catch (error) {
            socket.emit(
                ChatEventEnum.SOCKET_ERROR_EVENT,
                error?.message || "Something went wrong while connecting to the socket."
            );
        }
    })
}

export const emitSocketEvent=(req, roomId, event, payload)=>{
    req.app.get("io").in(roomId).emit(event, payload)
}