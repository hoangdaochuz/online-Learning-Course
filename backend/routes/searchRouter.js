const express = require('express')
const router = express.Router();
const {searchCourseByName} = require('../controller/searchController')
router.get('/course?',searchCourseByName)

module.exports = router