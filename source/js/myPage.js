$(document).ready(function() {
  // logout 버튼 클릭
  $("#logout_btn").click(function() {
    $.post("php/logout.php");
    history.back();
  });

  // 서버로부터 자원봉사 신청 내역 불러오기
  $.post("php/volunteer-ing.php",
    function(data) {
      var vol_tab = document.getElementById('vol_tab');
      if (data == '') { // 서버로부터 받은 데이터가 없을 경우
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerText = "자원봉사 신청 내역이 없습니다";
        tr.appendChild(td1);
        vol_tab.appendChild(tr);
      } else { // 서버로부터 받은 데이터가 있을 경우
        data = JSON.parse(data);
        if (data['type'] == 'user') { // 일반 회원 마이페이지 자원봉사 신청 내역 : 날짜, 시간
          var tr1 = document.createElement('tr');
          var th1 = document.createElement('th');
          var th2 = document.createElement('th');

          th1.innerText = "날짜";
          th2.innerText = "시간";

          tr1.appendChild(th1);
          tr1.appendChild(th2);
          vol_tab.appendChild(tr1);

          for (var i = 0; i < data['all_todo'].length; i++) {
            var tr2 = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');

            td1.innerText = data['all_todo'][i]['vol_date'];

            if (data['all_todo'][i]['time_select'] == 'am') {
              td2.innerText = '오전(9:00~12:00)';
            } else {
              td2.innerText = '오후(14:00~17:00)';
            }

            tr2.appendChild(td1);
            tr2.appendChild(td2);
            vol_tab.appendChild(tr2);
          }
        } else { // 관리자 마이페이지 자원봉사 신청 내역 : 날짜, 시간, 이름, 생년월일, 연락처
          for (var i = 0; i < data['all_list'].length; i++) {

            var tr1 = document.createElement('tr');
            var date_th = document.createElement('th');
            var tr2 = document.createElement('tr');
            var name_th = document.createElement('th');
            var birth_th = document.createElement('th');
            var tel_th = document.createElement('th');

            name_th.innerText = "이름";
            birth_th.innerText = "생년월일";
            tel_th.innerText = "연락처";
            date_th.innerText = data['all_list'][i]['date'];

            tr1.appendChild(date_th);
            tr2.appendChild(name_th);
            tr2.appendChild(birth_th);
            tr2.appendChild(tel_th);
            vol_tab.appendChild(tr1);
            vol_tab.appendChild(tr2);

            for (var j = 0; j < data['all_list'][i]['list'].length; j++) {
              var tr3 = document.createElement('tr');
              var date_td = document.createElement('td');
              var birth_td = document.createElement('td');
              var tel_td = document.createElement('td');
              date_td.innerText = data['all_list'][i]['list'][j]['name'];
              birth_td.innerText = data['all_list'][i]['list'][j]['birth'];
              tel_td.innerText = data['all_list'][i]['list'][j]['tel'];
              tr3.appendChild(date_td);
              tr3.appendChild(birth_td);
              tr3.appendChild(tel_td);
              vol_tab.appendChild(tr3);
            }
          }
        }
      }
    });

  // 서버로부터 입양 문의 내역 불러오기
  $.post("php/adopt-ing.php",
    function(data) {
      var adopt_tab = document.getElementById('adopt_tab');
      if (data == '') { // 서버로부터 받은 데이터가 없을 경우
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerText = "입양 문의 내역이 없습니다";
        tr.appendChild(td1);
        adopt_tab.appendChild(tr);
      } else { // 서버로부터 받은 데이터가 있을 경우
        data = JSON.parse(data);
        if (data['type'] == 'user') { // 일반 회원 마이페이지 입양 문의 내역 : 이미지, 이름
          var tr1 = document.createElement('tr');
          var th1 = document.createElement('th');
          var th2 = document.createElement('th');
          th1.innerText = "이미지";
          th2.innerText = "이름";
          tr1.appendChild(th1);
          tr1.appendChild(th2);
          adopt_tab.appendChild(tr1);
          for (var i = 0; i < data['all_list'].length; i++) {
            var tr2 = document.createElement('tr');
            var td1 = document.createElement('td');
            var img1 = document.createElement('img');
            var td2 = document.createElement('td');
            img1.setAttribute('src', data['all_list'][i]['img']);
            td2.innerText = data['all_list'][i]['pet_name'];
            td1.appendChild(img1);
            tr2.appendChild(td1);
            tr2.appendChild(td2);
            adopt_tab.appendChild(tr2);
          }
        } else {
          // 관리자 마이페이지 입양 문의 내역 :
          // 이미지, 이름, 생년월일, 연락처, 직업, 주소, 가족구성원, 반려동물 양육 경험
          for (var i = 0; i < data['all_list'].length; i++) {
            var tr1 = document.createElement('tr');
            var petname_th = document.createElement('th');
            var name_th = document.createElement('th');
            var birth_th = document.createElement('th');
            var tel_th = document.createElement('th');
            var job_th = document.createElement('th');
            var address_th = document.createElement('th');
            var family_th = document.createElement('th');
            var experience_th = document.createElement('th');

            petname_th.innerText = data['all_list'][i]['pet_name'];
            name_th.innerText = "이름";
            birth_th.innerText = "생년월일";
            tel_th.innerText = "연락처";
            job_th.innerText = "직업";
            address_th.innerText = "주소";
            family_th.innerText = "가족구성원";
            experience_th.innerText = "반려동물 양육 경험";

            tr1.appendChild(petname_th);
            tr1.appendChild(name_th);
            tr1.appendChild(birth_th);
            tr1.appendChild(tel_th);
            tr1.appendChild(job_th);
            tr1.appendChild(address_th);
            tr1.appendChild(family_th);
            tr1.appendChild(experience_th);
            adopt_tab.appendChild(tr1);

            var tr2 = document.createElement('tr');
            var img_th = document.createElement('th');
            var img1 = document.createElement('img');
            img1.setAttribute('src', data['all_list'][i]['list'][0]['img']);
            img_th.setAttribute('rowspan', data['all_list'][i]['list'].length);
            img_th.appendChild(img1);
            tr2.appendChild(img_th);

            for (var j = 0; j < data['all_list'][i]['list'].length; j++) {
              var name_td = document.createElement('td');
              var birth_td = document.createElement('td');
              var tel_td = document.createElement('td');
              var job_td = document.createElement('td');
              var address_td = document.createElement('td');
              var family_td = document.createElement('td');
              var experience_td = document.createElement('td');

              name_td.innerText = data['all_list'][i]['list'][j]['name'];
              birth_td.innerText = data['all_list'][i]['list'][j]['birth'];
              tel_td.innerText = data['all_list'][i]['list'][j]['tel'];
              job_td.innerText = data['all_list'][i]['list'][j]['job'];
              address_td.innerText = data['all_list'][i]['list'][j]['address'];

              let family = ""; // 가족 구성원 한글로 변환
              for (let q in data['all_list'][i]['list'][j]['family']) {
                if (data['all_list'][i]['list'][j]['family'][q] == 'parent') {
                  family += "부/모 ";
                } else if (data['all_list'][i]['list'][j]['family'][q] == 'partner') {
                  family += "배우자 ";
                } else if (data['all_list'][i]['list'][j]['family'][q] == 'son_and_daughter') {
                  family += "자녀 ";
                } else if (data['all_list'][i]['list'][j]['family'][q] == 'sibling') {
                  family += "형제 ";
                } else if (data['all_list'][i]['list'][j]['family'][q] == 'no_family') {
                  family += "없음 ";
                }
              }
              family_td.innerText = (family.trim()).replace(/ /gi, ",");
              experience_td.innerText = data['all_list'][i]['list'][j]['have_experience'];
              if (j != 0) {
                var tr3 = document.createElement('tr');
                tr3.appendChild(name_td);
                tr3.appendChild(birth_td);
                tr3.appendChild(tel_td);
                tr3.appendChild(job_td);
                tr3.appendChild(address_td);
                tr3.appendChild(family_td);
                tr3.appendChild(experience_td);
                adopt_tab.appendChild(tr3);
              } else {
                tr2.appendChild(name_td);
                tr2.appendChild(birth_td);
                tr2.appendChild(tel_td);
                tr2.appendChild(job_td);
                tr2.appendChild(address_td);
                tr2.appendChild(family_td);
                tr2.appendChild(experience_td);
                adopt_tab.appendChild(tr2);
              }

            }
          }
        }
      }
    });

  // 서버로부터 후원(결연 맺기) 내역 불러오기
  $.post("php/spon-ing.php",
    function(data) {
      var spon_tab = document.getElementById('spon_tab');
      if (data == '') { // 서버로부터 받은 데이터가 없을 경우
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerText = "후원 내역이 없습니다";
        tr.appendChild(td1);
        spon_tab.appendChild(tr);
      } else { // 서버로부터 받은 데이터가 있을 경우
        data = JSON.parse(data);
         // 일반 회원 마이페이지 후원 내역 : 이미지, 이름, 후원시작일, 후원종료일, 후원기간, 디데이
        if (data['type'] == 'user') {
          var tr1 = document.createElement('tr');
          var img_th = document.createElement('th');
          var petname_th = document.createElement('th');
          var start_date_th = document.createElement('th');
          var end_date_th = document.createElement('th');
          var term_th = document.createElement('th');
          var dday_th = document.createElement('th');

          img_th.innerText = "이미지";
          petname_th.innerText = "이름";
          start_date_th.innerText = "후원시작일";
          end_date_th.innerText = "후원종료일";
          term_th.innerText = "후원 기간";
          dday_th.innerText = "디데이";

          tr1.appendChild(img_th);
          tr1.appendChild(petname_th);
          tr1.appendChild(start_date_th);
          tr1.appendChild(end_date_th);
          tr1.appendChild(term_th);
          tr1.appendChild(dday_th);
          spon_tab.appendChild(tr1);

          for (var i = 0; i < data['all_list'].length; i++) {
            var tr2 = document.createElement('tr');
            var img_td = document.createElement('td');
            var petname_td = document.createElement('td');
            var start_date_td = document.createElement('td');
            var end_date_td = document.createElement('td');
            var term_td = document.createElement('td');
            var dday_td = document.createElement('td');
            var img1 = document.createElement('img');

            img1.setAttribute('src', data['all_list'][i]['img']);
            petname_td.innerText = data['all_list'][i]['pet_name'];
            start_date_td.innerText = data['all_list'][i]['spon_start_date'];
            end_date_td.innerText = data['all_list'][i]['spon_end_date'];

             // 결연 기간 한글로 변환
            switch (data['all_list'][i]['spon_term']) {
              case '1m':
                term_td.innerText = "1개월";
                break;
              case '6m':
                term_td.innerText = "6개월";
                break;
              case '1y':
                term_td.innerText = "1년";
                break;
            }

            // 디데이 표시
            var today = new Date();
            let strArr = data['all_list'][i]['spon_end_date'].split('-');
            let end_date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
            var gap = end_date.getTime() - today.getTime();
            gap = Math.floor(gap / (1000 * 60 * 60 * 24));
            if (gap < 0) {
              dday_td.innerText = "종료";
            } else {
              dday_td.innerText = "D-" + gap;
            }

            img_td.appendChild(img1);
            tr2.appendChild(img_td);
            tr2.appendChild(petname_td);
            tr2.appendChild(start_date_td);
            tr2.appendChild(end_date_td);
            tr2.appendChild(term_td);
            tr2.appendChild(dday_td);
            spon_tab.appendChild(tr2);
          }
        } else {
          // 관리자 마이페이지 후원 내역 :
          // 이미지, 이름, 주소, 연락처, 후원시작일, 후원종료일, 후원기간, 디데이
          for (var i = 0; i < data['all_list'].length; i++) {
            var tr1 = document.createElement('tr');
            var petname_th = document.createElement('th');
            var name_th = document.createElement('th');
            var addr_th = document.createElement('th');
            var tel_th = document.createElement('th');
            var start_date_th = document.createElement('th');
            var end_date_th = document.createElement('th');
            var term_th = document.createElement('th');
            var dday_th = document.createElement('th');

            petname_th.innerText = data['all_list'][i]['pet_name'];
            name_th.innerText = "이름";
            addr_th.innerText = "주소";
            tel_th.innerText = "연락처";
            start_date_th.innerText = "후원시작일";
            end_date_th.innerText = "후원종료일";
            term_th.innerText = "후원 기간";
            dday_th.innerText = "디데이";

            tr1.appendChild(petname_th);
            tr1.appendChild(name_th);
            tr1.appendChild(addr_th);
            tr1.appendChild(tel_th);
            tr1.appendChild(start_date_th);
            tr1.appendChild(end_date_th);
            tr1.appendChild(term_th);
            tr1.appendChild(dday_th);
            spon_tab.appendChild(tr1);

            var tr2 = document.createElement('tr');
            var img_th = document.createElement('th');
            var img1 = document.createElement('img');
            img1.setAttribute('src', data['all_list'][i]['list'][0]['img']);
            img_th.setAttribute('rowspan', data['all_list'][i]['list'].length);
            img_th.appendChild(img1);
            tr2.appendChild(img_th);
            spon_tab.appendChild(tr2);

            for (var j = 0; j < data['all_list'][i]['list'].length; j++) {
              var name_td = document.createElement('td');
              var addr_td = document.createElement('td');
              var tel_td = document.createElement('td');
              var start_date_td = document.createElement('td');
              var end_date_td = document.createElement('td');
              var term_td = document.createElement('td');
              var dday_td = document.createElement('td');
              name_td.innerText = data['all_list'][i]['list'][j]['name'];
              addr_td.innerText = data['all_list'][i]['list'][j]['address'];
              tel_td.innerText = data['all_list'][i]['list'][j]['tel'];
              start_date_td.innerText = data['all_list'][i]['list'][j]['spon_start_date'];
              end_date_td.innerText = data['all_list'][i]['list'][j]['spon_end_date'];

              switch (data['all_list'][i]['list'][j]['spon_term']) {
                case '1m':
                  term_td.innerText = "1개월";
                  break;
                case '6m':
                  term_td.innerText = "6개월";
                  break;
                case '1y':
                  term_td.innerText = "1년";
                  break;
              }

              // 디데이 표시
              var today = new Date();
              let strArr = data['all_list'][i]['list'][j]['spon_end_date'].split('-');
              let end_date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
              var gap = end_date.getTime() - today.getTime();
              gap = Math.floor(gap / (1000 * 60 * 60 * 24));
              if (gap < 0) {
                dday_td.innerText = "종료";
              } else {
                dday_td.innerText = "D-" + gap;
              }

              if (j != 0) {
                var tr3 = document.createElement('tr');
                tr3.appendChild(name_td);
                tr3.appendChild(addr_td);
                tr3.appendChild(tel_td);
                tr3.appendChild(start_date_td);
                tr3.appendChild(end_date_td);
                tr3.appendChild(term_td);
                tr3.appendChild(dday_td);
                spon_tab.appendChild(tr3);
              } else {
                tr2.appendChild(name_td);
                tr2.appendChild(addr_td);
                tr2.appendChild(tel_td);
                tr2.appendChild(start_date_td);
                tr2.appendChild(end_date_td);
                tr2.appendChild(term_td);
                tr2.appendChild(dday_td);
                spon_tab.appendChild(tr2);
              }

            }
          }
        }
      }
    });
});
