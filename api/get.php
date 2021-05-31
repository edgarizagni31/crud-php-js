<?php  
    function get_users(): array {
        $connect = connect_db();
        $users = [];

        if (!$connect) {
            die();
        }

        $res = $connect->query("SELECT * FROM users;");

        if ( $res ) {
            $row_db = $res->fetch_assoc();

            while ( $row_db ) {
                extract($row_db);

                $user = [
                    "id"      => $id,
                    "name"    => $name,
                    "age"     => $age,
                    "country" => $country, 
                    "email"   => $email
                ];

                array_push($users, $user);
                $row_db = $res->fetch_assoc();
            }
        } else  {
            $users = [];    
        }

        $connect->close();
        return $users;
    }
?>