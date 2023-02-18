const MedicalRecord = require('../models/MedicalRecord');
const Student = require('../models/Student');
const medicalRec = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find().populate('student');
        console.log(medicalRecords);
        res.render('pages/medicalRecord', { title: 'Patient', medicalRecords, path:'medicalRecord'});
    } catch (error) {
        console.log(error);
        res.redirect('/medical')
    }
}

const medicalForm = async (req, res) => {
    try {
        const students = await Student.find();
        res.render('pages/student-findings', { 
            title: 'Medical Form', 
            students
        });
    } catch (error) {
        console.log(error)
        res.redirect('/medical')
    }
    
}

const newMedicalRecord = async(req,res) => {
    try {
        const {
            studentId,
            schooldId,
            schoolYear,
            grade,
            temperature,
            heartPulseRespRate,
            height,
            weight,
            nutStatBM,
            nutStatHeight,
            visionScreening,
            auditoryScreening,
            skinScalp,
            eyesEarsNose,
            mouthThroatNeck,
            lungsHeart,
            abdomen,
            deformities,
            deworming,
            ironSupplementation,
            SBFPBeneficiary,
            immunization,
            fourPS,
            menarche,
            examinedBy,
            others
        } = req.body;
        if(
            !studentId ||
            !grade ||
            !temperature ||
            !heartPulseRespRate ||
            !height ||
            !weight ||
            !nutStatBM ||
            !nutStatHeight ||
            !visionScreening ||
            !auditoryScreening ||
            !skinScalp ||
            !eyesEarsNose,
            !mouthThroatNeck ||
            !lungsHeart ||
            !abdomen ||
            !immunization || 
            !examinedBy
        ) {
            req.flash('error', "Please fill in all fields");
            res.redirect('/medical/form');
        } else {
            const student = await Student.findOne({_id:studentId});
            if(!student){
                req.flash('error', 'Student not found.');
                res.redirect('/medical');
                return;
            }

         
            const newMedicalRecord = await MedicalRecord.create({
                student: studentId,
                grade,
                temperature,
                heartPulseRespRate,
                height, 
                weight,
                nutStatBM,
                nutStatHeight,
                visionScreening,
                auditoryScreening,
                skinScalp,
                eyesEarsNose,
                mouthThroatNeck,
                lungsHeart,
                abdomen,
                deformities,
                ironSupplementation,
                SBFPBeneficiary,
                fourPS,
                menarche,
                deworming,
                examinedBy,
                others: others ? others : null,
            });
            student.medical.push(newMedicalRecord._id);
            await student.save();
            req.flash('message', "Medical form added.")
            res.redirect('/medical/form')
        }
    } catch (error) {
        console.log(error)
        req.flash('error', error.message);
        res.redirect('/medical/form');
    }
};

const editMedicalRecord = async (req,res) => {
    try {
        const id = req.body.medicalRecordId
        const medicalRecord = await MedicalRecord.findOne({_id:id});
        if(!medicalRecord){
            res.render('/medical')
        } else {

            for(const key of Object.keys(req.body)) {
                medicalRecord[key] = req.body[key]
            }
            await medicalRecord.save();
            req.flash('message', 'Student medical record updated');
            res.redirect('/medical');
        }
    } catch (error) {
        console.log(error);
        res.render('error', error);
    }
};

module.exports = {
    medicalRec,
    medicalForm,
    newMedicalRecord,
    editMedicalRecord,
}