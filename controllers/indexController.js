const index = async (req, res) => {
    res.render('pages/index', { title: 'Express' });
}

const loginUser = async (req, res) => {
    res.render('pages/auth/login', { title: 'Login' });
}
const studentTable = async (req, res) => {
    res.render('pages/tables/student-table', { title: 'Student' });
}

module.exports = {
    index,
    loginUser,
    studentTable
}