const studentForm = async (req, res) => {
    res.render('pages/studentForm', { title: 'Student-Form' });
}


module.exports = {
    studentForm
}