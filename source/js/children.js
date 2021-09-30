// 새로운 아이 등록 버튼 클릭시 등록창 보여줌
document.getElementById("show_reg_btn").addEventListener("click", function() {
  show_popup('reg_popup');
});

// 등록창에서 분류로 '개'를 선택하면 개의 품종을 선택할 수 있는 입력창이 나타나고
// '고양이'를 선택하면 고양이의 품종을 선택할 수 있는 입력창이 나타남.
document.getElementsByName("kind")[0].addEventListener("click", function() {
  show_race('dog');
});
document.getElementsByName("kind")[1].addEventListener("click", function() {
  show_race('cat');
});

// 등록창에서 등록 버튼을 클릭하면 데이터를 저장
document.getElementById("reg_submit").addEventListener("click", function() {
  ch_registration();
});

// 등록창에서 취소 버튼을 클릭하면 등록창을 숨김
document.getElementById("reg_exit").addEventListener("click", function() {
  hide_popup('reg_popup');
});

// 디테일 카드에서 나가기 아이콘을 클릭하면 디테일 카드와 딤 레이어를 숨김
document.getElementById("exit_icon").addEventListener("click", function() {
  hide_popup('detail_card_div');
  hide_popup('eixt_div');
});

// 입양 문의 레이어에서 확인 버튼 클릭시 서버로 데이터 전송
$('#adopt_inquiry_div > form > button[type="button"]').click(function(){
  adopt_inquiry();
  hide_inner_popup('adopt_inquiry_div');
});

// 결연 맺기 레이어에서 확인 버튼 클릭시 서버로 데이터 전송
$('#spon_div > form > button[type="button"]').click(function(){
  spon();
  hide_inner_popup('spon_div');
});

// 입양 문의 레이어에서 취소 버튼 클릭시 레이어 숨김
$('#adopt_inquiry_div > form > button[type="reset"]').click(function(){
  hide_inner_popup('adopt_inquiry_div');
});

// 결연 맺기 레이어에서 취소 버튼 클릭시 레이어 숨김
$('#spon_div > form > button[type="reset"]').click(function(){
  hide_inner_popup('spon_div');
});

// 반려동물 테스트 버튼 클릭시 테스트 레이어 보여줌
$('#test_btn').click(function() {
  show_popup("test_div");
  current_question = 0;
});

// 반려동물 테스트 레이어에서 시작 이미지 클릭시 O/X 아이콘 보여주고 질문 출력
$('#cover_img_btn').click(function() {
  $('#cover_img_btn').hide();
  $('#icon_o').show();
  $('#icon_x').show();
  make_test();
});

// 반려동물 테스트 레이어에서 X 아이콘 클릭시 다음 질문으로 넘어감
$('#icon_x').click(function() {
  current_question += 1;
  make_test();
});

// 반려동물 테스트 레이어 나가기 버튼 클릭시 진행하던 테스트 정보 초기화
$('#head > span').click(function() {
  hide_popup("test_div");
  answers = [0, 0, 0, 0, 0, 0];
  $('#question_num').text("당신의 상황에 맞는 반려동물을 찾아줍니다.");
  $('#question').empty();
  $('#cover_img_btn').show();
  $('#icon_o').hide();
  $('#icon_x').hide();
});

//기본 상태 : 새로운 아이 등록창 숨기고 서버로부터 파일에 저장된 아이들의 정보를 받아 화면에 띄움
$(document).ready(function() {
  // 등록창 숨기기
  $("#reg_popup").hide();
  $("#dog_race_div").hide();
  $("#cat_race_div").hide();
  $("#ch_dim").hide();
  $("#adopt_inquiry_div").hide();
  $("#spon_div").hide();
  $("#eixt_div").hide();
  $('#test_div').hide();
  $('#icon_o').hide();
  $('#icon_x').hide();

  // 서버에게 데이터 요청
  $.post("./php/load_children.php",
    function(data) {
      children_set = [];
      let wrap_div = document.getElementsByClassName('wrap')[0];
      if (data == "") { // 서버로부터 받은 데이터가 없을 경우
        let h_tag = document.createElement('h3');
        h_tag.setAttribute('id', 'no_content');
        h_tag.innerHTML = "등록된 아이가 없습니다.";
        wrap_div.appendChild(h_tag);
      } else { // 서버로부터 데이터를 받았을 경우
        if (document.getElementById('no_content')) { // 서버로부터 받은 데이터가 없어서 화면에 '등록된 아이가 없습니다'를 띄운 상태일 경우 문구 삭제
          wrap_div.removeChild(document.getElementById('no_content'));
        }
        data = JSON.parse(data); // JSON 문법을 JS 값으로 변경
        for (let i = 0; i < data.length; i++) { // 서버로부터 받은 데이터로 카드 생성
          children_set.push(data[i]);   // children_set에 저장
          make_card(data[i]["img_file"], data[i]["pet_name"], data[i]["sex"], data[i]["kind"], data[i]["race"], data[i]["state"], data[i]["reg_date"], data[i]["personality"], data[i]["remark"]);
        }
      }
    });
});

// 팝업 레이어 띄워주는 함수
function show_popup(div_id) {
  $('#' + div_id).fadeIn("slow");
  $('#ch_dim').fadeIn("slow");
}

// 등록창에서 취소 버튼을 클릭하면 등록창을 숨김
function hide_popup(div_id) {
  $('#' + div_id).hide();
  $('#ch_dim').hide();
  if (div_id === 'reg_popup') { // 새로운 아이 등록 레이어일 경우 품종 선택도 모두 숨기기
    $('#dog_race_div').hide();
    $('#cat_race_div').hide();
  }
}

// 입력한 분류에 따라 품종 입력란을 보여줌
function show_race(kind) {
  if (kind == "dog") {
    $('#dog_race_div').show();
    $('#cat_race_div').hide();
  } else if (kind == "cat") {
    $('#dog_race_div').hide();
    $('#cat_race_div').show();
  }
}

// 등록 버튼을 눌렀을 경우 사용자가 입력한 값을 확인하고 서버로 전송
function ch_registration() {
  // 모든 조건 만족했는지 확인하는 변수
  let all_complete = true;

  // 파일 확인
  let img_file = document.getElementById("img_file").value;
  if (img_file != '') {
    img_file = img_file.substring(img_file.lastIndexOf('\\') + 1, img_file.length + 1);
  }
  all_complete = all_complete & file_check(img_file);

  // 이름 확인
  let pet_name = document.getElementById("pet_name").value;
  all_complete = all_complete & name_check(pet_name);

  // 성별 확인
  let sex = document.getElementsByName("sex");
  all_complete = all_complete & radio_check(sex, "sex");

  // 분류 확인
  let kind = document.getElementsByName("kind");
  all_complete = all_complete & radio_check(kind, "kind");

  // 입양 상태 확인
  let state = document.getElementsByName("state");
  all_complete = all_complete & radio_check(state, "state");

  // 입소 날짜 확인
  let reg_date = document.getElementById('reg_date').value;
  all_complete = all_complete & date_check(reg_date);

  // 성격 확인
  let personality = [];
  // 선택된 성격 항목이 없을 경우
  if ($("input:checkbox[name=personality]:checked").length == 0) {
    all_complete = all_complete & false;
    alert('성격을 체크해주세요.');
  } else {// 선택된 성격 항목이 있을 경우 선택된 항목 모두 personality 배열에 저장
    all_complete = all_complete & true;
    $("input[name=personality]:checked").each(function() {
      personality.push($(this).val());
    });
  }

  // 특이사항 확인
  let remark = document.getElementById('remark').value;
  if (remark == '') { // 특이사항을 입력하지 않았을 경우 '없음'으로 저장
    remark = '없음';
  }

  if (all_complete) { // 사용자가 모든 입력창을 입력했을 경우
    let race;
    let index;
    // 라디오 버튼들은 체크된 항목을 가져옴
    let sex_val = find_checked("sex");
    let kind_val = find_checked("kind");
    let state_val = find_checked("state");

    // 선택한 분류가 '개'일 경우 개 품종에서 선택된 항목을 가져오고
    // '고양이'일 경우 고양이 품종에서 선택된 항목을 가져옴
    if (kind_val == "개") {
      index = document.getElementById('dog_race').selectedIndex;
      race = document.getElementById('dog_race').options[index].value;
    } else {
      index = document.getElementById('cat_race').selectedIndex;
      race = document.getElementById('cat_race').options[index].value;
    }
    add_file(img_file, pet_name, sex_val, kind_val, race, state_val, reg_date, personality, remark);
    hide_popup('reg_popup');
  }
}

// 등록 데이터를 JSON 인코드해서 서버로 전송하고 결과를 받아서 카드 생성
function add_file(img_file, pet_name, sex_val, kind_val, race, state_val, reg_date, personality, remark) {
  let obj = new Object();
  obj.img_file = img_file;
  obj.pet_name = pet_name;
  obj.kind_val = kind_val;
  obj.sex_val = sex_val;
  obj.race = race;
  obj.state_val = state_val;
  obj.reg_date = reg_date;
  obj.personality = personality;
  obj.remark = remark;
  obj = JSON.stringify(obj);
  $.post("./php/children.php", // POST 방식으로 데이터 전송
    {
      data: obj
    },
    function(data, status) { // 콜백 함수. 전송받은 데이터와 전송 성공 여부를 보여줌.
      let wrap_div = document.getElementsByClassName('wrap')[0];
      if (document.getElementById('no_content')) {
        wrap_div.removeChild(document.getElementById('no_content'));
      }
      data = JSON.parse(data);
      // 서버로부터 받은 데이터를 디코드해서 카드 생성
      // 이때 받는 데이터는 모든 아이가 아니라 등록한 아이 하나에 대한 데이터
      make_card(data["img_file"], data["pet_name"], data["sex"], data["kind"], data["race"],
       data["state"], data["reg_date"], data["personality"], data["remark"]);
    });

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

// 파일 확인
function file_check(img_file) {
  if (img_file === '') {
    alert('이미지를 추가하시오.');
    return false;
  }
  return true;
}

// 이름 확인
function name_check(name) {
  if (name === '') {
    alert('이름을 입력하시오.');
    return false;
  } else if (!isNaN(Number(name))) {
    alert('문자로 된 이름을 입력하시오.');
    return false;
  }
  return true;
}

// 성별, 분류, 입양상태 라디오 박스 확인
function radio_check(radio, type) {
  if (!(radio[0].checked | radio[1].checked)) {
    if (type == "sex") {
      alert('성별을 선택하시오.')
    } else if (type == "kind") {
      alert('분류를 선택하시오.')
    } else if (type == "state") {
      alert('입양 상태를 선택하시오.')
    }
    return false;
  }
  return true;
}

// 입소 날짜 확인
function date_check(date) {
  if (date === '') {
    alert('입소 날짜를 선택하시오.')
    return false;
  }
  return true;
}

// 카드 생성
function make_card(img_file, pet_name, sex, kind, race, state, reg_date, personality, remark) {
  let card_list = document.getElementById('card_list');
  let add_li = document.createElement('li');
  let item = document.createElement('div');
  let item_img = document.createElement('div');
  let img = document.createElement('img');
  let p_tag = document.createElement('p');
  let learn_more = document.createElement('a');

  item.setAttribute('class', 'item');
  item_img.setAttribute('class', 'item_img');

  img.setAttribute('src', img_file);
  img.setAttribute('alt', img_file);
  item_img.appendChild(img);

  p_tag.innerHTML = pet_name;
  p_tag.setAttribute('id', pet_name);

  learn_more.setAttribute('href', '#none');
  learn_more.innerHTML = "Learn more";

  // learn_more 버튼 클릭하면 디테일 카드 생성
  learn_more.addEventListener("click", function() {
    make_detail_card(img_file, pet_name, sex, kind, race, state, reg_date, personality, remark);
    current_children = [img_file, pet_name];
  });

  item.appendChild(item_img);
  item.appendChild(p_tag);
  item.appendChild(learn_more);
  add_li.appendChild(item);
  card_list.appendChild(add_li);
}

// 디테일 카드 생성
function make_detail_card(img_file, pet_name, sex, kind, race, state, reg_date, personality, remark) {
  // 디테일 카드 나가기 버튼과 디테일 카드 레이어 보여줌
  show_popup("eixt_div");
  show_popup("detail_card_div");

  // 기존 디테일 카드 레이어 비우기
  $("#detail_card_div").empty();

  let detail_card_div = document.getElementById("detail_card_div");
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');
  let tr = document.createElement('tr');
  let img_td = document.createElement('td');

  let img = document.createElement('img'); // 디테일 카드 이미지
  img.setAttribute('src', img_file);
  img.setAttribute('alt', img_file);
  img_td.appendChild(img);

  let detail_content = document.createElement('td'); // 디테일 카드 본문
  let card_title = document.createElement('span');
  card_title.setAttribute('class', 'card_title');
  card_title.innerHTML = "[" + kind + "]" + pet_name;
  let ul = document.createElement("ul");
  let sex_li = document.createElement("li");
  sex_li.innerHTML = "성별 : " + sex;
  let race_li = document.createElement("li");
  race_li.innerHTML = "품종 : " + race;
  let state_li = document.createElement("li");
  state_li.innerHTML = "입양 상태 : " + state;
  let reg_date_li = document.createElement("li");
  reg_date_li.innerHTML = "입소 날짜 : " + reg_date;
  let personality_li = document.createElement("li");
  personality_li.innerHTML = "성격 : " + personality_to_lang(personality);
  let remark_li = document.createElement("li");
  remark_li.innerHTML = "특이사항 : " + remark;

  ul.appendChild(sex_li);
  ul.appendChild(race_li);
  ul.appendChild(state_li);
  ul.appendChild(reg_date_li);
  ul.appendChild(personality_li);
  ul.appendChild(remark_li);

  let btns_div = document.createElement('div'); // 입양 문의 버튼
  btns_div.setAttribute('class', 'btn_group');
  let adopt_btn = document.createElement('button');
  adopt_btn.innerHTML = "입양 문의";
  adopt_btn.addEventListener("click", function() {
    show_popup('adopt_inquiry_div');
  });

  let spon_btn = document.createElement('button');  // 결연 맺기 버튼
  spon_btn.innerHTML = "결연 맺기";
  spon_btn.addEventListener("click", function() {
    show_popup('spon_div');
  });

  btns_div.appendChild(adopt_btn);
  btns_div.appendChild(spon_btn);
  detail_content.appendChild(card_title);
  detail_content.appendChild(ul);
  detail_content.appendChild(btns_div);
  tr.appendChild(img_td);
  tr.appendChild(detail_content);
  tbody.appendChild(tr);
  table.appendChild(tbody);
  detail_card_div.appendChild(table);
}

// 딤 레이어는 숨기지 않고 현재 레이어만 숨김
// (디테일 카드에서 결연맺기, 입양문의를 클릭해서 팝업 레이어가 2개 이상 생겼을 때 사용)
function hide_inner_popup(div_id) {
  $('#' + div_id).hide();
}

// 숫자로 저장되어 있는 성격을 한글로 변환
function personality_to_lang(personality_arr) {
  let result = "";
  for (let i in personality_arr) {
    if (personality_arr[i] == 1) {
      result += '분리불안 ';
    } else if (personality_arr[i] == 2) {
      result += '애정결핍 ';
    } else if (personality_arr[i] == 3) {
      result += '온순함 ';
    } else if (personality_arr[i] == 4) {
      result += '사나움 ';
    } else if (personality_arr[i] == 5) {
      result += '조용함 ';
    } else if (personality_arr[i] == 6) {
      result += '활발함 ';
    }
  }
  return (result.trim()).replace(/ /gi, "/");
}


let current_question = 0; // 현재 질문 번호
let answers = [0, 0, 0, 0, 0, 0]; // 질문에 대한 답변에 따라 성격 카테고리 카운트

// 반려동물 테스트 질문 생성 및 결과 측정
function make_test() {
  let test_content = document.getElementById('test_content');
  switch (current_question) {
    case 0:  // 1번 질문
      $('#question_num').text("Q1.");
      $('#question').text("나는 공동주택에 거주중이거나 이사할 계획이다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[2] += 1;
        answers[4] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 1: // 2번 질문
      $('#question_num').text("Q2.");
      $('#question').text("나는 재택근무를 한다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[0] += 1;
        answers[1] += 1;
        answers[3] += 1;
        answers[4] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 2: // 3번 질문
      $('#question_num').text("Q3.");
      $('#question').text("나는 어린 자녀가 있거나 자녀 계획이 있다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[0] += 1;
        answers[2] += 1;
        answers[4] += 1;
        answers[5] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 3: // 4번 질문
      $('#question_num').text("Q4.");
      $('#question').text("나는 사나운 개를 무서워한다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[1] += 1;
        answers[2] += 1;
        answers[4] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 4: // 5번 질문
      $('#question_num').text("Q5.");
      $('#question').text("나는 반려동물이 이상행동이 있더라도 꾸준히 훈련시킬 인내심이 있다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[0] += 1;
        answers[1] += 1;
        answers[3] += 1;
        answers[5] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 5: // 6번 질문
      $('#question_num').text("Q6.");
      $('#question').text("나는 하루에 적어도 한 번은 산책을 나갈 수 있다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[3] += 1;
        answers[5] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 6: // 7번 질문
      $('#question_num').text("Q7.");
      $('#question').text("나는 경제적으로 부족함이 없다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[0] += 1;
        answers[1] += 1;
        answers[3] += 1;
        answers[5] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 7: // 8번 질문
      $('#question_num').text("Q8.");
      $('#question').text("나는 집에 이미 반려동물을 기르고 있다.");
      $('#icon_o').off('click');
      $('#icon_o').one('click', function() {
        answers[2] += 1;
        current_question += 1;
        make_test();
      });
      break;
    case 8: // 테스트 종료
      $('#question_num').text("테스트가 완료되었습니다. 이 창을 나가서 결과를 확인하세요!");
      $('#question').text("");
      $('#icon_o').hide();
      $('#icon_x').hide();
      show_test_result(answers);
      break;
  }
}

let children_set = [];  // 모든 아이들 데이터 집합

  // 테스트 결과 표시
function show_test_result(answers) {
  var maxX = Math.max.apply(null, answers);
  var index = answers.indexOf(maxX); // 가장 카운트 수가 높은 성격 항목의 인덱스
  $('#card_list > li > div > p').css("color","");
  for(i in children_set){
    for(j in children_set[i]['personality']){  // 아이들의 성격 중 해당하는 성격이 있으면 검색 결과로 나타냄
      if(children_set[i]['personality'][j] == index +1){
        let pet_name = children_set[i]['pet_name'];
        $('#'+pet_name).css("color","blue");
        break;
      }

    }
  }
}

let current_children = [];  // 현재 사용자가 보고 있는 아이 데이터

// 입양 문의했을 경우 서버에 데이터 전송
function adopt_inquiry(){
  if($('#adopt_name').val() == "" || $('#adopt_tel').val() =="" ||$('#address').val() == "" ||
  $('#job').val() =="" ||$("input:checkbox[name=family]:checked").length == 0){
    alert("정보를 정확히 기입하세요.");
  }else{
    let family = [];
    $("input[name=family]:checked").each(function() {
      family.push($(this).val());
    });
    let obj = new Object();
    obj.adopt_name = $('#adopt_name').val();
    obj.adopt_birth_year = find_selected('adopt_birth_year');
    obj.adopt_birth_month = find_selected('adopt_birth_month');
    obj.adopt_birth_day = String(find_selected('adopt_birth_day'));
    obj.adopt_tel = $('#adopt_tel').val();
    obj.address = $('#address').val();
    obj.job = $('#job').val();
    obj.family = family;
    obj.have_experience = find_checked("have_experience");
    obj.current_children = current_children;
    obj = JSON.stringify(obj);
    $.post("./php/add_adopt.php",
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

// 결연 맺기 했을 경우 서버에 데이터 전송
function spon(){
  if($('#spon_name').val() == "" || $('#spon_tel').val() =="" ||$('#spon_address').val() == ""){
    alert("정보를 정확히 기입하세요.");
  }else{
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    let obj = new Object();
    obj.spon_name = $('#spon_name').val();
    obj.spon_tel = $('#spon_tel').val();
    obj.spon_address = $('#spon_address').val();
    obj.spon_term = find_selected('spon_term');
    obj.spon_date = year + "-" + month + "-" + day;
    obj.current_children = current_children;
    obj = JSON.stringify(obj);
    $.post("./php/add_spon.php",
      {
        data: obj
      },
      function(data, status) {
        alert(data);
      });
  }
}
