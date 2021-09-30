<?php

  // mng_signUp.php
  // 일반 회원로 가입할 경우 회원 정보 파일에 저장

  $user_name = $_POST['user_name'];
  $user_id = $_POST['user_id'];
  $user_pw = $_POST['user_pw'];
  $user_birth_year = $_POST['user_birth_year'];
  $user_birth_month = $_POST['user_birth_month'];
  $user_birth_day = $_POST['user_birth_day'];
  $user_tel = $_POST['user_tel'];
  $user_email = $_POST['user_email'];
  if(!isset($myObj)) $myObj = new stdClass();
  $users = array();
  $check = false;
  if(!file_exists("../data/user_info.json")){ //user_info.json 파일이 없을 경우
    $file = fopen("../data/user_info.json", "a+");
    sign_up($file); // 파일을 생성하고 id, pw를 파일에 저장
  }else{  //user_info.json 파일이 있을 경우
    $file = fopen("../data/user_info.json", "a+");
    while(!feof($file)){ // 파일 안의 json 문장들을 decode해서 users 배열에 삽입
      $line = json_decode(fgets($file));
      if($line != ""){
        array_push($users, $line);
      }
    }
    // id가 이미 존재하는지 검사
    foreach ($users as $index => $mem) {
        $in_id = $users[$index]->id;
        if($in_id == $user_id){ // id가 존재할 경우
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

  function sign_up($file){
    global $user_id;
    global $user_pw;
    global $user_name;
    global $user_birth_year;
    global $user_birth_month;
    global $user_birth_day;
    global $user_tel;
    global $user_email;
    $user_birth = $user_birth_year."/".$user_birth_month."/".$user_birth_day;
    $user = array("id"=>$user_id, "pw"=>$user_pw, "name"=>$user_name, "birth"=>$user_birth, "tel"=>$user_tel, "email"=>$user_email);
    fwrite($file, json_encode($user, JSON_UNESCAPED_UNICODE)."\n"); // encode 해서 파일에 작성
    echo "<script>alert(\"회원 가입이 완료되었습니다.\");</script>";
    echo("<script>location.replace('../signUp.html');</script>");
  }
 ?>
