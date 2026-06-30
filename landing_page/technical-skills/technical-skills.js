import { technicalSkillsInfo } from "./technical-skills-info.js";
window.addEventListener("DOMContentLoaded", async () => {
  const skillsWrapper = document.getElementById("techS-wrapper");
  technicalSkillsInfo.forEach((skill) => {
    const skillCard = document.createElement("div");
    skillCard.classList.add("skill-card");

    const skillCardTop = document.createElement("div");
    skillCardTop.classList.add("skill-cardtop");

    const skillCardBtm = document.createElement("div");
    skillCardBtm.classList.add("skill-cardbtm");

    const skillIcon = document.createElement("img");
    skillIcon.src = skill.image;
    skillIcon.classList.add("skill-icon");

    const skillName = document.createElement("h5");
    skillName.innerHTML = skill.name;
    skillName.classList.add("skill-name");

    skillsWrapper.append(skillCard);
    skillCard.append(skillCardTop, skillCardBtm);
    skillCardTop.appendChild(skillIcon);
    skillCardBtm.appendChild(skillName);
  });
});
