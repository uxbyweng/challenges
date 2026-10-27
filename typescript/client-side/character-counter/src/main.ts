// src/main.ts

// narrowing elements
const form = document.getElementById("message-box");
const textarea = document.getElementById("message");
const p = document.getElementById("char-count");
const button = document.getElementById("send-button");

if (!(form instanceof HTMLFormElement)) {
    throw new Error("Form element #message-box not found");
}
if (!(textarea instanceof HTMLTextAreaElement)) {
    throw new Error("Textarea element #message not found");
}
if (!(p instanceof HTMLParagraphElement)) {
    throw new Error("P element #char-count not found");
}
if (!(button instanceof HTMLButtonElement)) {
    throw new Error("Button element #send-button not found");
}

p.textContent = "0 / 140";
// Write the handler as a separate function handleInput(event: InputEvent): void and register it for the input event

const handleInput = (event: InputEvent): void => {
    if (!(event.target instanceof HTMLTextAreaElement)) {
        throw new Error("No Message found");
    } else {
        if (event.target.value.length <= 140) {
            p.textContent = event.target.value.length.toString();
            p.textContent += " / 140";
            p.style.color = "black";
        } else {
            p.textContent = event.target.value.length.toString();
            p.textContent += " / 140";
            button.disabled = true;
            p.style.color = "red";
        }
        console.log(event.target.value);
        console.log(event.target.value.length);
        console.log(p.textContent);
    }
};

textarea.addEventListener("input", handleInput);
