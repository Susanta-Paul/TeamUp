import {Router} from "express"
import { userAuthMiddleware } from "../middleware/auth.middleware.js";
import { userChangePasswordValidation, userProfileUpdateValidation } from "../validations/user.validations.js";
import { userChangePasswordController, userGetProfileController, userProfileUpdateController } from "../controllers/user.controller.js";

const userRouter=Router()

userRouter.get("/profile", userAuthMiddleware, userGetProfileController)
userRouter.post("/updateProfile",userAuthMiddleware, userProfileUpdateValidation, userProfileUpdateController)
userRouter.post("/changePassword", userAuthMiddleware,userChangePasswordValidation, userChangePasswordController)


export default userRouter;