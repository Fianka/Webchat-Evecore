function sendMessage() {
    let input = document.getElementById("userInput");
    let chatBody = document.getElementById("chatBody");

    if (input.value.trim() === "") return;

    let bubble = document.createElement("div");
    bubble.className = "user-msg bubble user";
    bubble.innerText = input.value;
    chatBody.appendChild(bubble);

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Dropdown toggle
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.getElementById("dropdownMenu").classList.toggle("show");
});

// Restart chat
function restartChat() {
    document.getElementById("chatBody").innerHTML = `
        <div class="bot-msg bubble">
            Hello! 👋 Would you like to take a closer look at our services?
        </div>
    `;
}

// End chat
function endChat() {
    document.getElementById("chatBody").innerHTML = `
        <div class="bot-msg bubble">
            Chat ended. Thank you! 😊
        </div>
    `;
}
