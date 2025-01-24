// Main file to orchestrate the UI rendering
import { loadHeader } from './header.js';
import { loadFooter } from './footer.js';
import { loadContent } from './content.js';

// Function to initialize the app
function initializeApp() {
  const appDiv = document.getElementById('app');

  // Clear the app container
  appDiv.innerHTML = '';

  // Load UI components from other files
  loadHeader(appDiv);
  loadContent(appDiv);
  loadFooter(appDiv);
}

// Initialize the app
initializeApp();



// Task Data
let mainTasks = [];
let tasks = [];
let selectedTask = null;
let selectedMainTask = null;
let isGroupedView = false;
let sortOrder = 'asc';
let editingTask = null;
let isBusy = false;
const noCategoryValue = "000";

// DOM Elements
const mainTaskPopup = document.getElementById('main-task-popup');
const taskPopup = document.getElementById('task-popup');
const taskList = document.getElementById('task-list');
const addIcon = document.getElementById('add-icon');
const mainTaskIcon = document.getElementById('main-task-icon');
const taskIcon = document.getElementById('task-icon');
const mainTaskOverlay = document.getElementById('main-task-overlay');
const taskOverlay = document.getElementById('task-overlay');

// const mainTaskAddBtn = document.getElementById('main-task-submit');
// const mainTaskUpdateBtn = document.getElementById('main-task-update');
// const mainTaskDeleteBtn = document.getElementById('main-task-delete');
const mainTaskPopupButtonHolder = document.getElementById('main_task_popup_button_holder');
// const taskAddBtn = document.getElementById('task-submit');
// const taskUpdateBtn = document.getElementById('task-update');
// const taskDeleteBtn = document.getElementById('task-delete');
const taskPopupButtonHolder = document.getElementById('task_popup_button_holder');

// Add Event Listeners
addIcon.addEventListener('click', toggleIcons);
// mainTaskAddBtn.addEventListener('click', addMainTask);
// mainTaskUpdateBtn.addEventListener('click', updateMainTask);
// mainTaskDeleteBtn.addEventListener('click', deleteMainTask);
// taskAddBtn.addEventListener('click', addTask);
// taskUpdateBtn.addEventListener('click', updateTask);
// taskDeleteBtn.addEventListener('click', deleteTask);
document.getElementById('sort-btn').addEventListener('click', toggleSort);
document.getElementById('toggle-btn').addEventListener('click', toggleView);


mainTaskIcon.addEventListener('click', () => {
  let byDateObj = document.getElementById('main-task-date');
  setDateTime(byDateObj, null);
  // showHideElements(mainTaskAddBtn, "visible");
  // showHideElements(mainTaskUpdateBtn, "hidden");
  // showHideElements(mainTaskDeleteBtn, "hidden");
  addRemoveHideElements(mainTaskPopupButtonHolder, `<button class="popup_buttons default_main_task_buttons new_main_task_buttons" id="main-task-submit" onclick="addMainTask()">Submit</button>`)
  openPopup(mainTaskOverlay);
});
taskIcon.addEventListener('click', () => {
  let byDateObj = document.getElementById('task-date');
  let byTimeObj = document.getElementById('task-time');
  setDateTime(byDateObj, byTimeObj);
  // showHideElements(taskAddBtn, "visible");
  // showHideElements(taskUpdateBtn, "hidden");
  // showHideElements(taskDeleteBtn, "hidden");
  addRemoveHideElements(taskPopupButtonHolder, `<button class="popup_buttons default_task_buttons new_task_buttons" onclick="addTask()" id="task-submit">Submit</button>`)
  openPopup(taskOverlay);
});

document.addEventListener('click', handleOutsideClick);
function handleOutsideClick(event) {
  if (!addIcon.contains(event.target) &&
    !mainTaskOverlay.contains(event.target) &&
    !taskOverlay.contains(event.target)) {
    closeIcons();
    //closePopup(mainTaskPopup);
    //closePopup(taskPopup);
  }
}



function closeIcons() {
  mainTaskIcon.classList.remove('visible');
  taskIcon.classList.remove('visible');
}

function setDateTime(dateObj, timeObj) {
  // Get today's date in the format 'YYYY-MM-DD'
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Extract 'YYYY-MM-DD'

  // Get current time in the format 'HH:MM'
  const formattedTime = today.toTimeString().slice(0, 5); // Extract 'HH:MM'

  // Set the default values
  if (dateObj !== null && dateObj !== undefined) {
    dateObj.value = dateObj.value || formattedDate;
  }
  if (timeObj !== null && timeObj !== undefined) {
    timeObj.value = timeObj.value || formattedTime;
  }
}

function closePopup(popupId) {
  //if(!isBusy){
  let popup = document.getElementById(popupId);
  if (popup !== null && popup !== undefined) {
    popup.style.visibility = 'hidden';
  }

  try {
    let mainTask_NameObj = document.getElementById('main-task-name');
    let mainTask_ByDateObj = document.getElementById('main-task-date');
    mainTask_NameObj.value = "";
    mainTask_ByDateObj.value = "";

    // showHideElements(mainTaskAddBtn, "hidden");
    // showHideElements(mainTaskUpdateBtn, "hidden");
    // showHideElements(mainTaskDeleteBtn, "hidden");
    addRemoveHideElements(mainTaskPopupButtonHolder, "");

    let task_NameObj = document.getElementById('task-name');
    let task_MainTaskIdObj = document.getElementById('task-main-task');
    let task_ByDateObj = document.getElementById('task-date');
    let task_ByTimeObj = document.getElementById('task-time');
    let task_ReminderFrequencyObj = document.getElementById('task-remind-periodically');
    task_NameObj.value = "";
    task_MainTaskIdObj.value = noCategoryValue;//"none";
    task_ByDateObj.value = "";
    task_ByTimeObj.value = "";
    task_ReminderFrequencyObj.value = "none";

    // showHideElements(taskAddBtn, "hidden");
    // showHideElements(taskUpdateBtn, "hidden");
    // showHideElements(taskDeleteBtn, "hidden");
    addRemoveHideElements(taskPopupButtonHolder, "");
  }
  catch (ex) {
    console.error(ex);
  }
  //}
}


// Toggle Icons
function toggleIcons() {
  mainTaskIcon.classList.toggle('visible');
  taskIcon.classList.toggle('visible');
}

async function openPopup(popup) {
  //if(!isBusy){
  //isBusy = true;
  //await new Promise(resolve => setTimeout(resolve, 1500));
  closeIcons();
  popup.style.visibility = 'visible';
  //isBusy = false;
  //}
}

function showHideElements(elementObj, visibilityText) {
  elementObj.style.visibility = visibilityText;
}

function addRemoveHideElements(parentObj, elementString) {
  parentObj.innerHTML = elementString;
}

function syncMainTaskData(mainTask = null) {
  let nameObj = document.getElementById('main-task-name');
  let byDateObj = document.getElementById('main-task-date');
  const name = nameObj.value.trim();
  const byDate = byDateObj.value;
  if (!name) {
    alert('Main task name is required and must be unique.');
    return;
  }
  if (mainTask !== null && mainTask !== undefined) {
    mainTasks.forEach(item => {
      if (item.id === mainTask.id) {
        item.name = name;
        item.byDate = byDate || mainTask.byDate;
        item.isCompleted = false;
      }
    })
  }
  else {
    if (!name || mainTasks.some(task => task.name === name)) {
      alert('Main task name is required and must be unique.');
      return;
    }
    const _mainTask = {
      id: Date.now(),
      name,
      isMainTask: true,
      isTask: false,
      byDate: byDate || null,
      createdDate: new Date().toISOString(),
      isCompleted: false
    };
    mainTask = _mainTask;
    mainTasks.push(mainTask);
  }
  updateMainTaskDropdown();
  saveData();
  closePopup(mainTaskOverlay.id);
}
// Add Main Task
function addMainTask() {
  syncMainTaskData();
  /*
  let nameObj = document.getElementById('main-task-name');
  let byDateObj = document.getElementById('main-task-date');
  const name = nameObj.value.trim();
  const byDate = byDateObj.value;
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
  saveData();
  nameObj.value = "";
  byDateObj.value = "";
  closePopup(mainTaskOverlay.id);
  */
}
function updateMainTask() {
  let mainTask = selectedMainTask;
  if (mainTask !== null && mainTask !== undefined) {
    let _mainTask = mainTasks.find(item => item.id === mainTask.id);
    syncMainTaskData(_mainTask);
  }
}
function deleteMainTask() {
  let mainTask = selectedMainTask;
  if (mainTask !== null && mainTask !== undefined) {
    mainTasks = mainTasks.filter(mainTaskItem => mainTaskItem.id !== mainTask.id);
    tasks = tasks.filter(taskItem => taskItem.mainTaskId.toString() !== mainTask.id.toString());
    saveData();
    closePopup(mainTaskOverlay.id);
    /*
    let _mainTask = mainTasks.find(item => item.id === mainTask.id);
    mainTasks.remove(_mainTask);
    */

  }
}


function syncTaskData(task = null) {
  let nameObj = document.getElementById('task-name');
  let mainTaskIdObj = document.getElementById('task-main-task');
  let byDateObj = document.getElementById('task-date');
  let byTimeObj = document.getElementById('task-time');
  let reminderFrequencyObj = document.getElementById('task-remind-periodically');

  const name = nameObj.value.trim();
  const mainTaskId = mainTaskIdObj.value;
  const byDate = byDateObj.value;
  const byTime = byTimeObj.value;
  const reminderFrequency = reminderFrequencyObj.value;

  if (!name || (mainTaskId !== 'none' && tasks.some(task => task.mainTaskId === mainTaskId && task.name === name))) {
    alert('Task name is required and must be unique under the selected main task.');
    return;
  }

  if (task !== null && task !== undefined) {

    tasks.forEach(item => {
      if (item.id === task.id) {
        item.name = name;
        item.mainTaskId = mainTaskId;
        item.byDate = byDate || mainTask.byDate;
        item.byTime = byTime;
        item.reminderFrequency = reminderFrequency;
        item.isCompleted = false;
      }
    })
  }
  else {
    const _task = {
      id: Date.now(),
      name,
      isMainTask: false,
      isTask: true,
      mainTaskId: mainTaskId,// === 'none' ? "Uncategorized" : mainTaskId,
      byDate: byDate || null,
      byTime: byTime || null,
      reminderFrequency: reminderFrequency || "none",
      createdDate: new Date().toISOString(),
      isCompleted: false
    };
    task = _task;
    tasks.push(task);
  }


  saveData();
  closePopup(taskOverlay.id);
}
// Add Task
function addTask() {
  syncTaskData();
  /*
    let nameObj = document.getElementById('task-name');
    let mainTaskIdObj = document.getElementById('task-main-task');
    let byDateObj = document.getElementById('task-date');
  
    const name = nameObj.value.trim();
    const mainTaskId = mainTaskIdObj.value;
    const byDate = byDateObj.value;
  
    if (!name || (mainTaskId !== 'none' && tasks.some(task => task.mainTaskId === mainTaskId && task.name === name))) {
      alert('Task name is required and must be unique under the selected main task.');
      return;
    }
  
    const task = {
      id: Date.now(),
      name,
      mainTaskId: mainTaskId === 'none' ? "Uncategorized" : mainTaskId,
      byDate: byDate || null,
      createdDate: new Date().toISOString(),
      isCompleted: false
    };
    tasks.push(task);
    saveData();
    nameObj.value = "";
    mainTaskIdObj.value = "none";
    byDateObj.value = "";
    closePopup(taskOverlay.id);
    */
}
function updateTask() {
  let task = selectedTask;
  if (task !== null && task !== undefined) {
    let _task = tasks.find(item => item.id === task.id);
    syncTaskData(_task)
  }
}
function deleteTask() {
  let task = selectedTask;
  if (task !== null && task !== undefined) {
    tasks = tasks.filter(item => item.id !== task.id);
    saveData();
    closePopup(taskOverlay.id);
    //let _task = tasks.find(item => item.id === task.id);
    //tasks.remove(_task);
  }
}

function editListObject(taskObject) {
  if (taskObject !== null && taskObject !== undefined) {
    if (taskObject.isMainTask) {
      selectedMainTask = taskObject;
      let nameObj = document.getElementById('main-task-name');
      let byDateObj = document.getElementById('main-task-date');

      nameObj.value = taskObject.name;
      byDateObj.value = taskObject.byDate;

      // showHideElements(mainTaskAddBtn, "hidden");
      // showHideElements(mainTaskUpdateBtn, "visible");
      // showHideElements(mainTaskDeleteBtn, "visible");
    addRemoveHideElements(mainTaskPopupButtonHolder, `<button class="popup_buttons default_main_task_buttons edit_main_task_buttons" onclick="updateMainTask()" id="main-task-update">Update</button>
            <button class="popup_buttons default_main_task_buttons edit_main_task_buttons" onclick="deleteMainTask()" id="main-task-delete">Delete</button>`);

      openPopup(mainTaskOverlay);
    }
    else {
      selectedTask = taskObject;
      let nameObj = document.getElementById('task-name');
      let mainTaskIdObj = document.getElementById('task-main-task');
      let byDateObj = document.getElementById('task-date');
      let byTimeObj = document.getElementById('task-time');
      let reminderFrequencyObj = document.getElementById('task-remind-periodically');

      nameObj.value = taskObject.name;
      mainTaskIdObj.value = taskObject.mainTaskId;// === "Uncategorized" ? "none" : taskObject.mainTaskId;
      byDateObj.value = taskObject.byDate;
      byTimeObj.value = taskObject.byTime;
      reminderFrequencyObj.value = taskObject.reminderFrequency;

      // showHideElements(taskAddBtn, "hidden");
      // showHideElements(taskUpdateBtn, "visible");
      // showHideElements(taskDeleteBtn, "visible");
      addRemoveHideElements(taskPopupButtonHolder, `<button class="popup_buttons default_task_buttons edit_task_buttons" onclick="updateTask()" id="task-update">Update</button>
            <button class="popup_buttons default_task_buttons edit_task_buttons" onclick="deleteTask()" id="task-delete">Delete</button>`)

      openPopup(taskOverlay);
    }
  }
}

// Update Main Task Dropdown
function updateMainTaskDropdown() {
  const dropdown = document.getElementById('task-main-task');
  dropdown.innerHTML = `<option value=${noCategoryValue}>None</option>`;
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

    let listItemName = document.createElement('p');
    listItemName.innerHTML = task.name;

    let listItemTouchOverlay = document.createElement('div');
    listItemTouchOverlay.setAttribute('data-custom-data', JSON.stringify(task));
    listItemTouchOverlay.id = "task_touch_overlay_div";
    listItemTouchOverlay.addEventListener('click', () => editListObject(task));

    let listItemDiv = document.createElement('div');
    listItemDiv.setAttribute('data-custom-data', JSON.stringify(task));
    listItemDiv.id = "task_div";

    listItemDiv.appendChild(listItemName);
    listItemDiv.appendChild(listItemTouchOverlay);

    const li = document.createElement('li');
    li.appendChild(listItemDiv);
    //li.textContent = task.name;
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

