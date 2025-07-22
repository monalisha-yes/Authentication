//const { application } = require('express');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api: process.env.CLOUD_API,
    secret: process.env.CLOUD_API_SECRET
})
module.exports = cloudinary;