import generateBody from './body';
import {generateNewTaskModal, removeNewTaskModal} from './newTaskModal';
import projectBuilder from './projectBuilder';

export default function generateSidebar(projects, projectCounter) {
  const contentDiv = document.getElementById("content");

  const sidebarDiv = document.createElement('div');
  sidebarDiv.classList.add('sidebar');

 
  const addProjectButton = document.createElement('button');
  addProjectButton.classList.add('add-project');
  addProjectButton.innerHTML = 'Add New Project'
  sidebarDiv.appendChild(addProjectButton);

  
  const projectsContainer = document.createElement('div');
  projectsContainer.classList.add('projects-container')

  function populateProjects() {
    projectsContainer.innerHTML = '';
    projects.forEach(project => {
      const projectDiv = document.createElement('div')
      projectDiv.setAttribute('id', `project-${project.getId()}`);
      projectDiv.classList.add('project');
      projectDiv.innerHTML = project.getName();
      projectsContainer.appendChild(projectDiv);

      projectDiv.addEventListener('click', function() {
        generateBody(project)
        const headerProjectNameDiv = document.querySelector('.header-project-name')
        headerProjectNameDiv.innerHTML = project.getName();
        removeNewTaskModal();
        generateNewTaskModal(project)
      })
    });
    sidebarDiv.appendChild(projectsContainer);
  }
  populateProjects();

  addProjectButton.addEventListener('click', function() {
    const newProjectDiv = document.createElement('div');
    newProjectDiv.classList.add('new-project')
    let str = `<form id='new-project'>
                  <label for='projectName'>
                    <input type="text" name="projectName" id="projectName" value="Project Name">
                  </label>
                  <input type="submit" value="Submit">
                </form>`;
    newProjectDiv.innerHTML = str;
    sidebarDiv.appendChild(newProjectDiv)

    const newProjectForm = document.querySelector('#new-project');
    newProjectForm.addEventListener('submit', 
    function(event) {
      event.preventDefault();
      const newProjectName = event.currentTarget.projectName.value;
      const newProjectObj = projectBuilder(projectCounter++, newProjectName)
      projects.push(newProjectObj);
      populateProjects();
      newProjectDiv.remove();
    })
  })
  
  contentDiv.appendChild(sidebarDiv);
}