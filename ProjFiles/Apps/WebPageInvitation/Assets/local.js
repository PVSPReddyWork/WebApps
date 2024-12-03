const localization = {
    "en-US": {
        GoodSign1: "Sreerasthu",
        GoodSign2: "Subhamastu ",
        GoodSign3: "Avignamasthu",
        greeting: "Welcome, Guest!",
        message: "We're excited to have you join us for the special event!"
    },
    "en-UK": {
        GoodSign1: "Sreerasthu",
        GoodSign2: "Subhamastu ",
        GoodSign3: "Avignamasthu",
        greeting: "Welcome, Guest!",
        message: "We're excited to have you join us for the special event!"
    },
    "de": {
        greeting: "Willkommen, Gast!",
        message: "Wir freuen uns, dass Sie an der besonderen Veranstaltung teilnehmen!"
    },
    "te": {
        GoodSign1: "శ్రీరస్తు",
        GoodSign2: "శుభమస్తు",
        GoodSign3: "అవిఘ్నమస్తు",
        greeting: "స్వాగతం, అతిథి!",
        message: "ప్రత్యేకమైన ఈ వేడుకలో మీకు కలుసుకోవడం మాకు సంతోషంగా ఉంది!"
    },
    "hi": {
        greeting: "स्वागत है, मेहमान!",
        message: "हम खुश हैं कि आप इस विशेष कार्यक्रम में हमारे साथ हैं!"
    }
};

function LoadNames(){
    // Function to get query parameter from the URL
    function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param);
            }

            // Get the names from the URL
            const namesParam = getQueryParam('names');

            // Check if the names parameter is present
            if (namesParam) {
                // Split the names by comma into an array
                const namesArray = namesParam.split(',');

                // Join the names array into a readable string
                const namesString = namesArray.join(', ');

                // Display the names with the greeting message
                document.getElementById('names').textContent = `Dear ${namesString},`;
            } else {
                // If no names are provided, use a default message
                document.getElementById('names').textContent = 'Dear Guest,';
            }

}