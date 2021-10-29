$(document).ready(function() {
  getTasks();
  addToDo();
  deleteTask();
  
  $(document).on('change', '.check', function() {
    var id = $(this).siblings('button').attr('data-id');
    if($(this).is(':checked')){
      $.ajax({
        type: 'PUT',
           url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=177',
           dataType: 'json',
           success: function (response, textStatus) {
             alert('Completed');
           },
           error: function (request, textStatus, errorMessage) {
             console.log(errorMessage);
           }
         });
    } else {
      $.ajax({
        type: 'PUT',
           url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=177',
           dataType: 'json',
           success: function (response, textStatus) {
             alert('Incomplete');
           },
           error: function (request, textStatus, errorMessage) {
             console.log(errorMessage);
           }
         });
    }
  });

});



// Gets tasks stored in API
var getTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
    dataType: 'json',
    success: function (response, textStatus) {
      response.tasks.forEach(function (task){
      var listItems = makeListItem();
      var label = listItems[0];
      var span = listItems[1];
      var removeButton = listItems[2];
      removeButton.setAttribute('data-id', task.id);
      span.innerHTML = task.content;
      $('.list-group').append(label);
      })
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}




// HTML structure of a list item
var makeListItem = function () {
      var label = document.createElement('label');
      label.setAttribute('class', 'list-group-item d-flex gap-2 custom');
      var div = document.createElement('div');
      div.setAttribute('class', 'vert-center');
      var checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('class', 'check');
      var span = document.createElement('span');
      var removeButton = document.createElement('button');
      removeButton.setAttribute('class', 'btn remove');
      removeButton.innerHTML = "X";
      div.append(checkbox);
      div.append(span);
      div.append(removeButton);
      label.append(div);

    return [label, span, removeButton];
}

// Add task to list when you press enter
var addToDo = function () {
  $('.to-do-input').keypress(function(event){
    var toDoInput = $('.to-do-input').val();
    if(event.keyCode === 13){
      var listItems = makeListItem();
      var label = listItems[0];
      var span = listItems[1];
      span.innerHTML = toDoInput;
      $('.list-group').append(label);
      addTaskToApi(toDoInput);
    }
  });
}
// Add list items to API after pressing enter
var addTaskToApi = function (toDoInput) {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: toDoInput
      }
    }),
    success: function (response, textStatus) {
      $('.to-do-input').val('');
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

// Delete Tasks
  var deleteTask = function () {
    $(document).on('click', '.btn.remove', function(){
      var id = $('.remove').attr('data-id');
      $(this).closest('label').remove();

      $.ajax({
        type: 'DELETE',
           url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=177',
           success: function (response, textStatus) {
             console.log(response);
           },
           error: function (request, textStatus, errorMessage) {
             console.log(errorMessage);
           }
         });
    });

  }


