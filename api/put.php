<?php  
    function update_user() {
        extract($_GET); 
        parse_str(file_get_contents("php://input"),$_PUT);
        extract($_PUT);

        $connect = connect_db();
        $response_api = [];
        $errors = [];
        $errors_db = false;
        $ok = false;

        if ( !$connect ) {
            die();
        }

        # validate id
        $response_db = $connect->query("SELECT MAX(id) as MAX_ID FROM users;");
        $MAX_ID = $response_db->fetch_assoc()['MAX_ID'];
        $MAX_ID = intval($MAX_ID);        

        if ( $id > $MAX_ID) {
            array_push($errors, "El id no es valido.");
        }

        # sanitize data
        $name = clear_text($name);
        $age  = intval(clear_text($age));
        $country = clear_text($country);
        $email = clear_email($email);

        $errors = validate_data($name, $age, $country, $email);

        if ( count($errors) == 0 ) {
            $stm = $connect->prepare("UPDATE users SET name = ?, age = ?, country = ?, email = ? WHERE id = ?");
            $stm->bind_param("sissi",$name,$age,$country,$email,$id);
            $response_db = $stm->execute();

            if ( $response_db ) {
                if ($stm->affected_rows >= 1) {
                    $ok = true;
                } else {
                    $errors_db = true;
                }
            } else {
                $errors_db = true;
            }
        }

        $connect->close();
        $response_api = [
            "ok" => $ok,
            "errors" => $errors,
            "errors_db" => $errors_db
        ];

        return $response_api;
    }
?>