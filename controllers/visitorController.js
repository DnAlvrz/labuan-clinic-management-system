const Visitor = require("../models/Visitor");

const visitorList = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        const data= { 
            title: 'Visitors', 
            path:'visitors',
            visitors,
        }
        res.render('pages/visitor', data);
    } catch (error) {
        console.log(error)
        res.redirect('/visitors')
    }
}

const deleteVisitor = async (req, res) => {
    try {
        const id = req.body.visitorId
        const visitor = await Visitor.findOne({_id:id});
        if(!visitor) {
            req.flash('Error', "Visitor not found.")
            res.redirect('/visitors');
            return;
        }
        await visitor.remove();
        req.flash("message", "Video has been deleted")
        res.redirect('/visitors');
    } catch (error) {
        console.error(error)
        req.flash('error', 'Something went wrong');
        res.redirect('/visitors'); 
    }
}


module.exports = {
    visitorList,
    deleteVisitor,
}