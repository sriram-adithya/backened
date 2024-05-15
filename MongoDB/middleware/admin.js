const { Admin } = require("../db/index");

// Middleware for handling auth
const adminMiddleware =(req,res,next) =>{
const username = req.headers.username;
const password = req.headers.password;
// You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
Admin.findOne({
    username:username,
    password:password
})
.then(function(value){
    if(value){
        next();
    }else{
        res.status(403).json({
            msg:"Admin doesn't exist"
        })
    }
})
}

module.exports = adminMiddleware;