$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $stored2Dos = getStored2Dos(localStorage.key(i));
    prepend2DoBox($stored2Dos);
  }
});

function getStored2Dos (id) {
  return JSON.parse(localStorage.getItem(id));
}

$('#save-button').on('click', function() {
  var $title = $('#title-input').val();
  var $body = $('#body-input').val();
  var $uniqId = Date.now();
  var $quality = 'swill';
  var $new2Do = new toDoObject ($uniqId, $title, $body, $quality);

  var key = $new2Do.id;
  localStorage.setItem(key, JSON.stringify($new2Do));
  prepend2DoBox($new2Do);
  resetInputs();
});

function toDoObject (id, title, body, quality){
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function prepend2DoBox(toDoObj) {
  $('.todo-box-container').prepend(
    `<article class="todo-card" id="${toDoObj.id}">
      <button class="delete-button"></button>
      <section class="search-target">
      <h2 class="todo-title" contenteditable>${toDoObj.title}</h2>
      <p class="todo-body" contenteditable>${toDoObj.body}</p>
      </section>
      <section class="quality">
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality: <span class="current-quality">${toDoObj.quality}</span></h3>
      </section>
    </article>
    `
  );
}

$('.todo-box-container').on('click', '.delete-button', (function() {
  var selectId = $(this).parents('.todo-card').attr('id')
  $(this).parents('.todo-card').remove()
  localStorage.removeItem(selectId)
}))


function resetInputs(){
  $('#title-input, #body-input').val("");
  $('#save-button').prop('disabled', true);
}

$('#title-input, #body-input').on('keyup', function(){
  $('#save-button').prop('disabled', false);
});

$('.todo-box-container').on('click','.upvote-button' , function() {
  var $currentQuality = $(this).closest('.todo-card').find('.current-quality');
  if ($currentQuality.text() === "swill") {
    $currentQuality.text("plausible");
  } else if ($currentQuality.text() === "plausible"){
    $currentQuality.text("genius");
  }
  var key = $(this).closest('.todo-card').attr('id');
  var updatedQuality = $currentQuality.text();
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.quality = updatedQuality;
  localStorage.setItem(key, JSON.stringify(toDoBox));
});

$('.todo-box-container').on('click','.downvote-button', function() {
  var $currentQuality = $(this).closest('.todo-card').find('.current-quality');
  if ($currentQuality.text() === "genius") {
    $currentQuality.text("plausible");
  } else if ($currentQuality.text() === "plausible"){
    $currentQuality.text("swill");
  }
  var key = $(this).closest('.todo-card').attr('id');
  var updatedQuality = $currentQuality.text();
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.quality = updatedQuality;
  localStorage.setItem(key, JSON.stringify(toDoBox));
});

$('.todo-box-container').on('focus', '.todo-title, .todo-body', function() {
  var key = $(this).closest('.todo-card').attr('id');
  var todobox = JSON.parse(localStorage.getItem(key));
  $(this).on('keydown', function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  });

  $(this).on('blur', function() {
    todobox.title = $(this).closest('.todo-card').find('.todo-title').text();
    todobox.body = $(this).closest('.todo-card').find('.todo-body').text();
    localStorage.setItem(key, JSON.stringify(todobox));
  });
});

$('#search-input').on('keyup',function (){
  var searchValue = $(this).val().toLowerCase();
  $('.search-target').each(function(){
    var text = $(this).text().toLowerCase();
    var isAMatch = !!text.match(searchValue);
    $(this).closest('.todo-card').toggle(isAMatch);
  });
});
