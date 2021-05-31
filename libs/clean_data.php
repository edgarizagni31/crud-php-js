<?php  
    function clear_text(string $text = ''): string {
        $text = filter_var($text,FILTER_SANITIZE_STRING);
        $text = htmlspecialchars($text);
        $text = stripslashes($text);
        $text = trim($text);
        $text = ucwords($text);

        return $text;
    }

    function clear_email(string $email = ''): string {
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $email = htmlspecialchars($email);
        $email = stripslashes($email);
        $email = trim($email);

        return $email;
    }

?>