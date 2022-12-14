const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose')
const Course = require("../models/courseModel");

const db  = require('../mysqldb/db')
const getCourses = asyncHandler(async (req, res) => {
  const result = await db.connection.execute(`SELECT * FROM course`);
  const course = result[0];
  res.status(200).json(course);
});

const setCourses = asyncHandler(async (req, res) => {
  const {userID, name, description, price, rating}  = req.body;
  const image = req.file.path

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please enter a  text field");
  }
  const result = await db.connection.execute("insert into course(id_author,name,image,description,rating,price) values(?,?,?,?,?,?)",[userID,name,image,description,rating, price])
  if(result){
    res.status(200).json({status: 'success'});
  }else{
    res.status(400).json({status: 'error'});
  }
});

const updateCourses = asyncHandler(async (req, res) => {
  const id = req.params.id
  const {name, description, price}  = req.body;
  let course = null;
  if(!req.file){
    course = await db.connection.execute('UPDATE course SET course.name = ?, course.description = ?, course.price = ? WHERE course.id = ?',[`${name}`,`${description}`,price, id])
  }else{
    const image = req.file.path
    course = await db.connection.execute('UPDATE course SET course.name = ?, course.image= ?, course.description = ?, course.price = ? WHERE course.id = ?',[`${name}`,image, `${description}`,price, id])
  }
  
  // const course = await Course.findById(req.params.id);

  
  if (!course) {
    res.status(400).json({status:'error'})
  }else{
    res.status(200).json({status: 'success'});
  }
  
});
const deleteCourses = asyncHandler(async (req, res) => {
  const id = req.params.id
  let result = null;
  let deleteChapter = null;
  let deleteCourseUser = null;
  const deleteLesson = await db.connection.execute('DELETE FROM lesson WHERE lesson.id_course = ? ',[id])
  if(deleteLesson){
    deleteChapter  = await db.connection.execute('DELETE FROM chapter where chapter.id_course = ? ',[id])
  }
  if(deleteChapter){
    deleteCourseUser = await db.connection.execute('DELETE FROM user_course WHERE user_course.id_course = ?',[id])
  }
  if(deleteCourseUser){
    result = await db.connection.execute('DELETE FROM course WHERE course.id = ? ',[id])
  }
  if(result){
    res.status(200).json({status: 'success'});
  }else{
    res.status(400).json({status: 'error'})
  }

});

const getMyCourse = asyncHandler(async (req, res) => {
  const id = req.params.idUser
  // const course = await Course.find({id})
  const course = await db.connection.execute("SELECT * FROM course where course.id_author = ?",[`${id}`])
  if(!course){
    res.status(400);
    throw new Error(`Course not found`)
  }else{
    res.json(course[0])
  }
})

const getCourseDetail = asyncHandler(async (req, res)=>{
  const course = await db.connection.execute(`SELECT * FROM course where course.id = ?`,[req.params.id])
  if(!course){
    res.status(400);
    throw new Error(`Course not found`)
  }else{
    res.status(200).json(course[0][0])
  }
})

// ================CHAPTER ========================
const getChaptersOfCourse = asyncHandler(async(req,res)=>{
  const id = req.params.id
  const {name} = req.body
  const chapters = await db.connection.execute('SELECT * FROM chapter WHERE chapter.id_course = ?',[id])
  if(!chapters){
      res.status(400)
      throw new Error('Chapter not found')
  }else{
    res.status(200).json(chapters[0])
  }
})

const getSpecificChapter = asyncHandler(async(req, res)=>{
  const idChapter = req.params.idChapter
  const chapter = await db.connection.execute('SELECT * FROM chapter where chapter.id = ?',[idChapter])
  if(chapter){
    res.status(200).json(chapter[0][0])
  }else{
    res.status(400)
    throw new Error('Chapter not found')
  }
})

const addChapterToCourse = asyncHandler(async(req,res)=>{
  const idCourse = req.params.id
  const {name} = req.body
  const result = await db.connection.execute('INSERT INTO chapter(id_course, name) values(?,?)',[idCourse, name])
  if(result){
    res.status(200).json({status: 'success'})
  }else{
    res.status(400).json({status: 'error'})
  }
})

const updateChapterOfCourse = asyncHandler(async (req, res)=>{
  const idCourse = req.params.id
  const idChapter = req.params.idChapter
  const {name} = req.body
  const result = await db.connection.execute('UPDATE chapter SET chapter.name = ? WHERE chapter.id = ? AND chapter.id_course = ? ',[name,idChapter,idCourse])
  if(result){
    res.status(200).json({status: 'success'})
  }else{
    res.status(400).json({status: 'error'})
  }
})

const deleteChapterOfCourse = asyncHandler(async (req, res)=>{
  const idChapter = req.params.idChapter
  let result = null;
  const deleteLesson = await db.connection.execute('DELETE FROM lesson WHERE lesson.id_chapter = ? ',[idChapter])
  if(deleteLesson){
    result = await db.connection.execute('DELETE FROM chapter WHERE chapter.id = ? ', [idChapter])
  }
  if(result){
    res.status(200).json({status: 'success'})
  }else{
    res.status(400).json({status: 'error'})
  }
})

const getLessonsOfChapter = asyncHandler(async(req,res)=>{
  const idCourse = req.params.id
  const idChapter = req.params.idChapter
  const lessons = await db.connection.execute(`SELECT * FROM lesson WHERE lesson.id_chapter = ? `,[idChapter])
  if(!lessons){
    res.status(400)
    throw new Error('Lesson not found')
  }else{
    res.status(200).json(lessons[0])
  }
})

const getSpecificLesson = asyncHandler(async(req, res)=>{
  const idCourse = req.params.id
  const idChapter = req.params.idChapter
  const idLesson = req.params.idLesson

  const lesson = await db.connection.execute('SELECT * FROM lesson WHERE lesson.id = ? and lesson.id_chapter = ?',[idLesson, idChapter])
  if(lesson){
    res.status(200).json(lesson[0][0])
  }else{
    res.status(400)
    throw new Error('Lesson could not be found')
  }

})

const addLessonToChapter = asyncHandler(async(req, res)=>{
  const idCourse = req.params.id
  const idChapter = req.params.idChapter
  const {name} = req.body
  const video = req.file.path
  const result = await db.connection.execute('INSERT INTO lesson(id_chapter, id_course ,name,video) values(?,?,?,?)',[idChapter, idCourse,name,video])
  if(result){
    res.status(200).json({status: 'success'})
  }else{
    res.status(400).json({status: 'error'})
  }
})

const updateLessonToChapter = asyncHandler(async (req, res)=>{
  const idCourse = req.params.id
  const idChapter = req.params.idChapter
  const idLesson = req.params.idLesson
  const {name} = req.body
  let lesson = null

  if(!req.file){
    lesson = await db.connection.execute('UPDATE lesson SET name = ? WHERE lesson.id = ?',[name, idLesson])
  }else{
    const video = req.file.path
    lesson = await db.connection.execute('UPDATE lesson SET name = ?, video = ? WHERE lesson.id = ?',[name,video, idLesson])
  }

  if(lesson){
    res.status(200).json({status: 'success'})
  }else{
    res.status(400).json({status: 'error'})
  }

})



const deleteLessonOfChapter = asyncHandler(async (req, res)=>{
  const idLesson = req.params.idLesson

  const result = await db.connection.execute('DELETE FROM lesson WHERE lesson.id = ?',[idLesson])
  if(result){
    res.status(200).json({status: 'success'})
  }else{
    res.status(400).json({status: 'error'})
  }
})

const getMaterialOfStudent = asyncHandler(async(req,res)=>{
  const idStudent = req.params.idStudent
  const result = await db.connection.execute(
    'select course.id, course.id_author,course.name, course.image, course.description, course.rating, course.price from course, user_course where user_course.id_course = course.id and user_course.id_user = ?',[`${idStudent}`])
  if(result){
    res.status(200).json(result[0])
  }else{
    res.status(400)
    throw new Error('Course not found')
  }
})

const checkOwnCourse = asyncHandler(async(req,res)=>{
  const idCourse = req.params.idCourse
  const idStudent = req.params.idStudent
  const result = await db.connection.execute('SELECT * FROM user_course WHERE user_course.id_user = ? AND user_course.id_course = ? ',[`${idStudent}`, `${idCourse}`])
  if(result[0][0]){
    res.status(200).json({status: "own"})
  }else{
    res.status(200).json({status: "not-own"})
  }
})

const makePaymentCourse = asyncHandler(async(req,res)=>{
  const list_idCourse = req.body
  const idStudent = req.params.idStudent
  const list_response = list_idCourse.map(async(idCourse)=>{
    return result = await db.connection.execute('INSERT INTO user_course(id_user,id_course) values(?,?)',[`${idStudent}`,`${idCourse}`])
  })
  for(let i=0;i<list_idCourse.length;i++){
    if(!list_idCourse[i]){
      res.status(400).json({status: 'Fail'})
      return
    }
  }
  res.status(200).json({status: 'Success'})
})

module.exports = {
  setCourses,
  getCourses,
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
  getSpecificLesson,
  getMaterialOfStudent,
  checkOwnCourse,
  makePaymentCourse
};
