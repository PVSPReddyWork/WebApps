/* Take Screenshot of Drawing Area */
const screenshotButton = document.createElement("button");
screenshotButton.textContent = "Take Screenshot";

screenshotButton.onclick = async () => {
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

/* Add Screenshot Button to Sidebar */
document.getElementById("sidebar").appendChild(screenshotButton);













/* Create Selection Tool */
const selectionTool = document.createElement("div");
selectionTool.id = "selectionTool";
document.body.appendChild(selectionTool);

let isSelecting = false;
let startX = 0;
let startY = 0;

/* Mouse Events for Selection Tool */
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

/* Take Screenshot of Selected Region */
const screenshotButton = document.createElement("button");
screenshotButton.textContent = "Take Screenshot of Selection";

screenshotButton.onclick = async () => {
  const rect = selectionTool.getBoundingClientRect();
  selectionTool.style.display = "none"; // Hide the selection tool
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
};

/* Add Screenshot Button to Sidebar */
document.getElementById("sidebar").appendChild(screenshotButton);









screenshotButton.onclick = () => {
  const rect = selectionTool.getBoundingClientRect();
  selectionTool.style.display = "none"; // Hide selection tool

  // Create a Canvas
  const canvas = document.createElement("canvas");
  canvas.width = rect.width;
  canvas.height = rect.height;
  const ctx = canvas.getContext("2d");

  // Draw the rectangles onto the canvas
  const elements = drawingArea.querySelectorAll(".rectangle");
  elements.forEach((el) => {
    const elRect = el.getBoundingClientRect();

    // Check if the element is within the selected region
    if (
      elRect.right > rect.left &&
      elRect.left < rect.right &&
      elRect.bottom > rect.top &&
      elRect.top < rect.bottom
    ) {
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

          // Export the canvas content
          const imgData = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = imgData;
          downloadLink.download = "screenshot.png";
          downloadLink.click();
        };
      }
    }
  });
};


