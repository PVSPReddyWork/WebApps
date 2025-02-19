var newWindow;
// function to open the new window tab with specified size  
function windowOpen() {
    newWindow = window.open(
        "https://www.google.com", "_blank", "width=500, height=350");
}
// function to close the window opened by window.open()   
function windowClose() {
    newWindow.close();
}
// function doSomething() {
//     alert('This pops up every 5 seconds and is annoying!');
// }

// setInterval(doSomething, timeInterval); // Time in milliseconds

//Called this function at the end of the page
function OnLoadorStartup() {
    var controlVideoBrowser = document.createElement('script');
    controlVideoBrowser.src = './ControlVideoBrowser.js';
    document.head.appendChild(controlVideoBrowser);
}

OnLoadorStartup();