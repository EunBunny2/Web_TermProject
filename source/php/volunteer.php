<?php

// volunteer.php
// 자원봉사자 정보를 파일에 저장

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $vol_info          = $_POST['data'];
  $vol_info_dec      = json_decode($vol_info, true);
  $vol_name          = $vol_info_dec["vol_name"];
  $vol_tel           = $vol_info_dec["vol_tel"];
  $vol_birth_year    = $vol_info_dec["vol_birth_year"];
  $vol_birth_month   = $vol_info_dec["vol_birth_month"];
  $vol_birth_day     = $vol_info_dec["vol_birth_day"];
  $time_select       = $vol_info_dec["time_select"];
  $year              = $vol_info_dec["year"];
  $month             = $vol_info_dec["month"];
  $day               = $vol_info_dec["day"];

// 해당 날짜에 저장된 인원이 5명 이상이면 저장하지 않음. 파일이 없거나 인원이 5명 미만이면 저장
  $check = true;
  $file_path = "../data/mng_version/volunteer/".$year.$month.$day.$time_select.".json";
  if(file_exists($file_path)){
    $file = fopen($file_path, "r");
    if(count_vol_num($file)>=5){
      $check = false;
    }
    fclose($file);
  }
  if($check){ // 파일이 없거나 인원이 5명 미만일 경우
    $file = fopen($file_path, "a+");
    $vol_birth = $vol_birth_year."/".$vol_birth_month."/".$vol_birth_day;
    $vol = array("name"=>$vol_name, "birth"=>$vol_birth, "tel"=>$vol_tel);
    fwrite($file, json_encode($vol, JSON_UNESCAPED_UNICODE)."\n"); // encode 해서 파일에 작성
    fclose($file);
    session_start();
    if(isset($_SESSION['user_id'])){  // 로그인한 상태면 아이디를 파일 명으로 저장, 비로그인 상태이면 신청자 이름으로 파일명 저장
      $user_v_file = fopen("../data/user_version/volunteer/".$_SESSION['user_id'].".json", "a+");
    }else{
      $user_v_file = fopen("../data/user_version/volunteer/".$vol_name.".json", "a+");
    }
    $vol_date = $year."/".$month."/".$day;
    $user_vol_content = array("vol_date"=>$vol_date, "time_select"=>$time_select);
    fwrite($user_v_file, json_encode($user_vol_content, JSON_UNESCAPED_UNICODE)."\n");
    fclose($user_v_file);
    echo "신청되었습니다.";
  }else{ // 인원이 5명 이상일 경우
    echo "인원이 다 찼습니다.";
  }
  }

function count_vol_num($file){ // 파일에 저장된 자원봉사자 인원 카운팅해서 반환
  $count = 0;
  while (!feof($file)) {
      $line = json_decode(fgets($file), true);
      if ($line != "") {
          $count = $count +1;
      }
  }
  return $count;
}

 ?>
