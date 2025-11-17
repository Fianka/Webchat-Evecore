// Webhook Make.com
const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/uwj61sx4nlu4lya15d7q7i2xqr07swin";

// KIRIM PESAN USER
function sendMessage() {
    let input = document.getElementById("userInput");
    let chatBody = document.getElementById("chatBody");

    let text = input.value.trim();
    if (text === "") return;

    // Tampilkan pesan user
    appendBubble(text, "user");

    // Clear input
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Kirim ke Make
    sendToMake(text);
}

// TAMBAHKAN BUBBLE (USER & BOT)
function appendBubble(message, sender = "bot") {
    let chatBody = document.getElementById("chatBody");
    let bubble = document.createElement("div");

    bubble.className = sender === "user" ? "user-msg bubble user" : "bot-msg bubble";
    bubble.innerText = message;

    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// TYPING INDICATOR
function showTyping(active) {
    let chatBody = document.getElementById("chatBody");

    if (active) {
        let typing = document.createElement("div");
        typing.id = "typingBubble";
        typing.className = "bot-msg bubble";
        typing.innerText = "EVECORE AI is typing...";
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;
    } else {
        let typingBubble = document.getElementById("typingBubble");
        if (typingBubble) typingBubble.remove();
    }
}

// KIRIM DATA KE MAKE.COM
async function sendToMake(message) {
    showTyping(true);

    try {
        let response = await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_message: message })
        });

        let data = await response.json();

        showTyping(false);

        if (data.reply) {
            appendBubble(data.reply, "bot");
        } else {
            appendBubble("⚠️ No response from AI", "bot");
        }

    } catch (error) {
        showTyping(false);
        appendBubble("❌ Error connecting to server", "bot");
        console.error("MAKE ERROR:", error);
    }
}

// DROP DOWN MENU
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.getElementById("dropdownMenu").classList.toggle("show");
});

// RESTART CHAT
function restartChat() {
    document.getElementById("chatBody").innerHTML = "";
}

// END CHAT
function endChat() {
    document.getElementById("chatBody").innerHTML = `
        <div class="bot-msg bubble">
            Chat ended. Thank you! 😊
        </div>
    `;
}
