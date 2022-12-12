import { format, parseISO } from 'date-fns';

export default function generateBody(currentProject) {
  const bodyDiv = document.getElementById("body");

  let str = '';

  const tasks = currentProject.getTasks();

  Object.values(tasks).forEach((task) => {
     //change task div here
    str +=  `<div class='task-${task.id} task'>
              <span class='task-details-${task.id}'>${task.title} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}</span>
              <input type="checkbox" class='task-checkbox-${task.id}'>
              <div class="expanded-task-${task.id}">
                <span class='task-description'>${task.description}</span>
                <span class='task-buttons-${task.id}'>
                  <button class='task-edit-${task.id}'>Edit</button>
                  <button class='task-delete-${task.id}'>Delete</button>
                </span>
              </div>
            </div>`

    //add event listener to task-details to expand to show buttons
    
    
    })

  bodyDiv.innerHTML = str;

  
  Object.values(tasks).forEach((task) => {
    const checkBox = document.querySelector(`.task-checkbox-${task.id}`)
    const taskDetails = document.querySelector(`.task-details-${task.id}`)
    const expandedTask = document.querySelector(`.expanded-task-${task.id}`)
    const deleteButton = document.querySelector(`.task-delete-${task.id}`)
    const taskDiv = document.querySelector(`.task-${task.id}`)
    
    expandedTask.style.display = 'none'
    taskDetails.addEventListener('click', function() {
      (expandedTask.style.display == 'none') ? expandedTask.style.display = 'block' : expandedTask.style.display = 'none'
    })
  
    if(task.completed) {
      checkBox.checked = true;
       //change task div here
      taskDetails.innerHTML = `<strike>${task.title} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}</strike>`
    } else {
      checkBox.checked = false;
       //change task div here
      taskDetails.innerHTML = `${task.title} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}`
    }

    checkBox.addEventListener('click', function() {
      if (task.completed == false) {
        checkBox.checked = true;
        task.completed = true;
         //change task div here
        taskDetails.innerHTML = `<strike>${task.title} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}</strike>`
      } else {
        checkBox.checked = false;
        task.completed = false;
         //change task div here
        taskDetails.innerHTML = `${task.title} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}`
      }
      // console.log(`${task.id}-${task.completed}`)
    })

    
    deleteButton.addEventListener('click', function() {
      taskDiv.style.display = 'none'
      currentProject.deleteTask(task.id)
      // console.log(currentProject.getTasks())
    })

    const editButton = document.querySelector(`.task-edit-${task.id}`)
    editButton.addEventListener('click', function() {
      taskDetails.innerHTML = `<form id="edit-task-${task.id}">
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
      const taskButtons = document.querySelector(`.task-buttons-${task.id}`)
      taskButtons.style.display = 'none'
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

          
           //change task div here
          (task.completed) ? taskDetails.innerHTML = `<strike>${task.title} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}</strike>` : taskDetails.innerHTML = `${task.title} - ${format((task.dueDate), 'M/dd/yy')} - ${task.priority}`
          taskButtons.style.display = 'inline'
        })
    })
  })
}