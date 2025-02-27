let jsonData = [];

// Load Default JSON Data
fetch("data.json")
    .then(response => response.json())
    .then(data => jsonData = data)
    .catch(error => console.error("Error loading JSON file:", error));

// Handle Custom JSON File Upload
document.getElementById("jsonUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const uploadedData = JSON.parse(e.target.result);
            if (!Array.isArray(uploadedData) || !uploadedData.every(item => item.category && Array.isArray(item.Items))) {
                alert("Invalid JSON format. Please upload a valid file.");
                return;
            }
            jsonData = uploadedData;
            alert("JSON file loaded successfully!");
        } catch (error) {
            alert("Error reading JSON file. Please check the file format.");
        }
    };
    reader.readAsText(file);
});

// Process User Input and Match with JSON Data
document.getElementById("processButton").addEventListener("click", function () {
    const inputText = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");

    if (!inputText.trim()) {
        alert("Please enter some items to process.");
        return;
    }

    // Convert input into array, trim spaces and ignore case
    const userItems = inputText.split(/[\n,]+/).map(item => item.trim().toLowerCase()).filter(item => item !== "");

    // Group items by category
    let categorizedItems = {};
    userItems.forEach(userItem => {
        jsonData.forEach(categoryObj => {
            categoryObj.Items.forEach(jsonItem => {
                if (jsonItem.toLowerCase().replace(/\s+/g, "") === userItem.replace(/\s+/g, "")) { // ✅ Ignore case & spaces
                    if (!categorizedItems[categoryObj.category]) {
                        categorizedItems[categoryObj.category] = [];
                    }
                    categorizedItems[categoryObj.category].push(jsonItem);
                }
            });
        });
    });

    // Format Output
    let output = "";
    for (let category in categorizedItems) {
        output += `${category}\n----------\n${categorizedItems[category].join(",\n")}\n\n`;
    }

    outputText.textContent = output || "No matching items found.";
});

// Copy Output to Clipboard
document.getElementById("copyButton").addEventListener("click", function () {
    const outputText = document.getElementById("outputText");
    
    if (!outputText.textContent.trim()) {
        alert("No data to copy.");
        return;
    }

    navigator.clipboard.writeText(outputText.textContent)
        .then(() => alert("Copied to clipboard!"))
        .catch(err => console.error("Error copying text:", err));
});
