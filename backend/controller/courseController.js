const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose')
const Course = require("../models/courseModel");
const getCourses = asyncHandler(async (req, res) => {
  const course = await Course.find();
  res.status(200).json(course);
});
const setCourses = asyncHandler(async (req, res) => {
  const {userID, name, description, price}  = req.body;
  const image = req.files.image[0].path
  const video = req.files.video[0].path
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please enter a  text field");
  }

  const course = await Course.create({
    _id: new mongoose.Types.ObjectId(),
    user: userID,
    name: name,
    image: image,
    description: description,
    student: [],
    content: video,
    rating: 0,
    price: price
  });

  res.status(200).json(course);
});
const updateCourses = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error(`Course not found`);
  }
  const updateCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateCourse);
});
const deleteCourses = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  if(!course){
    res.status(400)
    throw Error(`Course not found`);
  }
  await course.remove()
  res.status(200).json({id: req.params.id});

});

const getMyCourse = asyncHandler(async (req, res) => {
  const id = req.params.idUser
  const course = await Course.find({id})
  if(!course){
    res.status(400);
    throw new Error(`Course not found`)
  }else{
    res.json(course)
  }
})

const getCourseDetail = asyncHandler(async (req, res)=>{
  const course = await Course.findById(req.params.id)
  if(!course){
    res.status(400);
    throw new Error(`Course not found`)
  }else{
    res.status(200).json(course)
  }
})

module.exports = {
  setCourses,
  getCourses,
  updateCourses,
  deleteCourses,
  getMyCourse,
  getCourseDetail,
};
