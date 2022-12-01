const mongoose = require('mongoose');
const Lesson = require('../models/lessonModel')
const fs = require('fs');

const uploadLesson = (req, res, next)=>{
    const url = req.protocol +"://" + req.get('host')
    console.log(req.file.path)
    const lesson = new Lesson({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        video: url+'/public/'+req.file.filename
    });
    lesson.save().then(result=>{
        res.status(200).json({
            _id: result._id,
            title: result.title,
            video: result.video,
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error: err,
        })
    })
}

const getLesson = (req, res, next) => {
    Lesson.find().then(data=>{
        res.status(200).json({
            data: data
        })
    })
}

module.exports = {uploadLesson, getLesson}