window.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = parseInt(urlParams.get("id"));
  if (isNaN(projectId)) return; //the above line will create a unique url for the corresponding project

  try {
    const response = await fetch("./projects.json");
    const allProjects = await response.json();
    const project = allProjects.find((p) => p.id === projectId);
    if (!project) return;

    //========================inject key text
    document.getElementById("projectTitle").innerHTML = project.Title;
    document.getElementById("projectBrief").innerText = project.Brief;
    document.getElementById("Image0").src = project.Image0;
    const overviewText = project.Overview.join(" ");
    document.getElementById("overview").innerHTML = overviewText;
    const hiwData = project.HIW;
    const hiwWrapper = document.getElementById("hiw-wrapper");
    document.getElementById("codeImage").src = project.CodeSnippet[0].image;
    document.getElementById("githubLink").href = project.CodeSnippet[0].link;
    document.getElementById("ytIframe").src = project.Video;
    const problemsAndSolutions = project.PandS; // grabs JSON array
    const problemsList = document.querySelector("#lessonsL ul");
    const solutionsList = document.querySelector("#problemsS ul");
    // 4. Loop through the data and inject it
    problemsAndSolutions.forEach((item) => {
      // Create list items for the problems
      const probLi = document.createElement("li");
      probLi.textContent = item.Problem;
      problemsList.appendChild(probLi);

      // Create list items for the solutions
      const solLi = document.createElement("li");
      solLi.textContent = item.Solution;
      solutionsList.appendChild(solLi);
    });

    //carousel data
    const carouselData = project.ImageGallery;
    //Carousel elements
    const carouselContainer = document.querySelector(".image-gallery-section");
    const carouselImg = document.getElementById("carouselImage");
    const carouselTitle = document.getElementById("carouselTitle");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    // Lightbox Elements
    const lightboxOverlay = document.getElementById("lightboxOverlay");
    const lightboxImg = document.getElementById("lightboxImage");
    const lightboxClose = document.querySelector(".lightbox-close");

    let currentIndex = 0;

    /*--function updates carousel view--*/
    function updateCarousel(index) {
      const imageData = carouselData[index];
      if (imageData) {
        carouselImg.src = imageData.image;
        carouselTitle.innerHTML = imageData.title;
      }
    }

    /* --- LOGIC: CAROUSEL NAVIGATION --- */
    function showNext() {
      currentIndex++;
      if (currentIndex >= carouselData.length) {
        currentIndex = 0;
      }
      updateCarousel(currentIndex);
    }
    function showPrev() {
      currentIndex--;
      // Loop back to end if we go below 0
      if (currentIndex < 0) {
        currentIndex = carouselData.length - 1;
      }
      updateCarousel(currentIndex);
    }

    /* --- LOGIC: EXPAND/LIGHTBOX --- */
    function openLightbox() {
      // Copy the current carousel image source to the lightbox image
      lightboxImg.src = carouselData[currentIndex].image;
      lightboxOverlay.style.display = "flex";
      // Disable main page scrolling
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightboxOverlay.style.display = "none";
      // Re-enable main page scrolling
      document.body.style.overflow = "auto";
    }

    /* --- EVENT LISTENERS --- */

    // 1. Navigation Buttons
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // 2. Click image to expand
    carouselImg.addEventListener("click", openLightbox);

    // 3. Close Lightbox (Clicking X or the dark backdrop)
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxOverlay.addEventListener("click", (e) => {
      // Only close if they clicked the overlay, not the image itself
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });

    // 4. Accessibility: Allow 'Esc' key to close lightbox
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightboxOverlay.style.display === "flex") {
        closeLightbox();
      }
    });

    /* --- INITIALIZATION --- */
    // Show the first image on page load
    initGallery();
    function initGallery() {
      // Handle edge case where array might be empty
      if (carouselData.length > 0) {
        updateCarousel(0);
      } else {
        carouselContainer.style.display = "none";
      }
    }

    //map over the data to generate html and insert it
    hiwWrapper.innerHTML = hiwData
      .map(
        (item) => `
      <div class ="hiw-card">
        <div class ="hiw-left">
          <span class = "hiw-number">${item.step}</span>
        </div>
        <div class = "hiw-middle">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
        <div class = "hiw-right">
        <img src = ${item.image}>
        </div>
      </div>
      `,
      )
      .join(""); //.join('') removes unwanted commas between array items

    //project info
    for (let i = 1; i < 6; i++) {
      const infoElement = document.getElementById(`info${i}`);

      if (infoElement && project.Info) {
        infoElement.innerHTML = project.Info[i - 1];
      }
    }
  } catch (error) {
    console.error("failed to load deep content:", error);
  }
});
