import { format, parseISO } from 'date-fns';
import saveToLocalStorage from './localStorage';

export default function generateBody(projects, currentProject) {
  const bodyDiv = document.getElementById("body");

  let str = '';

  const tasks = currentProject.getTasks();

  Object.values(tasks).forEach((task) => {
    str +=  `<div class='task-${task.id} task'>
              <div class="task-main-${task.id} task-main">
                <div class="task-details-${task.id} task-details">
                  <div class='priority-${task.id} priority'></div>
                  <span class='task-title-${task.id}'>${task.title}</span>
                  <span class='task-date-${task.id} task-date'>${format((task.dueDate), 'M/dd/yy')}</span>
                </div>
                <input type="checkbox" class='task-checkbox-${task.id}'>
              </div>
              <div class="expanded-task-${task.id} expanded-task">
                <span class='task-description-${task.id} task-description'>${task.description}</span>
                <span class='task-buttons-${task.id}'>
                  <button class='task-edit-${task.id}'>Edit</button>
                  <button class='task-delete-${task.id}'>Delete</button>
                </span>
              </div>
            </div>`
    })

  bodyDiv.innerHTML = str;

  Object.values(tasks).forEach((task) => {
    const checkBox = document.querySelector(`.task-checkbox-${task.id}`)
    const taskTitle = document.querySelector(`.task-title-${task.id}`)
    const expandedTask = document.querySelector(`.expanded-task-${task.id}`)
    const deleteButton = document.querySelector(`.task-delete-${task.id}`)
    const taskDiv = document.querySelector(`.task-${task.id}`)
    const priorityDiv = document.querySelector(`.priority-${task.id}`)
    const taskDetails = document.querySelector(`.task-details-${task.id}`)
    const taskMain = document.querySelector(`.task-main-${task.id}`)
    const taskDate = document.querySelector(`.task-date-${task.id}`)
    const taskDescription = document.querySelector(`.task-description-${task.id}`)
    
    expandedTask.style.display = 'none'
    taskDetails.addEventListener('click', function() {
      (expandedTask.style.display == 'none') ? expandedTask.style.display = 'flex' : expandedTask.style.display = 'none'
    })
  
    if(task.completed) {
      checkBox.checked = true;
      taskTitle.innerHTML = `<strike>${task.title}</strike>`
    } else {
      checkBox.checked = false;
      taskTitle.innerHTML = `${task.title}`
    }

    function priorityColorChange() {
      if (task.priority == 'high') {
        priorityDiv.style.backgroundColor = '#d4142a'
      } else if (task.priority == 'moderate') {
        priorityDiv.style.backgroundColor = '#e8600a'
      } else {
        priorityDiv.style.backgroundColor = '#06b66c'
      }
    }
    priorityColorChange();

    checkBox.addEventListener('click', function() {
      if (task.completed == false) {
        checkBox.checked = true;
        task.completed = true;
        taskTitle.innerHTML = `<strike>${task.title}</strike>`
      } else {
        checkBox.checked = false;
        task.completed = false;
        taskTitle.innerHTML = `${task.title}`
      }
    })

    
    deleteButton.addEventListener('click', function() {
      taskDiv.style.display = 'none'
      currentProject.deleteTask(task.id)
    })

    const editButton = document.querySelector(`.task-edit-${task.id}`)
    editButton.addEventListener('click', function() {
      const editFormContainer = document.createElement('div');
      taskDiv.appendChild(editFormContainer)
      editFormContainer.innerHTML = `<form id="edit-task-${task.id}">
                            <label for="title">
                              <input type="text" name="title" id="title" value="${task.title}">
                            </label>
                            <label for="description">
                              <input type="text" name="description" id="description" value="${task.description}">
                            </label>
                            <label for="dueDate">
                              <input type="date" name="dueDate" id="dueDate" value="${format((task.dueDate), "yyyy-MM-dd")}">
                            </label>
                            <label for="priority">
                              <select name="priority" id="priority">
                                <option value="high">High</option>
                                <option value="moderate">Moderate</option>
                                <option value="low">Low</option>
                              </select>
                            </label>
                            <input type="submit" value="Submit">
                          </form>`

      taskMain.style.display = 'none'
      expandedTask.style.display = 'none'

      const editTaskForm = document.querySelector(`#edit-task-${task.id}`)
      editTaskForm.addEventListener("submit", 
        function(event) {
          event.preventDefault();

          const newTitle = event.currentTarget.title.value;
          const newDescription = event.currentTarget.description.value;
          const newDueDate = parseISO(event.currentTarget.dueDate.value);
          const newPriority = event.currentTarget.priority.value;

          task.title = newTitle;
          task.description = newDescription;
          task.dueDate = newDueDate;
          task.priority = newPriority;

          (task.completed) ? taskTitle.innerHTML = `<strike>${task.title}</strike>` : taskTitle.innerHTML = `${task.title}`
          taskDate.innerHTML = `${format((task.dueDate), 'M/dd/yy')}`;
          taskDescription.innerHTML = newDescription;
          priorityColorChange();

          taskMain.style.display = 'flex'
          editFormContainer.remove();
        })
    })
  })
}