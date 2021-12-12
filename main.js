 const taskInput = document.getElementById("task");
 const addTask = document.getElementById("add-task-btn");
 const todosContainer = document.querySelector(".todo-container");

 let tasks;
 !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

 let todoItemElems = [];

 class Task {
     constructor(description) {
         this.description = description;
         this.complete = false;
     }
 }

 // добавляю прямо в темплейт обработчик события. по клику вызываю функцию completeTask
 // так же проямо в шаблон добавляю функцию по клику для удаления deleteTask

 const createTemplate = (task, index) => {

     return `
     <div class="todo-container__item ${task.complete ? 'checked' : ''}">
        <div class="todo-container__description">${task.description}</div>
        <div class="todo-container__buttons">
        <input onclick = "completeTask(${index})" class="btn-done" type="checkbox" ${task.complete ? 'checked' : ''}>
            <button onclick = "deleteTask(${index})" class="btn-delete">Delete</button>
     </div>
     </div>
     `
 }

 const fillHtmlList = () => {
     todosContainer.innerHTML = "";
     if (tasks.length > 0) {
         tasks.forEach((item, index) => {
             todosContainer.innerHTML += createTemplate(item, index);
         });

         todoItemElems = document.querySelectorAll('.todo-container__item');
     }
 }
 fillHtmlList();

 const updateStorage = () => {
     localStorage.setItem('tasks', JSON.stringify(tasks));
 }

 const deleteTask = index => {

todoItemElems[index].classList.add('delition');
     setTimeout(() => {
         tasks.splice(index, 1);
         updateStorage();
         fillHtmlList();
     }, 600);
 }

 const completeTask = index => {
     tasks[index].complete = !tasks[index].complete;

     todoItemElems[index].classList.toggle('checked');
     updateStorage();
     fillHtmlList();
 }

 addTask.addEventListener("click", () => {
     if (taskInput.value === '') return;
     tasks.push(new Task(taskInput.value));
     updateStorage();
     fillHtmlList();
     taskInput.value = '';


 })