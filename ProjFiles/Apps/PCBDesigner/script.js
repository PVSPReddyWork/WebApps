const drawingArea = document.getElementById("drawing-area");

function init_sidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleSidebarButton = document.getElementById("toggle-sidebar");

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
    /*
    toggleComponentsButton.addEventListener("click", () => {
        componentsList.classList.toggle("hidden");
        toggleComponentsButton.textContent = componentsList.classList.contains("hidden")
            ? "Show Components"
            : "Hide Components";
    });
    */
}

function init_fileFunctions() {
    const saveButton = document.getElementById("save-design");
    const clearButton = document.getElementById("clear-design");
    const exportButton = document.getElementById("export-design");
    const importInput = document.getElementById("import-design");

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
}

function init_holes() {
    const addHolesButton = document.getElementById("add-holes");
    const holesXInput = document.getElementById("holes-x");
    const holesYInput = document.getElementById("holes-y");

    // Add Holes
    addHolesButton.addEventListener("click", () => {
        const holesX = parseInt(holesXInput.value, 10);
        const holesY = parseInt(holesYInput.value, 10);
        if (isNaN(holesX) || isNaN(holesY) || holesX <= 0 || holesY <= 0) {
            alert("Please enter valid numbers for holes.");
            //return;
        }
        else {
            addHoles(holesX, holesY);
        }
    });

    // Add Holes Functionality
    function addHoles(rows, cols) {
        const holeSpacing = 50; // Spacing between holes in pixels
        const holeRadius = 5;   // Radius of each hole

        const drawingAreaSVG = document.getElementById("drawing-area");
        drawingAreaSVG.innerHTML = ""; // Clear existing holes and elements

        // Create Grid of Holes
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                hole.setAttribute("cx", x * holeSpacing + holeSpacing / 2);
                hole.setAttribute("cy", y * holeSpacing + holeSpacing / 2);
                hole.setAttribute("r", holeRadius);
                hole.setAttribute("fill", "black");
                hole.setAttribute("class", "hole");
                drawingAreaSVG.appendChild(hole);
            }
        }
    }
}

var isDrawingLine = false;
function init_lines() {
    // Draw Line
    document.getElementById("toggle-draw-line").addEventListener("click", () => {
        isDrawingLine = !isDrawingLine;
        drawingArea.classList.toggle("drawing-line", isDrawingLine);
    });

    // Line Drawing Logic
    drawingArea.addEventListener("mousedown", (event) => {
        if (isDrawingLine) {
            lineStartPoint = { x: event.offsetX, y: event.offsetY };
            currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            currentLine.setAttribute("x1", lineStartPoint.x);
            currentLine.setAttribute("y1", lineStartPoint.y);
            currentLine.setAttribute("x2", lineStartPoint.x);
            currentLine.setAttribute("y2", lineStartPoint.y);
            currentLine.setAttribute("stroke", "black");
            currentLine.setAttribute("stroke-width", "2");
            drawingArea.appendChild(currentLine);
        }
    });

    drawingArea.addEventListener("mousemove", (event) => {
        if (isDrawingLine && currentLine) {
            currentLine.setAttribute("x2", event.offsetX);
            currentLine.setAttribute("y2", event.offsetY);
        }
    });

    drawingArea.addEventListener("mouseup", () => {
        if (isDrawingLine && currentLine) {
            currentLine = null;
            lineStartPoint = null;
        }
    });
}



function onLoad(){
    init_sidebar();
    init_fileFunctions();
    init_holes();
    init_lines();
}
onLoad();

