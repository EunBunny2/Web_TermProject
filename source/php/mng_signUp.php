<?php

  // mng_signUp.php
  // 관리자로 가입할 경우 관리자 정보 파일에 저장

  $mng_name = $_POST['user_name'];
  $mng_id = $_POST['user_id'];
  $mng_pw = $_POST['user_pw'];
  $mng_birth_year = $_POST['user_birth_year'];
  $mng_birth_month = $_POST['user_birth_month'];
  $mng_birth_day = $_POST['user_birth_day'];
  $mng_tel = $_POST['user_tel'];
  $mng_email = $_POST['user_email'];
  if(!isset($myObj)) $myObj = new stdClass();
  $mngs = array();
  $check = false;
  if(!file_exists("../data/mng_info.json")){ //mng_info.json 파일이 없을 경우
    $file = fopen("../data/mng_info.json", "a+");
    sign_up($file); // 파일을 생성하고 id, pw를 파일에 저장
  }else{  //mng_info.json 파일이 있을 경우
    $file = fopen("../data/mng_info.json", "a+");
    while(!feof($file)){ // 파일 안의 json 문장들을 decode해서 mngs 배열에 삽입
      $line = json_decode(fgets($file));
      if($line != ""){
        array_push($mngs, $line);
      }
    }
    // id가 이미 존재하는지 검사
    foreach ($mngs as $index => $mem) {
        $in_id = $mngs[$index]->id;
        if($in_id == $mng_id){ // id가 존재할 경우
          echo "<script>alert(\".이미 아이디가 존재합니다.\");</script>";
          echo("<script>location.replace('../signUp.html');</script>");
          $check = true;
          break;
        }
      }
      if(!$check){  // id가 존재하지 않을 경우
        sign_up($file); // 회원가입
      }
  }
  fclose($file);

  function sign_up($file){ // 회원 정보를 파일에 작성
    global $mng_id;
    global $mng_pw;
    global $mng_name;
    global $mng_birth_year;
    global $mng_birth_month;
    global $mng_birth_day;
    global $mng_tel;
    global $mng_email;
    $mng_birth = $mng_birth_year."/".$mng_birth_month."/".$mng_birth_day;
    $mng = array("id"=>$mng_id, "pw"=>$mng_pw, "name"=>$mng_name, "birth"=>$mng_birth, "tel"=>$mng_tel, "email"=>$mng_email);
    fwrite($file, json_encode($mng, JSON_UNESCAPED_UNICODE)."\n"); // encode 해서 파일에 작성
    echo "<script>alert(\"회원 가입이 완료되었습니다.\");</script>";
    echo("<script>location.replace('../signUp.html');</script>");
  }
 ?>
