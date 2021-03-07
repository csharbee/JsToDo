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

            document.querySelector("#task-input").value = ""; // clear task input field
        }
};

addButton.addEventListener('click', add);

// Change theme css
const themeBtn = document.querySelector('.btn-theme');
themeBtn.addEventListener('click',function(){
    const whiteStyle = "style.css";
    const blackStyle = "style-black.css";
    const style = document.querySelector('#style-sheet');
    if(style.getAttribute("href")===whiteStyle){
        style.setAttribute("href",blackStyle);
    }
    else{
        style.setAttribute("href",whiteStyle);
    }
});


taskList.addEventListener('click', function(e){

    // delete Button Match
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.getAttribute('id');
        document.querySelector(`#${id}`).remove();
    }

    // checkbox Match
    if (e.target.classList.contains('form-check-input')) {
        const labels = [...document.querySelectorAll("label")];
        const label = labels.find(lab => lab.getAttribute("for") === `${e.target.getAttribute("id")}`);
        if(e.target.checked){
            label.style.textDecoration ="line-through";
        }
        else{
            label.style.textDecoration = "";
        }
    }
});