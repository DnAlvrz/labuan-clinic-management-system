const MedicalRecord = require('../models/MedicalRecord');

const medicalRec = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find();
        res.render('pages/medicalRecord', { title: 'Patient', path:'medicalRecord'});
    } catch (error) {
        console.log(error);
        res.render('error');
    }
}

const medicalForm = async (req, res) => {
    res.render('pages/student-findings', { title: 'Medical Form', path:''});
}

module.exports = {
    medicalRec,
    medicalForm
}