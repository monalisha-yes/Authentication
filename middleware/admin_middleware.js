const isAdminUser = (req, res, next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.json("acess denied!. you can not log in")
    }

    next()
}
module.exports = isAdminUser