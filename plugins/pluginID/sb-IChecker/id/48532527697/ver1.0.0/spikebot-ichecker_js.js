const popupic = document.querySelector(".popup-ichecker"),
wifiIcon = document.querySelector(".iconIC i"),
popupTitleIC = document.querySelector(".popup-ichecker .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 5;

const checkConnection = async () => {
    try {
        // Try to fetch random data from the API. If the status code is between 
        // 200 and 300, the network connection is considered online 
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false; // If there is an error, the connection is considered offline
    }
    timer = 5;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if(status) { // If the status is true (online), update icon, title, and description accordingly
        wifiIcon.className = "uil uil-wifi";
        popupTitleIC.innerText = "Internet bol úspešne pripojený";
        popupDesc.innerHTML = "Vaše zariadenie je teraz úspešne pripojené k internetu.";
        popupic.classList.add("online");
        return setTimeout(() => popupic.classList.remove("show"), 3000);
    }
    // If the status is false (offline), update the icon, title, and description accordingly
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitleIC.innerText = "Odpojené od internetu";
    popupDesc.innerHTML = "Vaša sieť je nedostupná. Pokúsime sa vás znova pripojiť o <b>5</b> sekúnd.";
    popupic.className = "popup-ichecker show";

    intervalId = setInterval(() => { // Set an interval to decrease the timer by 1 every second
        timer--;
        if(timer === 0) checkConnection(); // If the timer reaches 0, check the connection again
        popupic.querySelector(".desc b").innerText = timer;
    }, 1000);
}

// Only if isOnline is true, check the connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);
