var colors = [];

// Fetch colors from JSON file
fetch('colors.json')
  .then(response => response.json())
  .then(data => {
    colors = data.colors;
    renderGallery(data.colors)

  })
  .catch(error => console.error('Error loading JSON:', error));

// Function to render gallery
function renderGallery() {
  if (colors !== null && colors !== undefined) {
    const gallery = document.getElementById('color-gallery');
    colors.forEach(color => {
      const tile = document.createElement('div');
      tile.className = 'color-tile';
      tile.innerHTML = `
      <div class="color-sample" style="background-color: ${color.hex};"></div>
      <div class="color-details">
        <p>${color.name}</p>
        <p>${color.hex}</p>
        <input type="checkbox" class="color-checkbox" data-name="${color.name}" data-hex="${color.hex}">
      </div>
    `;
      gallery.appendChild(tile);
    });

    document.getElementById('download-all').addEventListener('click', () => downloadAll());
    document.getElementById('download-selected').addEventListener('click', downloadSelected);
  }
}

// Function to sort the colors alphabetically by name (lofts and bottom cupboards)
function sortColors() {
  if (colors !== null && colors !== undefined) {
    colors.sort((a, b) => a.name.localeCompare(b.name)); // Sort by loft color name
    console.log(JSON.stringify(colors));
    // Re-render the color gallery
    renderGallery();
  }
}

// Function to create and download color image
function createColorImage(color) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color.hex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${color.name}_${color.hex.replace('#', '')}.png`;
  link.click();
}

// Function to download all colors in batches of 10 with delay
function downloadAll() {
  if (colors !== null && colors !== undefined) {
    let currentBatchIndex = 0;
    const batchSize = 10;
    const delay = 3000;  // 500ms delay between batches

    function downloadBatch() {
      const batch = colors.slice(currentBatchIndex, currentBatchIndex + batchSize);
      batch.forEach(color => createColorImage(color));

      currentBatchIndex += batchSize;
      if (currentBatchIndex < colors.length) {
        setTimeout(downloadBatch, delay);  // Add a delay before downloading the next batch
      }
    }

    downloadBatch();  // Start downloading the first batch
  }
}

// Function to download selected colors
function downloadSelected() {
  const checkboxes = document.querySelectorAll('.color-checkbox:checked');
  const selectedColors = [];

  checkboxes.forEach(checkbox => {
    const color = {
      name: checkbox.dataset.name,
      hex: checkbox.dataset.hex
    };
    selectedColors.push(color);
  });

  downloadAll(selectedColors);  // Download selected colors in batches
}