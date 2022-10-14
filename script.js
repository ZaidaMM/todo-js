const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const submitButton = document.getElementById('submitTodoButton');
const todoList = document.getElementById('todoList');
const clearTodos = document.getElementById('clearTodoButton');
const totalStats = document.querySelector('.total-stats-span');
const completedStats = document.querySelector('.completed-stats-span');
const remainingStats = document.querySelector('.remaining-stats-span');

let todos = JSON.parse(localStorage.getItem('todos'));

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);

todoForm.addEventListener('submit', addTodo);

todoList.addEventListener('click', removeTodo);

// Get todos
function getTodos() {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    // Create li element
    const todoItem = document.createElement('li');

    // Add class
    todoItem.classList.add('todo-item');

    // Create node to append li
    todoItem.appendChild(document.createTextNode(todo));

    // Add div for btns
    const todoBtns = document.createElement('div');

    // Add class
    todoBtns.classList.add('todo-btns');

    // Append to li
    todoItem.appendChild(todoBtns);

    // Add edit icon
    const todoEditBtn = document.createElement('button');

    // Add text
    todoEditBtn.innerText = 'Edit';

    // Add class
    todoEditBtn.classList.add('todo-edit-btn');

    // Append to div
    todoBtns.appendChild(todoEditBtn);

    // Add remove icon
    const todoDeleteBtn = document.createElement('button');

    // Add class
    todoDeleteBtn.classList.add('todo-delete-btn');

    // Add icon X
    todoDeleteBtn.innerHTML = 'X';

    // Append to div
    todoBtns.appendChild(todoDeleteBtn);

    // Append li to ul
    todoList.appendChild(todoItem);

    // Count stats
    console.log(todos.length);
    countStats();
  });
}

//Add new todo
function addTodo(event) {
  if (todoInput.value === '') {
    alert('Add a todo');
  }

  // Create li element
  const todoItem = document.createElement('li');

  // Add class
  todoItem.classList.add('todo-item');

  // Create node to append li
  todoItem.appendChild(document.createTextNode(todoInput.value));

  // Add div for btns
  const todoBtns = document.createElement('div');

  // Add class
  todoBtns.classList.add('todo-btns');

  // Append to li
  todoItem.appendChild(todoBtns);

  // Add edit icon
  const todoEditBtn = document.createElement('button');

  // Add text
  todoEditBtn.innerText = 'Edit';

  // Add class
  todoEditBtn.classList.add('todo-edit-btn');

  // Append to div
  todoBtns.appendChild(todoEditBtn);

  // Add remove icon
  const todoDeleteBtn = document.createElement('button');

  // Add class
  todoDeleteBtn.classList.add('todo-delete-btn');

  // Add icon X
  todoDeleteBtn.innerHTML = 'X';

  // Append to div
  todoBtns.appendChild(todoDeleteBtn);

  // Append li to ul
  todoList.appendChild(todoItem);

  // Add to LS
  addTodoToLocalStorage(todoInput.value);

  // Clear input field
  todoInput.value = '';

  event.preventDefault();

  // Add stats
  console.log(todos.length);
  countStats();
}

// Add in LS
function addTodoToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));

  // Add stats
  countStats();
}

// Remove todo
function removeTodo(e) {
  console.log(e.target);
  if (e.target.classList.contains('todo-delete-btn')) {
    e.target.parentElement.parentElement.remove();

    // Remove from LS
    removeTodoFromLocalStorage(e.target.parentElement.parentElement);

    // Add stats
    countStats();
  }
}

// Remove from LS
function removeTodoFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoElement = todo.children[0];
  todos.splice(todos.indexOf(todoElement), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Stats count
function countStats() {
  const todosLength = JSON.parse(localStorage.getItem('todos')).length;
  totalStats.textContent = todosLength;

  //  completedStats

  remainingStats.textContent = todosLength - completedStats.textContent;
  console.log(todos.length);
}
