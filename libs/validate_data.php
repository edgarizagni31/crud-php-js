<?php  
    function validate_data( string $name, int $age, string $country, string $email): array {
        $errors = [];
        $regex_string = "/[a-zA-Záéíóú ,.'-]+$/";


        if ( empty($name) or !preg_match($regex_string, $name) ) {
            array_push($errors, "El nombre proporcionado no es valido.");
        }

        if ( $age < 0 ) {
            array_push($errors, "La edad proporcionada no es valida.");
        }

        if ( empty($country) or !preg_match($regex_string, $country) ) {
            array_push($errors, "La ciudad proporcinada no es valida.");
        }

        if ( empty($email) or !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
            array_push($errors, "El email proporcionado no es valido");
        }

        return $errors;
    }
?>