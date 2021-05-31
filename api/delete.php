<?php  
    function delete_user() {
        extract($_GET);

        $errors = [];
        $ok = false;
        $errors_db = false;
        $response_api;
        $connect = connect_db();

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

        if ( count($errors) == 0 ) {
            $stm = $connect->prepare( " DELETE FROM users WHERE id = ?;" );
            $stm->bind_param("i",$id);
            $response_db = $stm->execute();

            if ( $response_db ) {
                $ok = true;
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