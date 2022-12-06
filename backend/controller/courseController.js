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
const deleteCourses = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  if(!course){
    res.status(400)
    throw Error(`Course not found`);
  }
  await course.remove()
  res.status(200).json({id: req.params.id});

});

const getMyCourse = asyncHandler(async (req, res) => {
  const id = req.params.idUser
  // const course = await Course.find({id})
  const course = await db.connection.execute("SELECT * FROM course where course.id_author = '637712a334128891be0ed1cf'")
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

const getChaptersOfCourse = asyncHandler(async(req,res)=>{
  const id = req.params.id
  const chapters = await db.connection.execute('SELECT * FROM chapter WHERE chapter.id_course = ?',[id])
  if(!chapters){
      res.status(400)
      throw new Error('Chapter not found')
  }else{
    res.status(200).json(chapters[0])
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
module.exports = {
  setCourses,
  getCourses,
  updateCourses,
  deleteCourses,
  getMyCourse,
  getCourseDetail,
  getChaptersOfCourse,
  getLessonsOfChapter,
};
