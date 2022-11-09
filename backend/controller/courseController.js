const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const getCourses = asyncHandler(async (req, res) => {
  const course = await Course.find();
  res.status(200).json(course);
});
const setCourses = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please enter a  text field");
  }

  const course = await Course.create({
    name: req.body.name,
    description: req.body.description,
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

module.exports = {
  setCourses,
  getCourses,
  updateCourses,
  deleteCourses,
};
