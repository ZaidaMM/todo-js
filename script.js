const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const submitButton = document.getElementById('submitTodoButton');
const todoList = document.getElementById('todoList');
const todoInputLabel = document.getElementById('todoInputLabel');
const clearTodos = document.getElementById('clearTodoButton');
const listTitle = document.getElementById('listTitle');
const totalStats = document.querySelector('.total-stats-span');
const completedStats = document.querySelector('.completed-stats-span');
const remainingStats = document.querySelector('.remaining-stats-span');

let todos = JSON.parse(localStorage.getItem('todos'));

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);

todoForm.addEventListener('submit', addTodo);

todoList.addEventListener('click', editTodo);

todoList.addEventListener('click', removeTodo);

clearTodos.addEventListener('click', clearTodosList);

// Get todos
function getTodos() {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    // Add clear button and list title
    showClearButton();
    showListTitle();
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
    countStats();

    // Add clear button and list title
    showClearButton();
    showListTitle();
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

  // Add Event listener
  // todoEditBtn.addEventListener('click', editTodo);

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
  // console.log(todos.length);
  countStats();

  // Add clear button and list title
  showClearButton();
  showListTitle();
}

// Add in LS
function addTodoToLocalStorage(todo) {
  // event.preventDefault();
  let todos = [];
  // let todo = {
  //   id: Date.now(),
  //   name: todoInput.value,
  // };
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

// Edit todo
function editTodo(e) {
  const currentTodo = e.target.parentElement.parentElement.firstChild;

  if (e.target.classList.contains('todo-edit-btn')) {
    // Set input value to selected todo
    todoInput.value = currentTodo.textContent;

    // Change label and button to edit
    document.getElementById('todoInputLabel').innerText = 'Edit todo';
    document.getElementById('submitTodoButton').innerText = 'Edit';

    // Clear input field
    // todoInput.value = '';
  }
}

// Remove todo
function removeTodo(e) {
  if (e.target.classList.contains('todo-delete-btn')) {
    let parentEl = e.target.parentElement.parentElement;
    parentEl.remove();

    // Remove from LS
    removeTodoFromLocalStorage(parentEl);

    // Add stats
    countStats();

    // Remove clear button and list title when no todos
    showClearButton();
    showListTitle();
  }
}

// Remove from LS
function removeTodoFromLocalStorage(todo) {
  let todos;
  todos = JSON.parse(localStorage.getItem('todos'));

  const todoElement = todo.children[0];
  todos.splice(todos.indexOf(todoElement), 1);
  console.log(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear todos
function clearTodosList(e) {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
    console.log(todoList.firstChild);
  }
  clearTodosFromLocalStorage();

  // Add stats
  countStats();

  // Add clear button and list title
  showClearButton();
  showListTitle();

  e.preventDefault();
}

// Clear todos from LS
function clearTodosFromLocalStorage() {
  localStorage.clear();
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Stats count
function countStats() {
  const todosLength = JSON.parse(localStorage.getItem('todos')).length;
  totalStats.textContent = todosLength;

  remainingStats.textContent = todosLength - completedStats.textContent;

  //  completedStats
}

// Show/hide clear button
function showClearButton() {
  if (JSON.parse(localStorage.getItem('todos')).length === 0) {
    clearTodos.classList.add('hidden');
  } else {
    clearTodos.classList.remove('hidden');
  }
}
// Show/hide list title
function showListTitle() {
  if (JSON.parse(localStorage.getItem('todos')).length === 0) {
    listTitle.classList.add('hidden');
    // console.log('hide');
  } else {
    listTitle.classList.remove('hidden');
    // console.log('show');
  }
}
