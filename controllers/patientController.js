const patient = async (req, res) => {
    res.render('pages/patients', { title: 'Patients' });
}


module.exports = {
    patient
}