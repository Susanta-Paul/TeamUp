import {Router} from "express"
import userRouter from "./user.routes.js"
import matchRouter from "./matches.routes.js"
import messageRouter from "./messages.routes.js"
import {loginValidation, registerValidation} from "../validations/index.validations.js" 
import {registerController, loginController} from "../controllers/index.controller.js" 

const indexRouter=Router()

indexRouter.post("/register",registerValidation, registerController)
indexRouter.post("/login",loginValidation,loginController )
indexRouter.get("/logout",(req,res)=>{})


indexRouter.use("/user", userRouter)
indexRouter.use("/match",matchRouter)
indexRouter.use("/message",messageRouter)


export default indexRouter;