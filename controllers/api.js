const Student = require('../models/Student');
const Patient = require('../models/Patient')
const viewStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const studentInfo = await Student.findOne({_id:studentId}).populate({path:'medical', populate:'student'});
        const patient = await Patient.find({student:studentId});
        if(!studentInfo) {
            res.status(404).json({message:'Student not found'});
            return;
        }
        const student = {
            ...studentInfo._doc,
            patientData:patient
        }
        console.log(student)
        res.status(200).json(student);
    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"Something went wrong."})
    }
}
const searchStudent = async (req, res) => {
    const studentId = req.params.studentId;
    const student = await Student.findOne({_id:studentId}).populate('medical')
}

const searchPatient = async (req, res) => {
    const studentId = req.params.studentId;
    const student = await Student.findOne({_id:studentId}).populate('medical')
}

module.exports = {
    viewStudent,
    searchStudent,
    searchPatient
}