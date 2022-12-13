import { generateBody } from './body';
import { parseISO, format } from 'date-fns';
import taskBuilder from './taskBuilder';
import saveToLocalStorage from './localStorage';


function generateNewTaskModal(projects, currentProject) {
  const contentDiv = document.getElementById("content");
  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add("overlay")
  const formDiv = document.createElement('div');
  formDiv.classList.add("new-task-div")
  const openFormBtn = document.createElement('button');
  openFormBtn.classList.add('open-new-task-button')
  openFormBtn.innerHTML = '+ Add New Task +';

  const str = `<form id="new-task">
                <h3>New Task</h3>
                <label for="title">Title
                  <input type="text" name="title" id="title">
                </label><br>
                <label for="description">Description
                  <input type="text" name="description" id="description">
                </label><br>
                <label for="dueDate">Due-date
                  <input type="date" name="dueDate" id="dueDate" value="${format((new Date()), "yyyy-MM-dd")}">
                </label><br>
                <label for="priority">Priority
                  <select name="priority" id="priority">
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                    <option value="low">Low</option>
                  </select>
                </label><br>
                <input type="submit" value="Submit">
              </form>`

  formDiv.innerHTML = str;

  const headerDiv = document.querySelector('.header')
  headerDiv.appendChild(openFormBtn);
  const htmlBody = document.body;
  htmlBody.appendChild(overlayDiv);
  htmlBody.appendChild(formDiv);
  const newTaskForm = document.querySelector('#new-task');
  
  newTaskForm.addEventListener("submit", 
  function(event) {
    event.preventDefault();

    const newTitle = event.currentTarget.title.value;
    const newDescription = event.currentTarget.description.value;
    const newDueDate = parseISO(event.currentTarget.dueDate.value);
    const newPriority = event.currentTarget.priority.value;
    
    const newTask = taskBuilder(currentProject.getCounter(), newTitle, newDescription, newDueDate, newPriority);
    currentProject.addTask(newTask);
    generateBody(projects, currentProject)
    formDiv.style.visibility = 'hidden';
    overlayDiv.style.visibility = 'hidden';
    saveToLocalStorage(projects, currentProject)
  })

  openFormBtn.addEventListener("click", function() {
    formDiv.style.visibility = 'visible';
    overlayDiv.style.visibility = 'visible';
  })

  overlayDiv.addEventListener("click", function() {
    formDiv.style.visibility = 'hidden';
    overlayDiv.style.visibility = 'hidden';
  })
}

function removeNewTaskModal() {
  const overlayDiv = document.querySelector('.overlay');
  const formDiv = document.querySelector('.new-task-div');
  const openFormBtn = document.querySelector('.open-new-task-button');
  overlayDiv.remove();
  formDiv.remove();
  openFormBtn.remove();
}

export {generateNewTaskModal, removeNewTaskModal}