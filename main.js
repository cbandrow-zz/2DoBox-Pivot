$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $stored2Dos = getStored2Dos(localStorage.key(i));
    prepend2DoBox($stored2Dos);
    changeClass($stored2Dos);
    hideToDos(0, 9, 10);
  }
});

function hideToDos(a, b, c){
  $("article").slice(a, b).css("display", "block");
  $("article").slice(c).css("display", "none");
}

var i = 0;
$('#more-todos').on('click', function() {
  i+=5;
  console.log(i);
  hideToDos(0, 9 + i, 10 + i);
  // $("article").slice(0,14).css("display", "block");
  console.log('second i', i)
  // $("article").slice(15).css("display", "none");
});

function changeClass($stored2Dos){
  var num = $stored2Dos.completed;
  var someId = $stored2Dos.id
  if($stored2Dos.completed == true){
    var $completedId = $stored2Dos.id;
    $('#'+ $completedId).removeClass('complete-task').addClass('complete-task');
  } else if ($stored2Dos.completed == false){
    var $completedId = $stored2Dos.id;
    $('#' + $completedId).removeClass('complete-task');
  }
}
function getStored2Dos (id) {
  return JSON.parse(localStorage.getItem(id));
}

$('#save-button').on('click', function() {
  var title = $('#title-input').val();
  var body = $('#body-input').val();
  var id = Date.now();
  var priority = 'None';
  var completed = false;
  var $new2Do = {title, body, id, priority, completed}
  var key = $new2Do.id;
  localStorage.setItem(key, JSON.stringify($new2Do));
  prepend2DoBox($new2Do);
  resetInputs();
});

function writeCard(toDoObj){
  
}

function prepend2DoBox(toDoObj) {
    if(toDoObj.completed == true){
      $('.todo-box-container').append(`<article class="todo-card hidden" id="${toDoObj.id}">
        <button class="delete-button"></button>
        <section class="search-target">
        <h2 class="todo-title" contenteditable>${toDoObj.title}</h2>
        <p class="todo-body" contenteditable>${toDoObj.body}</p>
        </section>
        <section class="priority">
          <button class="upvote-button"></button>
          <button class="downvote-button"></button>
          <button class="completed"> Completed Task</button>
          <h3>priority: <span class="current-priority">${toDoObj.priority}</span></h3>
        </section>
      </article>
      `);
    } else if (toDoObj.completed == false){
      $('.todo-box-container').prepend(
        `<article class="todo-card hidden" id="${toDoObj.id}">
          <button class="delete-button"></button>
          <section class="search-target">
          <h2 class="todo-title" contenteditable>${toDoObj.title}</h2>
          <p class="todo-body" contenteditable>${toDoObj.body}</p>
          </section>
          <section class="priority">
            <button class="upvote-button"></button>
            <button class="downvote-button"></button>
            <button class="completed"> Completed Task</button>
            <h3>priority: <span class="current-priority">${toDoObj.priority}</span></h3>
          </section>
        </article>
        `
      )
  }
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
  var $currentPriority = $(this).closest('.todo-card').find('.current-priority');
  var key = $(this).closest('.todo-card').attr('id');
  switch ($currentPriority.text()) {
    case "None":
      $currentPriority.text("Low");
      break;
    case "Low":
      $currentPriority.text("Medium");
      break;
    case "Medium":
      $currentPriority.text("High");
      break;
    case "High":
      $currentPriority.text("Critical");
      break;
    default:
    $currentPriority.text("Critical");
  }
  updatedPriority = $currentPriority.text();
  changePriority(key, updatedPriority);
});


$('.todo-box-container').on('click','.downvote-button' , function() {
  var $currentPriority = $(this).closest('.todo-card').find('.current-priority');
  var key = $(this).closest('.todo-card').attr('id');
  switch ($currentPriority.text()) {
    case "Critical":
      $currentPriority.text("High");
      break;
    case "High":
      $currentPriority.text("Medium");
      break;
    case "Medium":
      $currentPriority.text("Low");
      break;
    case "Low":
      $currentPriority.text("None");
      break;
    default:
    $currentPriority.text("None");
  }
  updatedPriority = $currentPriority.text();
  changePriority(key, updatedPriority);
});


function changePriority(key, updatedPriority){
  var toDoBox = JSON.parse(localStorage.getItem(key));
  toDoBox.priority = updatedPriority;
  localStorage.setItem(key, JSON.stringify(toDoBox));
}

$('.todo-box-container').on('click','.downvote-button', function() {
  var $currentPriority = $(this).closest('.todo-card').find('.current-priority');
  if ($currentPriority.text() === "genius") {
    $currentPriority.text("plausible");
  } else if ($currentPriority.text() === "plausible"){
    $currentPriority.text("swill");
  }
  var key = $(this).closest('.todo-card').attr('id');
  var updatedPriority = $currentPriority.text();
  changePriority(key, updatedPriority);
});


$('.todo-box-container').on('click', '.completed', function() {
  var $selectId = $(this).parents('.todo-card').attr('id');
  var todobox = JSON.parse(localStorage.getItem($selectId));
  todobox.completed = !todobox.completed;
  if(todobox.completed == true){
    $(this).parents('.todo-card').toggleClass('complete-task');
    $(this).parents('.todo-card').appendTo($('.todo-box-container'));
  }else{
    $(this).parents('.todo-card').toggleClass('complete-task');
  }
  localStorage.setItem($selectId, JSON.stringify(todobox));
  console.log(todobox.priority);
});


$('#show-completed').on('click', function() {
  $(".complete-task").prependTo($('.todo-box-container'));
});


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
