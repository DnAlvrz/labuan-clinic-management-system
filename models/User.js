var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    schoolId: {
        type:String,
        required: true,
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
    email: {
        type:String
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)