window.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get("id"));
    if (isNaN(projectId)) return; //the above line will create a unique url for the corresponding project

    try {
      const response = await fetch("./projects.json");
      const allProjects = await response.json();
      const project = allProjects.find((p) => p.id === projectId);
      if (!project) return;

      //inject key text
        document.getElementById("projectTitle").innerHTML = project.Title;
        document.getElementById("projectOverview").innerHTML = project.Overview;
    }

    
    
    
    
    
    
    
    
    catch (error) {
        console.error("failed to load deep content:", error);
    }
});