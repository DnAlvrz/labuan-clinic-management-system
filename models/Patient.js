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
    bloodPressure: {
        type:String,
        required:true
    },
    temperature: {
        type:String,
        required: true
    },
    recommendation: {
        type: String,
        required: true,
    }
}, {timestamps:true})

module.exports = mongoose.model('Patient', patientSchema)