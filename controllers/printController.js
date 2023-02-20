const Student = require('../models/Student');
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require('path');
const ejs = require('ejs');
const { errorMonitor } = require('events');

const printStudentMedicalRecord = async(req, res) => {
    try {
        const studentId = req.params.studentId
        const student = await Student.findOne({_id:studentId}).populate('medical');

        if(!student) {
            req.flash('error', "Student not found.");
            res.redirect('/students');
            return;
        }

        if(student.medical.length === 0) {
            req.flash('error', "Student has no medical records");
            res.redirect('/students');
            return;
        }

        const template = fs.readFileSync(path.join(process.cwd(), "/templates/schoolHealthForm.ejs"), 'utf8');
        const content =  ejs.render(template, {student})
        fs.writeFile(path.join(process.cwd(), `/templates/${studentId}.html`), content, () => {
            const filePath = path.join(process.cwd(), `/templates/${studentId}.html`)
            const html = fs.readFileSync(filePath, "utf8");

            const options = {
                format: "Legal",
                orientation: "portrait",
                border: "10mm",
            };

            const cssRules = fs.readFileSync(
                path.join(process.cwd(), "/templates/studentPrintable.css"),
                "utf8"
            );

            const document = {
                html: html,
                data: {
                    student: student,
                    style: cssRules,
                },
                path: `./documents/students/${student.schoolId}.pdf`,
            }
            
            pdf
                .create(document, options)
                .then((resp) => {
                    res.redirect(`/students`);
                })
                .catch((error) => {
                    console.error(error);
                    req.flash('error', 'Something went wrong.');
                    res.redirect('/students')
                });
            
            fs.unlink(path.join(process.cwd(), `/templates/${studentId}.html`), (err) => {
                if (err) {
                    console.log(errorMonitor)
                }
            });
        });
        
    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong");
        res.redirect('/students');
    }
    
}

module.exports = {
    printStudentMedicalRecord
}