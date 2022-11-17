const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter a name"],
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    email:{
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
    },
    job:{
      type: String,
      required: [true, "Please enter a job"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User',userSchema)