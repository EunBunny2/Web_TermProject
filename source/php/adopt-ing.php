<?php

// adopt-ing.php
// 모든 입양 문의 내역을 클라이언트에게 전송

session_start();
if($_SESSION['type'] == 'mng'){ // 관리자 로그인시 아이 이름별 입양 문의 내역을 전송
  $dir    = "../data/mng_version/adopt";
  $handle = opendir($dir);
  $files  = array();

  // adopt 폴더에 있는 모든 파일명을 $files에 모음
  while (false !== ($filename = readdir($handle))) {
      if ($filename == "." || $filename == "..") {
          continue;
      }
      if (is_file($dir . "/" . $filename)) {
          $files[] = $filename;
      }
  }
  closedir($handle);

  if (count($files) != 0) {
      $all_list = array();
      foreach ($files as $f) { // 각 파일명을 pet_name에 저장, 파일 내용을 list에 저장
          $f_open = fopen($dir . "/" . $f, 'r');
          $one_list = array();
          $one_list['pet_name'] = explode('.' , $f)[0];
          $one_list['list'] = array();
          while (!feof($f_open)) {
              $line = json_decode(fgets($f_open));
              if ($line != "") {
                  array_push($one_list['list'], $line);
              }
          }
          fclose($f_open);
          array_push($all_list, $one_list); // 모든 파일에 대한 데이터를 $all_list에 저장
      }
      if (count($all_list) != 0) {
          $send_data = array();
          $send_data['type'] = $_SESSION['type'];
          $send_data['all_list'] = $all_list;
          echo json_encode($send_data); // 로그인 타입과 입양 문의 내역을 배열로 묶어 클라이언트에게 전송
      }
  }
}else{ // 일반회원 로그인시 개별 입양 문의 내역을 전송
  $user_id = $_SESSION['user_id'];
  $dir    = "../data/user_version/adopt";
  $handle = opendir($dir);
  $files  = array();
  while (false !== ($filename = readdir($handle))) {
      if ($filename == "." || $filename == "..") {
          continue;
      }
      if (is_file($dir . "/" . $filename)) {
        // 회원 아이디로 저장된 파일명만 $files에 모음
          $id_in_filename = explode('.', $filename);
          if ($id_in_filename[0] == $user_id) {
              $files[] = $filename;
          }
      }
  }
  closedir($handle);

  if (count($files) != 0) {
      $all_list = array();
      foreach ($files as $f) {
          $f_open = fopen($dir . "/" . $f, 'r');
          while (!feof($f_open)) {
              $line = json_decode(fgets($f_open));
              if ($line != "") {
                  array_push($all_list, $line); // 파일 내용을 모두 $all_list에 저장
              }
          }
          fclose($f_open);
      }
      if (count($all_list) != 0) {
          $send_data = array();
          $send_data['type'] = $_SESSION['type'];
          $send_data['all_list'] = $all_list;
          echo json_encode($send_data); // 로그인 타입과 자원봉사 신청 내역을 배열로 묶어 클라이언트에게 전송
      }
  }
}

 ?>
