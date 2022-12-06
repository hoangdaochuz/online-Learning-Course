const express = require("express");
const router = express.Router();
const {
  getCourses,
  setCourses,
  updateCourses,
  deleteCourses,
  getMyCourse,
  getCourseDetail,
  getChaptersOfCourse,
  getLessonsOfChapter

} = require("../controller/courseController");
const { upload } = require("../middleware/uploader");

router.route("/").get(getCourses).post(upload.single('image'),setCourses);
router.route("/:id").put(updateCourses).delete(deleteCourses).get(getCourseDetail);
router.route("/mycourse/:idUser").get(getMyCourse);
router.route("/:id/chapter").get(getChaptersOfCourse);
router.route("/:id/chapter/:idChapter").get(getLessonsOfChapter);

module.exports = router;
