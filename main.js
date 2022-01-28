 const taskInput = document.getElementById("task");
 const addTask = document.getElementById("add-task-btn");
 const todosContainer = document.querySelector(".todo-container");
 let doneList = document.querySelector(".done-list");
 let doneTasks = document.querySelector('.done-tasks');
 let dones;
 let tasks;
 !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
 !localStorage.dones ? dones = [] : dones = JSON.parse(localStorage.getItem('dones'));
 let todoItemElems = [];
 
 
 
 class Task {
     constructor(description) {
         this.description = description;
         this.complete = false;
     }
 }

 const createTemplateDones = (item, index) => {
         return `<div>${item}</div>`    
 }
 

 function fillHtmlListDone() {
    doneList.innerHTML = "";
    if (dones.length > 0) {
        dones.forEach((item, index) => {
            doneList.innerHTML += createTemplateDones(item, index);
        });

        todoItemElems = document.querySelectorAll('.todo-container__item');
    }
};


fillHtmlListDone();








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


 




 window.addEventListener('click', function (event) {
     if (event.target.classList == 'btn-delete') {
         setTimeout (() => {
         let doneItem = event.target.closest('.todo-container__item').querySelector(".todo-container__description");
         doneList.appendChild(doneItem);
         dones.push(doneList.lastChild.innerText)
         updateStorageDoneTasks();
         fillHtmlListDone();     
        }, 600);
     }
 })

 const updateStorageDoneTasks = () => {
     localStorage.setItem('dones', JSON.stringify(dones));
 }
 updateStorageDoneTasks();

 function fillHtmlList() {
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

 
 
 
 
 
 let menuBtn = document.querySelector('.side-menu-btn');
 menuBtn.addEventListener("click", () => {
    doneTasks.classList.toggle('closed-open'); 
 })
 const iconMenu = document.querySelector('.menu-icon');
 const iconMenub = document.querySelector('.menu-icon');
if (iconMenu) {
    const icon = document.querySelector('.menu-icon');
    iconMenub.addEventListener("click", e => {
        icon.classList.toggle('_active-b');
    });
};


const clearBtn = document.querySelector('.clear-done-list');
const donesList = document.querySelector('.done-list');
clearBtn.addEventListener('click', e => {
    doneList.innerHTML = "";
    dones = [];
    localStorage.setItem('dones', JSON.stringify(dones));

});