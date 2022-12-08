export default function (id, title, description, dueDate, priorty) {
  const taskObj = {
    id: id,
    title: title,
    description: description,
    dueDate: dueDate,
    priorty: priorty,
    completed: false
  };

  return taskObj;
}