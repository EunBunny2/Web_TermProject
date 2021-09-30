<?php
// children.json 파일 안에 저장된 모든 데이터를 읽어서 클라이언트에게 넘겨줌
if(!file_exists("../data/children.json")){ // 파일이 없을 경우
  echo "";
}else{ // 파일이 있을 경우
  $file = fopen("../data/children.json","r");
  $lines = array();
  while(!feof($file)){
    $line = json_decode(fgets($file), true);
    if($line != ""){
      array_push($lines, $line);  // 파일 안의 JSON 문자열들을 디코드해서 배열에 저장
    }
  }
  if(empty($lines)){  // 파일은 있지만 파일 안에 아무 내용도 없을 경우
    echo "";
  }else{ // 파일 안에 내용이 있을 경우
    echo json_encode($lines, JSON_UNESCAPED_UNICODE); // JSON 인코드해서 js 파일로 넘겨줌
  }
  fclose($file);
}
 ?>
