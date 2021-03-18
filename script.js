'use strict';

// Elements
const addButton = document.querySelector(".add-task-button");
const taskList = document.querySelector(".task-list");
const taskInput = document.querySelector("#task-input");
const themeBtn = document.querySelector('.btn-theme');

class Task {
    id = uuidv4();
    date = new Date();
    constructor(description, isCompleted){
        this.description = description;
        this.isCompleted = isCompleted;
        this._setDate();
    }
    _setDate(){
        this.year = this.date.getFullYear();
        this.month = `${this.date.getMonth()+1}`.padStart(2,0);  // 03 , 11 etc.
        this.day =  `${this.date.getDate()}`.padStart(2,0);
    }
    _getFormatedDate(){
        return `${this.day}/${this.month}/${this.year}`;
    }
}
class App {
    tasks = [];
    constructor(){
        this.operationInit();
    }
    operationInit(){
        themeBtn.addEventListener('click',this.changeTheme);
        addButton.addEventListener('click', this.add.bind(this));
        taskList.addEventListener('click',this.operation.bind(this));
    }

    add(){
        this._taskInputValue = taskInput.value;
        if (this._taskInputValue) {
            const task = new Task(this._taskInputValue, false);
            const html = 
                `<div class="col task" id="task_${task.id}">
                    <div class="card border-danger mb-3">
                        <div class="card-body">
                            <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="${task.id}"
                            />
                            <label class="form-check-label mx-2" for="${task.id}">${task.description}</label>
                            <button id="task_${task.id}" class="btn-delete btn btn-sm btn-danger mx-3" style="float:right">Delete</button>
                            <span style="float:right">${task._getFormatedDate()}</span>
                            </div>
                        </div>
                </div>`;
            taskList.insertAdjacentHTML('afterbegin', html);

            this.tasks.push(task);
            taskInput.value = ""; // clear task input field
        }
    }
    operation(e){
        const deleteBntId = e.target.closest('.btn-delete')?.getAttribute("id");

        // delete Button Match
        if (deleteBntId) {
            document.querySelector(`#${deleteBntId}`).remove();
        }
        if (e.target.classList.contains('form-check-input')) {
            let labels = [...document.querySelectorAll("label")];
            let label = labels.find(lab => lab.getAttribute("for") === `${e.target.getAttribute("id")}`);
            
            const selectedTask = this.tasks.find(task => task.id === e.target.getAttribute("id"));
            if(e.target.checked){
                selectedTask.isCompleted = true;
                label.style.textDecoration ="line-through";
            }
            else{
                selectedTask.isCompleted = false;
                label.style.textDecoration = "";
            }
        }
    }
    
    changeTheme(){
        const whiteStyle = "style.css";
        const blackStyle = "style-black.css";
        const style = document.querySelector('#style-sheet');
        if(style.getAttribute("href") === whiteStyle){
            style.setAttribute("href",blackStyle);
        }
        else{
            style.setAttribute("href",whiteStyle);
        }
    }
}

const app = new App();