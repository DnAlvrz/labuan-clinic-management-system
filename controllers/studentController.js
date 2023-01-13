const studentList = async (req, res) => {
    res.render('pages/tables/student-table', { title: 'San Ramon Students' });
}


module.exports = {
    studentList
}