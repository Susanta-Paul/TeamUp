

export const userGetProfileController= async function(req, res){
    return res.status(200).json({user: req.user})
}