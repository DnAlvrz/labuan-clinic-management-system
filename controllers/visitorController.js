const visitor = async (req, res) => {
    res.render('pages/visitor', { title: 'Visitors', path:'visitors' });
}
const visitorForm = async (req, res) => {
    res.render('pages/visitorForm', { title: 'Visitors', path:'visitors' });
}


module.exports = {
    visitor,
    visitorForm
}