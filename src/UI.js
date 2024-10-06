import Project from "./projects";
import Task from "./tasks";
import { allTasks } from "./allTasks";


const UI = (function(){
    
    const allProjects = [];
    
    const loadPage = () => {
        initEventListeners();
    }
    
    const initEventListeners = () => {
        const dialog = document.querySelector("#dialog");
        const jsCloseButton = document.querySelector("#js-close");
        const homeSection = document.querySelector(".homeSection");
        const confirmNewProject = document.querySelector("#add");
        const projectName = document.querySelector("#projectName");
        const taskName = document.querySelector("#taskName");
        const dueDate = document.querySelector("#dueDate");
        const content = document.querySelector(".content");
        const projectSection = document.querySelector(".projectSection");
        const secondDialog = document.querySelector("#second-dialog");
        const addTaskBtn = document.querySelector("#addTaskBtn");
        const closeTaskModalBtn = document.querySelector("#closeTaskModalBtn");
        const currentIndex = (() => {
            let index = 0;
    
            const get = () => {
                return index;
            }
    
            const set = (newIndex) => {
                index = newIndex;
            }
    
            return{
                get,
                set
            }
        })();



        confirmNewProject.addEventListener("click", (e) =>{
            e.preventDefault();
            
            const newCreatedProject = new Project(projectName.value);
            
            allProjects.push(newCreatedProject);
            
            projectName.value = "";
            
            emptyProjectSection();
            
            renderProjectSection();
            
            dialog.close();
        })

        addTaskBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const newCreatedTask = new Task(taskName.value, dueDate.value);

            allTasks.pushTask(newCreatedTask);
            allProjects[currentIndex.get()].addTask(newCreatedTask);

            taskName.value = "";
            dueDate.value = "";

            emptyContentSection();

            renderContentSection();

            secondDialog.close();
        })

        jsCloseButton.addEventListener("click", (e) => {
            e.preventDefault();
            projectName.value = "";
            dialog.close();
        })

        
        
        const emptyContentSection = () => {
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
        
        homeSection.addEventListener("click", (e) => {
            handleHomeSection(e);
        })
        
        const renderContentSection = () => {
            const project = allProjects[currentIndex.get()];

            const projectTitle = document.createElement("h2");
            projectTitle.textContent = project.getName();
            projectTitle.classList.add("contentTitle");
            
            const projectTasks = project.getTasks();
            
            content.appendChild(projectTitle);

            for(let i = 0; i < projectTasks.length; i++) {
                const  card = document.createElement("div");
                card.classList.add("card");
                content.appendChild(card);

                let name = projectTasks[i].getName();   
                console.log(name);
            }
    
            const addTasksButton = document.createElement("button");
            addTasksButton.textContent = "+ New Task";
            addTasksButton.classList.add("addTasksButton");
            
            content.appendChild(addTasksButton);

            addTasksButton.addEventListener("click", ()=> {
                secondDialog.showModal();
            })
            
            
        }

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
                    currentIndex.set(i);
                    emptyContentSection();
                    renderContentSection();
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