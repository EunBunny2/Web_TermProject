/* 메뉴바 출처 : https://webclub.tistory.com/582 */
$('.icon-menu').on('click', function() {
$('.menu').toggleClass('expanded');
$('span').toggleClass('hidden');
$('.icon-menu , .icon').toggleClass('close');
});

$(document).ready(function() {
  $.post("php/keep_login.php",  // 로그인 중인지 확인
    function(data) {
      if(data == "false"){  // 받은 data가 false이면 비로그인 상태
        $("#login_mypage_nav").text("로그인"); // 상단 네비게이션 메뉴바에 로그인 버튼을 만듦
        $("#login_mypage_nav").attr('href', 'signUp.html');
        $("#login_mypage_nav").off("click");
        $('#show_reg_btn').hide();
      }else{  // 로그인 상태
        $("#login_mypage_nav").text("마이페이지");  // 상단 네비게이션 메뉴바에 마이페이지 버튼을 만듦

        if(data == "mng"){  // 관리자 계정으로 로그인
          $('#show_reg_btn').show();   //'센터의 아이들'의 'ADD' 버튼 보이기
          $("#login_mypage_nav").attr('href', 'myPage_mng.html'); // 마이페이지 버튼을 관리자용 마이페이지로 연결
        }else if(data == "user"){  // 회원 계정으로 로그인
          $('#show_reg_btn').hide();  // '센터의 아이들'의 'ADD' 버튼 숨기기
          $("#login_mypage_nav").attr('href', 'myPage.html'); // 마이페이지 버튼을 회원용 마이페이지로 연결
        }
      }
    });
});
