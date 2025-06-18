const TIME_BETWEEN_LINES = 2500;
const DEFAUL_PAUSE = 75;
const PAUSES = {
  ["."]: 750,
  [","]: 250,
  ["?"]: 750,
  ["!"]: 750,
  [":"]: 500,
  [";"]: 500
};

const textBox = document.getElementById("text-box");
let typingThread;

export function pauseText() {
  clearTimeout(typingThread);
}

export function clearText() {
  pauseText();
  textBox.innerHTML = "";
}

export function typeText(text, onFinish, startIndex = 0, endIndex = text.length - 1) {
  const char = text.charAt(startIndex);
  const pause = PAUSES[char] || DEFAUL_PAUSE;

  pauseText();
  textBox.innerHTML += char;

  typingThread = startIndex < endIndex ?
    setTimeout(() => typeText(text, onFinish, startIndex + 1, endIndex), pause) :
    setTimeout(onFinish, pause + TIME_BETWEEN_LINES)
}

export function displayMessages(messages, onFinish, startIndex = 0, endIndex = messages.length - 1) {
  const message = messages[startIndex]
  
  clearText()
  
  typeText(message, () => startIndex < endIndex ?
    displayMessages(messages, onFinish, startIndex + 1, endIndex) :
    onFinish()
  )
}