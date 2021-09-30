<?php

// keep_login.php
// 로그인 상태인지 비로그인 상태인지, 로그인 상태라면 관리자인지 일반 회원인지 확인

session_start();
if(isset($_SESSION['type'])){
  if($_SESSION['type'] == "mng"){
    echo "mng";
  }else{
    echo "user";
  }
}else{
  echo "false";
}
 ?>
