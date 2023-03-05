const Student = require('../models/Student')
const MedicalRecord = require('../models/MedicalRecord');
const Patient = require('../models/Patient')
const studentList = async (req, res) => {
    const students = await Student.find();
    const data = {
        title: 'Students', 
        students, 
        path:'students',
        message:req.flash('message'), 
        error:req.flash('error')
    };
    res.render('pages/students', data);
}

const newStudent = async (req, res) => {
    
    try {
        const {
            firstName,
            lastName,
            middleName,
            grade,
            section,
            schoolId,
            gender,
            month,
            day,
            year,
            birthPlace,
            contactNum,
            contactPerson,
            contactPersonNum,
            address,
            lrn
        } = req.body;
        if (!firstName,
            !lastName,
            !middleName,
            !grade,
            !section,
            !schoolId,
            !contactNum,
            !gender,
            !month,
            !day,
            !year,
            !birthPlace,
            !contactPerson,
            !contactPersonNum,
            !lrn
        ){
            req.flash('error', 'Please fill in all fields');
            res.redirect('/students');
        }

        const student = await Student.create({
            firstName,
            lastName,
            middleName,
            grade,
            section,
            schoolId,
            gender,
            dob: {
                month,
                day,
                year
            },
            lrn,
            birthPlace,
            contactNum,
            contactPerson,
            contactPersonNum,
            address,
			lrn
        });
        req.flash("message", "Student added.");
        res.redirect('/students');
    } catch (error) {
        console.log(error)
        res.redirect('/students');
    }
}

const updateStudent = async(req, res) => {
    try {
        const id = req.body.id;
        const student = await Student.findOne({_id:id});
        if(!student) {
            req.flash('error', 'Error! Student not found');
            res.redirect('/students');
            return;
        } else {
            for(const key of Object.keys(req.body)) {
                student[key] = req.body[key]
            }
            student.dob.month = req.body.month;
            student.dob.day = req.body.day;
            student.dob.year = req.body.year;
            await student.save();
            req.flash('message', 'Student updated');
            res.redirect('/students');
        }
    } catch (error) {
        console.log(error)
        res.redirect('/students');
    }
}

const deleteStudent = async (req, res) => {
    const id = req.body.studentDeleteId
	try{
		const student = await Student.findOne({_id:id});
        console.log(student.medical)
        if(student.medical.length > 0) {
            student.medical.forEach(async (medical) => {
                const medicalRecord = await MedicalRecord.findOne({_id:medical});
                await medicalRecord.remove();
            });
        }
        const patients = await Patient.find({student:student._id});
        if(patients.length > 0) {
            for await(const patient of patients){
                await patient.remove();
            }
        }
		await student.remove();
		req.flash("message", "Student has been deleted")
		res.redirect('/students');
	}catch (err){
		console.log(err);
        req.flash('error', 'Something went wrong.');
        res.redirect('/students');
	}
}



const studentForm = async (req, res) => {
	res.render('pages/studentForm', { title: 'Student-Form' });
}

const studentFindings = async (req, res) => {
	res.render('pages/student-findings', { title: 'Student Findings' });
}

const studentRecord = async (req, res) => {
	res.render('pages/studentRecord', { title: 'Student Medical Record' });
}


module.exports = {
	studentList,
	newStudent,
	updateStudent,
	studentForm,
	studentFindings,
	studentRecord,
    deleteStudent,
}