import { decomposeTime } from "./modules/timeConvertor.js";
import { displayMessages , clearText } from "./modules/dialogManager.js";

const response = await fetch('./data/messages.json');
const messages = await response.json();

const countdown = document.getElementById("countdown");
const artistImage = document.getElementById("artist-img");
const horn = new Audio("./assets/horn.mp3");

const birthday = new Date(2025, 5, 19);

const timer = setInterval(function() {
  const now = new Date();
  const distance = birthday.getTime() - now.getTime();

  if (distance <= 0) {
    clearInterval(timer);

    countdown.innerHTML = "La Mulți Ani! 🎉";
    horn.play();
    artistImage.classList.add("show");

    setTimeout(() => displayMessages(messages, function() {
      artistImage.classList.remove("show");
      clearText();
    }), 2500);

    return
  }

  const [seconds, minutes, hours] = decomposeTime(distance);
  
  countdown.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
})