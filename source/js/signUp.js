$(document).ready(function() {
  $(".sign_up").hide();
  $("#go_sign_div").click(function() { // 회원가입 버튼 클릭하면 회원가입 양식 보여줌
    $(".sign_up").slideToggle("fast");
  });

  $('#login_btn').click(function() { // 로그인 버튼 클릭시
    if($("#user_id").val() == "" || $("#user_pw").val() == ""){
      alert("아이디 또는 비밀번호를 입력하세요");
    }else{ // id, pw 모두 적었을 경우 서버에 보내서 검사
      var obj = new Object();
      obj.user_id = $("#user_id").val();
      obj.user_pw = $("#user_pw").val();
      obj = JSON.stringify(obj); // JSON 문법으로 변환
      $.post("php/login.php", // POST 방식으로 데이터 전송
        {
          user_info: obj
        },
        function(data, status) {
          console.log(data);
          if(data == "false"){ // 로그인 실패
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          }else{  // 로그인 성공
            data = JSON.parse(data);
            alert(data['name']+"님 로그인 되었습니다.");
            history.back(); // 이전 페이지로 돌아감
          }
        });
    }
  });
});
