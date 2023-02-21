const Visitor = require('../models/Visitor')
const Student = require('../models/Visitor')
const Patient = require('../models/Visitor')
const index = async (req, res) => {
    res.render('pages/index', { title: 'CMS' });
}

const dashboard = async (req, res) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const studentCount = await Student.find().count();
    const patientCount = await Patient.find().count();
    const visitorCount = await Visitor.find().count();
    const patientsToday =await Patient.find({createdAt: {$gte: today}});
    const data = { 
        title: 'Dashboard', 
        path:'dashboard',
        studentCount,
        patientCount,
        visitorCount,
        patientsToday
    } 
    res.render('pages/dashboard', data);
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
            !certifiedTrue
        ) {
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