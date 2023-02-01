const visitor = async (req, res) => {
    res.render('pages/visitors', { title: 'Visitors' });
}


module.exports = {
    visitor
}