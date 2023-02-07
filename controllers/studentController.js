const Student = require('../models/Student')
const student = async (req, res) => {
    res.render('pages/students', { title: 'Students' });
}

const newStudent = async (req, res) => {
    
    try {
        const {
            firstName,
            lastName,
            middleName,
            grade,
            section,
            schoolId,
            gender,
            month,
            day,
            year,
            birthPlace,
            contactNum,
            contactPerson,
            contactPersonNum,
            address,
        } = req.body;

        if (!firstName,
            !lastName,
            !middleName,
            !grade,
            !section,
            !schoolId,
            !contactNum,
            !gender,
            !month,
            !day,
            !year,
            !birthPlace,
            !contactPerson,
            !contactPersonNum,
            !address){
                req.flash('error', 'Please fill in all fields');
                res.redirect('/error/401');
            }
        const student = await Student.create({
            firstName,
            lastName,
            middleName,
            grade,
            section,
            schoolId,
            gender,
            dob: {
                month,
                day,
                year
            },
            birthPlace,
            contactNum,
            contactPerson,
            contactPersonNum,
            address,
        })
        req.flash("message", "Student added.");
        res.redirect('/students') 
    } catch (error) {
        console.log(error)
       res.redirect('/error/500');
    }
}
    


module.exports = {
    student,
    newStudent
}