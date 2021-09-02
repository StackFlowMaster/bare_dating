<?php
    class Task{

        // Connection
        private $conn;

        // Table
        private $db_table = "tasks";

        // Columns
        public $id;
        public $date;
        public $title;
        public $content;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }

        // GET ALL
        public function getTasks(){
            $sqlQuery = "SELECT id, date, title, content FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        // CREATE
        public function createTask(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                        SET
                        date = :date, 
                        title = :title, 
                        content = :content";
        
            $stmt = $this->conn->prepare($sqlQuery);
            // sanitize
            $this->date=htmlspecialchars(strip_tags($this->date));
            $this->title=htmlspecialchars(strip_tags($this->title));
            $this->content=htmlspecialchars(strip_tags($this->content));
            // bind data
            $stmt->bindParam(":date", $this->date);
            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":content", $this->content);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // READ single
        public function getSingleTask(){
            $sqlQuery = "SELECT
                        id, 
                        date, 
                        title, 
                        content
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       id = ?
                    LIMIT 0,1";

            $stmt = $this->conn->prepare($sqlQuery);

            $stmt->bindParam(1, $this->id);

            $stmt->execute();

            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->date = $dataRow['date'];
            $this->title = $dataRow['title'];
            $this->content = $dataRow['content'];
        }        

        // UPDATE
        public function updateTask(){
            $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        date = :date, 
                        title = :title, 
                        content = :content
                        WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->date=htmlspecialchars(strip_tags($this->date));
            $this->title=htmlspecialchars(strip_tags($this->title));
            $this->content=htmlspecialchars(strip_tags($this->content));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":date", $this->date);
            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":content", $this->content);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE
        function deleteTask(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>