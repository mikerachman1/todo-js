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

generateHeader(currentProject);
generateNewTaskModal(projects, currentProject);

//find way to move this into body.js
const contentDiv = document.getElementById("content");
const bodyDiv = document.createElement("div");
bodyDiv.id = 'body'
contentDiv.appendChild(bodyDiv)

generateSidebar(projects, currentProject, projectCounter);
generateBody(projects, currentProject);