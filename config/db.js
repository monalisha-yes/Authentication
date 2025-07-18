const mongoose = require('mongoose');
const ConnectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log("database connected successfully");

    }
    catch(e){
        console.error("connection failed")
        process.exit(1);
    }
}
module.exports = ConnectToDb;