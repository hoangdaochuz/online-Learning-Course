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
  getLessonsOfChapter,
  addChapterToCourse,
  updateChapterOfCourse,
  deleteChapterOfCourse,
  getSpecificChapter,
  addLessonToChapter,
  updateLessonToChapter,
  deleteLessonOfChapter,
  getSpecificLesson
  
} = require("../controller/courseController");
const { upload } = require("../middleware/uploader");

router.route("/").get(getCourses).post(upload.single('image'),setCourses);
router.route("/:id").put(upload.single('image'),updateCourses).delete(deleteCourses).get(getCourseDetail);
router.route("/mycourse/:idUser").get(getMyCourse);
router.route("/:id/chapter").get(getChaptersOfCourse).post(addChapterToCourse);
router.route("/:id/chapter/:idChapter").put(updateChapterOfCourse).delete(deleteChapterOfCourse).get(getSpecificChapter)
router.route("/:id/chapter/:idChapter/lessons").get(getLessonsOfChapter).post(upload.single('video'),addLessonToChapter);
router.route("/:id/chapter/:idChapter/lessons/:idLesson").put(upload.single('video'), updateLessonToChapter).delete(deleteLessonOfChapter).get(getSpecificLesson)

module.exports = router;
