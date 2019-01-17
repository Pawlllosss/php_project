<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../model/weather.php';

$weather = new Weather();
$statement = $weather->read();
$number_of_rows = 0;

$weather_arr=array();
$weather_arr["records"]=array();

while ($row = $statement->fetchArray(SQLITE3_ASSOC)){
    extract($row);

    $weather_item=array(
        "id" => $ID,
        "measure_date" => $MEASURE_DATE,
        "city" => $CITY,
        "temperature" => $TEMPERATURE,
        "humidity" => $HUMIDITY
    );

    array_push($weather_arr["records"], $weather_item);
    $number_of_rows++;
}

if($number_of_rows > 0 ) {
    http_response_code(200);
    echo json_encode($weather_arr);
}
else {
    http_response_code(404);
    echo json_encode(
        array("message" => "Nie znaleziono rekordów")
    );
}