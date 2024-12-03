
document.addEventListener("DOMContentLoaded", function () {
    const goodSign1Texts = {
        "en-us": "Blessings!",
        "en-uk": "Blessings!",
        "de": "Segen!",
        "te": "శ్రీరస్తు!",
        "hi": "आशीर्वाद!"
    }

    const goodSign2Texts = {
        "en-us": "Best Wishes!",
        "en-uk": "Best Wishes!",
        "de": "Alles Gute!",
        "te": "శుభమస్తు!!",
        "hi": "शुभकामनाएँ!!"
    }

    const goodSign3Texts = {
        "en-us": "No Obstacles!",
        "en-uk": "No Obstacles!",
        "de": "Keine Hindernisse!",
        "te": "అవిఘ్నమస్తు!!!",
        "hi": "बिना रुकावट!"
    }

    const greetingTexts1 = {

        "en-us": "By Pulagam Family",
        "en-uk": "By Pulagam Family",
        "de": "Von der Familie Pulagam",
        "te": "పులగం వారి",
        "hi": "पुलगम परिवार द्वारा"
    }

    const greetingTexts2 = {
        "en-us": "We are delighted to invite you to our house warming ceremony and special poojas.",
        "en-uk": "We are delighted to invite you to our house warming ceremony and special poojas.",
        "de": "Wir freuen uns, Sie zu unserer Einweihungszeremonie und speziellen Pujas einzuladen.",
        "te": "గృహ ప్రవేశం మరియు ప్రత్యేక పూజల ఆహ్వానం.",
        "hi": "हम आपको हमारे हाउस वॉर्मिंग समारोह और विशेष पूजा के लिए आमंत्रित करके खुशी महसूस कर रहे हैं।"
    }

    const introductionText = {
        "en-us": "We are very happy to share the good news of our new home with you. We seek your love and blessings as we begin this new chapter. We hope you will join us in this joyous occasion.",
        "en-uk": "We are very happy to share the good news of our new home with you. We seek your love and blessings as we begin this new chapter. We hope you will join us in this joyous occasion.",
        "de": "Wir freuen uns sehr, Ihnen die frohe Botschaft von unserem neuen Zuhause mitzuteilen. Wir suchen Ihre Liebe und Ihren Segen, während wir dieses neue Kapitel beginnen. Wir hoffen, dass Sie an diesem freudigen Anlass teilnehmen werden.",
        "te": "మా కొత్త ఇంటి శుభవార్తను మీతో పంచుకోవడానికి చాలా ఆనందంగా ఉంది. ఈ కొత్త అధ్యాయం ప్రారంభంలో మీ అభిమానం మరియు ఆశీస్సులను కోరుకుంటున్నాం. ఈ సంతోషకరమైన సందర్భంలో మీరు పాల్గొనాలని కోరుకుంటున్నాము.",
        "hi": "हमें आपके साथ हमारे नए घर की शुभ खबर साझा करते हुए बहुत खुशी हो रही है। इस नए अध्याय की शुरुआत में हम आपका प्यार और आशीर्वाद चाहते हैं। हम आशा करते हैं कि आप इस खुशी के मौके पर हमारे साथ जुड़ेंगे।."
    };

    const venueText = {
        "en-us": "Venue",
        "en-uk": "Venue",
        "de": "Veranstaltungsort",
        "te": "వేదిక",
        "hi": "स्थान"
    };

    const addressText = {
        "en-us": "Plot No 7, Road no: 10, Tirumala Hills, Puppalguda, Manikonda, Hyderabad, Telangana - 500075",
        "en-uk": "Plot No 7, Road no: 10, Tirumala Hills, Puppalguda, Manikonda, Hyderabad, Telangana - 500075",
        "de": "Grundstück Nr. 7, Straße Nr. 10, Tirumala Hills, Puppalguda, Manikonda, Hyderabad, Telangana - 500075",
        "te": "ప్లాట్ నం. 7, రోడ్ నం: 10, తిరుమల హిల్స్, పుప్పలగూడ, మనికొండ, హైదరాబాద్, తెలంగాణ - 500075",
        "hi": "प्लॉट नंबर 7, रोड नंबर 10, तिरुमला हिल्स, पुप्पलगुड़ा, माणिकोंडा, हैदराबाद, तेलंगाना - 500075"
    }

    const hwarmingTimeText = {
        "en-us": "Event Timing",
        "en-uk": "Event Timing",
        "de": "Veranstaltungszeit",
        "te": "సమయం",
        "hi": "समय"
    };

    const hwarmingTime = {
        "en-us": "2024 July 17 Saturday, 11:00 PM followed by Ganapathi Homam and Satyanarayana Swamy Vratham on Sunday morning",
        "en-uk": "2024 July 17 Saturday, 11:00 PM followed by Ganapathi Homam and Satyanarayana Swamy Vratham on Sunday morning",
        "de": "2024 Am 17. Juli, Samstag, 23:00 Uhr, gefolgt von Ganapathi Homam und Satyanarayana Swamy Vratham am Sonntagmorgen",
        "te": "2024 జూలై  17, శనివారం రాత్రి 11:00 గంటలకు ఆ తర్వాత ఆదివారం తెల్లవారుజామున, గణపతి హోమం మరియు శ్రీ సత్యనారాయణ స్వామి వ్రతం",
        "hi": "2024 17 जुलाई, शनिवार, रात 11:00 बजे के बाद गणपति होमम और रविवार सुबह सत्या नारायण स्वामी व्रत"
    }

    const lunchTimingsText = {
        "en-us": "Lunch",
        "en-uk": "Lunch",
        "de": "Mittagessen",
        "te": "విందు",
        "hi": "भोजन"
    }

    const lunchTimings = {
        "en-us": "2024 July 18 Sunday, 12:00 PM at the venue",
        "en-uk": "2024 July 18 Sunday, 12:00 PM at the venue",
        "de": "2024 Am 18. Juli, Sonntag, um 12:00 Uhr mittags am Veranstaltungsort",
        "te": "2024 జూలై 18, ఆదివారం మధ్యాహ్నం 12:00 గంటలకు వేదిక వద్ద",
        "hi": "2024 18 जुलाई, रविवार को दोपहर 12:00 बजे स्थल पर"
    }

    const hostsListTexts = {
        "en-us": "Hosts",
        "en-uk": "Hosts",
        "de": "Gastgeber",//"Eingeladene",
        "te": "అహ్వానించువారు",
        "hi": "मेहमाननवाज़",//"निमंत्रित व्यक्ति"
    };
    const hostsList = {
        "en-us": [
            "Venkata Reddy Pulagam",
            "Vijaya Lakshmi Pulagam",
            "Venkata Siva Prasad Reddy Pulagam",
            "Joshna Pulagam",
            "Laasyavi Reddy Pulagam"
        ],
        "en-uk": [
            "Venkata Reddy Pulagam",
            "Vijaya Lakshmi Pulagam",
            "Venkata Siva Prasad Reddy Pulagam",
            "Joshna Pulagam",
            "Laasyavi Reddy Pulagam"
        ],
        "de": [
            "Venkata Reddy Pulagam",
            "Vijaya Lakshmi Pulagam",
            "Venkata Siva Prasad Reddy Pulagam",
            "Joshna Pulagam",
            "Laasyavi Reddy Pulagam"
        ],
        "te": [
            "వెంకట రెడ్డి పులగం",
            "విజయ లక్ష్మి పులగం",
            "వెంకట శివ ప్రసాద్ రెడ్డి పులగం",
            "జ్యోత్స్న పులగం",
            "లాస్యవి రెడ్డి పులగం"
        ],
        "hi": [
            "वेंकट रेड्डी पुलगम",
            "विजया लक्ष्मी पुलगम",
            "वेंकट शिव प्रसाद रेड्डी पुलगम",
            "ज्योत्स्ना पुलगम",
            "लास्यवि रेड्डी पुलगम"
        ]
    }


    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const closeBtn = document.getElementById('close-btn');
    const languageSelect = document.getElementById('language-select');
    //const themeToggle = document.getElementById('theme-toggle');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function loadPreferences() {
        const savedLanguage = localStorage.getItem('language') || 'en-us';
        const savedTheme = localStorage.getItem('theme') || 'light';

        //languageSelect.value = savedLanguage;
        //document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        initializeLanguage();
        //applyLanguage(savedLanguage);
    }

    function savePreferences() {
        localStorage.setItem('language', languageSelect.value);
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    function applyLanguage(language) {
        const namesParam = getQueryParam('names');
        const namesArray = namesParam ? namesParam.split(',') : ['Guest'];
        const namesString = namesArray.join(', ');
        //document.getElementById('names').textContent = `Dear ${namesString},`;

        document.getElementById('good_sign_1').textContent = goodSign1Texts[language];
        document.getElementById('good_sign_2').textContent = goodSign2Texts[language];
        document.getElementById('good_sign_3').textContent = goodSign3Texts[language];
        document.getElementById('greeting_1').textContent = greetingTexts1[language];
        document.getElementById('greeting_2').textContent = greetingTexts2[language];
        //document.getElementById('salutation').textContent = namesString + SalutaionTexts2[language];
        document.getElementById('introduction').textContent = introductionText[language];
        document.getElementById('venue').textContent = venueText[language];
        document.getElementById('venue_address').textContent = addressText[language];
        document.getElementById('house_warming_timings_text').textContent = hwarmingTimeText[language];
        document.getElementById('house_warming_timings').textContent = hwarmingTime[language];
        document.getElementById('lunch_timings_text').textContent = lunchTimingsText[language];
        document.getElementById('lunch_timings').textContent = lunchTimings[language];
        document.getElementById('p_hostlist_text').textContent = hostsListTexts[language];
        let namesList = hostsList[language];
        document.getElementById('p_hostlist').textContent = `${namesList[0]}, ${namesList[1]}, ${namesList[2]}, ${namesList[3]}, ${namesList[4]}`;
        // document.getElementById('message').textContent = messageTexts[language];


    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        savePreferences();
    }

    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        settingsPanel.classList.remove('open');
    });

// Function to set the language based on the query parameter or default
function initializeLanguage() {
    const defaultLanguage = 'en-us'; // Set the default language
    const queryLanguage = getQueryParam('lan');
    const savedLanguage = localStorage.getItem('language');
    
    // Determine the language to use
    const language =  queryLanguage || savedLanguage || defaultLanguage;
    
    // Save the language in localStorage
    localStorage.setItem('language', language);
    
    // Set the language dropdown value
    languageSelect.value = language;
    
    // Apply the language to the page content
    applyLanguage(language);
}

    // Function to update URL with the selected language
function updateUrlParameter(language) {
    const url = new URL(window.location);
    url.searchParams.set('lan', language);
    window.history.pushState({}, '', url);
}

    languageSelect.addEventListener('change', (event) => {
        applyLanguage(languageSelect.value);
        savePreferences();
        updateUrlParameter(languageSelect.value);
/*
        const selectedLanguage = event.target.value;
    applyLanguage(selectedLanguage);
    updateUrlParameter(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
    */
    });

    //themeToggle.addEventListener('click', toggleTheme);

    loadPreferences();

    // Service worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(function (error) {
                console.log('Service Worker registration failed:', error);
            });
    }
});


    /*
    
        "పులగం వారి గ్రుహప్రవేశ ఆహ్వనం",
    "గృహ ప్రవేశం మరియు ప్రత్యేక పూజ ఆహ్వానం"
    "శ్రీ సత్యనారయణ స్వమి వ్రతం"
    "గణపతి హోమం"
    "శ్రీ గణపతి హోమం మరియు పూజ:
తేదీ: ఆగస్టు 17, 2024
సమయం: [సమయం చేర్చండి]

తేదీ: శనివారం
సమయం: రాత్రి 11:00 గంటలకు ఖచ్చితంగా

ఆ తర్వాత:
గణపతి హోమం
శ్రీ సత్యనారాయణ స్వామి వ్రతం
తేదీ: ఆదివారం

శ్రీ సత్యనారాయణ స్వామి వ్రతం మరియు భోజనం:
తేదీ: ఆగస్టు 18, 2024
సమయం: [సమయం చేర్చండి]"

ప్రియమైన [కుటుంబం/మిత్రులు],

మా కొత్త ఇంటి శుభవార్తను మీతో పంచుకోవడానికి చాలా ఆనందంగా ఉంది. ఈ కొత్త అధ్యాయం ప్రారంభంలో మీ అభిమానం మరియు ఆశీస్సులను కోరుకుంటున్నాం. ఈ సంతోషకరమైన సందర్భంలో మీరు పాల్గొంటే, అది మా జీవితంలో ఒక ప్రత్యేక ఘట్టం అవుతుంది.

"
గృహ ప్రవేశం ఉత్సవం:
తేదీ: ఆగస్టు 17, 2024
సమయం: [సమయం చేర్చండి]
చిరునామా: ప్లాట్ నంబర్ 7,8 సర్వే నంబర్ 87 మరియు 119, నెక్నంపూర్ రోడ్డు, పుప్పల్ గూడ, పుప్పలగూడ, మనికొండ, మున్సిపాలిటీ, గండిపేట్, హైదరాబాద్, తెలంగాణ 500075
"

    */
