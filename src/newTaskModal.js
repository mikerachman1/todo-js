export default function generateNewTaskModal() {
  const contentDiv = document.getElementById("content");

  const formDiv = document.createElement('div');

  const str = `<form id="new-task">
                <h3>New Task</h3>
                <label for="title">Title
                  <input type="text" name="title" id="title">
                </label><br>
                <label for="description">Description
                  <input type="text" name="description" id="description">
                </label><br>
                <label for="dueDate">Due-date
                  <input type="date" name="dueDate" id="dueDate">
                </label><br>
                <label for="priority">Priority
                  <select name="priority" id="priority">
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                    <option value="low">Low</option>
                  </select>
                </label><br>
                <input type="submit" value="Submit">
              </form>`

  formDiv.innerHTML = str;

  contentDiv.appendChild(formDiv);
}