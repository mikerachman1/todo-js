import generateBody from './body';
import {generateNewTaskModal, removeNewTaskModal} from './newTaskModal';

export default function generateSidebar(projects, currentProject) {
  const contentDiv = document.getElementById("content");

  const sidebarDiv = document.createElement('div');
  sidebarDiv.classList.add('sidebar');

  //fill sidebar innerhtml with projects, new project button
  
  projects.forEach(project => {
    const projectDiv = document.createElement('div')
    projectDiv.setAttribute('id', `project-${project.getId()}`);
    projectDiv.innerHTML = project.getName();
    sidebarDiv.appendChild(projectDiv);

    projectDiv.addEventListener('click', function() {
      generateBody(project)
      const headerProjectNameDiv = document.querySelector('.header-project-name')
      headerProjectNameDiv.innerHTML = project.getName();
      removeNewTaskModal();
      generateNewTaskModal(project)
    })
  });

  contentDiv.appendChild(sidebarDiv);
}