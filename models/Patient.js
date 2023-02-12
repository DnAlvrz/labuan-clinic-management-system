var mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null
    },
    schoolId: {
        type:String,
    },
    firstName: {
        type:String,
    },
    lastName: {
        type:String, 
    },
    middleName: {
        type:String,
    },
    grade: {
        type:String,
    },
    section: {
        type:String,
    },
    description: {
        type: String,
        required: true,
    },
    medication : [{
        type: String,
    }],
    recommendation: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Patient', patientSchema)