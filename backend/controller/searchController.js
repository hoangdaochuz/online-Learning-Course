const asyncHandler = require("express-async-handler")

const db = require('../mysqldb/db')
const searchCourseByName = asyncHandler(async(req,res)=>{
  const {nameCourse} = req.query
  const courses = await db.connection.execute('SELECT * FROM course WHERE course.name like ?',[`%${nameCourse}%`])
  
  if(courses){
    res.status(200).json(courses[0])
  }else{
    res.status(400).json({message: 'Course not found'})
  }
})

module.exports = {searchCourseByName}