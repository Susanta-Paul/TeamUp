import {Router} from "express"
import {userAuthMiddleware} from "../middleware/auth.middleware.js"
import { acceptMatchRequestController, getAllMatchesController, 
    getReleventProfilesController, rejectMatchRequestController, 
    unmatchPeopleController, userSwipeController, whomISwipedController, 
    whoswipedMeController } from "../controllers/match.controller.js"

const matchRouter=Router()

matchRouter.post("/swipe/:userId", userAuthMiddleware, userSwipeController)
matchRouter.get("/profiles", userAuthMiddleware, getReleventProfilesController)
matchRouter.get("/swiped", userAuthMiddleware, whomISwipedController)
matchRouter.get("/swipedby", userAuthMiddleware, whoswipedMeController)
matchRouter.get("/accept/:matchid", userAuthMiddleware, acceptMatchRequestController)
matchRouter.get("/allmatches", userAuthMiddleware, getAllMatchesController)
matchRouter.get("/reject/:matchid", userAuthMiddleware, rejectMatchRequestController)
matchRouter.get("/unmatch/:matchid", userAuthMiddleware, unmatchPeopleController)


export default matchRouter;