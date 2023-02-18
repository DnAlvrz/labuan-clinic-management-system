const Student = require('../models/Student');

const printStudentMedicalRecord = async(req, res) => {
    try {
        const studentId = req.params.studentId
        const student = await Student.findOne({_id:id});

        if(!student) {
            req.flash('error', "Student not found.");
            res.redirect('/students');
            return;
        }

        if(student.medical.length === 0) {
            req.flash('error', "Student has no medical records");
            res.redirect('/students');
            return;
        }

        

    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong");
        res.redirect('/students');
    }
    
}

module.exports = {
    printStudentMedicalRecord
}