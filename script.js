
/* =================================
   LAPTOP TV - JAVASCRIPT
================================= */


/* =================================
   CLOCK AND DATE
================================= */

const clock = document.getElementById("clock");
const date = document.getElementById("date");

function updateClock() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    date.textContent = now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
}

updateClock();

setInterval(updateClock, 1000);


/* =================================
   APPLICATION LAUNCHER
================================= */

const apps = document.querySelectorAll(".app-card");

apps.forEach(app => {

    app.addEventListener("click", () => {

        const url = app.dataset.url;

        window.open(url, "_blank");

    });

});


/* =================================
   FULLSCREEN MODE
================================= */

const fullscreenBtn = document.getElementById("fullscreen-btn");

fullscreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

});


/* =================================
   KEYBOARD NAVIGATION
================================= */

let selectedApp = 0;

function selectApp(index) {

    selectedApp = Math.max(
        0,
        Math.min(index, apps.length - 1)
    );

    apps[selectedApp].focus();

}


document.addEventListener("keydown", event => {

    // Don't interfere with browser shortcuts.
    if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
    ) {
        return;
    }

    // Ignore navigation while typing.
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }

    if (event.key === "ArrowRight") {

        event.preventDefault();
        selectApp(selectedApp + 1);

    }

    if (event.key === "ArrowLeft") {

        event.preventDefault();
        selectApp(selectedApp - 1);

    }

    if (event.key === "Enter") {

        if (document.activeElement.classList.contains("app-card")) {

            document.activeElement.click();

        }

    }

});


/* =================================
   STARTUP
================================= */

selectApp(0);
