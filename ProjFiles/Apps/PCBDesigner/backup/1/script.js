const sidebar = document.getElementById("sidebar");
const toggleSidebarButton = document.getElementById("toggle-sidebar");
const drawingArea = document.getElementById("drawing-area");
const addHolesButton = document.getElementById("add-holes");
const holesXInput = document.getElementById("holes-x");
const holesYInput = document.getElementById("holes-y");
const addRectangleButton = document.getElementById("add-rectangle");
const addTextButton = document.getElementById("add-text");
const drawLineButton = document.getElementById("draw-line");
const lineColorInput = document.getElementById("line-color");
const saveButton = document.getElementById("save-design");
const clearButton = document.getElementById("clear-design");
const exportButton = document.getElementById("export-design");
const importInput = document.getElementById("import-design");
const toggleComponentsButton = document.getElementById("toggle-components");
const componentsList = document.getElementById("components");
const elementControls = document.getElementById("element-controls");

let selectedElement = null;
let isDrawingLine = false;
let startPoint = null;

let drawing = false;
let startX, startY;
let currentLine;
let selectedTool = null;
let componentCounter = 0;

// Toggle Sidebar
toggleSidebarButton.addEventListener("click", () => {
    //sidebar.classList.toggle("hidden");
    //sidebar.classList.toggle("visible");


    sidebar.classList.toggle("visible");

    // Adjust the width of the drawing area based on sidebar visibility
    if (sidebar.classList.contains("visible")) {
        drawingArea.style.width = "calc(100% - 300px)";
    } else {
        drawingArea.style.width = "100%";
    }
});

// Toggle Components List
toggleComponentsButton.addEventListener("click", () => {
    componentsList.classList.toggle("hidden");
    toggleComponentsButton.textContent = componentsList.classList.contains("hidden")
        ? "Show Components"
        : "Hide Components";
});

// Add Holes
addHolesButton.addEventListener("click", () => {
    const holesX = parseInt(holesXInput.value, 10);
    const holesY = parseInt(holesYInput.value, 10);
    addHoles(holesX, holesY);
});

// Add Holes Functionality
function addHoles(rows, cols) {
    const gap = 30; // Distance between holes
    drawingArea.innerHTML = ""; // Clear current holes
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const hole = document.createElement("div");
            hole.className = "hole";
            hole.style.left = `${j * gap}px`;
            hole.style.top = `${i * gap}px`;
            drawingArea.appendChild(hole);
        }
    }
}

// Add Rectangle
addRectangleButton.addEventListener("click", () => {
    const rect = document.createElement("div");
    rect.className = "rectangle";
    rect.style.width = "100px";
    rect.style.height = "50px";
    rect.style.left = "10px";
    rect.style.top = "10px";

    
    rect.style.position = "absolute";
    rect.textContent = "Rect";
    rect.addEventListener("click", () => selectElement(rect));
    //rect.addEventListener("mousedown", dragStart);

    makeDraggable(rect);
    drawingArea.appendChild(rect);
    addToComponentsList("Rectangle", rect);
});

// Add Text
addTextButton.addEventListener("click", () => {
    const text = document.createElement("div");
    text.className = "text";
    text.textContent = `Text ${componentCounter++}`;
    text.style.left = "20px";
    text.style.top = "20px";

    
    text.classList.add("text");
    text.style.position = "absolute";
    text.addEventListener("dblclick", () => editText(text));
    text.addEventListener("click", () => selectElement(text));
    //text.addEventListener("mousedown", dragStart);


    makeDraggable(text);
    drawingArea.appendChild(text);
    addToComponentsList("Text", text);
});

// Add to Components List
function addToComponentsList(type, element) {
    const item = document.createElement("li");
    item.textContent = `${type} (${element.style.left}, ${element.style.top})`;
    item.addEventListener("click", () => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    componentsList.appendChild(item);
}

// Make Items Draggable
function makeDraggable(element) {
    element.addEventListener("mousedown", (e) => {
        const rect = element.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        function move(e) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }

        function stopMove() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stopMove);
        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", stopMove);
    });
}

// Save Design
saveButton.addEventListener("click", () => {
    const data = drawingArea.innerHTML;
    localStorage.setItem("pcb-design", data);
    alert("Design saved!");
});

// Load Design
window.addEventListener("load", () => {
    const savedData = localStorage.getItem("pcb-design");
    if (savedData) drawingArea.innerHTML = savedData;
});

// Clear Design
clearButton.addEventListener("click", () => {
    drawingArea.innerHTML = "";
    componentsList.innerHTML = "";
    selectedElement = null;
    updateControls();
});

// Select Element
function selectElement(element) {
    selectedElement = element;
    updateControls();
}

// Update Sidebar Controls
function updateControls() {
    if (selectedElement) {
        elementControls.style.display = "block";
        document.getElementById("rename").value = selectedElement.textContent;
        document.getElementById("resize-width").value = parseInt(selectedElement.style.width || "100");
        document.getElementById("resize-height").value = parseInt(selectedElement.style.height || "50");
        document.getElementById("font-size").value = parseInt(selectedElement.style.fontSize || "14");
    } else {
        elementControls.style.display = "none";
    }
}

// Edit Text
function editText(element) {
    const newText = prompt("Edit Text:", element.textContent);
    if (newText !== null) element.textContent = newText;
}



// Export Design
exportButton.addEventListener("click", () => {
    const data = JSON.stringify({ content: drawingArea.innerHTML });
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "pcb-design.json";
    a.click();
});

// Import Design
importInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            drawingArea.innerHTML = data.content;
        };
        reader.readAsText(file);
    }
});



// Resizing
document.getElementById("resize-width").addEventListener("input", (e) => {
    if (selectedElement && selectedElement.classList.contains("rectangle")) {
        selectedElement.style.width = `${e.target.value}px`;
    }
});

document.getElementById("resize-height").addEventListener("input", (e) => {
    if (selectedElement && selectedElement.classList.contains("rectangle")) {
        selectedElement.style.height = `${e.target.value}px`;
    }
});

document.getElementById("font-size").addEventListener("input", (e) => {
    if (selectedElement && selectedElement.classList.contains("text")) {
        selectedElement.style.fontSize = `${e.target.value}px`;
    }
});

// Rename Element
document.getElementById("rename").addEventListener("input", (e) => {
    if (selectedElement) {
        selectedElement.textContent = e.target.value;
    }
});

// Delete Element
document.getElementById("delete-element").addEventListener("click", () => {
    if (selectedElement) {
        drawingArea.removeChild(selectedElement);
        selectedElement = null;
        updateControls();
    }
});

// Draw Line
document.getElementById("toggle-draw-line").addEventListener("click", () => {
    isDrawingLine = !isDrawingLine;
    drawingArea.classList.toggle("drawing-line", isDrawingLine);
});

// Line Drawing Logic
drawingArea.addEventListener("click", (event) => {
    if (isDrawingLine) {
        const hole = document.elementFromPoint(event.clientX, event.clientY);
        if (hole && hole.classList.contains("hole")) {
            if (!startPoint) {
                startPoint = { x: event.clientX, y: event.clientY };
            } else {
                const line = document.createElement("line");
                line.style.position = "absolute";
                // Draw logic for SVG here
                drawingArea.appendChild(line);
                startPoint = null;
            }
        }
    }
});
