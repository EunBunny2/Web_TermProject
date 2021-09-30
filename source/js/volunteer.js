
$(document).ready(function() {
  $('#apply_div').hide();
  $('#exit').click(function(){
    $('#apply_div').hide();
  });
  buildCalendar();

});
$('#prev_btn').click(function(){
  prevCalendar();
});
$('#next_btn').click(function(){
  nextCalendar();
});

// 출처 :  https://jerryjerryjerry.tistory.com/26
var today = new Date(); //오늘 날짜
var date = new Date(); //today의 Date를 세어주는 역할
function prevCalendar() { //이전 달
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  buildCalendar(); //달력 cell 만들어 출력
}

function nextCalendar() { //다음 달
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  buildCalendar(); //달력 cell 만들어 출력
}

function buildCalendar() { //현재 달 달력 만들기
  var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  var tbCalendar = document.getElementById("calendar");
  var tbCalendarYM = document.getElementById("tbCalendarYM");
  tbCalendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";

  /*while은 이번달이 끝나면 다음달로 넘겨주는 역할*/
  while (tbCalendar.rows.length > 2) {
    tbCalendar.deleteRow(tbCalendar.rows.length - 1);
  }

  var row = null;
  row = tbCalendar.insertRow();
  var cnt = 0; // count, 셀의 갯수를 세어주는 역할

  for (i = 0; i < doMonth.getDay(); i++) {
    cell = row.insertCell();
    cnt = cnt + 1;
  }

  /*달력 출력*/
  for (i = 1; i <= lastDate.getDate(); i++) {
    //1일부터 마지막 일까지 돌림
    cell = row.insertCell(); //열 한칸한칸 계속 만들어주는 역할
    cell.innerHTML = i; //셀을 1부터 마지막 day까지 HTML 문법에 넣어줌
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "신청하기";
    cell.appendChild(btn);
    cnt = cnt + 1; //열의 갯수를 계속 다음으로 위치하게 해주는 역할
    if (cnt % 7 == 1) {
      /*일요일 계산*/
      cell.innerHTML =i
      cell.appendChild(btn);
    }
    if (cnt % 7 == 0) {
      /* 1주일이 7일 이므로 토요일 구하기*/
      cell.innerHTML = i
      cell.appendChild(btn);
      row = calendar.insertRow();
    }

    // 여기부터 다시 본인 작성
    // 오늘 이전의 날들은 선택할 수 없는 날짜이므로
    // 버튼을 빨강색으로 지정, 클릭하면 신청할 수 없는 날짜라고 알림창 출력
    if((today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() && i < date.getDate())
    ||(today.getFullYear() == date.getFullYear() && today.getMonth() < date.getMonth())||(today.getFullYear() < date.getFullYear())){
        var today_btn = cell.getElementsByTagName('button')[0];
        today_btn.setAttribute('style', 'background-color : rgb(187, 80, 74)');
        today_btn.addEventListener('click',function(e){
          alert("신청할 수 없는 날짜입니다.");
        });
      }else{ // 신청할 수 있는 날짜일 경우 버튼을 초록색으로 지정, 서버에서 인원 검사 후 저장
        var today_btn = cell.getElementsByTagName('button')[0];
        today_btn.setAttribute('style', 'background-color : rgb(167, 204, 96)');
        today_btn.addEventListener('click',function(e){
          var click_day = e.target.parentNode.innerText;
          click_day = click_day.split("\n");
          click_day = ("0" + click_day[0]).slice(-2);
          click_month = ("0" + (today.getMonth()+1)).slice(-2);
          // '신청하기'를 클릭한 해당 달력 날짜
          $('#apply_date').text(today.getFullYear()+"/"+click_month+"/"+click_day);
          $('#ok').off("click");
          $('#ok').one("click", function(){
            add_volunteer(today.getFullYear(), click_month, click_day);
            $('#apply_div').hide();
          });
          var divTop = e.clientY+800; //상단 좌표
         var divLeft = e.clientX+10; //좌측 좌표
         $('#apply_div').css({
             "top": divTop
             ,"left": divLeft
             , "position": "absolute"
         }).show(); // 자원봉사 신청 레이어를 '신청하기' 버튼 위치 근처에 띄우기
        });
      }
  }
}

// 자원봉사 신청 레이어에서 확인 버튼 눌렀을 경우
function add_volunteer(year, month, day){
  if($('#name').val() == "" || $('#vol_tel').val() ==""){
    alert("정보를 정확히 기입하세요.");
  }else{ // 서버에 전송해서 데이터 받아옴
    let obj = new Object();
    obj.vol_name = $('#vol_name').val();
    obj.vol_tel = $('#vol_tel').val();
    obj.vol_birth_year = find_selected('vol_birth_year');
    obj.vol_birth_month = find_selected('vol_birth_month');
    obj.vol_birth_day = String(find_selected('vol_birth_day'));
    obj.time_select = find_checked("time_select");
    obj.year = year;
    obj.month = month;
    obj.day = day;
    obj = JSON.stringify(obj);
    $.post("./php/volunteer.php",
      {
        data: obj
      },
      function(data, status) {
        alert(data);
      });
  }
}

// select 항목에서 선택된 값 반환
function find_selected(select_name){
  var index = document.getElementById(select_name).selectedIndex;
  return document.getElementById(select_name).options[index].value;
}

// 라디오 박스에서 체크된 항목 찾아서 리턴
function find_checked(radio_box_name) {
  let radio_box = document.getElementsByName(radio_box_name);
  for (let i = 0; i < radio_box.length; i++) {
    if (radio_box[i].checked) {
      return radio_box[i].value;
    }
  }
}
