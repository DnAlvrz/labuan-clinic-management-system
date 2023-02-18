const Student = require('../models/Student');
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require('path');
const ejs = require('ejs');
const { constants } = require('os');
const { studentFindings } = require('./studentController');

const printStudentMedicalRecord = async(req, res) => {
    try {
        const studentId = req.params.studentId
        const student = await Student.findOne({_id:studentId});

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

        // Read HTML Template
        const template = fs.readFileSync(path.join(process.cwd(), "/templates/schoolHealthForm.ejs"), 'utf8');
        const content =  ejs.render(template, {student})
        fs.writeFile(path.join(process.cwd(), `/templates/${studentId}.html`), content, () => {
            const filePath = path.join(process.cwd(), `/templates/${studentId}.html`)
            const html = fs.readFileSync(filePath, "utf8");
    
            // Paper Size and Format
            const options = {
                format: "Legal",
                orientation: "portrait",
                border: "10mm"
            };
    
            const document = {
                html: html,
                data: {
                    student: student,
                },
                path: `./documents/students/${student.schoolId}.pdf`,
                type: "",
            }
            pdf
                .create(document, options)
                .then((resp) => {
                    console.log(resp);
                    res.redirect(`/students`);
                })
                .catch((error) => {
                    console.error(error);
                    req.flash('error', 'Something went wrong.');
                    res.redirect('/students')
                });
        })
      
    } catch (error) {
        console.log(error);
        req.flash('error', "Something went wrong");
        res.redirect('/students');
    }
    
}

module.exports = {
    printStudentMedicalRecord
}