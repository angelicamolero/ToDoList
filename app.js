// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#filter-todo');


// Event Listener

toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);
document.addEventListener('DOMContentLoaded', getToDos);
// Functions

function addToDo(e){
     e.preventDefault();
    //todo list

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newToDo = document.createElement('li');
    newToDo.innerText= toDoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
    //add todo to localstorage
    saveLocalToDos(toDoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

     //trash button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     //append to list
     toDoList.appendChild(todoDiv);
     //clear to do input value
     toDoInput.value = "";
}

function deleteCheck(e){
  const item = e.target;
  //delete
  if(item.classList[0] === 'trash-btn'){
     const todo = item.parentElement;
     //animation
     todo.classList.add("fall");
     removeLocalToDos(todo);
     todo.addEventListener('transitioned', function(){
       todo.remove();
     });
     
  }

  //check mark
  if(item.classList[0] === 'complete-btn'){
      const todo = item.parentElement;
      todo.classList.toggle('completed');
  }

}

function filterToDo(e){
  const todos = toDoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all": 
      todo.style.display = "flex";
      break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
       case "uncompleted":
         if (!todo.classList.contains('completed')) {
           todo.style.display = "flex";
         } else {
           todo.style.display = "none";
         }
         break;
    }
  });
}


function saveLocalToDos(todo){
   //check --  do i already have thing in there?

   let todos;
   if(localStorage.getItem('todos') === null){
     todos = [];
   } else {
     todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDos(){
 
  let todos;
   if(localStorage.getItem('todos') === null){
     todos = [];
   } else {
     todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newToDo = document.createElement('li');
    newToDo.innerText= todo;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

     //trash button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);

     //append to list
     toDoList.appendChild(todoDiv);
   })
}

function removeLocalToDos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
