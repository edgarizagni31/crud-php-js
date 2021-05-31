<?php  
    header('Content-Type: application/json');

    error_reporting(0);

    require 'libs/clean_data.php';
    require 'libs/validate_data.php';
    require 'libs/connect_db.php';
    # method api
    require 'api/get.php';
    require 'api/post.php';
    require 'api/put.php';
    require 'api/delete.php';

    # HTTP methods
    $api = [
        "GET"  => 'get_users',
        "POST" => 'create_new_user',
        "PUT"  => 'update_user',
        "DELETE" => 'delete_user'
    ];

    $response_api = call_user_func( $api[$_SERVER['REQUEST_METHOD']] );

    echo json_encode($response_api);
?>