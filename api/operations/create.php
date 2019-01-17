<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../model/weather.php';

function check_if_json_is_proper($json_data) {
    return !empty($json_data->city) &&
        !empty($json_data->temperature) &&
        !empty($json_data->humidity);
}


$weather = new Weather();

$json_data = json_decode(file_get_contents("php://input"));

if(check_if_json_is_proper($json_data)) {
    $weather->measure_date = date('Y-m-d H:i:s');
    $weather->city = $json_data->city;
    $weather->temperature = $json_data->temperature;
    $weather->humidity = $json_data->humidity;

    if($weather->create()) {
        http_response_code(201);
        echo json_encode(array("message" => "Dodano kolejny wpis!"));
    }
    else {
        http_response_code(503);
        echo json_encode(array("message" => "Nie udało się dodać wpisu!",
                "debug" => $weather->measure_date.$weather->city.$weather->temperature.$weather->humidity));
    }

}
else {
    http_response_code(400);
    echo json_encode(array("message" => "Nie udało się dodać wpisu! Niekompletne informacje!"));
}
