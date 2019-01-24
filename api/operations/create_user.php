<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../model/user.php';

function check_if_json_is_proper($json_data) {
    return !empty($json_data->login) &&
        !empty($json_data->password);
}


$user = new User();

$json_data = json_decode(file_get_contents("php://input"));

if(check_if_json_is_proper($json_data)) {
    $user->login = $json_data->login;
    $user->password = $json_data->password;

    if($user->create()) {
        http_response_code(201);
        echo json_encode(array("message" => "Dodano użytkownika!"));
    }
    else {
        http_response_code(503);
        echo json_encode(array("message" => "Nie udało się dodać użytkownika!"));
    }

}
else {
    http_response_code(400);
    echo json_encode(array("message" => "Nie udało się dodać użytkownika! Niekompletne informacje!"));
}
