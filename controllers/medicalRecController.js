const medicalRec = async (req, res) => {
    res.render('pages/medicalRecord', { title: 'Patient', path:'medicalRecord'});
}

module.exports = {
    medicalRec,
}