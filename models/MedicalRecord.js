var mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    schoolId: {
        type:String,
        required: true,
        unique:true,
    },
    schoolYear: {
        type:String,
    },
    grade: {
        type:String,
        required: true,
    },
    temperature: {
        type:String,
        required: true,
    },
    bloodPressure: {
        type:String,
        required: true, 
    },
    heartRate: {
        type:String,
        required: true, 
    },
    pulseRate: {
        type:String,
        required: true,
    },
    height: {
        type:Number,
        required: true,
    },
    Weight: {
        type:Number,
        required: true,
    },
    nutStatBM: {
        type:String,
        required: true,
    },
    nutStatHeight: {
        type:String,
        required: true,
    },
    visionScreening: {
        type:String,
        required: true,
    },
    auditoryScreening: {
        type:String,
        required: true,
    },
    skinScalp: {
        type:String,
        required: true,
    },
    eyesEarsNose: {
        type:String,
        required: true,
    },
    mouthThroatNeck: {
        type:String,
        required: true,
    },
    lungsHeart: {
        type:String,
        required: true,
    },
    abdomen: {
        type:String,
        required: true,
    },
    deformities: {
        type:Boolean,
        required: true,
    },
    ironSupplementation: {
        type: Boolean,
        required:true,
    },
    SBFPBeneficiary : {
        type: Boolean,
        required: true,
    },
    fourPS: {
        type:Boolean,
        required: true,
    },
    menarche : {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model('MedicalRecord',medicalRecordSchema)