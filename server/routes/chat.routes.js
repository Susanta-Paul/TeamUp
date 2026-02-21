import {Router} from "express"
import { userAuthMiddleware } from "../middleware/auth.middleware.js";
import { deleteChatController, getAllChatsController, getChatController } from "../controllers/chat.controller.js";

const chatRouter=Router()

chatRouter.get("get/:chatId", userAuthMiddleware, getChatController)
chatRouter.get("delete/:chatId", userAuthMiddleware, deleteChatController)
chatRouter.get("getallchat", userAuthMiddleware, getAllChatsController)


export default chatRouter;