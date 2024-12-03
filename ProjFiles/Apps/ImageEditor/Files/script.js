document.getElementById('svgUpload').addEventListener('change', handleFileUpload);
document.getElementById('applyRatio').addEventListener('click', applyRatio);
document.getElementById('downloadSVG').addEventListener('click', downloadSVG);

let originalSVG;
let modifiedSVG;

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const svgContent = e.target.result;
            document.getElementById('originalSVGContainer').innerHTML = svgContent;
            originalSVG = document.querySelector('#originalSVGContainer svg');
            modifiedSVG = originalSVG.cloneNode(true);
            document.getElementById('modifiedSVGContainer').appendChild(modifiedSVG);
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid SVG file.');
    }
}

function applyRatio() {
    const ratio = parseFloat(document.getElementById('ratioInput').value);
    if (isNaN(ratio) || ratio <= 0) {
        alert('Please enter a valid ratio.');
        return;
    }

    if (originalSVG) {
        const originalWidth = parseFloat(originalSVG.getAttribute('width'));
        const originalHeight = parseFloat(originalSVG.getAttribute('height'));

        const newWidth = originalWidth;
        const newHeight = originalWidth * ratio;

        modifiedSVG.setAttribute('width', newWidth);
        modifiedSVG.setAttribute('height', newHeight);
    }
}

function downloadSVG() {
    if (modifiedSVG) {
        const svgData = new XMLSerializer().serializeToString(modifiedSVG);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'modified_image.svg';
        downloadLink.click();
    }
}
