
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerUser = async(req , res)=>{
    try{
        const {username, email, password, role}= req.body;
        const checkDetails = await User.findOne({$or : [{username}, {email}]})
        if(checkDetails){
            return res.json({
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newlyUSer = new User({
            username ,
            email,
            password: hashedPassword,
            role : role ||'user'
        })
        await newlyUSer.save();
        if(newlyUSer){
            res.status(201).json({
                message: "user registered sucessfully"});
        }
        else{
            res.json({
                message : "error"
            })
        }

    }
    catch(e){
        console.error(e);
    }
}

const loginUser = async(req, res)=>{
    try{
        const {username, password} = req.body;
    
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success : false,
                message : 'Invalid Username or Password'
            })
        }

        //if the password is correct or not.

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.json({
            message: 'password is incorrect',
            //data : user.password
        });
    }
    const accessToken = jwt.sign(
    {
        userId : user._id,
        username : user.username,
        role: user.role,
    }, process.env.JWT_SECRET_KEY,{
        expiresIn : '15m',
    })

    res.status(200).json({
        message : 'logged in successfully',
        accessToken
    })
    }
    catch(e){
    console.error("Login error:", e.message);
    res.status(500).json({ message: "Internal server error" });
}
}
module.exports = { registerUser, loginUser };