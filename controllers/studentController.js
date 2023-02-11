const Student = require('../models/Student')

const studentList = async (req, res) => {
    const students = await Student.find();
    const data = {
        title: 'Students', 
        students, 
        path:'students',
        message:req.flash('message'), 
        error:req.flash('error')
    };
    res.render('pages/students', data);
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
            lrn
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
            !address,
            !lrn
        ){
            req.flash('error', 'Please fill in all fields');
            res.redirect('/students');
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
            lrn,
            birthPlace,
            contactNum,
            contactPerson,
            contactPersonNum,
            address,
        });
        req.flash("message", "Student added.");
        res.redirect('/students');
    } catch (error) {
        console.log(error)
        res.redirect('/error/500');
    }
}

const studentForm = async (req, res) => {
    res.render('pages/studentForm', { title: 'Student-Form' });
}

const studentFindings = async (req, res) => {
    res.render('pages/studentFindings', { title: 'Student Findings' });
}
const studentRecord = async (req, res) => {
    res.render('pages/studentRecord', { title: 'Student Medical Record' });
}

const updateStudent = async( req,res) => {

}

module.exports = {
    studentList,
    newStudent,
    updateStudent,
    studentForm,
    studentFindings,
    studentRecord,
}