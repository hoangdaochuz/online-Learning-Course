const express = require('express');
const router = express.Router();
const {uploadLesson, getLesson} = require('../controller/lessonController')
const {upload} = require('../middleware/uploader')
router.post('/upload', upload.single('video'), uploadLesson)
router.get('/', getLesson)
module.exports = router