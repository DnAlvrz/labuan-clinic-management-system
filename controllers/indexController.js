const index = async (req, res) => {
    res.render('pages/index', { title: 'Dashboard' });
}

const loginUser = async (req, res) => {
    res.render('pages/auth/login', { title: 'Login' });
}


module.exports = {
    index,
    loginUser,
}