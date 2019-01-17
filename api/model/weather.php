<?php

class Weather
{
    public $id;
    public $measure_date;
    public $city;
    public $temperature;
    public $humidity;

    private $database_connection;
    private $table_name = 'WEATHER';

    function __construct()
    {
        include_once '../config/database.php';
        $this->database_connection = new Database();

        $this->prepare_table();
    }

    function read() {
        $sql_query = 'SELECT * FROM '.$this->table_name;
        $result = $this->database_connection->query($sql_query);

        return $result;
    }

    function create() {
        $sql_query = "INSERT INTO ".$this->table_name ."
         (MEASURE_DATE, CITY, TEMPERATURE, HUMIDITY)
          VALUES (:measure_date, :city, :temperature, :humidity)";

        $prepared_query = $this->database_connection->prepare($sql_query);
        $prepared_query->bindValue(':measure_date', $this->measure_date);
        $prepared_query->bindValue(':city', $this->city);
        $prepared_query->bindValue(':temperature', $this->temperature);
        $prepared_query->bindValue(':humidity', $this->humidity);

        $result = false;

        if($prepared_query->execute()) {
            $result = true;
        }

        return $result;
    }

    private function prepare_table() {
        $create_statement = 'CREATE TABLE IF NOT EXISTS WEATHER
                            (ID INTEGER PRIMARY KEY   AUTOINCREMENT ,
                            MEASURE_DATE           DATE    NOT NULL,
                            CITY            VARCHAR(100)     NOT NULL,
                            TEMPERATURE		REAL  NOT NULL,
                            HUMIDITY         REAL   NOT NULL)';


        $this->database_connection->exec($create_statement);
    }

}