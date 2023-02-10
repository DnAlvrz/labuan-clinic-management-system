const patient = async (req, res) => {
    res.render('pages/patients', { title: 'Patient', path:'patients'});
}


module.exports = {
    patient
}