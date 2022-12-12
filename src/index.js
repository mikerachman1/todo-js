import './style.css';

import taskBuilder from './taskBuilder';
import projectBuilder from './projectBuilder';

import generateHeader from './header';
import {generateNewTaskModal} from './newTaskModal';
import generateBody from './body';
import generateSidebar from './sidebar';

//on first page load, create and set current project
let projectCounter = 0;
let projects = JSON.parse(localStorage.getItem('projects') || '[]');
let currentProject;
if (projects.length == 0) {
  projects.push(projectBuilder(projectCounter++, 'My First Project'));
  currentProject = projects[0];
} else {
  projects = projects.map(proj => {
    let newProj = projectBuilder(projectCounter++, proj.name, proj.tasks)
    newProj.setCounter(proj.counter)
    return newProj
  })
  currentProject = projects[JSON.parse(localStorage.getItem('currentProject'))]
}
// console.log(currentProject.getCounter())
generateHeader(currentProject);
generateNewTaskModal(projects, currentProject);

//find way to move this into body.js
const contentDiv = document.getElementById("content");
const bodyDiv = document.createElement("div");
bodyDiv.id = 'body'
contentDiv.appendChild(bodyDiv)

//just for development - populate tasks
// const task1 = taskBuilder(currentProject.getCounter(), 'task 1', 'do it', new Date('December 17, 2022 03:24:00'), 'high')
// currentProject.addTask(task1)
// const task2 = taskBuilder(currentProject.getCounter(), 'task 2', 'do it', new Date('December 17, 2022 03:24:00'), 'moderate')
// currentProject.addTask(task2)
// const task3 = taskBuilder(currentProject.getCounter(), 'task 3', 'do it', new Date('December 17, 2022 03:24:00'), 'low')
// currentProject.addTask(task3)

// //just for development - add project w/tasks
// const secondProject = projectBuilder(projectCounter++, 'Second Project')
// projects.push(secondProject);
// secondProject.addTask(taskBuilder(secondProject.getCounter(), 'TASK1', 'DOIT', new Date('December 18, 2022 03:24:00'), 'high'))
// secondProject.addTask(taskBuilder(secondProject.getCounter(), 'TASK2', 'DOIT', new Date('December 19, 2022 03:24:00'), 'high'))
// // console.log(projectCounter)

generateSidebar(projects, currentProject, projectCounter);
generateBody(projects, currentProject);



