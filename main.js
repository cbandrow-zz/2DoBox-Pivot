$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $stored2Dos = getStored2Dos(localStorage.key(i));
    prepend2DoBox($stored2Dos);
    changeClass($stored2Dos);
  }
});

function changeClass($stored2Dos){
  console.log($stored2Dos)
  var num = $stored2Dos.completed;
  var someId = $stored2Dos.id
  console.log(someId);
  if($stored2Dos.completed == true){
    var $completedId = $stored2Dos.id;
    $('#'+ $completedId).removeClass('complete-task').addClass('complete-task');
    console.log("class added")
  } else if ($stored2Dos.completed == false){
    var $completedId = $stored2Dos.id;
    $('#' + $completedId).removeClass('complete-task');
    console.log("No class added.");
  }

}
function getStored2Dos (id) {
  return JSON.parse(localStorage.getItem(id));
}

$('#save-button').on('click', function() {
  var title = $('#title-input').val();
  var body = $('#body-input').val();
  var id = Date.now();
  var quality = 'swill';
  var completed = false;
  var $new2Do = {title, body, id, quality, completed}
  var key = $new2Do.id;
  localStorage.setItem(key, JSON.stringify($new2Do));
  prepend2DoBox($new2Do);
  resetInputs();
});

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
        <button class="completed"> Completed Task</button>
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
  changeQuality(key, updatedQuality);
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
  changeQuality(key, updatedQuality);
});

function changeQuality(key, updatedQuality){
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.quality = updatedQuality;
  localStorage.setItem(key, JSON.stringify(toDoBox));
}

$('.todo-box-container').on('click', '.completed', function() {
  var $selectId = $(this).parents('.todo-card').attr('id');
  var todobox = JSON.parse(localStorage.getItem($selectId));
  todobox.completed = !todobox.completed;
  if(todobox.completed == true){
    $(this).parents('.todo-card').toggleClass('complete-task');
  }else{
    $(this).parents('.todo-card').toggleClass('complete-task');
  }
  localStorage.setItem($selectId, JSON.stringify(todobox));
});

//When working with COMPLETED states for project, use conditional to evaluate if completed or not, using OR and BANG (!);
//if completed || not completed then this.completed == this.completed

$('.todo-box-container').on('focus', '.todo-title, .todo-body', function() {
  var $container = $(this);
  var key = $container.closest('.todo-card').attr('id');
  var todobox = JSON.parse(localStorage.getItem(key));
  $container.on('keydown', function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      $container.blur();
      return false;
    }
  });
  saveChange($container, key, todobox);
});

function saveChange($container, key, todobox){
  $container.on('blur', function() {
    todobox.title = $container.closest('.todo-card').find('.todo-title').text();
    todobox.body = $container.closest('.todo-card').find('.todo-body').text();
    localStorage.setItem(key, JSON.stringify(todobox));
  });
};

$('#search-input').on('keyup',function (){
  var searchValue = $(this).val().toLowerCase();
  $('.search-target').each(function(){
    var text = $(this).text().toLowerCase();
    var isAMatch = !!text.match(searchValue);
    $(this).closest('.todo-card').toggle(isAMatch);
  });
});
