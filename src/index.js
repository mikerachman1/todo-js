import './style.css';
import { format } from 'date-fns';

import taskBuilder from './taskBuilder';
import projectBuilder from './projectBuilder';

import generateHeader from './header';
import generateNewTaskModal from './newTaskModal';

//on first page load, create and set current project
let projectCounter = 0;
let projects = [];
let currentProject;
projects.push(projectBuilder(projectCounter++, 'My First Project'));
currentProject = projects[0];

generateHeader(currentProject);
generateNewTaskModal();

const newTaskForm = document.querySelector('#new-task');
newTaskForm.addEventListener("submit", 
  function(event) {
    event.preventDefault();

    const newTitle = event.currentTarget.title.value;
    const newDescription = event.currentTarget.description.value;
    const newDueDate = event.currentTarget.dueDate.value;
    const newPriority = event.currentTarget.priority.value;

    const newTask = taskBuilder(newTitle, newDescription, newDueDate, newPriority);
    currentProject.addTask(newTask);

    console.log(currentProject.getTasks());
  })