<?php  
    function create_new_user () {
        extract($_POST);
        $response_api = [];
        $errors = [];
        $errors_db = false;
        $ok = false;

        # sanitize data
        $name = clear_text($name);
        $age  = intval(clear_text($age));
        $country = clear_text($country);
        $email = clear_email($email);

        # validate data 
        $errors = validate_data($name, $age, $country, $email); 

        if ( count($errors) == 0 ) {
            $connect = connect_db();

            if ( !$connect ) {
                die();
            }

            $stm = $connect->prepare("INSERT INTO users VALUES (null,?,?,?,?);");
            $stm->bind_param("siss", $name, $age, $country, $email);
            $res = $stm->execute();

            if ( $res ) {
                if ($stm->affected_rows >= 1) {
                    $ok = true;
                } else {
                    $errors_db = true;
                }
            } else {
                $errors = true;
            }

            $connect->close();
        }

        $response_api = [
            "ok" => $ok,
            "errors" => $errors,
            "errors_db" => $errors_db
        ];

        return $response_api;
    }

?>