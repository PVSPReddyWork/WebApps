let jsonData = [];

// Load Data from Local Storage or Server
function loadData() {
    const storedData = localStorage.getItem("jsonData");
    if (storedData) {
        jsonData = JSON.parse(storedData);
    } else {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                localStorage.setItem("jsonData", JSON.stringify(jsonData));
            })
            .catch(error => console.error("Error loading JSON file:", error));
    }
}

// Initialize Data on Page Load
loadData();

// Handle Custom JSON File Upload
document.getElementById("jsonUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const uploadedData = JSON.parse(e.target.result);
            jsonData = uploadedData;
            localStorage.setItem("jsonData", JSON.stringify(jsonData));
            alert("JSON file loaded successfully!");
        } catch (error) {
            alert("Error reading JSON file.");
        }
    };
    reader.readAsText(file);
});

// Open Popup
document.getElementById("addButton").addEventListener("click", function () {
    document.getElementById("categorySelect").innerHTML = jsonData.map(cat => `<option value="${cat.category}">${cat.category}</option>`).join("") + `<option value="others">Others</option>`;
    document.getElementById("addPopup").style.display = "flex";
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

// Close Popup
document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("addPopup").style.display = "none";
});

// Show New Category Input
document.getElementById("categorySelect").addEventListener("change", function () {
    document.getElementById("newCategorySection").style.display = this.value === "others" ? "block" : "none";
});

// Submit New Items
document.getElementById("submitNewItem").addEventListener("click", function () {
    const selectedCategory = document.getElementById("categorySelect").value;
    let categoryName = selectedCategory === "others" ? document.getElementById("newCategory").value.trim() : selectedCategory;
    let items = document.getElementById("newItems").value.split(",").map(item => item.trim()).filter(item => item);

    if (!categoryName || items.length === 0) {
        alert("Please enter valid data.");
        return;
    }

    let category = jsonData.find(cat => cat.category === categoryName);
    if (!category) {
        category = { category: categoryName, Items: [] };
        jsonData.push(category);
    }
    category.Items.push(...items);

    localStorage.setItem("jsonData", JSON.stringify(jsonData));
    alert("Items added successfully!");
});

// Backup JSON to File
document.getElementById("backupData").addEventListener("click", function () {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "backup.json";
    a.click();
});
