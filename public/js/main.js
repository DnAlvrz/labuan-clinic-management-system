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
  document.getElementById('firstname').value = student.firstName;
  document.getElementById('lastname').value = student.lastName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('grade').value = student.grade;
  document.getElementById('schoolId').value = student.schoolId;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;
  document.getElementById('middlename').value = student.middleName;

}