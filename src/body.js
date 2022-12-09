import { format } from 'date-fns';

export default function generateBody(currentProject) {
  const tasksDiv = document.getElementById("tasks");

  let str = '';

  const tasks = currentProject.getTasks();

  Object.values(tasks).forEach((task) => {
    console.log(task)
    str +=  `<div class='task'>
              <span class='task-title'>${task.title}</span>
              <span class='task-description'>${task.description}</span>
              <span class='task-duedate'>${format((task.dueDate), 'M/dd/yy')}</span>
              <span class='task-priority'>${task.priority}</span>
              <input type="checkbox" class='task-checkbox'>
            </div>`
    })

  tasksDiv.innerHTML = str;
}