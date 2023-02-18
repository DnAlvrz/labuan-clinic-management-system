var mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    grade: {
        type:String,
        required: true,
    },
    temperature: {
        type:String,
        required: true,
    },
    heartPulseRespRate: {
        type:String,
        required: true, 
    },
    height: {
        type:Number,
        required: true,
    },
    weight: {
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
        type:String,
        required: true,
    },
    deworming: {
        type:Boolean,
        default:false,
    },
    ironSupplementation: {
        type: Boolean,
        default:false,

    },
    SBFPBeneficiary : {
        type: Boolean,
        default:false,
    },
    fourPS: {
        type:Boolean,
        default:false,
    },
    menarche : {
        type: Boolean,
        default:false,
    },
    others: {
        type: String,
        default: null,
    },
    examinedBy: {
        type:String,
        required:true
    }
}, {timestamps:true});

module.exports = mongoose.model('MedicalRecord',medicalRecordSchema)