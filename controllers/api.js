const Student = require('../models/Student');

const viewStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findOne({_id:studentId}).populate({path:'medical', populate:'student'})
        if(!student) {
            res.status(404).json({message:'Student not found'});
            return;
        }
        res.status(200).json(student);
    } catch (error) {
        res.json(student);
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