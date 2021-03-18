'use strict';

// Elements
const addButton = document.querySelector(".add-task-button");
const taskList = document.querySelector(".task-list");
const taskInput = document.querySelector("#task-input");
const themeBtn = document.querySelector('.btn-theme');

class App {
    _counter = 0;
    _taskInputValue = taskInput.value;
    _date = new Date();

    constructor(){
        this.operationInit();
    }
    operationInit(){
        themeBtn.addEventListener('click',this.changeTheme);
        addButton.addEventListener('click', this.add.bind(this));
        taskList.addEventListener('click',this.operation.bind(this));
    }

    add(){
        if (this._taskInputValue) {
            this._counter++;
        
            const year = this._date.getFullYear();
            const month = `${this._date.getMonth()+1}`.padStart(2,0);  // 03 , 11 etc.
            const day =  `${this._date.getDate()}`.padStart(2,0);

            const html= 
                `<div class="col task" id="task_${this._counter}">
                    <div class="card border-danger mb-3">
                        <div class="card-body">
                            <div class="form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="taskInput_${this._counter}"
                            />
                            <label class="form-check-label mx-2" for="taskInput_${this._counter}">${this._taskInputValue}</label>
                            <button id="task_${this._counter}" class="btn-delete btn btn-sm btn-danger mx-3" style="float:right">Delete</button>
                            <span style="float:right">${day}/${month}/${year}</span>
                            </div>
                        </div>
                </div>`;
            taskList.insertAdjacentHTML('afterbegin', html);

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
            if(e.target.checked){
                label.style.textDecoration ="line-through";
            }
            else{
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