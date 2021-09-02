<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../config/database.php';
    include_once '../class/employees.php';
    include_once '../middlewares/auth.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders);

    if($auth->isAuth()){
        $item = new Task($db);

        $item->id = isset($_GET['id']) ? $_GET['id'] : die();
    
        $item->getSingleTask();

        if($item->name != null){
            // create array
            $tempArr = array(
                "id" =>  $item->id,
                "date" => $item->date,
                "title" => $item->title,
                "content" => $item->content
            );

            $returnData = [
                "success" => 1,
                "status" => 200,
                "message" => "success",
                "data" => $tempArr
            ];
        }
        
        else{
            $returnData = [
                "success" => 0,
                "status" => 201,
                "message" => "Not found",
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