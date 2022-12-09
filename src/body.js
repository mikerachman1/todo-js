import { format } from 'date-fns';

export default function generateBody(currentProject) {
  const tasksDiv = document.getElementById("tasks");

  let str = '';

  const tasks = currentProject.getTasks();

  Object.values(tasks).forEach((task) => {

    str +=  `<div class='task-${task.id}'>
              <span class='task-details-${task.id}'>${task.title} - ${task.description} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}</span>
              <input type="checkbox" class='task-checkbox-${task.id}'>
              <button class='task-edit-${task.id}'>Edit</button>
              <button class='task-delete-${task.id}'>Delete</button>
            </div>`
    })

  tasksDiv.innerHTML = str;

  Object.values(tasks).forEach((task) => {
    const checkBox = document.querySelector(`.task-checkbox-${task.id}`)
    const taskDetails = document.querySelector(`.task-details-${task.id}`)
    checkBox.addEventListener('click', function() {
      if (task.completed == false) {
        checkBox.checked = true;
        task.completed = true;
        taskDetails.innerHTML = `<strike>${task.title} - ${task.description} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}</strike>`
      } else {
        checkBox.checked = false;
        task.completed = false;
        taskDetails.innerHTML = `${task.title} - ${task.description} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}`
      }
      // console.log(task.completed)
    })

    const deleteButton = document.querySelector(`.task-delete-${task.id}`)
    const taskDiv = document.querySelector(`.task-${task.id}`)
    deleteButton.addEventListener('click', function() {
      taskDiv.style.display = 'none'
      currentProject.deleteTask(task.id)
      // console.log(currentProject.getTasks())
    })

    const editButton = document.querySelector(`.task-edit-${task.id}`)
    editButton.addEventListener('click', function() {
      //somehow edit task
      console.log(`edit task ${task.id}`)
    })
  })
}