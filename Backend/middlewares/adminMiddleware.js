export const admin = (req , res , next) => {
    if (req.user && req.user.role === "admin"){
        return next()
    }
    return res.status(403).json({message : "acces denied . Only admin can access this "})
}