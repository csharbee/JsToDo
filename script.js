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
            const month = `${date.getMonth()+1}`.padStart(2,0);
            const day =  `${date.getDate()}`.padStart(2,0);

            const html= 
                `<div class="col task" id="task_${counter}">
                    <div class="card text-danger border-danger mb-3">
                        <div class="card-body">
                            <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="taskInput_${counter}"
                            />
                            <label class="form-check-label" for="task_${counter}">${taskInput}</label>
                            <span style="float:right ">${day}/${month}/${year}</span>
                            <span id="delete_${counter}">Delete</span>
                            </div>
                        </div>
                </div>`;
            taskList.insertAdjacentHTML('afterbegin', html);
            const yy = document.querySelector(`#delete_${counter}`);
            yy.addEventListener('click',function(){
                 taskList.removeChild(yy.parentElement.parentElement.parentElement.parentElement);
            })
            document.querySelector("#task-input").value="";
        }
    };

addButton.addEventListener('click', add);

const task = document.querySelectorAll('span');
