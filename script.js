'use strict';


// Elements
const addButton = document.querySelector(".add-task-button");
const taskList = document.querySelector(".task-list");

let counter=0;
// Functions
const add = function() {
    const taskInput = document.querySelector("#task-input").value;
        if (taskInput) {
            counter++;
            const date = new Date();
            const year = date.getFullYear();
            const month = `${date.getMonth()+1}`.padStart(2,0);  // 03 , 11 etc.
            const day =  `${date.getDate()}`.padStart(2,0);

            const html= 
                `<div class="col task" id="task_${counter}">
                    <div class="card border-danger mb-3">
                        <div class="card-body">
                            <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="taskInput_${counter}"
                            />
                            <label class="form-check-label mx-2" for="taskInput_${counter}">${taskInput}</label>
                            <button id="task_${counter}" class="btn-delete btn btn-sm btn-danger mx-3" style="float:right">Delete</button>
                            <span style="float:right">${day}/${month}/${year}</span>
                            </div>
                        </div>
                </div>`;
            taskList.insertAdjacentHTML('afterbegin', html);

            const deleteButton = document.querySelector(`.btn-delete`);

            deleteButton.addEventListener('click', function(){
                const taskList = [...document.querySelectorAll('.task')];
                const selectedTask = taskList.find(t => t.id === deleteButton.id);
                selectedTask.remove();
            });

            const checkbox = document.querySelector(`.form-check-input`);
            checkbox.addEventListener('click', function(){
                const labels = [...document.querySelectorAll("label")];
                const label = labels.find(lab => lab.getAttribute("for") === `${checkbox.id}`);
                if (checkbox.checked) 
                {
                    label.style.textDecoration = "line-through";
                }
                else{
                    label.style.textDecoration = "";
                }
            });
            document.querySelector("#task-input").value = ""; // clear task input field
        }
    };

addButton.addEventListener('click', add);

const task = document.querySelectorAll('span');
