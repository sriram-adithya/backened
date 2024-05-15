const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");


function adminMiddleware(req,res,next){
    const token = req.headers.authorization;
    const word = token.split(" ");
    const jwtToken = word[1];
    const decodedValue = jwt.verify(jwtToken,JWT_SECRET)

    if(decodedValue.username){
        next();
    }else{
        res.status(403).json({
            msg:"You are not autheticated"
        })
    }
}

module.exports = adminMiddleware;