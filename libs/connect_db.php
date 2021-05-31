<?php  
    function connect_db() {
        $connect = new mysqli("localhost","root","","ajax");
        
        if ( $connect->connect_errno ) {
            $connect = false;
        }

        return $connect;
    }
?>