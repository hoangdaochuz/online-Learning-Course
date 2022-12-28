const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
// const formidableMiddleware = require('express-formidable')


const helmet = require("helmet");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

const cors = require("cors");

connectDB();

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// app.use(formidableMiddleware())
app.use("/api/courses", require("./routes/courseRouters"));
app.use("/api/users", require("./routes/userRouters"));
app.use("/api/goals", require("./routes/goalRouters"));
app.use("/api/team", require('./routes/teamRouters'));
app.use("/api/lessons", require('./routes/lessonRouter'));
app.use("/api/search", require('./routes/searchRouter'))
app.use("/api/blogs", require("./routes/blogRouters"));
app.use(errorHandler);

// ROUTES

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});