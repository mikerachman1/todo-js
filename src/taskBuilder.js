export default function (title, description, dueDate, priority) {
  const taskObj = {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: false
  };

  return taskObj;
}