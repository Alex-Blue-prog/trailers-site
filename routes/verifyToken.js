const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;

    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(JSON.stringify(token), process.env.JWT_SEC, (err,user)=> {
            if(err) res.status(403).json("Token is not valid");

            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated");
    }
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if(req.user.isAdmin){
            next();
        } else{
            return res.status(403).json("you are not allowed to do that");
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAdmin};