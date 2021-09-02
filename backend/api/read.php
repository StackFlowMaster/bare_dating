<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/database.php';
    include_once '../class/tasks.php';
    include_once '../middlewares/auth.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders);

    if($auth->isAuth()){
        $items = new Task($db);

        $stmt = $items->getTasks();
        $itemCount = $stmt->rowCount();

        if($itemCount > 0){
            
            $taskArr = array();
            $taskArr["body"] = array();
            $taskArr["itemCount"] = $itemCount;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $e = array(
                    "id" => $id,
                    "date" => $date,
                    "title" => $title,
                    "content" => $content
                );

                array_push($taskArr["body"], $e);
            }
            $returnData = [
                "success" => 1,
                "status" => 200,
                "message" => "Success",
                "data" => $taskArr
            ];
        } else{
            $returnData = [
                "success" => 0,
                "status" => 201,
                "message" => "Not found"
            ];
        }
    } else {
        $returnData = [
            "success" => 0,
            "status" => 401,
            "message" => "Unauthorized"
        ];
    }

    echo json_encode($returnData);

    
?>