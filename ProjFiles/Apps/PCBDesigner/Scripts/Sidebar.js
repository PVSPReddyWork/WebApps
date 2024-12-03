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