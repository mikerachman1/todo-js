const projectBuilder = (id, name, tasks = {}) => {
  let taskCounter = 0;

  for(const task in tasks){
    tasks[task].dueDate = new Date(tasks[task].dueDate)
  };

  const addTask = (task) => {
    tasks[taskCounter] = task;
    taskCounter++;
  }

  const getTasks = () => {
    return tasks;
  }

  const getName = () => {
    return name;
  }

  const setName = (newName) => {
    name = newName;
  }

  const getCounter = () => {
    return taskCounter;
  }

  const setCounter = (cntr) => {
    taskCounter = cntr;
  }

  const getId = () => {
    return id;
  }

  const deleteTask = (taskId) => {
    delete tasks[taskId]
  }

  return {addTask, getTasks, getName, setName, getCounter, setCounter, getId, deleteTask}
}

export default projectBuilder;