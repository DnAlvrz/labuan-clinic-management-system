const MedicalRecord = require('../models/MedicalRecord');
const Student = require('../models/Student');

const medicalRec = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find().populate('student');
        res.render('pages/medicalRecord', { 
            title: 'Patient', 
            medicalRecords, 
            message:req.flash('message'), 
            error:req.flash('error'), 
            path:'medicalRecord'
        });
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
            message:req.flash('message'), 
            error:req.flash('error'),
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
            if(student.medical.length > 0) {
                for await( const medicalRecordId of student.medical){
                    try {
                        const medicalRecord = await MedicalRecord.findOne({_id:medicalRecordId})
                        if(medicalRecord.grade === grade){
                            console.log('hit'); 
                            req.flash('error', `Student already has medical record for grade ${grade}`);
                            res.redirect('/medical/form')
                            return;
                        }
                    } catch (error) {
                        console.log(error);
                        req.flash('error', `Student already has medical record for grade ${grade}`);
                        res.redirect('/medical/form')
                        return;
                    }
                } 
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
                immunization
            });
            student.medical.push(newMedicalRecord._id);
            await student.save();
            req.flash('message', "Medical form added.")
            res.redirect('/medical/form');
        }
    } catch (error) {
        console.log(error)
        req.flash('error', error.message);
        res.redirect('/medical/form');
    }
};

const editMedicalRecord = async (req,res) => {
    try {
        const id = req.body.recordId;
        const medicalRecord = await MedicalRecord.findOne({_id:id});
        if(!medicalRecord){ 
            req.flash('error', 'Medical Record not found');
            res.redirect('/medical');
            return;
        } else {
            for(const key of Object.keys(req.body)) {
                medicalRecord[key] = req.body[key]
            }
            await medicalRecord.save();
            req.flash('message', 'Medical Record updated');
            res.redirect('/medical');
        }
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong.');
        res.redirect('/medical');
    }
};

module.exports = {
    medicalRec,
    medicalForm,
    newMedicalRecord,
    editMedicalRecord,
}