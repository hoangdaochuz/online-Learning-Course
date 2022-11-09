const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const getGoals = asyncHandler(async (req, res) => {
  const course = await Course.find();
  res.status(200).json(course);
});
const setGoals = asyncHandler(async (req, res) => {
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
const updateGoals = asyncHandler(async (req, res) => {
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
const deleteGoals = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  if(!course){
    res.status(400)
    throw Error(`Course not found`);
  }
  await course.remove()
  res.status(200).json({id: req.params.id});

});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
