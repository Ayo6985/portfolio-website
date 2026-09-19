import { aboutMeInfo } from "./about-me-info.js";

window.addEventListener("DOMContentLoaded", async () => {
  const cardswrap = document.querySelector(".abm-cards-wrap");
  aboutMeInfo.forEach((aboutme) => {
    const card = document.createElement("div");
    card.classList.add("abm-cards");

    const cardLeft = document.createElement("div");
    cardLeft.classList.add("abm-card-left");

    const cardRight = document.createElement("div");
    cardRight.classList.add("abm-card-right");

    const cardImage = document.createElement("img");
    cardImage.src = aboutme.image;

    const text1 = document.createElement("h5");
    text1.innerHTML = aboutme.text1;

    const text2 = document.createElement("p");
    text2.innerHTML = aboutme.text2;

    cardswrap.append(card);
    card.append(cardLeft, cardRight);
    cardLeft.append(cardImage);
    cardRight.append(text1, text2);
  });
});
