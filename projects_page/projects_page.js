import { ProjectsInfo } from "./projects_info.js";

window.addEventListener("DOMContentLoaded", async () => {

  //-----------------Global Variables---------------------------
  const ProjectsWrapper = document.querySelector(".project-cards-wrapper");
  ProjectsInfo.forEach((Project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectCardTop = document.createElement("div");
    projectCardTop.classList.add("project-card-top");

    const projectCardBtm = document.createElement("div");
    projectCardBtm.classList.add("project-card-btm");

    const projectImage = document.createElement("img");
    projectImage.classList.add("featured-project-image");
    projectImage.src = Project.Image;

    const projectTitle = document.createElement("h3");
    projectTitle.innerHTML = Project.Title;
    projectTitle.classList.add("featured-project-name");

    const projectDescp = document.createElement("p");
    projectDescp.innerHTML = Project.Description;
    projectDescp.classList.add("project-descp");

    const tagWrapper = document.createElement("div");
    tagWrapper.classList.add("tag-wrapper");

    const viewProjectWrapper = document.createElement("div");
    viewProjectWrapper.classList.add("vp-wrapper");
    const viewProject = document.createElement("a");
    viewProject.classList.add("vp-link");
    viewProject.innerHTML = "View Project";
    viewProject.href = `../projects_page/Individual_projects/project-detail.html?id=${Project.Id}`;

    ProjectsWrapper.appendChild(projectCard);
    projectCard.append(projectCardTop, projectCardBtm);
    projectCardTop.appendChild(projectImage);
    projectCardBtm.append(
      projectTitle,
      projectDescp,
      tagWrapper,
      viewProjectWrapper,
    );
    viewProjectWrapper.appendChild(viewProject);

    Project.Tags.forEach((tag) => {
      const projectTag = document.createElement("button");
      projectTag.innerHTML = tag;
      projectTag.classList.add("project-tag");
      tagWrapper.append(projectTag);
    });
  });
});