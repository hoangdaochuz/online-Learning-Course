const express = require("express");
const router = express.Router();
const {
  getCourses,
  setCourses,
  updateCourses,
  deleteCourses,
  getMyCourse,
  getCourseDetail,
} = require("../controller/courseController");
const { upload } = require("../middleware/uploader");

router.route("/").get(getCourses).post(upload.fields([
  {   
    name: 'image',
    maxCount: 1,
  },{
    name: 'video',
    maxCount: 1,
  }
]),setCourses);
router.route("/:id").put(updateCourses).delete(deleteCourses).get(getCourseDetail);
router.route("/mycourse/:idUser").get(getMyCourse);

module.exports = router;
