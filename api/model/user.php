<?php

class User
{
    public $id;
    public $login;
    public $password;

    private $database_connection;
    private $table_name = 'USER';

    function __construct()
    {
        include_once '../config/database.php';
        $this->database_connection = new Database();

        $this->prepare_table();
    }

    function read() {
        $sql_query = 'SELECT id, password FROM '.$this->table_name;
        $result = $this->database_connection->query($sql_query);

        return $result;
    }

    function create() {
        $sql_query = "INSERT INTO ".$this->table_name ."
         (LOGIN, PASSWORD)
          VALUES (:login, :password)";

        $prepared_query = $this->database_connection->prepare($sql_query);
        $prepared_query->bindValue(':login', $this->login);
        $prepared_query->bindValue(':password', $this->password);

        $result = false;

        if($prepared_query->execute()) {
            $result = true;
        }

        return $result;
    }

    function loginExists() {
        $this->login = htmlspecialchars(strip_tags($this->login));

        $sql_query = 'SELECT id, login, password FROM ' . $this->table_name .
        " WHERE login = '".$this->login."' LIMIT 0,1";

        $prepared_query = $this->database_connection->prepare($sql_query);
//        $prepared_query->bindValue(1, $this->login);

        $query_result = $prepared_query->execute();
        $result = false;

        if($row = $query_result->fetchArray(SQLITE3_ASSOC)) {
            $this->id = $row['ID'];
            $this->login = $row['LOGIN'];
            $this->password = $row['PASSWORD'];

            $result = true;
        }

        return $result;
    }

    private function prepare_table() {
        $create_statement = 'CREATE TABLE IF NOT EXISTS USER
                            (ID             INTEGER PRIMARY KEY   AUTOINCREMENT ,
                            LOGIN           VARCHAR(100)     NOT NULL,
                            PASSWORD		VARCHAR(100)  NOT NULL)';


        $this->database_connection->exec($create_statement);
    }

}