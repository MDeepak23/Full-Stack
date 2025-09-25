const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const jwtauth = function jwtauth(req,res,next){
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1];
    if(!token){
        return res.status(403).send("Token required");
    }
    jwt.verify(token,process.env.secretkey,(err,user)=>{
        if(err){
           return res.status(403).send("Invalid token"); 
        }
        req.user = user;
        next();
    })
}
module.exports = jwtauth;