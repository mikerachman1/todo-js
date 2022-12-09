import './style.css';
import { parseISO, format } from 'date-fns';

import taskBuilder from './taskBuilder';
import projectBuilder from './projectBuilder';

import generateHeader from './header';
import generateNewTaskModal from './newTaskModal';
import generateBody from './body';

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
    const newDueDate = parseISO(event.currentTarget.dueDate.value);
    const newPriority = event.currentTarget.priority.value;

    const newTask = taskBuilder(newTitle, newDescription, newDueDate, newPriority);
    currentProject.addTask(newTask);
    generateBody(currentProject)
  })

const contentDiv = document.getElementById("content");
const tasksDiv = document.createElement("div");
tasksDiv.id = 'tasks'
contentDiv.appendChild(tasksDiv)

const task1 = taskBuilder('task 1', 'do it', new Date('December 17, 2022 03:24:00'), 'high')
const task2 = taskBuilder('task 2', 'do it', new Date('December 17, 2022 03:24:00'), 'moderate')
const task3 = taskBuilder('task 3', 'do it', new Date('December 17, 2022 03:24:00'), 'low')
currentProject.addTask(task1)
currentProject.addTask(task2)
currentProject.addTask(task3)


generateBody(currentProject)


