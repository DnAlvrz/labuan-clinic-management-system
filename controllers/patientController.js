const Patient = require('../models/Patient');
const Student = require('../models/Student');

const patientList = async (req, res) => {
    try {
        const patients = await Patient.find();
        const students = await Student.find();
        const data = {
            title: 'Patients', 
            patients, 
            students,
            path:'patients',
            message:req.flash('message'), 
            error:req.flash('error')
        };
        res.render('pages/patients', data);
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong');
        res.redirect('/patients')
    }
}

const createPatient = async (req, res) => {
    try {
        const {
            studentId,
            schoolId,
            firstName,
            lastName,
            middleName,
            grade,
            section,
            description,
            medication,
            recommendation,
            bloodPressure,
            temperature,
        } = req.body;
    
        if (!schoolId || 
            !firstName || 
            !lastName || 
            !middleName || 
            !description ||
            !medication ||
            !recommendation ||
            !bloodPressure ||
            !temperature
        ){
            req.flash('error', 'Please fill all required fields');
            res.redirect('/patients');
            return;
        } 
        if(studentId){
            const student = await Student.findOne({_id:studentId});
            if(!student){ 
                req.flash('error', 'Student not found')
                res.redirect('/patients');
                return;
            }
        }   
        const patient = await Patient.create({
            student: studentId ? studentId : null,
            schoolId,
            firstName,
            lastName,
            middleName,
            grade: grade ? grade : '',
            section : section ? section : '',
            description,
            medication,
            bloodPressure,
            temperature,
            recommendation
        });
        req.flash('message', 'Patient added');
        res.redirect('/patients')
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong');
        res.redirect('/patients')
    }
    
}

const updatePatient = async (req, res) => {
    try {
        const id = req.body.patientId;
        const patient = await Patient.findOne({_id:id});
        if(!patient) {
            req.flash('error', 'Patient not found');
            res.redirect('/patients');
            return;
        } else {
            for(const key of Object.keys(req.body)) {
                patient[key] = req.body[key]
            }
            await patient.save();
            req.flash('message', 'Patient updated');
            res.redirect('/patients');
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong');
        res.redirect('/patients')
    }
}

module.exports = {
    patientList,
    createPatient,
    updatePatient,
}