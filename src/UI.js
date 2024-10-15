import Project from "./projects";
import Task from "./tasks";
import { allTasks } from "./allTasks";

const UI = (function () {
  const allProjects = [];

  const loadPage = () => {
    initEventListeners();
  };

  const initEventListeners = () => {
    const homeSection = document.querySelector(".homeSection");
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
      };

      const set = (newIndex) => {
        console.log("test");
        index = newIndex;
      };

      return {
        get,
        set,
      };
    })();

    addTaskBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const newCreatedTask = new Task(taskName.value, dueDate.value);

      allTasks.pushTask(newCreatedTask);
      allProjects[currentIndex.get()].addTask(newCreatedTask);

      taskName.value = "";
      dueDate.value = "";

      //emptyContentSection();

      renderContentSection();

      secondDialog.close();
    });

    const submitFormFunction = (name) => {
      if (projectIsValid(name)) {
        console.log("true");
      } else {
        console.log("false");
      }

      const newCreatedProject = new Project(name);

      allProjects.push(newCreatedProject);

      emptyProjectSection();

      renderProjectSection();
    };

    const emptyContentSection = () => {
      while (content.firstChild) {
        content.removeChild(content.firstChild);
      }
    };

    const emptyProjectSection = () => {
      while (projectSection.firstChild) {
        projectSection.removeChild(projectSection.lastChild);
      }
    };

    homeSection.addEventListener("click", (e) => {
      handleHomeSection(e);
    });

    const renderContentSection = (arg = "") => {
      emptyContentSection();
      if (arg === "") {
        const project = allProjects[currentIndex.get()];

        const projectTitle = document.createElement("h2");
        projectTitle.textContent = project.getName();
        projectTitle.classList.add("contentTitle");

        content.appendChild(projectTitle);

        renderTasks();

        const addTasksButton = document.createElement("button");
        addTasksButton.textContent = "+ New Task";
        addTasksButton.classList.add("addTasksButton");

        content.appendChild(addTasksButton);

        addTasksButton.addEventListener("click", () => {
          secondDialog.showModal();
        });
      } else if (arg === "today") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2");
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "Today's tasks";

        content.appendChild(contentTitle);

        renderTasks("today");
      } else if (arg === "nextWeek") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2");
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "Next week tasks";

        content.appendChild(contentTitle);

        renderTasks("nextWeek");
      } else if (arg === "allTasks") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2");
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "All tasks";

        content.appendChild(contentTitle);

        renderTasks("allTasks");
      } else if (arg === "important") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2");
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "Important";

        content.appendChild(contentTitle);

        renderTasks("important");

      }
    };

    const renderProjectSection = () => {
      // the header
      const projectHeader = document.createElement("h2");
      projectHeader.textContent = "PROJECTS";
      projectHeader.classList.add("sidebarHeader");

      projectSection.appendChild(projectHeader);

      // goes through every project, and renders a button for them
      for (let i = 0; i < allProjects.length; i++) {

        const ProjectButton = document.createElement("button");
        ProjectButton.classList.add("newProjectButton");
        ProjectButton.textContent = allProjects[i].name;

        projectSection.appendChild(ProjectButton);

        ProjectButton.addEventListener("click", () => {
          currentIndex.set(i);
          //emptyContentSection();
          renderContentSection();
        });
      }
      //test
      const extentedDiv = document.createElement("div");
      extentedDiv.classList.add("extentedDiv");

      const addProjectButton = document.createElement("button");
      addProjectButton.classList.add("newProjectButton");
      addProjectButton.textContent = "+ New Project";

      const projectForm = document.createElement("form");
      projectForm.classList.add("projectForm");
      projectForm.setAttribute("display", "none");

      const inputProjectName = document.createElement("input");
      inputProjectName.setAttribute("id", "inputProjectName");
      inputProjectName.setAttribute("type", "text");
      inputProjectName.setAttribute("placeholder", "Project name");
      inputProjectName.style.display = "none";

      const closeForm = document.createElement("input");
      closeForm.setAttribute("type", "submit");
      closeForm.setAttribute("id", "closeForm");
      closeForm.style.display = "none";
      closeForm.value = "Close";

      const submitForm = document.createElement("input");
      submitForm.setAttribute("type", "submit");
      submitForm.setAttribute("id", "submitForm");
      submitForm.style.display = "none";
      submitForm.value = "Add";

      extentedDiv.appendChild(inputProjectName);
      extentedDiv.appendChild(submitForm);
      extentedDiv.appendChild(closeForm);
      extentedDiv.appendChild(addProjectButton);

      projectSection.appendChild(extentedDiv);

      submitForm.addEventListener("click", (e) => {
        e.preventDefault();
        if (inputProjectName.value.length < 1) {
          alert("Atleast one characther");
        } else {
          submitFormFunction(inputProjectName.value);
          inputProjectName.value = "";
          inputProjectName.style.display = "none";
          addProjectButton.style.display = "";
          closeForm.style.display = "none";
          submitForm.style.display = "none";
        }
      });

      closeForm.addEventListener("click", (e) => {
        e.preventDefault();

        inputProjectName.value = "";

        inputProjectName.style.display = "none";
        addProjectButton.style.display = "";
        closeForm.style.display = "none";
        submitForm.style.display = "none";
      });

      addProjectButton.addEventListener("click", () => {
        //dialog.showModal();
        inputProjectName.style.display = "block";
        addProjectButton.style.display = "none";
        closeForm.style.display = "inline-block";
        submitForm.style.display = "inline-block";
      });
    };

    const renderTasks = (arg = "") => {
      let tasksToRender = [];
      if (arg === "") {
        const project = allProjects[currentIndex.get()];
        tasksToRender = project.getTasks();
      } else if (arg === "today") {
        tasksToRender = allTasks.getTodayTasks();
      } else if (arg === "nextWeek"){
        tasksToRender = allTasks.getNextWeekTasks();
      } else if (arg === "allTasks") {
        tasksToRender = allTasks.getTasks();
      } else if (arg === "important") {
        tasksToRender = allTasks.getImportantTasks();
      }
      for (let i = 0; i < tasksToRender.length; i++) {
        if (!allTasks.contains(tasksToRender[i].name)){
          if (arg === ""){
            allProjects[currentIndex.get()].deleteTask(tasksToRender[i].name);
          }
          continue;
        } else {
          const card = document.createElement("div");
          card.classList.add("card");
          content.appendChild(card);

          const icon = document.createElement("i");
          icon.classList.add("fa-regular", "fa-trash-can","icon");
          icon.style.display = "none";

          const starIcon = document.createElement("i");

          if (allTasks.isImportant(tasksToRender[i].name)){
            starIcon.classList.add("fa-solid", "fa-star", "icon");
          } else {
            starIcon.classList.add("fa-regular", "fa-star", "icon");

          }

          let name = tasksToRender[i].getName();
          let dueDate = tasksToRender[i].getDate();
          console.log(name);
          console.log(dueDate);

          const taskDiv = document.createElement("div");
          taskDiv.classList.add("taskDiv");
          taskDiv.textContent = name;

          const dueDateDiv = document.createElement("div");
          dueDateDiv.classList.add("dueDateDiv");

          const untill = document.createElement("div");
          untill.textContent = "Due Date";
          dueDateDiv.appendChild(untill);

          const date = document.createElement("div");
          date.textContent = dueDate;
          dueDateDiv.appendChild(date);

          card.appendChild(starIcon);
          

          card.appendChild(taskDiv);
          card.appendChild(dueDateDiv);
          
          card.appendChild(icon);

          card.addEventListener("mouseover", () => {
            icon.style.display = "";
          })

          card.addEventListener("mouseout", () => {
            icon.style.display = "none";
          })

          icon.addEventListener("mouseover", () => {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
          });

          icon.addEventListener("mouseout", () => {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
          });

          icon.addEventListener("click", () => {
            allProjects[currentIndex.get()].deleteTask(name);
            allTasks.removeTask(name);
            //emptyContentSection();
            renderContentSection(arg);
          })

          starIcon.addEventListener("click", () => {
            if (starIcon.classList.contains("fa-regular")){
              starIcon.classList.remove("fa-regular");
              starIcon.classList.add("fa-solid");
              allTasks.pushImportantTask(tasksToRender[i]);
            } else {
              starIcon.classList.remove("fa-solid");
              starIcon.classList.add("fa-regular");
              allTasks.removeImportantTask(tasksToRender[i].name);
            }
          })

          content.appendChild(card);
        }
      }
    };
    const handleHomeSection = (e) => {
      if (e.target.id == "title1") {
        renderContentSection("allTasks")
      } else if (e.target.id == "title2") {
        renderContentSection("today");
      } else if (e.target.id == "title3") {
        renderContentSection("nextWeek");
      } else if (e.target.id == "title4") {
        renderContentSection("important");
      }
    };

    renderProjectSection();
  };

  const projectIsValid = (name) => {
    return allProjects.some((project) => name === project.getName());
  };

  return {
    loadPage,
  };
})();

export { UI };
