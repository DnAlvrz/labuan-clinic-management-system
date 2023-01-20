const patient = async (req, res) => {
    res.render('pages/patients', { title: 'San Ramon Patients' });
}


module.exports = {
    patient
}