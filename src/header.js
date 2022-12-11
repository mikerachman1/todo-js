export default function generateHeader(currentProject) {
  const contentDiv = document.getElementById("content");

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('header')

  const todoH1 = document.createElement('h1');
  todoH1.innerHTML = 'ToDo!';

  const projectName = document.createElement('h2');
  projectName.innerHTML = currentProject.getName();
  projectName.dataset.project = currentProject.getId();
  projectName.classList.add('header-project-name');

  headerDiv.appendChild(todoH1);
  headerDiv.appendChild(projectName);

  contentDiv.appendChild(headerDiv);
}