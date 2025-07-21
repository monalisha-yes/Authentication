require('dotenv').config();
const express = require('express');
const ConnectToDb = require('./config/db');
const authRoutes = require('./routes/auth_routes');
const homeRoutes = require('./routes/home_routes');
const adminRoutes = require('./routes/admin_routes');
ConnectToDb();

const app = express();

const PORT = process.env.PORT || 3000


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.listen(PORT, ()=>{
    console.log("server is running");
})