export default function generateBody(currentProject) {
  const tasksDiv = document.getElementById("tasks");

  let str = '';

  const tasks = currentProject.getTasks();

  Object.values(tasks).forEach((task) => {
    console.log(task)
    str +=  `<p>${task.title} - ${task.description} - ${task.dueDate} - ${task.priority}</p>`
    })

  tasksDiv.innerHTML = str;
}