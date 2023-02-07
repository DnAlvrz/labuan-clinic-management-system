const studentFindings = async (req, res) => {
    res.render('pages/studentFindings', { title: 'Student Findings' });
}


module.exports = {
    studentFindings
}