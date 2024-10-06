
export default function generateSidebar() {
    const sidebar = document.querySelector(".sidebar");

    const homeSection = document.createElement("div");
    homeSection.classList.add("homeSection");
    
    const homeHeader = document.createElement("h2");
    homeHeader.classList.add("sidebarHeader");
    homeHeader.textContent = "HOME";

    homeSection.appendChild(homeHeader);
    
    const title1 = document.createElement("div");
    const title2 = document.createElement("div");
    const title3 = document.createElement("div");
    const title4 = document.createElement("div");
    
    title1.classList.add("title");
    title2.classList.add("title");
    title3.classList.add("title");
    title4.classList.add("title");
    
    title1.setAttribute("id", "title1");
    title2.setAttribute("id", "title2");
    title3.setAttribute("id", "title3");
    title4.setAttribute("id", "title4");
    
    
    title1.textContent = "All tasks";
    title2.textContent = "Today";
    title3.textContent = "Next 7 days";
    title4.textContent = "Important";
    
    homeSection.appendChild(title1);
    homeSection.appendChild(title2);
    homeSection.appendChild(title3);
    homeSection.appendChild(title4);
    
    sidebar.appendChild(homeSection);
    //projects section
    
    const projectSection = document.createElement("div");
    projectSection.classList.add("projectSection");     

    //const projectHeader = document.createElement("h2");
    //projectHeader.textContent = "PROJECTS";
    //projectHeader.classList.add("sidebarHeader");

    //projectSection.appendChild(projectHeader);
    
    sidebar.appendChild(projectSection);

    //const newProjectButton = document.createElement("button");
    //newProjectButton.classList.add("newProjectButton");
    //newProjectButton.textContent = "+ New Project";

  //  projectSection.appendChild(newProjectButton);
}
