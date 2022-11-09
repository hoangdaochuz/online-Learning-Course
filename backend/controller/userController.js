const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const getUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const setUser = asyncHandler(async (req, res) => {
  if (!req.body.fullname || !req.body.username || !req.body.password) {
    res.status(400);
    throw Error("Please enter full field");
  }

  const user = await User.create({
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
  });

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw Error("User not found");
  }
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateUser);
});

const deleteUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw Error("User not found");
    }
    await user.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
  getUser,
  setUser,
  updateUser,
  deleteUser
};
