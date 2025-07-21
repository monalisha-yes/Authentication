const express = require('express');
const authMiddleware = require('../middleware/auth_middleware')

const router = express.Router();

router.get('/welcome', authMiddleware, (req, res)=>{
    const {username, userId, role}= req.userInfo;
    res.json({
        user:{
            _id : userId,
            username,
            role
        },
        
        message : "welcome to the home page"

    });
});
module.exports = router