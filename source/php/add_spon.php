<?php

// add_spon.php
// 결연 맺기 데이터를 파일에 저장 및 저장 여부를 클라이언트에게 전송

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $spon_info             = $_POST['data'];
  $spon_info_dec         = json_decode($spon_info, true);
  $spon_name             = $spon_info_dec["spon_name"];
  $spon_tel              = $spon_info_dec["spon_tel"];
  $spon_address          = $spon_info_dec["spon_address"];
  $spon_term             = $spon_info_dec["spon_term"];
  $spon_date             = $spon_info_dec["spon_date"];
  $current_children       = $spon_info_dec["current_children"];

  $spon_end_date = 0;
   // 후원 시작 날짜와 후원 기간으로 후원 종료 날짜 계산
  if($spon_term == "1m"){
    $spon_end_date = strtotime($spon_date.'+1 month');
  }else if($spon_term == "6m"){
    $spon_end_date = strtotime($spon_date.'+6 month');
  }else if($spon_term == "1y"){
    $spon_end_date = strtotime($spon_date.'+1 year');
  }
  $spon_end_date = date("Y-m-d", $spon_end_date);

  // 후원 받은 아이의 이름을 파일명으로 데이터 저장
  $file_path = "../data/mng_version/spon/".$current_children[1].".json";
  $file = fopen($file_path, "a+");
  $spon = array("img"=>$current_children[0],"name"=>$spon_name, "address"=>$spon_address,
   "tel"=>$spon_tel, "spon_start_date"=>$spon_date, "spon_term"=>$spon_term, "spon_end_date"=>$spon_end_date);
  fwrite($file, json_encode($spon, JSON_UNESCAPED_UNICODE)."\n"); // encode 해서 파일에 작성
  fclose($file);
  session_start();
  if(isset($_SESSION['user_id'])){   // 로그인한 상태면 아이디를 파일명으로 데이터 저장
    $user_v_file = fopen("../data/user_version/spon/".$_SESSION['user_id'].".json", "a+");
  }else{ // 비로그인 상태이면 신청자 이름을 파일명으로 데이터 저장
    $user_v_file = fopen("../data/user_version/spon/".$spon_name.".json", "a+");
  }
  $spon_content = array("img"=>$current_children[0], "pet_name"=>$current_children[1],
  "spon_start_date"=>$spon_date, "spon_term"=>$spon_term, "spon_end_date"=>$spon_end_date);
  fwrite($user_v_file, json_encode($spon_content, JSON_UNESCAPED_UNICODE)."\n");
  fclose($user_v_file);
  
  echo "신청되었습니다.";
}
 ?>
