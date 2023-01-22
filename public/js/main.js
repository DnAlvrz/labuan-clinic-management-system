const theadRow = Array.from(document.querySelectorAll('th'));
let myArray = [
{
    'id': '348205',
    'name': 'Mohaiben R. Lahudin', 
    'grade': '12', 
    'section': 'Manladen',

},
{
    'id': '190352',
    'name': 'Arjhon H. Haraji', 
    'grade': '8', 
    'section': 'Capitan Mampang',

},
{
    'id': '25317',
    'name': 'Patrick John M. Brilantes', 
    'grade': '12', 
    'section': 'Papa P',

},
{
    'id': '420512',
    'name': 'Raphael M. Seseh', 
    'grade': '8', 
    'section': 'Cute junjun',

},
{
    'id': '620391',
    'name': 'Josph Adonis B. Alvarez', 
    'grade': '10', 
    'section': 'Manladen',

},
{
    'id': '523708',
    'name': 'Benedict Mahatma Z. Asmad', 
    'grade': '9', 
    'section': 'Buto Arab',

}
];


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
        buildTable(myArray)
    });
  }
  buildTable(myArray)

function buildTable(data){
    let table = document.getElementById('myTable');
        table.innerHTML = ''
    for(let i = 0; i < data.length; i++){
        let row =
        `<tr>
            <td data-label="ID No.">${data[i].id}</td>
            <td data-label="Name">${data[i].name}</td>
            <td data-label="Grade">${data[i].grade}</td>
            <td data-label="Section">${data[i].section}</td>
        </tr>`

        table.innerHTML += row
    }
};

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


