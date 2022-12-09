import { format } from 'date-fns';

export default function generateBody(currentProject) {
  const tasksDiv = document.getElementById("tasks");

  let str = '';

  const tasks = currentProject.getTasks();

  Object.values(tasks).forEach((task) => {

    str +=  `<div class='task'>
              <span class='task-title'>${task.title}</span>
              <span class='task-description'>${task.description}</span>
              <span class='task-duedate'>${format((task.dueDate), 'M/dd/yy')}</span>
              <span class='task-priority'>${task.priority}</span>
              <input type="checkbox" class='task-checkbox-${task.id}'>
              <button class='task-edit-${task.id}'>Edit</button>
              <button class='task-delete-${task.id}'>Delete</button>
            </div>`
    })

  tasksDiv.innerHTML = str;

  // Object.values(tasks).forEach((task) => {
  //   const deleteBtn = document.querySelector('.')
  // })
}