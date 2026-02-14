import {Router} from "express"
import { userAuthMiddleware } from "../middleware/auth.middleware.js";

const userRouter=Router()

userRouter.get("/profile", userAuthMiddleware, userGetProfileController)


export default userRouter;