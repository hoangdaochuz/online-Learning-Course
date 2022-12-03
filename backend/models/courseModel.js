const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: true,
        }
    },{
        timestamps: true,
    }
)

const chapterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lessons: [lessonSchema]
    },
    {timestamps: true}
)

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{ // Author of course
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name:{
        type: String,
        required: [true, 'Please enter a text']
    },
    image: {
        type: String,
        default: 'https://i.imgur.com/ouOr3VY.jpg'
    },
    description:{
        type: String,
        required: [true, 'Please enter a description']
    },
    students: [   // Students who buy course
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    // content: [chapterSchema],

    content: {
        type: String,
        required: [true, 'Please choose video file']
    },

    rating: {
        type: Number,
        required: true,
        default: 0,
    },

    price: {
        type: Number,
        required: true,
        default: 0,
    }


},{
    timestamps: true
})

module.exports = mongoose.model('Course', courseSchema)