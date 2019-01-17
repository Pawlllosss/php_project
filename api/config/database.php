<?php

class Database extends SQLite3 {
    private $db_name = 'task.sqlite';

    function __construct()
    {
        $this->open($this->db_name);
    }


}
