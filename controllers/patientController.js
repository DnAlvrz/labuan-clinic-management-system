const Patient = require('../models/Patient');

const patientList = async (req, res) => {
    const students = await Patient.find();
    const data = {
        title: 'Patients', 
        students, 
        path:'patients',
        message:req.flash('message'), 
        error:req.flash('error')
    };
    res.render('pages/patients', data);
}

const createPatient = async (req, res) => {
    try {
        const {
            userId,
            schoolId,
            firstName,
            lastName,
            middleName,
            grade,
            section,
            description,
            medication,
            recommendation
        } = req.body;
    
        if (
            !userId,
            !schoolId,
            !firstName,
            !lastName,
            !middleName,
            !grade,
            !section,
            !description,
            !medication,
            !recommendation
        ){
            req.flash('error', 'Please fill in all fields');
            console.log('asd')
            res.redirect('/patients');
        } else {
            const patient = await Patient.create({
                user: userId ? userId : null,
                schoolId,
                firstName,
                lastName,
                middleName,
                grade,
                section,
                description,
                medication,
                recommendation
            });
            req.flash('message', 'Patient added');
            res.redirect('/patients')
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error/500');
    }
    
}

const updatePatient = async (req, res) => {
    try {
        const id = req.body.id;
        const patient = await Patient.findOne({_id:id});
        if(!patient) {
            req.flash('error', 'Patient not found');
            res.redirect('/patient]');
            return;
        } else {
            await student.save();
            req.flash('message', 'Patient updated');
            res.redirect('/patient');
        }
    } catch (error) {
        
    }
}


module.exports = {
    patientList,
    createPatient,
    updatePatient,
}