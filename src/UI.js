import Project from "./projects";


const UI = (function(){
    
    const allProjects = [];
    
    const loadPage = () => {
        initEventListeners();
    }
    
    const initEventListeners = () => {
        const dialog = document.querySelector("#dialog");
        const newProjectButton = document.querySelector(".newProjectButton");
        const jsCloseButton = document.querySelector("#js-close");
        const homeSection = document.querySelector(".homeSection");
        const confirmNewProject = document.querySelector("#add");
        const projectName = document.querySelector("#projectName");
        const content = document.querySelector(".content");
        const projectSection = document.querySelector(".projectSection")

        //newProjectButton.addEventListener("click", () => {
            //dialog.showModal();
        //})

        confirmNewProject.addEventListener("click", (e) =>{
            e.preventDefault();
            
            const newCreatedProject = new Project(projectName.value);
            
            allProjects.push(newCreatedProject);
            
            projectName.value = "";
            
            emptyProjectSection();
            
            renderProjectSection();
            
            dialog.close();
        })

        jsCloseButton.addEventListener("click", (e) => {
            e.preventDefault();
            projectName.value = "";
            dialog.close();
        })

        
        const renderProjectSection = () => {
            // the header
            const projectHeader = document.createElement("h2");
            projectHeader.textContent = "PROJECTS";
            projectHeader.classList.add("sidebarHeader");
            
            projectSection.appendChild(projectHeader); 
            
            // goes through every project, and renders a button for them
            for(let i = 0; i < allProjects.length; i++) {
                const ProjectButton = document.createElement('button');
                ProjectButton.classList.add("newProjectButton");
                ProjectButton.textContent = allProjects[i].name;
                
                projectSection.appendChild(ProjectButton);
                
                ProjectButton.addEventListener("click", () => {
                    
                    emptyContent();
                    renderContentSection(ProjectButton.textContent);
                })
            }
            
            const addProjectButton = document.createElement("button");
            addProjectButton.classList.add("newProjectButton");
            addProjectButton.textContent = "+ New Project";
            
            projectSection.appendChild(addProjectButton);
            
            addProjectButton.addEventListener("click", () => {
                dialog.showModal();
            })            
            
        }
        
        const emptyContent = () => {
            while(content.firstChild){
                console.log("I m getting called");
                content.removeChild(content.firstChild);
            }            
        }
        
        const emptyProjectSection = () => {
            while (projectSection.firstChild){
                projectSection.removeChild(projectSection.lastChild);
            }
        }
        const renderContentSection = (projectName) => {
            const projectTitle = document.createElement("h2");
            projectTitle.textContent = projectName;
            projectTitle.classList.add("contentTitle");
            
            content.appendChild(projectTitle);
            
        }

        homeSection.addEventListener("click", (e) => {
            handleHomeSection(e);
        })

        renderProjectSection();
        
    }

    const handleHomeSection = (e) => {
        if(e.target.id == "title1"){
            console.log("the eventlistener works");
        }        
    }

    const clearContent = () => {
        console.log(content.firstChild);
    }
    
    return {
        loadPage
    }
})();

export {UI};