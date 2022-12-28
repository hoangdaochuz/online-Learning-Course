const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/uploader");

const {
  getBlogs,
  addBlogs
} = require("../controller/blogController");

router.route("/list").get(getBlogs);
router.route("/add").post(upload.single('image'), addBlogs);
module.exports = router;
