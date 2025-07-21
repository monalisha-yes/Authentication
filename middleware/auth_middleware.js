const jwt =require('jsonwebtoken');
const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

if(!token){
    return res.json("acess denied, no token provided");
}
//decode the token
try{
const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
console.log(decodedtoken);
req.userInfo = decodedtoken;
next();
}catch(e){
    console.error(e);
}
    
};
module.exports = authMiddleware;