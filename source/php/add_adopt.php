<?php

// add_adopt.php
// 입양 문의 데이터를 파일에 저장 및 저장 여부를 클라이언트에게 전송

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $adopt_info             = $_POST['data'];
  $adopt_info_dec         = json_decode($adopt_info, true);
  $adopt_name             = $adopt_info_dec["adopt_name"];
  $adopt_tel              = $adopt_info_dec["adopt_tel"];
  $adopt_birth_year       = $adopt_info_dec["adopt_birth_year"];
  $adopt_birth_month      = $adopt_info_dec["adopt_birth_month"];
  $adopt_birth_day        = $adopt_info_dec["adopt_birth_day"];
  $job                    = $adopt_info_dec["job"];
  $family                 = $adopt_info_dec["family"];
  $address                = $adopt_info_dec["address"];
  $have_experience        = $adopt_info_dec["have_experience"];
  $current_children       = $adopt_info_dec["current_children"];

  // 입양 문의 받은 아이의 이름을 파일명으로 데이터 저장
  $file_path = "../data/mng_version/adopt/".$current_children[1].".json";
  $file = fopen($file_path, "a+");
  $adopt_birth = $adopt_birth_year."/".$adopt_birth_month."/".$adopt_birth_day;
  $adopt = array("img"=>$current_children[0],"name"=>$adopt_name, "birth"=>$adopt_birth, "tel"=>$adopt_tel,
  "job"=>$job, "address"=>$address, "family"=>$family,"have_experience"=>$have_experience);
  fwrite($file, json_encode($adopt, JSON_UNESCAPED_UNICODE)."\n"); // encode 해서 파일에 작성
  fclose($file);

  session_start();
  if(isset($_SESSION['user_id'])){  // 로그인한 상태면 아이디를 파일명으로 데이터 저장
    $user_v_file = fopen("../data/user_version/adopt/".$_SESSION['user_id'].".json", "a+");
  }else{ // 비로그인 상태이면 신청자 이름을 파일명으로 데이터 저장
    $user_v_file = fopen("../data/user_version/adopt/".$adopt_name.".json", "a+");
  }
  $adopt_content = array("img"=>$current_children[0], "pet_name"=>$current_children[1]);
  fwrite($user_v_file, json_encode($adopt_content, JSON_UNESCAPED_UNICODE)."\n");
  fclose($user_v_file);
  
  echo "신청되었습니다.";
}
 ?>
