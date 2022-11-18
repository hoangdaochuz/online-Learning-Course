const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const formidableMiddleware = require('express-formidable')

const port = process.env.PORT || 5000;

const cors = require("cors");

connectDB();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(formidableMiddleware())
app.use("/api/courses", require("./routes/courseRouters"));
app.use("/api/users", require("./routes/userRouters"));
app.use("/api/goals", require("./routes/goalRouters"));
app.use("/api/team", require('./routes/teamRouters'))
app.use(errorHandler);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
