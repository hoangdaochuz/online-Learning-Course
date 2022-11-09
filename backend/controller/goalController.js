const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require('../models/userModel')
const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find({user: req.user.id});
   res.status(200).json(goal);
});
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a  text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(`Goal not found`);
  }

  const user = await User.findById(req.user.id)
  // check for user
  if(!user){
    res.status(401)
    throw new Error(`User not found`);
  }

  if(goal.user.toString()!==user.id){
    res.status(401)
    throw new Error('User not authorized')
  }
  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
});
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw Error(`Goal not found`);
  }

  const user = await User.findById(req.user.id)
  // check for user
  if(!user){
    res.status(401)
    throw new Error(`User not found`);
  }

  if(goal.user.toString()!==user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()
  res.status(200).json({id: req.params.id});

});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
