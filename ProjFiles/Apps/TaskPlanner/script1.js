// Task Data
let mainTasks = [];
let tasks = [];
let isGroupedView = false;
let sortOrder = 'asc';

// DOM Elements
const mainTaskPopup = document.getElementById('main-task-popup');
const taskPopup = document.getElementById('task-popup');
const taskList = document.getElementById('task-list');
const addIcon = document.getElementById('add-icon');
const mainTaskIcon = document.getElementById('main-task-icon');
const taskIcon = document.getElementById('task-icon');

// Add Event Listeners
addIcon.addEventListener('click', toggleIcons);
mainTaskIcon.addEventListener('click', () => togglePopup(mainTaskPopup));
taskIcon.addEventListener('click', () => togglePopup(taskPopup));
document.getElementById('main-task-submit').addEventListener('click', addMainTask);
document.getElementById('task-submit').addEventListener('click', addTask);
document.getElementById('sort-btn').addEventListener('click', toggleSort);
document.getElementById('toggle-btn').addEventListener('click', toggleView);

// Toggle Icons
function toggleIcons() {
  mainTaskIcon.classList.toggle('visible');
  taskIcon.classList.toggle('visible');
}

// Toggle Popup
function togglePopup(popup) {
  popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

// Add Main Task
function addMainTask() {
  const name = document.getElementById('main-task-name').value.trim();
  const byDate = document.getElementById('main-task-date').value;
  if (!name || mainTasks.some(task => task.name === name)) {
    alert('Main task name is required and must be unique.');
    return;
  }
  const mainTask = {
    id: Date.now(),
    name,
    byDate: byDate || null,
    createdDate: new Date().toISOString(),
    isCompleted: false
  };
  mainTasks.push(mainTask);
  updateMainTaskDropdown();
  togglePopup(mainTaskPopup);
  saveData();
}

// Add Task
function addTask() {
  const name = document.getElementById('task-name').value.trim();
  const mainTaskId = document.getElementById('task-main-task').value;
  const byDate = document.getElementById('task-date').value;

  if (!name || (mainTaskId !== 'none' && tasks.some(task => task.mainTaskId === mainTaskId && task.name === name))) {
    alert('Task name is required and must be unique under the selected main task.');
    return;
  }

  const task = {
    id: Date.now(),
    name,
    mainTaskId: mainTaskId === 'none' ? null : mainTaskId,
    byDate: byDate || null,
    createdDate: new Date().toISOString(),
    isCompleted: false
  };
  tasks.push(task);
  togglePopup(taskPopup);
  saveData();
}

// Update Main Task Dropdown
function updateMainTaskDropdown() {
  const dropdown = document.getElementById('task-main-task');
  dropdown.innerHTML = '<option value="none">None</option>';
  mainTasks.forEach(task => {
    const option = document.createElement('option');
    option.value = task.id;
    option.textContent = task.name;
    dropdown.appendChild(option);
  });
}

// Save Data
function saveData() {
  localStorage.setItem('mainTasks', JSON.stringify(mainTasks));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';
  const data = isGroupedView
    ? groupTasksByMain()
    : [...tasks].sort(compareTasks);

  data.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.name;
    taskList.appendChild(li);
  });
}

// Group Tasks by Main Task
function groupTasksByMain() {
  return mainTasks.map(main => ({
    ...main,
    tasks: tasks.filter(task => task.mainTaskId === main.id)
  }));
}

// Compare Tasks for Sorting
function compareTasks(a, b) {
  const field = sortOrder === 'asc' ? 1 : -1;
  return a.name.localeCompare(b.name) * field;
}

// Toggle View
function toggleView() {
  isGroupedView = !isGroupedView;
  renderTasks();
}

// Toggle Sort
function toggleSort() {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  renderTasks();
}

// Initialize
function initialize() {
  mainTasks = JSON.parse(localStorage.getItem('mainTasks')) || [];
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();
  updateMainTaskDropdown();
}
initialize();
