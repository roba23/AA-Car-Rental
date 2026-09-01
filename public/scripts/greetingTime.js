const greeting = document.getElementById("greeting");

const hour = new Date().getHours();

let greetingText = "";

if (hour < 12) {
    greetingText = "👋 Good Morning";
} else if (hour < 17) {
    greetingText = "☀️ Good Afternoon";
} else if (hour < 21) {
    greetingText = "🌇 Good Evening";
} else {
    greetingText = "🌙 Good Night";
}

greeting.innerHTML = `${greetingText}, <strong>${greeting.dataset.username}</strong>`;