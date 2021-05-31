import { getUsers } from './consult_api.js';

export function displayTable() {
    const response = getUsers();
    const table = document.getElementById('table');

    response.then( users => table.innerHTML = showUsers(users));
}

const showUsers = ( users ) => {
    let result = '';

    users.forEach( (user)  => {
        result += generateTemplate( user );    
    });

    return result;
}

function generateTemplate ( user ) {
    const { id, name, age, country, email } = user;
    return `
        <tr> 
            <td>${id}</td>
            <td>${name}</td> 
            <td>${age}</td>
            <td>${country}</td>
            <td>${email}</td>
            <td data-id = ${id}> 
                <button class = "td--edit" id = "edit-user" data-id=${id}><i class="fas fa-pen"></i></button> 
                <button class = "td--delete" id = "delete-user" data-id=${id} ><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    `
}

export function assignValuesForm( user ) {
    // inputs 
    const inputName = document.getElementById('name');
    const inputAge = document.getElementById('age');
    const inputCountry = document.getElementById('country');
    const inputEmail = document.getElementById('email');

    const { name, age, country, email }  = user;
    
    inputName.value = name;
    inputAge.value = age;
    inputCountry.value = country;
    inputEmail.value = email;
}
