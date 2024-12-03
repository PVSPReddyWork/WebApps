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