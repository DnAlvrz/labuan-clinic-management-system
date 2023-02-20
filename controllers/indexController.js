const index = async (req, res) => {
    res.render('pages/index', { title: 'CMS' });
}

const dashboard = async (req, res) => {
    res.render('pages/dashboard', { title: 'Dashboard', path:'dashboard' });
}

const visitorForm = async (req, res) => {
    res.render('pages/visitorForm', { title: 'Visitor Form' });
}

const newVisitor = async (req, res) => {
    res.render('pages/auth/login', { title: 'Login' });
}

module.exports = {
    index,
    dashboard,
    visitorForm,
    newVisitor,
}