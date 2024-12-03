const drawingArea = document.getElementById("drawingArea");
const sidebar = document.getElementById("sidebar");
const rectangleList = document.getElementById("rectangleList");
const workList = document.getElementById("workList");
let selectedRectangle = null;
let allDesigns = [];

/* Sidebar Toggle */
function toggleSidebar() {
  sidebar.classList.toggle("open");
}

/* Add Rectangle */
function addRectangle() {
  const rectangle = document.createElement("div");
  rectangle.classList.add("rectangle");
  rectangle.id = `rect-${Date.now()}`;
  rectangle.style.left = "50px";
  rectangle.style.top = "50px";
  rectangle.style.width = "100px";
  rectangle.style.height = "100px";
  setupRectangleEvents(rectangle);
  drawingArea.appendChild(rectangle);
  renderRectangleList();
}

/* Rectangle Events */
function setupRectangleEvents(rectangle) {
  rectangle.addEventListener("mousedown", startDrag);
  rectangle.addEventListener("touchstart", startDrag);
  rectangle.addEventListener("click", () => selectRectangle(rectangle));
}

function startDrag(e) {
  e.preventDefault();
  const rect = e.target;
  const offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.offsetLeft;
  const offsetY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.offsetTop;

  function onDrag(e) {
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;
    rect.style.left = `${x}px`;
    rect.style.top = `${y}px`;
  }

  function stopDrag() {
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDrag);
  }

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("touchend", stopDrag);
}

/* Select Rectangle */
function selectRectangle(rectangle) {
  selectedRectangle = rectangle;
  const widthSlider = document.getElementById("widthSlider");
  const heightSlider = document.getElementById("heightSlider");

  widthSlider.value = rectangle.offsetWidth;
  heightSlider.value = rectangle.offsetHeight;

  widthSlider.oninput = () => {
    rectangle.style.width = `${widthSlider.value}px`;
  };

  heightSlider.oninput = () => {
    rectangle.style.height = `${heightSlider.value}px`;
  };
}

/* Render Rectangle List */
function renderRectangleList() {
  rectangleList.innerHTML = "";
  const rectangles = document.querySelectorAll(".rectangle");
  rectangles.forEach((rect, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Rectangle ${index + 1}`;
    listItem.onclick = () => selectRectangle(rect);
    rectangleList.appendChild(listItem);
  });
}

/* Save Design */
function saveDesign() {
  const rectangles = Array.from(document.querySelectorAll(".rectangle")).map(rect => ({
    id: rect.id,
    x: rect.offsetLeft,
    y: rect.offsetTop,
    width: rect.offsetWidth,
    height: rect.offsetHeight,
    background: rect.style.backgroundImage,
  }));
  const designName = `Design ${allDesigns.length + 1}`;
  allDesigns.push({ name: designName, rectangles });
  renderWorkList();
}

/* Export Design */
function exportDesign() {
  const json = JSON.stringify(allDesigns[allDesigns.length - 1], null, 2);
  downloadJSON(json, "design.json");
}

function exportAllDesigns() {
  const json = JSON.stringify(allDesigns, null, 2);
  downloadJSON(json, "all_designs.json");
}

/* Import Design */
function importDesign() {
  const file = document.getElementById("importInput").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const design = JSON.parse(reader.result);
      loadDesign(design);
    };
    reader.readAsText(file);
  }
}

function importAllDesigns() {
  const file = document.getElementById("importAllInput").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      allDesigns = JSON.parse(reader.result);
      renderWorkList();
    };
    reader.readAsText(file);
  }
}

/* Load Design */
function loadDesign(design) {
  clearDrawingArea();
  design.rectangles.forEach(rectData => {
    const rect = document.createElement("div");
    rect.classList.add("rectangle");
    rect.id = rectData.id;
    rect.style.left = `${rectData.x}px`;
    rect.style.top = `${rectData.y}px`;
    rect.style.width = `${rectData.width}px`;
    rect.style.height = `${rectData.height}px`;
    if (rectData.background) rect.style.backgroundImage = rectData.background;
    setupRectangleEvents(rect);
    drawingArea.appendChild(rect);
  });
  renderRectangleList();
}

/* Clear Drawing Area */
function clearDrawingArea() {
  drawingArea.innerHTML = "";
  renderRectangleList();
}

/* Render Work List */
function renderWorkList() {
  workList.innerHTML = "";
  allDesigns.forEach((design, index) => {
    const listItem = document.createElement("div");
    listItem.textContent = `${design.name}`;
    listItem.onclick = () => loadDesign(design);
    workList.appendChild(listItem);
  });
}

/* Collapsible List */
function toggleCollapsibleList(id) {
  const list = document.getElementById(id);
  list.style.display = list.style.display === "none" ? "block" : "none";
}

/* Download JSON */
function downloadJSON(json, filename) {
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
