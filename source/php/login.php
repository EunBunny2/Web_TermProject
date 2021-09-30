<?php

// login.php
// id, pw 맞는지 판단하고 로그인

  $user_info = $_POST['user_info'];
  $user_info_dec = json_decode($user_info, true);
  $user_id       = $user_info_dec["user_id"];
  $user_pw       = $user_info_dec["user_pw"];

  $user_file_path = "../data/user_info.json";
  $mng_file_path = "../data/mng_info.json";


  if(!file_exists($user_file_path)){// 회원 정보 파일이 없을 경우
    if(!file_exists($mng_file_path)){// 관리자 정보 파일 없을 경우
      echo "false"; // 로그인 실패
    }else{  // 회원 정보 파일 없고 관리자 정보 파일 있을 경우
      if(!(find_user($mng_file_path, $user_id, $user_pw, "mng"))){ // 관리자 정보 파일 검사
        echo "false";
      }
    }
  }else{ // 회원 정보 파일 있을 경우
    if(!(find_user($user_file_path, $user_id, $user_pw , "user"))){ // 회원 정보 파일 검사
      if(!(find_user($mng_file_path, $user_id, $user_pw, "mng"))){ // 관리자 정보 파일 검사
        echo "false";
      }
    }
  }
  function find_user($file, $user_id, $user_pw, $type){
    $members = array();
    $check = false;
    $file = fopen($file, "r");
    while (!feof($file)) { // 파일 안의 json 문장들을 decode해서 members 배열에 삽입
        $line = json_decode(fgets($file), true);
        if ($line != "") {
            array_push($members, $line);
        }
    }
    fclose($file);

    foreach ($members as $index => $mem) {
      $in_id = $members[$index]["id"];
      $in_pw = $members[$index]["pw"];

      // 일치하는 id, pw가 있으면 로그인 성공
      if($in_id == $user_id && $in_pw == $user_pw){
        session_start();
        // session 변수를 통해 현재 로그인한 회원의 id 저장
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_name'] = $members[$index]["name"];
        $_SESSION['user_birth'] = $members[$index]["birth"];
        $_SESSION['user_tel'] = $members[$index]["tel"];
        $_SESSION['user_email'] = $members[$index]["email"];
        $_SESSION['type'] = $type;
        $user = array("type"=>$type,"id"=>$user_id, "name"=>$_SESSION['user_name'],
         "birth"=>$_SESSION['user_birth'], "tel"=>$_SESSION['user_tel'], "email"=>$_SESSION['user_email']);
        echo json_encode($user, JSON_UNESCAPED_UNICODE); // 클라이언트에게 로그인 정보 전송
        $check = true;
        break;
      }
    } // 일치하는 id, pw가 없음
    if(!$check){
        return false;
    }else{  // 일치하는 id, pw 있음
      return true;
    }
  }
 ?>
