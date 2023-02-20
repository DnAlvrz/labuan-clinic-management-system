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
  document.getElementById('grade').value = student.grade;
  document.getElementById('schoolId').value = student.schoolId;
  document.getElementById('lrn').value = student.lrn;
  document.getElementById('gender').value = student.gender;
  document.getElementById('section').value = student.section;
  document.getElementById('contactNum').value = student.contactNum;
  document.getElementById('contactPersonNum').value = student.contactPersonNum;
  document.getElementById('month').value = student.dob.month;
  document.getElementById('day').value = student.dob.day;
  document.getElementById('year').value = student.dob.year;
  document.getElementById('birthPlace').value = student.birthPlace;
  document.getElementById('contactPerson').value = student.contactPerson;
  document.getElementById('address').value = student.address;
  setForm('studentForm', '/students?_method=PUT' );
}

const setForm = (formId, formAction) => {
  const studentForm = document.getElementById(formId);
  console.log(studentForm)
  studentForm.setAttribute('action', formAction);
}


const clearForm = (formId, formAction) => {
  console.log(formId)
  const form = document.getElementById(formId);
  form.setAttribute('action', formAction);
  form.reset();
}

const addStudentPatient  = (student) => {
  document.getElementById('studentId').value = student._id;
  document.getElementById('firstName').value = student.firstName;
  document.getElementById('middleName').value = student.middleName;
  document.getElementById('lastName').value = student.lastName;
  document.getElementById('grade').value = student.grade;
  document.getElementById('section').value = student.section;
  document.getElementById('schoolId').value = student.schoolId;
};


const updatePatient = (patient) => {
  if(patient.student) {
    document.getElementById('studentId').value = patient.student;
  }
  document.getElementById('patientId').value = patient._id;
  document.getElementById('firstName').value = patient.firstName;
  document.getElementById('middleName').value = patient.middleName;
  document.getElementById('lastName').value = patient.lastName;
  document.getElementById('grade').value = patient.grade;
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
      console.log(student)

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
        const actionCell = document.createElement("td");
        const actionLink = document.createElement("a");
        actionLink.textContent='View'
        actionLink.setAttribute('href', `/medical/form`)
        actionLink.setAttribute('class', 'btn btn-primary')
        actionCell.append(actionLink)
        const examDate = new Date(record.createdAt)
        dateCell.textContent = `${month[examDate.getMonth()]} ${examDate.getDate()}, ${examDate.getFullYear()}`
        gradeCell.textContent = record.grade
        console.log(examDate)
        row.appendChild(dateCell);
        row.appendChild(gradeCell);
        row.appendChild(actionCell)
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