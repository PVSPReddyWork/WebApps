const drawingArea = document.getElementById("drawingArea");
const rectangleList = document.getElementById("rectangleList");
const sidebar = document.getElementById("sidebar");
const sliders = document.getElementById("sliders");
const widthSlider = document.getElementById("widthSlider");
const heightSlider = document.getElementById("heightSlider");

let rectangles = [];
let selectedRectangle = null;
let isDragging = false;
let dragStartX, dragStartY;

// Function to add a new rectangle
function addRectangle() {
  const rectId = "rect-" + Date.now();
  const rect = document.createElement("div");
  rect.className = "rectangle";
  rect.id = rectId;
  rect.style.width = "100px";
  rect.style.height = "100px";
  rect.style.top = "50px";
  rect.style.left = "50px";
  drawingArea.appendChild(rect);

  // Add to rectangles array and sidebar
  rectangles.push({ id: rectId, element: rect });
  addToSidebar(rectId);

  // Add event listeners for desktop and mobile
  rect.addEventListener("mousedown", startDragging);
  rect.addEventListener("mousemove", dragRectangle);
  rect.addEventListener("mouseup", stopDragging);

  rect.addEventListener("touchstart", startDraggingTouch);
  rect.addEventListener("touchmove", dragRectangleTouch);
  rect.addEventListener("touchend", stopDragging);

  // Allow adding an image
  rect.addEventListener("dblclick", () => addImageToRectangle(rect));

  // Ensure the new rectangle is on top
  rect.style.zIndex = rectangles.length;
}

// Function to add rectangle to sidebar
function addToSidebar(id) {
  const listItem = document.createElement("li");
  listItem.textContent = id;
  listItem.onclick = () => selectRectangleById(id);
  rectangleList.appendChild(listItem);
}

// Function to handle dragging (mouse)
function startDragging(event) {
  if (event.target.classList.contains("rectangle")) {
    selectedRectangle = event.target;
    isDragging = true;
    dragStartX = event.clientX - selectedRectangle.offsetLeft;
    dragStartY = event.clientY - selectedRectangle.offsetTop;
    selectedRectangle.style.cursor = "grabbing";
    showSliders();
  }
}

function dragRectangle(event) {
  if (isDragging && selectedRectangle) {
    selectedRectangle.style.left = event.clientX - dragStartX + "px";
    selectedRectangle.style.top = event.clientY - dragStartY + "px";
  }
}

function stopDragging() {
  if (selectedRectangle) {
    selectedRectangle.style.cursor = "grab";
    isDragging = false;
  }
}

// Function to handle dragging (touch)
function startDraggingTouch(event) {
  const touch = event.touches[0];
  if (event.target.classList.contains("rectangle")) {
    selectedRectangle = event.target;
    isDragging = true;
    dragStartX = touch.clientX - selectedRectangle.offsetLeft;
    dragStartY = touch.clientY - selectedRectangle.offsetTop;
    showSliders();
  }
}

function dragRectangleTouch(event) {
  if (isDragging && selectedRectangle) {
    const touch = event.touches[0];
    selectedRectangle.style.left = touch.clientX - dragStartX + "px";
    selectedRectangle.style.top = touch.clientY - dragStartY + "px";
  }
}

// Add an image to the rectangle
function addImageToRectangle(rect) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";

  input.addEventListener("change", () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      rect.style.backgroundImage = `url(${reader.result})`;
      rect.style.backgroundSize = "cover";
    };

    reader.readAsDataURL(file);
  });

  input.click();
}

// Function to toggle sidebar visibility
function toggleSidebar() {
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
}

// Function to select rectangle by ID
function selectRectangleById(id) {
  selectedRectangle = rectangles.find((r) => r.id === id).element;
  showSliders();
}

// Show sliders for resizing
function showSliders() {
  sliders.style.display = "block";
  widthSlider.value = parseInt(selectedRectangle.style.width);
  heightSlider.value = parseInt(selectedRectangle.style.height);

  widthSlider.oninput = () => {
    if (selectedRectangle) selectedRectangle.style.width = widthSlider.value + "px";
  };

  heightSlider.oninput = () => {
    if (selectedRectangle) selectedRectangle.style.height = heightSlider.value + "px";
  };
}
