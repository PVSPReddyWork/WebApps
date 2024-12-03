let workList = []; // To store saved designs
let rectangles = [];
let selectedRectangle = null;

// Function to save the current design
function saveDesign() {
  const design = {
    id: "work-" + Date.now(),
    rectangles: rectangles.map((r) => ({
      id: r.id,
      width: r.element.style.width,
      height: r.element.style.height,
      top: r.element.style.top,
      left: r.element.style.left,
      backgroundImage: r.element.style.backgroundImage || null,
    })),
  };
  workList.push(design);
  addWorkToSidebar(design.id);
}

// Function to add a saved design to the sidebar
function addWorkToSidebar(workId) {
  const workItem = document.createElement("div");
  workItem.textContent = workId;
  workItem.onclick = () => loadDesign(workId);
  document.getElementById("workList").appendChild(workItem);
}

// Function to load a design from the work list
function loadDesign(workId) {
  const design = workList.find((w) => w.id === workId);
  if (!design) return;

  // Clear the current drawing area
  drawingArea.innerHTML = "";
  rectangles = [];

  // Add the saved rectangles
  design.rectangles.forEach((rectData) => {
    const rect = document.createElement("div");
    rect.className = "rectangle";
    rect.id = rectData.id;
    rect.style.width = rectData.width;
    rect.style.height = rectData.height;
    rect.style.top = rectData.top;
    rect.style.left = rectData.left;
    rect.style.backgroundImage = rectData.backgroundImage;
    rect.style.backgroundSize = "cover";
    drawingArea.appendChild(rect);

    // Add event listeners
    addRectangleListeners(rect);
    rectangles.push({ id: rectData.id, element: rect });
  });
}

// Function to export the current work list
function exportDesign() {
  const blob = new Blob([JSON.stringify(workList)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "designs.json";
  link.click();
}

// Function to import a design file
function importDesign() {
  const file = document.getElementById("importInput").files[0];
  const reader = new FileReader();

  reader.onload = () => {
    try {
      workList = JSON.parse(reader.result);
      document.getElementById("workList").innerHTML = "";
      workList.forEach((work) => addWorkToSidebar(work.id));
    } catch (error) {
      alert("Invalid file format!");
    }
  };

  reader.readAsText(file);
}

// Function to toggle a collapsible list
function toggleSidebar(listId) {
  const list = document.getElementById(listId);
  list.style.display = list.style.display === "block" ? "none" : "block";
}
