const mongoose = require('mongoose')
const memberSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            require: [true, 'Please enter fullname']
        },
        avatar:{
            type: String,
            require: [true, 'Please enter avatar']
        },
        role: {
            type: String,
            required: [true, 'Please enter role']
        }
    },{
        timestamps: true,
    }
)
module.exports = mongoose.model('Member', memberSchema);
