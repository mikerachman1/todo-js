import './style.css';
import taskBuilder from './taskBuilder';
import projectBuilder from './projectBuilder';
import generateHeader from './header';
import { generateNewTaskModal } from './newTaskModal';
import { createBody, generateBody } from './body';
import generateSidebar from './sidebar';

//on first page load, create and set current project
const initialize = (() => {
  let projectCounter = 0;
  let projects = JSON.parse(localStorage.getItem('projects') || '[]');
  let currentProject;
  if (projects.length == 0) {
    projects.push(projectBuilder(projectCounter++, 'My First Project'));
    currentProject = projects[0];
    const task1 = taskBuilder(currentProject.getCounter(), 'Hello! Click me to Expand.', 'This is your first task! Have fun!', new Date('December 17, 2023 03:24:00'), 'high')
    currentProject.addTask(task1)
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
  createBody();
  generateSidebar(projects, currentProject, projectCounter);
  generateBody(projects, currentProject);
})();