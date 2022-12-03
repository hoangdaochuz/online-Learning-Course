const mongoose = require('mongoose');
const Lesson = require('../models/lessonModel')
const asyncHandler = require("express-async-handler");
// const fs = require('fs');
// const {storage} = require('../util/cloudinary')
const cloudinary = require('cloudinary').v2

const uploadLesson =asyncHandler(async(req, res, next)=>{
    
    cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        chunk_size: 600000000
    })
    .then(async(result)=>{
        console.log(result)
        const lesson = await Lesson.create({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            video: result.secure_url
        })

        if(lesson){

            res.status(200).json({result: result})
        }else{
            res.status(400).json({message: 'Error'})
        }

    })
})

const getLesson = (req, res, next) => {
    Lesson.find().then(data=>{
        res.status(200).json({
            data: data
        })
    })
}

module.exports = {uploadLesson, getLesson}