const Visitor = require('../models/Visitor')
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
    try {
        const {
            fullname,
            contactNo,
            temp,
            fever,
            coughAndColds,
            bodyPain,
            soreThroat,
            headAche,
            diarrhea,
            lostOfTasteOrSmell,
            diffBreathing,
            exposedToCovid,
            traveledOutside,
            certifiedTrue,
        } = req.body;
        if(
            !fullname ||
            !contactNo ||
            !temp ||
            !fever ||
            !coughAndColds ||
            !bodyPain ||
            !soreThroat ||
            !headAche ||
            !diarrhea ||
            !lostOfTasteOrSmell ||
            !diffBreathing ||
            !exposedToCovid ||
            !traveledOutside ||
            !certifiedTrue
        ) {
            console.log( fullname,
                contactNo,
                temp,
                fever,
                coughAndColds,
                bodyPain,
                soreThroat,
                headAche,
                diarrhea,
                lostOfTasteOrSmell,
                diffBreathing,
                exposedToCovid,
                certifiedTrue,
            )
            req.flash('error', 'Please fill in all fields');
            res.redirect('/visit')
            return;
        } else {
            const newVisitor = await Visitor.create({
                fullname,
                contactNo,
                temp,
                fever,
                coughAndColds,
                bodyPain,
                soreThroat,
                headAche,
                diarrhea,
                lostOfTasteOrSmell,
                diffBreathing,
                exposedToCovid,
                traveledOutside,
                certifiedTrue,
            });
            if(newVisitor) {
                req.flash('message', 'Form submitted');
                res.redirect('/visit')
            }
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong.')
        res.redirect('/visit');
    }
}

module.exports = {
    index,
    dashboard,
    visitorForm,
    newVisitor,
}