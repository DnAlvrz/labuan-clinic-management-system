var mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    grade: {
        type:String,
        required: true, 
    },
    section: {
        type:String,
        required: true, 
    },
    gender: {
        type:String,
        required: true, 
    },
    contactNum: {
        type:String,
        required: true, 
    },
    lrn : {
        type:String,
        required: true,
    },
    birthPlace: {
        type:String,
        required: true,
    },
    contactPerson: {
        type:String,
        required: true,
    },
    address: {
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
    medical: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecord',
    }]
})

module.exports = mongoose.model('Student',studentSchema)