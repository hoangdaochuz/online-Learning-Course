const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const fs = require('fs')
cloudinary.config({
    cloud_name: 'duwue5tbf',
    api_key: '619411272453177',
    api_secret: '7lNN7msL4C7mifEYMtkGGv6G_hU'
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'courses',
        resource_type: 'auto'
    }
})


module.exports = {storage}