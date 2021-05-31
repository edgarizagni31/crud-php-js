export const validateForm = ( newUser ) => {
    let { name, age, country, email } = newUser;
    let errors = '';

    // regex 
    const validText = /[a-zA-Záéíóú ,.'-]+$/;
    const validEmail = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // validate name 
    if ( name == '' ) {
       errors += '<p class = "text-error">Por favor ingrese un nombre.</p>';
    }

    if ( name != '' && !validText.test(name)  ) {
        errors += '<p class = "text-error">Nombre no valido. Solo puede contener letras.</p>';
    }

    // validate age
    if ( age == '' ) {
        errors += '<p class = "text-error">Por favor ingrese una edad.</p>';
    }

    if ( parseInt(age) < 0 ) {
        errors +='<p class = "text-error">La edad no puede ser negativa.</p>';
    }

    // validate country
    if ( country == '' ) {
        errors +='<p class = "text-error">Por favor ingrese una ciudad.</p>';
    }

    if ( country != '' && !validText.test(country) ) {
        errors +='<p class = "text-error">Ciudad no valida. Solo puede contener letras.</p>';
    }

    // validate email 
    if ( email == '') {
        errors +='<p class = "text-error">Por favor ingrese un correo.</p>';
    }

    if ( email != '' && !validEmail.test( email )) {
        errors +='<p class = "text-error">Correo no valido.Tiene que tener la siguiente estructura test@correo.com</p>';
    }

    return errors;
}
