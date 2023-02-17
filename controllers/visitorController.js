const Visitor = require("../models/Visitor");

const visitor = async (req, res) => {
    res.render('pages/visitor', { title: 'Visitors', path:'visitors' });
}
const visitorForm = async (req, res) => {
    try {
        const visitors = await Visitor.find();
    } catch (error) {
        
    }
    res.render('pages/visitorForm', { title: 'Visitors', path:'visitors' });
}


module.exports = {
    visitor,
    visitorForm
}