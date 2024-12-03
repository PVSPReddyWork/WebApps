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