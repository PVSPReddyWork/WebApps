/*
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
*/
// Task Data
let mainTasks = [];

export function loadMainTaskPopupUI(parentElement) {
    try {
        let mainTaskPopupString = `
        <div class="popup-overlay" id="main-task-overlay">
            <div class="popup" id="main-task-popup">
                <div class="popup_header_holder">
                <h2 class="popup_header">Create/Edit Main Task</h2>
                <button class="close-btn" onclick="closePopup('main-task-overlay')">X</button>
            </div>
            <div class="popup-data-holder">
                <input type="text" id="main-task-name" class="popup_inputs" placeholder="Task Name" required />
                <input type="date" id="main-task-date" class="popup_inputs" />
            </div>
            <div class="popup-button-holder popup-edit-button-holder" id="main_task_popup_button_holder">
            </div>
        </div>
        `;
        parentElement.innerHTML += mainTaskPopupString;
    }
    catch (ex) {
        console.error(ex);
    }
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
    saveData();
}
// Add Main Task
export async function addMainTask() {
    syncMainTaskData();
}
export async function updateMainTask(selectedMainTask) {
    let mainTask = selectedMainTask;
    if (mainTask !== null && mainTask !== undefined) {
        let _mainTask = mainTasks.find(item => item.id === mainTask.id);
        syncMainTaskData(_mainTask);
    }
}
export async function deleteMainTask(selectedMainTask) {
    let mainTask = selectedMainTask;
    if (mainTask !== null && mainTask !== undefined) {
        mainTasks = mainTasks.filter(mainTaskItem => mainTaskItem.id !== mainTask.id);
        tasks = tasks.filter(taskItem => taskItem.mainTaskId.toString() !== mainTask.id.toString());
        saveData();
    }
}

// Save Data
export async function saveMainTask() {
    localStorage.setItem('mainTasks', JSON.stringify(mainTasks));
}

// Initialize
export async function initializeMainTasks() {
    mainTasks = JSON.parse(localStorage.getItem('mainTasks')) || [];
}
initializeMainTasks();

