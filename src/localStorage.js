export default function saveToLocalStorage(projects, currentProject) {
  let projs = []
  for (const project of projects) {
    let projObj = {
      counter: project.getCounter(),
      name: project.getName(),
      tasks: project.getTasks()
    }
    projs.push(projObj)
  }
  localStorage.setItem('projects', JSON.stringify(projs))
  localStorage.setItem('currentProject', projects.indexOf(currentProject))
}