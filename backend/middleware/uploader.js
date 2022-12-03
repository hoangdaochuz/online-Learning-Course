const path  = require('path')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const DIR = './backend/public/'

const {storage} = require('../util/cloudinary')

const upload = multer({
    storage: storage,
})
module.exports = {upload}