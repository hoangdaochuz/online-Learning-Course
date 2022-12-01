const path  = require('path')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const DIR = './backend/public/'
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, DIR)
    }, 
    filename: function(req, file, callback) {
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        callback(null, uuidv4()+'-'+filename )
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback)=>{
        if(file.mimetype=='video/mp4'){
            callback(null,true)
        }else{
            callback(null,false);
            return callback(new Error('Only .mp4'))
        }
    }
})
module.exports = {storage, upload}