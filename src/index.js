import './style.css';

import taskBuilder from './taskBuilder';
import projectBuilder from './projectBuilder';

console.log('hello world')
const task1 = taskBuilder(1, 'task1', 'first task', 1202023, 1);
task1.completed = true;
console.log(task1)