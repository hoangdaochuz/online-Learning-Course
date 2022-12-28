const asyncHandler = require("express-async-handler");
const db  = require('../mysqldb/db');

const getBlogs = asyncHandler(async (req, res) => {
    try {
        const result = await db.connection.execute(`SELECT * FROM blog`);
        const blog = result[0];
        res.status(200).json(blog);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
});

// const addBlogs = asyncHandler(async(req, res) => {
//   const {title, description} = req.body
//   const image = req.file.path

//     if(req.method === 'POST') {
//       console.log('YESSSSS')
//       console.log("Title: " + title)
      
//       const result = await db.connection.execute('INSERT INTO blog(title, description, start_date, end_date) VALUES(?,?,?,?)',[title, description, startDate, endDate])
//       if(result) {
//         res.status(200).json({status: 'success'})
//       }else{
//         res.status(400).json({status: 'error'})
//       }
//     }
//   })

const addBlogs = asyncHandler(async (req, res) => {
  const {title, description, startDate, endDate}  = req.body;
  console.log(title, description, startDate, endDate)
  const image = req.file.path

  if (!req.body.title) {
    res.status(400);
    throw new Error("Please enter a  text field");
  }
  const result = await db.connection.execute("INSERT INTO blog(title, description, image, start_date, end_date) values(?,?,?,?,?)",[title, description, image, startDate, endDate])
  if(result){
    res.status(200).json({status: 'success'});
  }else{
    res.status(400).json({status: 'error'});
  }
});

module.exports = {getBlogs, addBlogs};

