const mongoose = require('mongoose')
const courseSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a text']
    },
    description:{
        type: String,
        required: [true, 'Please enter a description']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Course', courseSchema)