const mongoose = require('mongoose');
const lessonSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, "Please enter title of lesson"]
    },
    video: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Lesson', lessonSchema);