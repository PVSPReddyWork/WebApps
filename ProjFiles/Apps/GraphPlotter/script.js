document.getElementById('jsonFile').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (!file) return; // If no file is selected, do nothing

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const jsonData = JSON.parse(e.target.result);

            // Check if JSON has required keys
            if (!jsonData.xValues || !jsonData.yValues || isNaN(jsonData.yMin) || 
                isNaN(jsonData.yMax) || isNaN(jsonData.yInterval) || !jsonData.graphType) {
                alert("Invalid JSON structure. Please upload a valid file.");
                return;
            }

            // Fill the input fields with JSON data
            document.getElementById('xValues').value = jsonData.xValues.join(", ");
            document.getElementById('yValues').value = jsonData.yValues.join(", ");
            document.getElementById('yMin').value = jsonData.yMin;
            document.getElementById('yMax').value = jsonData.yMax;
            document.getElementById('yInterval').value = jsonData.yInterval;
            document.getElementById('graphType').value = jsonData.graphType;

            alert("Data loaded successfully!");
        } catch (error) {
            alert("Error reading JSON file. Please check the file format.");
        }
    };

    reader.readAsText(file); // Read the file as text
});


document.getElementById('startButton').addEventListener('click', function () {
    document.getElementById('graphModal').style.display = 'flex';
    plotGraph();
});

document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('graphModal').style.display = 'none';
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }
});

function plotGraph() {
    const xValues = document.getElementById('xValues').value.split(',').map(x => x.trim());
    const yValues = document.getElementById('yValues').value.split(',').map(Number);
    const yMin = Number(document.getElementById('yMin').value);
    const yMax = Number(document.getElementById('yMax').value);
    const yInterval = Number(document.getElementById('yInterval').value); // Get interval input
    let graphType = document.getElementById('graphType').value;

    if (xValues.length !== yValues.length || isNaN(yMin) || isNaN(yMax) || isNaN(yInterval) || yInterval <= 0) {
        alert("Please enter valid values");
        return;
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    Chart.register(ChartDataLabels);

    const chartType = graphType === "step" ? "line" : graphType;

    window.myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: xValues,
            datasets: [{
                label: 'Values',
                data: yValues,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                borderWidth: 2,
                stepped: graphType === "step",
                fill: chartType !== 'bar'
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    min: yMin,
                    max: yMax,
                    beginAtZero: false,
                    ticks: {
                        stepSize: yInterval // ✅ Set interval between Y-axis values
                    }
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: {
                        weight: 'bold'
                    },
                    formatter: value => value
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

/*
function plotGraph() {
    const xValues = document.getElementById('xValues').value.split(',').map(x => x.trim());
    const yValues = document.getElementById('yValues').value.split(',').map(Number);
    const yMin = Number(document.getElementById('yMin').value);
    const yMax = Number(document.getElementById('yMax').value);
    let graphType = document.getElementById('graphType').value;

    if (xValues.length !== yValues.length || isNaN(yMin) || isNaN(yMax)) {
        alert("Please enter valid values");
        return;
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    Chart.register(ChartDataLabels);

    const chartType = graphType === "step" ? "line" : graphType;

    window.myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: xValues,
            datasets: [{
                label: 'Values',
                data: yValues,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                borderWidth: 2,
                stepped: graphType === "step",
                fill: chartType !== 'bar'
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    min: yMin,
                    max: yMax,
                    beginAtZero: false
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: {
                        weight: 'bold'
                    },
                    formatter: value => value
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}
*/