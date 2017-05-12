"use strict";
const server = io('http://localhost:3000/');
const list = document.getElementById('todo-list');

// NOTE: These are all our globally scoped functions for interacting with the server

// This retrieves local storage, if there is any
function getTodos() {
    let todos = [];
    let todos_str = localStorage.getItem('todo');
    if (todos_str != null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}

// This function adds a new todo from the input
function add() {
    console.warn(event);
    const input = document.getElementById('todo-input');

    // Emit the new todo as some data to the server
    server.emit('make', {
        title : input.value
    });

    // Retrieves local storage array
    let todos = getTodos()
    console.log("Todos in get todos", todos)
    todos.push({title: input.value})

    localStorage.setItem('todo', JSON.stringify(todos))

    render()
    // Clear the input
    input.value = '';
    // TODO: refocus the element
    input.focus();
}

function deleteTodo() {
    console.warn(event);
    let id = this.getAttribute('id');
    let todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    render();
}

function deleteAll(listItem) {
    console.warn(event);
    //this removes the entire ul
    list.innerHTML = ""
    // Emit the new todo as some data to the server
    server.emit('deleteAll', {
        title : input.value
    });
}

function completeAll() {
    console.warn(event)
    let allCheckboxes = document.getElementsByClassName("checkbox");
    for (var i=0; i < allCheckboxes.length; i++) {
      allCheckboxes[i].checked = true;  
    }

}

function render(todo) {

  //render initial DB
  const listItem = document.createElement('li');
  const listItemText = document.createTextNode(todo.title);
  listItem.appendChild(listItemText);
  list.append(listItem);

  //add check button
  const checkedButton = document.createElement('input');
  checkedButton.setAttribute('type', 'checkbox');
  checkedButton.setAttribute('class', 'checkbox')
  list.append(checkedButton);

  localStorage.setItem('todo-list', list)

}

// NOTE: These are listeners for events from the server
// This event is for (re)loading the entire list of todos from the server
server.on('load', (todos) => {
    todos.forEach((todo) => render(todo));
    let localStorageToDos = getTodos()
    localStorageToDos.forEach((todo) => render(todo))
});

server.on('reload', (newtodo) => {
    render(newtodo);
});
