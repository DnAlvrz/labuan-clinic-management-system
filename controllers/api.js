const Student = require('../models/Student');

const viewStudent = async (req, res) => {
    const studentId = req.params.studentId;
    const student = await Student.findOne({_id:studentId}).populate('medical')
}

module.exports = {
    viewStudent,
}