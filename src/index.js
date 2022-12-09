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
generateNewTaskModal(currentProject);

const contentDiv = document.getElementById("content");
const tasksDiv = document.createElement("div");
tasksDiv.id = 'tasks'
contentDiv.appendChild(tasksDiv)

const task1 = taskBuilder(currentProject.getCounter(), 'task 1', 'do it', new Date('December 17, 2022 03:24:00'), 'high')
currentProject.addTask(task1)
const task2 = taskBuilder(currentProject.getCounter(), 'task 2', 'do it', new Date('December 17, 2022 03:24:00'), 'moderate')
currentProject.addTask(task2)
const task3 = taskBuilder(currentProject.getCounter(), 'task 3', 'do it', new Date('December 17, 2022 03:24:00'), 'low')
currentProject.addTask(task3)


generateBody(currentProject)


