const visitor = async (req, res) => {
    res.render('pages/visitors', { title: 'Visitors', path:'visitors' });
}


module.exports = {
    visitor
}