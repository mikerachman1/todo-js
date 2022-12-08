export default function generateHeader(currentProject) {
  const contentDiv = document.getElementById("content");

  const todoH1 = document.createElement('h1');
  todoH1.innerHTML = 'ToDo!';

  const projectName = document.createElement('h2');
  projectName.innerHTML = currentProject.getName();
  projectName.dataset.project = currentProject.getId();

  contentDiv.appendChild(todoH1);
  contentDiv.appendChild(projectName);
}