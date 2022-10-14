const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoButton = document.querySelector('#submitButton');
const todoList = document.querySelector('#todoList');

const todoStorage = localStorage.getItem('todoList')
  ? JSON.parse(localStorage.getItem('todoList'))
  : [];

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  todoStorage.push(todoInput.value);

  localStorage.setItem('todoList', JSON.stringify(todoStorage));
  todoItemBuilder(todoInput.value);
  todoInput.value = '';
});

const todoItemBuilder = (text) => {
  // Add new todo
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');
  todoItem.setAttribute('id', 'todoItem');
  todoList.appendChild(todoItem);

  // const todoCheckBtn = document.createElement('div');
  // todoCheckBtn.classList.add('todo-check-btn');
  // todoHeader.appendChild(todoCheckBtn);

  const todoHeader = document.createElement('span');
  todoHeader.innerText = text;
  todoHeader.classList.add('todo-header');
  todoItem.appendChild(todoHeader);

  const todoBtns = document.createElement('div');
  todoBtns.classList.add('todo-btns');
  todoItem.appendChild(todoBtns);

  const todoEditBtn = document.createElement('button');
  todoEditBtn.innerText = 'Edit';
  todoEditBtn.classList.add('todo-edit-btn');
  todoBtns.appendChild(todoEditBtn);

  const todoDeleteBtn = document.createElement('button');
  todoDeleteBtn.innerText = 'X';
  todoDeleteBtn.classList.add('todo-delete-btn');
  todoBtns.appendChild(todoDeleteBtn);
};

const getTodos = JSON.parse(localStorage.getItem('todoList'));
getTodos.forEach((todo) => {
  todoItemBuilder(todo);
});

// Remove todo item
todoList.addEventListener('click', removeTodo);
function removeTodo(e) {
  // console.log(e.target.parentElement.parentElement);

  if (e.target.classList.contains('todo-delete-btn')) {
    // if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();

    // Remove item from LS
    // removeTodoFromLocalStorage(e.target.parentElement.parentElement);
    localStorage.removeItem(
      'todos',
      JSON.stringify(e.target.parentElement.parentElement)
    );
  }
  // }
}

// Remove item from LS

function removeTodoFromLocalStorage(todoList) {
  let todos;
  if (localStorage.getItem('todoList') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todoList'));
  }
  todos.forEach((todo, index) => {
    if (todo.textContent == todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todoList', JSON.stringify(todos));
}
