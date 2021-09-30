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


$(document).ready(function() {
    $("#ch_dim").hide();
    $("#adopt_inquiry_div").hide();
    $("#spon_div").hide();
    $("#eixt_div").hide();

    // 서버에게 데이터 요청
    $.post("./php/load_children.php",
      function(data) {
        let wrap_div = document.getElementsByClassName('title')[0];
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
          for (let i = 0; i < 4; i++) { // 서버로부터 받은 데이터로 카드 생성
            make_card(data[i]["img_file"], data[i]["pet_name"], data[i]["sex"], data[i]["kind"], data[i]["race"], data[i]["state"], data[i]["reg_date"], data[i]["personality"], data[i]["remark"]);
          }
        }
      });
});


// 등록창에서 취소 버튼을 클릭하면 등록창을 숨김
function hide_popup(div_id) {
  $('#'+div_id).hide();
  $('#ch_dim').hide();
  if (div_id === 'reg_popup') { // 새로운 아이 등록 레이어일 경우 품종 선택도 모두 숨기기
    $('#dog_race_div').hide();
    $('#cat_race_div').hide();
  }
}

// 팝업 레이어 띄워주는 함수
function show_popup(div_id) {
  $('#'+div_id).show();
  $('#ch_dim').show();
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
//(디테일 카드에서 결연맺기, 입양문의를 클릭해서 팝업 레이어가 2개 이상 생겼을 때 사용)
function hide_inner_popup(div_id) {
  $('#'+div_id).hide();
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
// 라디오 박스에서 체크된 항목 찾아서 리턴
function find_checked(radio_box_name) {
  let radio_box = document.getElementsByName(radio_box_name);
  for (let i = 0; i < radio_box.length; i++) {
    if (radio_box[i].checked) {
      return radio_box[i].value;
    }
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

// 후원 설명 레이어 숨기기
$("#first_popup").hide();
$("#second_popup").hide();
$("#third_popup").hide();
$("#fourth_popup").hide();

/* https://wsss.tistory.com/609 */
$('.trigger').on('click', function(e) {
     $('.modal-wrapper').toggleClass('open');
    $('.page-wrapper').toggleClass('blur-it');
    if(e.target.id =="first"){
      $("#first_popup").show();
      $("#second_popup").hide();
      $("#third_popup").hide();
      $("#fourth_popup").hide();
    }else if(e.target.id == "second"){
        $("#first_popup").hide();
        $("#second_popup").show();
        $("#third_popup").hide();
        $("#fourth_popup").hide();
    }else if(e.target.id == "third"){
        $("#first_popup").hide();
        $("#second_popup").hide();
        $("#third_popup").show();
        $("#fourth_popup").hide();
    }else if(e.target.id == "fourth"){
        $("#first_popup").hide();
        $("#second_popup").hide();
        $("#third_popup").hide();
        $("#fourth_popup").show();
    }
     return false;
  });
