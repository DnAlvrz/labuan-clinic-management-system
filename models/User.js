var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    schoolId: {
        type:String,
        required: true,
        unique:true,
    },
    firstName: {
        type:String,
        required: true, 
    },
    lastName: {
        type:String,
        required: true, 
    },
    middleName: {
        type:String,
        required: true, 
    },
    username: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    dob: {
        month: {
            type:String,
            required: true,
        },
        day: {
            type:String,
            required: true,
        },
        year: {
            type:String,
            required: true,
        },
    },
})


module.exports = mongoose.model('User', userSchema)