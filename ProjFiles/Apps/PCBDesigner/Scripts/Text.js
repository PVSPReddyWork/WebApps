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

// Edit Text
function editText(element) {
    const newText = prompt("Edit Text:", element.textContent);
    if (newText !== null) element.textContent = newText;
}