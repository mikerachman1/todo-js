export default function (title, description, dueDate, priorty) {
  const taskObj = {
    title: title,
    description: description,
    dueDate: dueDate,
    priorty: priorty,
    completed: false
  };

  return taskObj;
}