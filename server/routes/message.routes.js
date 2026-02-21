import {Router} from "express"
import { userAuthMiddleware } from "../middleware/auth.middleware.js";
import { deleteMessageController, getAllMessagesController, sendMessageController } from "../controllers/message.controller.js";

const messageRouter=Router()

messageRouter.get("getallmessages/:chatId", userAuthMiddleware, getAllMessagesController)
messageRouter.post("send/:chatId", userAuthMiddleware, sendMessageController)
messageRouter.get("delete/:chatId/:messageId", userAuthMiddleware, deleteMessageController)

export default messageRouter;