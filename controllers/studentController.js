const student = async (req, res) => {
    res.render('pages/students', { title: 'San Ramon Students' });
}


module.exports = {
    student
}