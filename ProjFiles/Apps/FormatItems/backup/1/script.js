let jsonData = [];

// Load JSON Data from Local File
fetch("data.json")
    .then(response => response.json())
    .then(data => jsonData = data)
    .catch(error => console.error("Error loading JSON file:", error));

document.getElementById("processButton").addEventListener("click", function () {
    const inputText = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");

    if (!inputText.trim()) {
        alert("Please enter some items to process.");
        return;
    }

    // Convert input into array (split by newline or comma)
    const userItems = inputText.split(/[\n,]+/).map(item => item.trim()).filter(item => item !== "");

    // Group items by category
    let categorizedItems = {};
    userItems.forEach(userItem => {
        let matchedItem = jsonData.find(dataItem => dataItem.name.toLowerCase() === userItem.toLowerCase());
        if (matchedItem) {
            if (!categorizedItems[matchedItem.category]) {
                categorizedItems[matchedItem.category] = [];
            }
            categorizedItems[matchedItem.category].push(matchedItem.name);
        }
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
