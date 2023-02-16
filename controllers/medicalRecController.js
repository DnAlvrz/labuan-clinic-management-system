const medicalRec = async (req, res) => {
    res.render('pages/medicalRecord', { title: 'Patient', path:'medicalRecord'});
}

const medicalForm = async (req, res) => {
    res.render('pages/student-findings', { title: 'Medical Form', path:''});
}

module.exports = {
    medicalRec,
    medicalForm
}