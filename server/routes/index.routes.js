import {Router} from "express"
import userRouter from "./user.routes.js"
import matchRouter from "./matches.routes.js"
import messageRouter from "./message.routes.js"
import chatRouter from "./chat.routes.js"
import {loginValidation, registerValidation} from "../validations/index.validations.js" 
import {registerController, loginController, logOutController} from "../controllers/index.controller.js" 
import { userAuthMiddleware } from "../middleware/auth.middleware.js"

const indexRouter=Router()

indexRouter.post("/register",registerValidation, registerController)
indexRouter.post("/login",loginValidation,loginController )
indexRouter.get("/logout",userAuthMiddleware,logOutController)


indexRouter.use("/user", userRouter)
indexRouter.use("/match",matchRouter)
indexRouter.use("/message",messageRouter)
indexRouter.use("/chat",chatRouter)


export default indexRouter;