var mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required:true,
    },
    contactNo: {
        type: String,
        required:true,
    },
    temp :{
        type: String,
        required: true,
    },
    fever: {
        type:Boolean,
        required: true
    },
    coughAndColds: {
        type:Boolean,
        required: true
    },
    bodyPain: {
        type:Boolean,
        required: true
    },
    soreThroat: {
        type:Boolean,
        required: true
    },
    headAche: {
        type:Boolean,
        required: true
    },
    diarrhea: {
        type:Boolean,
        required: true
    },
    lostOfTasteOrSmell: {
        type:Boolean,
        required: true
    },
    diffBreathing: {
        type:Boolean,
        required: true
    },
    exposedToCovid: {
        type:Boolean,
        required: true
    },
    traveledOutside: {
        type:String,
        default:'N/A'
    },
    certifiedTrue : {
        type:Boolean,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model('Visitor', visitorSchema)