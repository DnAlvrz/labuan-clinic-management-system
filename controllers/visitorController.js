const Visitor = require("../models/Visitor");

const visitorList = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        const date = { 
            title: 'Visitors', 
            path:'visitors',
            visitors,
        }
        res.render('pages/visitor', { title: 'Visitors', path:'visitors' });
    } catch (error) {
        console.log(error)
        res.redirect('/visitors')
    }
}

const visitorForm = async (req, res) => {
    try {
        res.render('pages/visitorForm', { title: 'Visitors', path:'visitors' });
    } catch (error) {
        
    }
}


module.exports = {
    visitorList,
    visitorForm,
}