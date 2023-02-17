var mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null
    },
    schoolId: {
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String, 
        required: true
    },
    middleName: {
        type:String,
        required: true
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