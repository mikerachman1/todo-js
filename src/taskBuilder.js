export default function (id, title, description, dueDate, priority) {
  const taskObj = {
    id: id,
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: false
  };

  return taskObj;
}