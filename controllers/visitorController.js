const visitor = async (req, res) => {
    res.render('pages/visitors', { title: 'San Ramon Students' });
}


module.exports = {
    visitor
}