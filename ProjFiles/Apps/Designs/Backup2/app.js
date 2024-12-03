// const html2canvas = require('html2canvas');

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

/* Add Image Button Listener */
//const addImageButton = document.createElement("button");
//addImageButton.textContent = "Add Image to Rectangle";
//addImageButton.onclick = () => 
  function AddImageClicked() {
  if (selectedRectangle) {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedRectangle.style.backgroundImage = `url(${e.target.result})`;

          /** /
          //rectangle.style.backgroundImage = `url(${imageURL})`;
          selectedRectangle.style.backgroundRepeat = "repeat"; // Ensures tiling
          selectedRectangle.style.backgroundSize = "auto"; // Prevents stretching the image
          /**/
        };
        reader.readAsDataURL(file);
      }
    };
    inputFile.click();
  } else {
    alert("Please select a rectangle first!");
  }
};

let bordersVisible = true;
function ToggleBorders() {
  bordersVisible = !bordersVisible;
  const rectangles = document.querySelectorAll(".rectangle");
  rectangles.forEach((rect) => {
    rect.style.border = bordersVisible ? "2px solid #000" : "none";
  });
}

function DeleteRectangle() {
  if (selectedRectangle) {
    selectedRectangle.remove();
    selectedRectangle = null;
    renderRectangleList();
  } else {
    alert("Please select a rectangle first!");
  }
}

/*
function TakeScreenshot() {
  const drawingArea = document.getElementById("drawingArea");

  // Create a canvas for the screenshot
  const canvas = document.createElement("canvas");
  canvas.width = drawingArea.offsetWidth;
  canvas.height = drawingArea.offsetHeight;

  const ctx = canvas.getContext("2d");

  // Draw the contents of the drawing area onto the canvas
  const rectangles = document.querySelectorAll(".rectangle");
  rectangles.forEach((rect) => {
    const rectStyles = getComputedStyle(rect);
    ctx.fillStyle = rectStyles.backgroundImage !== "none" 
      ? rectStyles.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, "$2").split(",")[0]
      : rectStyles.backgroundColor;
    ctx.fillRect(
      parseFloat(rect.style.left),
      parseFloat(rect.style.top),
      parseFloat(rect.style.width),
      parseFloat(rect.style.height)
    );

    // Optionally add rectangle borders
    if (rectStyles.border !== "none") {
      ctx.strokeStyle = rectStyles.borderColor;
      ctx.lineWidth = parseFloat(rectStyles.borderWidth);
      ctx.strokeRect(
        parseFloat(rect.style.left),
        parseFloat(rect.style.top),
        parseFloat(rect.style.width),
        parseFloat(rect.style.height)
      );
    }
  });

  // Convert canvas to image
  const img = canvas.toDataURL("image/png");

  // Create a download link for the image
  const downloadLink = document.createElement("a");
  downloadLink.href = img;
  downloadLink.download = "drawing-area-screenshot.png";
  downloadLink.click();
};
*/

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








/* Create Selection Tool * /
const selectionTool = document.createElement("div");
selectionTool.id = "selectionTool";
document.body.appendChild(selectionTool);

let isSelecting = false;
let startX = 0;
let startY = 0;

/* Mouse Events for Selection Tool * /
drawingArea.addEventListener("mousedown", (event) => {
  isSelecting = true;
  startX = event.clientX;
  startY = event.clientY;
  selectionTool.style.left = `${startX}px`;
  selectionTool.style.top = `${startY}px`;
  selectionTool.style.width = `0px`;
  selectionTool.style.height = `0px`;
  selectionTool.style.display = "block";
});

document.addEventListener("mousemove", (event) => {
  if (!isSelecting) return;
  const currentX = event.clientX;
  const currentY = event.clientY;
  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);
  selectionTool.style.width = `${width}px`;
  selectionTool.style.height = `${height}px`;
  selectionTool.style.left = `${Math.min(startX, currentX)}px`;
  selectionTool.style.top = `${Math.min(startY, currentY)}px`;
});

document.addEventListener("mouseup", () => {
  if (isSelecting) {
    isSelecting = false;
  }
});
*/

/* Take Screenshot of Selected Region */
const screenshotButton = document.createElement("button");
screenshotButton.textContent = "Take Screenshot of Selection";

screenshotButton.onclick = async () => {
  const rect = drawingArea.getBoundingClientRect();
  //const rect = selectionTool.getBoundingClientRect();
  //selectionTool.style.display = "none"; // Hide the selection tool
  
  
  /*
  const canvas = await html2canvas(drawingArea, {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  });
  const img = canvas.toDataURL("image/png");

  // Create a download link for the screenshot
  const downloadLink = document.createElement("a");
  downloadLink.href = img;
  downloadLink.download = "selected-region-screenshot.png";
  downloadLink.click();
  */

  // Create a Canvas
  const canvas = document.createElement("canvas");
  canvas.width = rect.width;
  canvas.height = rect.height;
  const ctx = canvas.getContext("2d");

  // Draw the rectangles onto the canvas
  const elements = drawingArea.querySelectorAll(".rectangle");
  let items = elements.length;
  elements.forEach((el) => {
    const elRect = el.getBoundingClientRect();

    // Check if the element is within the selected region
    if (
      elRect.right > rect.left &&
      elRect.left < rect.right &&
      elRect.bottom > rect.top &&
      elRect.top < rect.bottom
    ) {

      /**/
      const offsetX = elRect.left - rect.left;
      const offsetY = elRect.top - rect.top;

      // Draw the rectangle background
      ctx.fillStyle = el.style.backgroundColor || "#fff";
      ctx.fillRect(offsetX, offsetY, elRect.width, elRect.height);

      // If the rectangle has an image, draw the image
      const bgImage = el.style.backgroundImage;
      if (bgImage && bgImage !== "none") {
        const url = bgImage.slice(5, -2); // Extract the image URL
        const img = new Image();
        img.src = url;
        img.onload = () => {
          ctx.drawImage(
            img,
            offsetX,
            offsetY,
            elRect.width,
            elRect.height
          );
          items--;
          if(items == 0){
            // Export the canvas content
            const imgData = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = imgData;
            downloadLink.download = "screenshot.png";
            downloadLink.click();
          }
        };
      }
      else{
        //items--;
      }
      /**/

      /*
      const offsetX = elRect.left - rect.left;
      const offsetY = elRect.top - rect.top;

      // Draw the rectangle background
      ctx.fillStyle = el.style.backgroundColor || "#fff";
      ctx.fillRect(offsetX, offsetY, elRect.width, elRect.height);

      // If the rectangle has an image, process it
      const bgImage = el.style.backgroundImage;
      if (bgImage && bgImage !== "none") {
        const url = bgImage.slice(5, -2); // Extract the image URL
        const img = new Image();
        img.src = url;

        img.onload = () => {
          const imgWidth = img.width;
          const imgHeight = img.height;

          if (imgWidth < elRect.width || imgHeight < elRect.height) {
            // Tile the image if it's smaller than the rectangle
            for (let x = 0; x < elRect.width; x += imgWidth) {
              for (let y = 0; y < elRect.height; y += imgHeight) {
                ctx.drawImage(
                  img,
                  offsetX + x,
                  offsetY + y,
                  Math.min(imgWidth, elRect.width - x),
                  Math.min(imgHeight, elRect.height - y)
                );
              }
            }
          } else {
            // Crop the image if it's larger than the rectangle
            ctx.drawImage(
              img,
              0, // Start cropping at (0,0)
              0,
              elRect.width, // Crop width
              elRect.height, // Crop height
              offsetX,
              offsetY,
              elRect.width,
              elRect.height
            );
          }

          items--;
          if(items == 0){
            // Export the canvas content
            const imgData = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = imgData;
            downloadLink.download = "screenshot.png";
            downloadLink.click();
          }

    }}
    else{
      //items--;
    }
    */
  }
  });
};

/* Add Screenshot Button to Sidebar */
document.getElementById("sidebar").appendChild(screenshotButton);
