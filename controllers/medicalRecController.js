const MedicalRecord = require('../models/MedicalRecord');

const medicalRec = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find();
        res.render('pages/medicalRecord', { title: 'Patient', path:'medicalRecord'});
    } catch (error) {
        console.log(error);
        res.render('error', error);
    }
}

const medicalForm = async (req, res) => {
    res.render('pages/student-findings', { title: 'Medical Form', path:''});
}

const newMedicalRecord = async(req,res) => {
    try {
        const {
            studentId,
            schooldId,
            schoolYear,
            grade,
            temperature,
            bloodPressure,
            heartRate,
            pulseRate,
            height,
            Weight,
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
            menarche
        } = req.body;
        if(
            !studentId ||
            !schooldId ||
            !schoolYear ||
            !grade ||
            !temperature ||
            !bloodPressure ||
            !heartRate ||
            !pulseRate ||
            !height ||
            !Weight ||
            !nutStatBM ||
            !nutStatHeight ||
            !visionScreening ||
            !auditoryScreening ||
            !skinScalp ||
            !eyesEarsNose,
            !mouthThroatNeck ||
            !lungsHeart ||
            !abdomen ||
            !deformities,
            !ironSupplementation ||
            !SBFPBeneficiary ||
            !fourPS ||
            !menarche
        ) {
            res.render('error')
        } else {
            const newMedicalRecord = await MedicalRecord.create({
                studentId,
                schooldId,
                schoolYear,
                grade,
                temperature,
                bloodPressure,
                heartRate,
                pulseRate,
                height, 
                Weight,
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
                menarche
            });
            res.redirect('/medical')
        }
    } catch (error) {
        console.log(error)
        res.render('error', error);
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
    editMedicalRecord
}