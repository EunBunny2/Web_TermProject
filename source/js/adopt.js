
// https://codepen.io/timohausmann/pen/xdKkA
$('.book')
.on('click', '.active', nextPage)
.on('click', '.flipped', prevPage);

function prevPage() {

  $('.flipped')
    .last()
    .removeClass('flipped')
    .addClass('active')
    .siblings('.page')
    .removeClass('active');
}
function nextPage() {

  $('.active')
    .removeClass('active')
    .addClass('flipped')
    .next('.page')
    .addClass('active')
    .siblings();


}
