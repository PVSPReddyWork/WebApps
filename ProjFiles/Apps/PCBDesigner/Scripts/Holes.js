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