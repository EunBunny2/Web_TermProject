<?php

// children.php
// 새로운 아이 등록시 children.json 파일에 저장

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $obj = $_POST["data"];
  $obj_dec = json_decode($obj, true);
  // validation
  $img_file = test_input($obj_dec["img_file"]);
  $pet_name = test_input($obj_dec["pet_name"]);
  $sex_val = test_input($obj_dec["sex_val"]);
  $kind_val = test_input($obj_dec["kind_val"]);
  $race = test_input($obj_dec["race"]);
  $state_val = test_input($obj_dec["state_val"]);
  $reg_date = test_input($obj_dec["reg_date"]);
  $personality = $obj_dec["personality"];
  $remark = test_input($obj_dec["remark"]);

  // children.json 파일에 데이터 추가
  $file = fopen("../data/children.json","a+");
  $input = array("img_file"=>$img_file, "pet_name"=>$pet_name, "kind"=>$kind_val,"race"=>$race,
                  "state"=>$state_val, "sex"=>$sex_val, "reg_date"=>$reg_date, "personality"=>$personality, "remark"=>$remark);
  $json_input = json_encode($input, JSON_UNESCAPED_UNICODE);  // 한글 깨지지 않도록 옵션 추가
  fwrite($file, $json_input."\n"); // encode 해서 파일에 작성
  fclose($file);
  echo $json_input; // 등록한 아이에 대한 데이터를 클라이언트에게 넘겨줌
}

 ?>
