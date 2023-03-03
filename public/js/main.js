const theadRow = Array.from(document.querySelectorAll('th'));

for (const th of theadRow) {
    th.addEventListener('click', ()=> {
        let column = th.getAttribute('data-column')
        let order = th.getAttribute('data-order')

        if(order == 'desc'){
            th.setAttribute('data-order', 'asc')
            myArray = myArray.sort((a,b) => a[column] > b[column] ? 1 : -1)
        } else {
            th.setAttribute('data-order', 'desc')
            myArray = myArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
        }
    });
}

function myFunction() {
    let txtValue;
    let input = document.getElementById("navsearch");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

function updateStudent (student) {
  document.getElementById('id').value = student._id;
  document.getElementById('firstname').value = student.firstName;
  document.getElementById('lastname').value = student.lastName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('schoolId').value = student.schoolId;
  document.getElementById('lrn').value = student.lrn;
  document.getElementById('gender').value = student.gender;
  document.getElementById('section').value = student.section;
  document.getElementById('contactNum').value = student.contactNum;
  document.getElementById('contactPersonNum').value = student.contactPersonNum;
  document.getElementById('birthPlace').value = student.birthPlace;
  document.getElementById('contactPerson').value = student.contactPerson;
  document.getElementById('address').value = student.address;

  for (let i = 0; i < gender.options.length; i++) {
    option = gender.options[i];
    if (option.value === student.gender) {
        option.selected = true;
    }
  }

  const grade = document.getElementById('grade');
  for (let i = 0; i < grade.options.length; i++) {
    option = grade.options[i];
    if (option.value === student.grade) {
        option.selected = true;
    }
  }

  const month = document.getElementById('month');
  for (let i = 0; i < month.options.length; i++) {
    option = month.options[i];
    if (option.value === student.dob.month) {
        option.selected = true;
    }
  }
  const day = document.getElementById('day');
  for (let i = 0; i < day.options.length; i++) {
    option = day.options[i];
    if (option.value === student.dob.day) {
        option.selected = true;
    }
  }
  const year = document.getElementById('year');
  for (let i = 0; i < year.options.length; i++) {
    option = year.options[i];
    if (option.value === student.dob.year) {
        option.selected = true;
    }
  }
  setForm('studentForm', '/students?_method=PUT' );
}

const setForm = (formId, formAction) => {
  const studentForm = document.getElementById(formId);
  studentForm.setAttribute('action', formAction);
}


const clearForm = (formId, formAction) => {
  const form = document.getElementById(formId);
  form.setAttribute('action', formAction);
  form.reset();
}

const addStudentPatient  = (student) => {
  document.getElementById('studentId').value = student._id;
  document.getElementById('firstName').value = student.firstName;
  document.getElementById('middleName').value = student.middleName;
  document.getElementById('lastName').value = student.lastName;
  document.getElementById('section').value = student.section;
  document.getElementById('schoolId').value = student.schoolId;
  const grade = document.getElementById('patientGrade');
  for (let i = 0; i < grade.options.length; i++) {
    option = grade.options[i];
    if (option.value === student.grade) {
        option.selected = true;
    }
  }
};



const updatePatient = (patient) => {
  if(patient.student) {
    document.getElementById('studentId').value = patient.student;
  }
  document.getElementById('patientId').value = patient._id;
  document.getElementById('firstName').value = patient.firstName;
  document.getElementById('middleName').value = patient.middleName;
  document.getElementById('lastName').value = patient.lastName;
  document.getElementById('patientGrade').value = patient.grade;
  document.getElementById('section').value = patient.section;
  document.getElementById('schoolId').value = patient.schoolId;
  document.getElementById('recommendation').value = patient.recommendation;
  document.getElementById('medication').value = patient.medication;
  document.getElementById('description').value = patient.description;
  setForm('patientForm', '/patients?_method=PUT' );

}

const studentProfile = (studentId) => {
  document.getElementById('printStudentRecord').setAttribute('href', `/print/students/medical/${studentId}`)
  fetch(`/api/students/profile/${studentId}`)
    .then(resp => {
        return resp.json()
    })
    .then(student => {
      document.getElementById('firstNameProfile').value= student.firstName;
      document.getElementById('middleNameProfile').value= student.middleName;
      document.getElementById('lastNameProfile').value= student.lastName;
      document.getElementById('schoolIdProfile').value= student.schoolId;
      document.getElementById('gradeProfile').value= student.grade;
      document.getElementById('sectionProfile').value= student.section;
      document.getElementById('addressProfile').value= student.address;
      const studentMedicalRecords = document.getElementById('studentMedicalRecords');
      studentMedicalRecords.innerHTML = ""
      student.medical.forEach(record => {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const row = document.createElement("tr");
        const dateCell = document.createElement("td"); 
        const gradeCell = document.createElement("td");
        const examDate = new Date(record.createdAt)
        dateCell.textContent = `${month[examDate.getMonth()]} ${examDate.getDate()}, ${examDate.getFullYear()}`
        gradeCell.textContent = record.grade
        row.appendChild(dateCell);
        row.appendChild(gradeCell);
        studentMedicalRecords.appendChild(row);
      });

    })
    .catch(err=> {
      console.log(err)
    })

}

const editMedicalRecord = (record)=> {
  const form = document.getElementById('editMedicalRecordForm')
  form.reset();
  removedChecked('ironSupp');
  removedChecked('deworming');
  removedChecked('beneficiary');
  removedChecked('4ps');
  removedChecked('menarche');
  document.getElementById('studentName').value=`${record.student.firstName} ${record.student.middleName[0]}. ${record.student.lastName}`;


  const grade = document.getElementById('recordGrade');
  for (let i = 0; i < grade.options.length; i++) {
    option = grade.options[i];
    if (option.value === record.grade) {
        option.selected = true;
    }
  }
  document.getElementById('recordId').value=record._id;
  document.getElementById('temperature').value=record.temperature;
  document.getElementById('height').value=record.height;
  document.getElementById('weight').value=record.weight;
  document.getElementById('examinedBy').value=record.examinedBy;
  document.getElementById('immunization').value=record.immunization || "";
  document.getElementById('others').value=record.others;
  document.getElementById('heartPulseRespRate').value=record.heartPulseRespRate;
  const nutStatBM = document.getElementById('nutStatBM');
  for (let i = 0; i < nutStatBM.options.length; i++) {
    option = nutStatBM.options[i];
    if (option.value === record.nutStatBM) {
        option.selected = true;
    }
  }
  const nutStatHeight = document.getElementById('nutStatHeight');
  for (let i = 0; i < nutStatHeight.options.length; i++) {
    option = nutStatHeight.options[i];
    if (option.value === record.nutStatHeight) {
        option.selected = true;
    }
  }
  const visionScreening = document.getElementById('visionScreening');
  for (let i = 0; i < visionScreening.options.length; i++) {
    option = visionScreening.options[i];
    if (option.value === record.visionScreening) {
        option.selected = true;
    }
  }

  const auditoryScreening = document.getElementById('auditoryScreening');
  for (let i = 0; i < auditoryScreening.options.length; i++) {
    option = auditoryScreening.options[i];
    if (option.value === record.auditoryScreening) {
        option.selected = true;
    }
  }

  const skinScalp = document.getElementById('skinScalp');
  for (let i = 0; i < skinScalp.options.length; i++) {
    option = skinScalp.options[i];
    if (option.value === record.skinScalp) {
        option.selected = true;
    }
  }

  const eyesEarsNose = document.getElementById('eyesEarsNose');
  for (let i = 0; i < eyesEarsNose.options.length; i++) {
    option = eyesEarsNose.options[i];
    if (option.value === record.eyesEarsNose) {
        option.selected = true;
    }
  }
  
  const mouthThroatNeck = document.getElementById('mouthThroatNeck');
  for (let i = 0; i < mouthThroatNeck.options.length; i++) {
    option = mouthThroatNeck.options[i];
    if (option.value === record.mouthThroatNeck) {
        option.selected = true;
    }
  }

  const lungsHeart = document.getElementById('lungsHeart');
  for (let i = 0; i < lungsHeart.options.length; i++) {
    option = lungsHeart.options[i];
    if (option.value === record.lungsHeart) {
        option.selected = true;
    }
  }
  const abdomen = document.getElementById('abdomen');
  for (let i = 0; i < abdomen.options.length; i++) {
    option = abdomen.options[i];
    if (option.value === record.abdomen) {
        option.selected = true;
    }
  }

  const deformities = document.getElementById('deformities');
  for (let i = 0; i < deformities.options.length; i++) {
    option = deformities.options[i];
    if (option.value === record.deformities) {
      option.selected = true;
    }
  }

  checkBoxIsChecked('ironSupp', record.ironSupplementation)
  checkBoxIsChecked('deworming', record.deworming);
  checkBoxIsChecked('beneficiary', record.SBFPBeneficiary);
  checkBoxIsChecked('4ps', record.fourPS);
  checkBoxIsChecked('menarche', record.menarche);

}

const checkBoxIsChecked = (id, value) => {
  if(value){
    const checkBox = document.getElementById(id);
    checkBox.setAttribute('checked', value)
  }
}

const removedChecked = (id) => {
  const checkBox = document.getElementById(id);
  checkBox.removeAttribute('checked')
}

const deleteVisitor = (visitorId) => {
  document.getElementById('visitorId').value=visitorId;
}


const viewVisitor = (visitor) => {
  document.getElementById('visitorFullname').value =visitor.fullname;
  document.getElementById('visitorTemp').value = visitor.temp;
  document.getElementById('visitorContactNo').value = visitor.contactNo;
  document.getElementById('visitorFever').value =visitor.fever;
  document.getElementById('visitorCough').value = visitor.coughAndColds;
  document.getElementById('visitorBody').value = visitor.bodyPain;
  document.getElementById('visitorThroat').value = visitor.soreThroat;
  document.getElementById('visitorHead').value = visitor.headAche;
  document.getElementById('visitorDiarrhea').value =visitor.diarrhea;
  document.getElementById('visitorTaste').value =visitor.lostOfTasteOrSmell;
  document.getElementById('visitorBreath').value = visitor.diffBreathing;
  document.getElementById('visitorExposed').value = visitor.exposedToCovid;
  document.getElementById('visitorTraveled').value = visitor.traveledOutside || 'None';
  }

const deleteStudent  = (studentId) => {
  document.getElementById('studentDeleteId').value = studentId;
};