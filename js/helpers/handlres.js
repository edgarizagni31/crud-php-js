import { deleteUser, getUsers,sendUser, updateUser } from './consult_api.js';
import { encodeParam } from './encode_param.js';
import { validateForm } from './validate_form.js';
import { displayTable, assignValuesForm } from './dom.js';

export const handlerForm = ( e ) => {
    e.preventDefault();
    const boxError = document.getElementById('error_box');
    const newUser = createNewUser();
    // validate user
    const errors = validateForm( newUser ); 

    if ( errors.length == 0 ) {
        const params = encodeParam( newUser );
        const btnSubmit = document.getElementById('btn-submit');
        let response;
        let alertMessage = "";
        
        if ( btnSubmit.getAttribute('status') == 'not-edit' ) {
            response = sendUser(  params );
            alertMessage = "Se ha registrado el usario";
        } else {
            const id = btnSubmit.getAttribute('user-id');
            response = updateUser( id, params );
            alertMessage = "Se ha editado el usario";

            //reset btn status
            btnSubmit.setAttribute('status','not-edit');
            btnSubmit.setAttribute('user-id',0);
        }

        response.then( info => {
            if ( info.ok ) {
                boxError.classList.remove('active');
                alert(alertMessage);
                displayTable();
            } else {
                console.log(info.errors);
            }
        });

    } else {
        boxError.classList.add('active');
        boxError.innerHTML = errors;
    }

    document.getElementById('form').reset();
}

function createNewUser() {
    // inputs 
    const inputName = document.getElementById('name');
    const inputAge = document.getElementById('age');
    const inputCountry = document.getElementById('country');
    const inputEmail = document.getElementById('email');
    // create user
    const newUser = {
        name: inputName.value,
        age: inputAge.value,
        country: inputCountry.value,
        email: inputEmail.value
    }

    return newUser;
}

export const handlerEdit = ( e ) => {
    const element = e.target;

    if (  element.id == 'edit-user' || element.classList.contains('fa-pen') ) {
        const id = element.parentNode.getAttribute('data-id');
        const btnSubmit =  document.getElementById('btn-submit');

        getUsers(id).then( user => assignValuesForm( user[0] ) );

        // set edit status 
        btnSubmit.setAttribute('status', 'edit');
        btnSubmit.setAttribute('user-id', id);
    }

    if ( element.id == 'delete-user' || element.classList.contains('fa-trash-alt')) {
        const id = element.parentNode.getAttribute('data-id');
        deleteUser(id).then( res => {
            if ( res.ok ) {
                alert('Se ha eliminado correctamente.');
                displayTable();
            }
        } );

    }
}
