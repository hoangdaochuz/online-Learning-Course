const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/uploader");

const {
  getBlogs,
  addBlogs,
  editBlog,
  deleteBlog,
  getInfoBlog
} = require("../controller/blogController");

router.route("/list").get(getBlogs);
router.route("/add").post(upload.single('image'), addBlogs);
router.route("/:id").put(upload.single('image'), editBlog).delete(deleteBlog);
router.route("/detail/:id").get(getInfoBlog)
module.exports = router;
