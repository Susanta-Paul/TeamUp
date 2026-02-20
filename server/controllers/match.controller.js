import matchModel from "../models/match.models.js"


export const whomISwipedController= async function(req, res) {
    
    try {
        const swipedList= await matchModel.find({
            fromUser: req.user._id, status: "pending"
        }).populate('toUser', '-email')

        return res.status(200).json({swipedList})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }

}

export const whoswipedMeController= async function(req, res) {

    try {
        const swipedList= await matchModel.find({
            toUser: req.user._id, status: "pending"
        }).populate("fromUser", "-email" )

        return res.status(200).json({swipedList})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }
    
}

export const acceptMatchRequestController= async function(req, res) {

    const {matchId}=req.params;
    try {
        const model= await matchModel.findById(matchId)
        if(model.toUser.toString()!=req.user._id.toString()){
            return res.status(403).json({message: "can't accept the requset who initiated it"})
        }

        await matchModel.findByIdAndUpdate(matchId, {status: "matched"})

        return res.status(200).json({message: "both user matched successfully"})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }
    
}

export const rejectMatchRequestController= async function(req, res) {

    const {matchId}=req.params;
    try {
        await matchModel.findByIdAndUpdate(matchId, {status: "rejected"})
        return res.status(200).json({message: "match request rejected successfully"})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }
    
}

export const getAllMatchesController= async function(req, res) {

    try {
        const allMatches= await matchModel.find({
            $or: [{fromUser: req.user._id}, {toUser: req.user._id}],
            status: "matched"
        }).populate("fromUser", "-email").populate('toUser', "-email").lean()

        const simplifiedMatches= allMatches.map(match=>{
            const otherUser= match.fromUser._id.toString()=== req.user._id.toString()
                ?match.toUser: match.fromUser

            return{
                matchId: match._id,
                user: otherUser,
                matchedAt: match.createdAt
            }
        })

        return res.status(200).json({allMatches: simplifiedMatches})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }
    
}

export const unmatchPeopleController= async function(req, res) {

    const {matchId}=req.params;
    try {
        await matchModel.findByIdAndDelete(matchId)
        return res.status(200).json({message: "Users Successfully UnMatched"})
    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }
    
}

export const getReleventProfilesController= async function(req, res) {
    
}

export const userSwipeController= async function(req, res) {
    
    const {userId}=req.params;
    try {
        if(userId.toString()===req.user._id.toString()){
            return res.status(400).json({message: "You cannot swipe on yourself!"})
        }

        const existingConnection = await matchModel.findOne({
            $or: [
                { fromUser: req.user._id, toUser: userId },
                { fromUser: userId, toUser: req.user._id }
            ]
        });

        if(existingConnection){
            if (existingConnection.status === "matched") {
                return res.status(400).json({ message: "You are already matched!" });
            }

            // Case 2: You already swiped (Duplicate)
            if (existingConnection.fromUser.toString() === req.user._id.toString()) {
                return res.status(400).json({ message: "Action already performed" });
            }

            // Case 3: They swiped you first (Handshake)
            if (existingConnection.toUser.toString() === req.user._id.toString()) {
                existingConnection.status = "matched";
                await existingConnection.save();
                return res.status(200).json({ message: "You found a match!" });
            }
        }

        const match= await matchModel.create({
            fromUser: req.user._id,
            toUser: userId,
            status: "pending"
        })

        return res.status(201).json({ message: "Swipe recorded", match })

    } catch (error) {
        return res.status(500).json({message: "Something Went Wrong!"})
    }
}