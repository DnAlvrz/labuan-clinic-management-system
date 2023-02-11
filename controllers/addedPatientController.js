const addedPatient = async (req, res) => {
    res.render('pages/addedPatient', { title: 'Added Patient', path:'addedPatient'});
}

module.exports = {
    addedPatient,
}