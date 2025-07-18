
const User = require('../models/User');
const bcrypt = require('bcryptjs');
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

    }
    catch(e){
        console.error("login is not sucess")
    }
}
module.exports = { registerUser, loginUser };