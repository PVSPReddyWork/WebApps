let mainTasks = [];
let tasks = [];
let isGroupedView = false;
let sortOrder = 'asc';
let editingTask = null;

const addIcon = document.getElementById('add-icon');
const mainTaskIcon = document.getElementById('main-task-icon');
const taskIcon = document.getElementById('task-icon');
const taskList = document.getElementById('task-list');
const mainTaskOverlay = document.getElementById('main-task-overlay');
const taskOverlay = document.getElementById('task-overlay');

addIcon.addEventListener('click', toggleIcons);
document.addEventListener('click', handleOutsideClick);

function toggleIcons() {
  mainTaskIcon.classList.toggle('visible');
  taskIcon.classList.toggle('visible');
}

function handleOutsideClick(event) {
  if (!addIcon.contains(event.target) && 
      !mainTaskOverlay.contains(event.target) && 
      !taskOverlay.contains(event.target)) {
    closeIcons();
    closePopup('main-task-popup');
    closePopup('task-popup');
  }
}

function closeIcons() {
  mainTaskIcon.classList.remove('visible');
  taskIcon.classList.remove('visible');
}

function closePopup(popupId) {
  document.getElementById(popupId).parentElement.style.display = 'none';
}

function openPopup(popupId) {
  closeIcons();
  document.getElementById(popupId).parentElement.style.display = 'flex';
}

function saveData() {
  localStorage.setItem('mainTasks', JSON.stringify(mainTasks));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Add other necessary functions (renderTasks, toggleView, toggleSort, etc.)
