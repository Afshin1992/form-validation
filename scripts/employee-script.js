onload = function() {
    const fname = document.querySelector('#fname-input');
    const lname = document.querySelector('#lname-input');
    const email = document.querySelector('#email-input');
    const joinedDate = document.querySelector('#joined-date');
    const city = document.querySelector('#city-input');
    const postalCode = document.querySelector('#pcode-input');
    const availability = document.querySelector('#my-select');
    const submit = document.querySelector('#btn-submit');
    const show = document.querySelector('#btn-show');
    const divList = document.querySelector('#table');
    const table = document.createElement('table');


    let employees = [];
    //let availabilities = [];

    $("#my-select").easySelect({
        buttons: false,
        search: false,
        placeholder: 'Choose Availability',
        placeholderColor: '#524781',
        selectColor: '#524781',
        itemTitle: 'Item Selected',
        showEachItem: true,
        width: '80%',
        dropdownMaxHeight: '450px',
    })

    // availability.addEventListener('change', ()=>{
    //     availabilities.push(availability.value);
    // })

    //Add Employee Function
    const addEmployee = (e) => {
            e.preventDefault();
            let newEmployee = {
                id: `${new Date().getTime()}${Math.round(Math.random()*20)}`,
                fname: fname.value,
                lname: lname.value,
                email: email.value,
                joinedDate: joinedDate.value,
                city: city.value,
                postalCode: postalCode.value,
                availability: $("#my-select").val()
                    // availability :  availabilities
            }
            employees.push(newEmployee);
            document.querySelector('form').reset();
            // availabilities = [];
            availability.nextSibling.innerHTML = 'Choose Availability'
            table.innerHTML = '';
        }
        //display the header of table
    const displayHeader = () => {
        const headers = ["ID", "First Name", "Last Name", "Email", "Joined Date", "City", "Postal Code", "Availabilities"];
        const thead = document.createElement('thead');
        const row = thead.insertRow();
        headers.forEach((header) => {
            row.insertCell().textContent = header;
        })
        table.appendChild(thead);
        divList.appendChild(table);
    }

    //display the body of table
    const displayBody = () => {
        const tbody = document.createElement('tbody');

        employees.forEach((employee) => {
            const row = tbody.insertRow();
            row.setAttribute('id', employee.id)
            row.insertCell().textContent = employee.id;
            row.insertCell().textContent = employee.fname;
            row.insertCell().textContent = employee.lname;
            row.insertCell().textContent = employee.email;
            row.insertCell().textContent = employee.joinedDate;
            row.insertCell().textContent = employee.city;
            row.insertCell().textContent = employee.postalCode;
            row.insertCell().textContent = employee.availability.join('-');
            row.insertCell().innerHTML = '<button class="btn btn-success">-</button>';
        })

        table.appendChild(tbody);
        divList.appendChild(table);
    }

    const displayEmployees = () => {
        table.innerHTML = '';
        if (employees.length > 0) {
            displayHeader();
            displayBody();
        } else {
            const p = document.createElement('p');
            p.classList.add('text-danger')
            p.textContent = 'No Employee to Show';
            divList.appendChild(p);
        }
    }


    submit.addEventListener('click', addEmployee);
    show.addEventListener('click', displayEmployees);
    divList.addEventListener('click', (e) => {
        const id = e.target.parentNode.parentNode.id;
        const empIndex = employees.findIndex(e => e.id === id);
        employees.splice(empIndex, 1);
        table.deleteRow(empIndex + 1);
    })
}

function validateForm() {
    var fName = document.forms["myForm"]["fname"].value;
    var lName = document.forms["myForm"]["lname"].value;
    var email = document.forms["myForm"]["email"].value;
    var joined = document.forms["myForm"]["joined"].value;
    var city = document.forms["myForm"]["city"].value;
    var pcode = document.forms["myForm"]["pcode"].value;
    var available = document.forms["myForm"]["available"].value;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var currentDay = new Date();
    var zipCode = [a - zA - Z][0 - 9][a - zA - Z](- | | )[0 - 9][a - zA - Z][0 - 9];
    if (fName == "") {
        fName.innerHTML = "First name must be filled out";
        return false;
    }
    if (lName == "") {
        lname.innerHTML = "Last name must be filled out";
        return false;
    }
    if (email != "" && email.value.match(mailformat)) {
        return true;
    } else {
        email.innerHTML = "Please fill the email according to example";

    }
    if (joined != "" && joined.value < currentDay) {
        return true;
    } else {
        joined.innerHTML = "Date joined be filled out, please Note that the date shouldn't be today or future";

    }
    if (city == "") {
        city.innerHTML = "City must be filled out";
        return false;
    }
    if (pcode != "" && pcode.value.match(zipCode)) {
        return true;
    } else {
        pcode.innerHTML = "Please fill the postal code according to example";
    }
    if (available == "") {
        available.innerHTML = "Availability must be filled out";
        return false;
    }

}