export default function generateSidebar(projects, currentProject) {
  const contentDiv = document.getElementById("content");

  const sidebarDiv = document.createElement('div');
  sidebarDiv.classList.add('sidebar');

  //fill sidebar innerhtml with projects, new project button 

  contentDiv.appendChild(sidebarDiv);
}