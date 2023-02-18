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
        actionLink.textContent="View"
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
    });
}
