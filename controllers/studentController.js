const student = async (req, res) => {
    res.render('pages/students', { title: 'Students' });
}


module.exports = {
    student
}