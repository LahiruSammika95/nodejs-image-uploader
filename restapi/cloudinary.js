  
//require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dzfkeu1si",
    api_key: "287171622571245",
    api_secret:"qPQQtuGvH2_XsS048HNMD-tKg5g",
});

module.exports = { cloudinary };