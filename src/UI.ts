import Project from "./projects";
import Task from "./tasks";
import { allTasks } from "./allTasks";
import { Storage } from "./storage";


const UI = (function () {
  let allProjects: Project[] = [];

  const loadPage = () => {
    Storage.init();
    initEventListeners();
  };

  const pushProject = (project: Project) => {
    allProjects.push(project);
  };

  const initEventListeners = () => {
    const homeSection = document.querySelector(".homeSection") as HTMLLIElement;
    const content = document.querySelector(".content") as HTMLElement;
    const projectSection = document.querySelector(".projectSection") as HTMLElement;

    const currentIndex = (() => {
      let index: number = 0;

      const get = (): number => {
        return index;
      };

      const set = (newIndex: number): void => {
        console.log("test");
        index = newIndex;
      };

      return {
        get,
        set,
      };
    })();

    const currentHomeSection = (() => {
      let currentSection: string = "";

      const get = (): string => {
        return currentSection;
      }

      const set = (name: string): void => {
        currentSection = name;
      }

      return {
        get,
        set,
      }
    })();

    const submitFormFunction = (name: string) => {
      if (!projectIsValid(name)) {
        const newCreatedProject: Project = new Project(name);
        allProjects.push(newCreatedProject);

        Storage.resetProjects();
        localStorage.setItem("projects", JSON.stringify(allProjects));
      } else {
        alert("Project exists");
        console.log("false");
      }

      emptyProjectSection();

      renderProjectSection();
    };

    const submitTaskFunction = (name: string, date: string): void => {
      const newTask: Task = new Task(name, date);
      if (allProjects[currentIndex.get()].addTask(newTask) === 0) {
        alert("task already exists");
      } else {
        allTasks.pushTask(newTask);

        Storage.resetAllTasks();
        localStorage.setItem("allTasks", JSON.stringify(allTasks.getTasks()));

        Storage.resetProjects();
        localStorage.setItem("projects", JSON.stringify(allProjects));
      }
    };

    const emptyContentSection = (): void => {
      while (content.firstChild) {
        content.removeChild(content.firstChild);
      }
    };

    const emptyProjectSection = (): void => {
      while (projectSection.firstChild) {
        projectSection.removeChild(projectSection.lastChild!);
      }
    };

    homeSection.addEventListener("click", (e) => {
      handleHomeSection(e);
    });

    const renderContentSection = (arg: string = "") => {
      emptyContentSection();
      if (arg === "") {
        const project: Project = allProjects[currentIndex.get()];

        const projectTitle = document.createElement("h2") as HTMLElement;
        projectTitle.textContent = project.getName();
        projectTitle.classList.add("contentTitle");

        content.appendChild(projectTitle);

        renderTasks();

        const addTasksButton = document.createElement("button") as HTMLElement;
        addTasksButton.textContent = "+ New Task";
        addTasksButton.classList.add("addTasksButton");

        const tasksFormContainer = document.createElement("div") as HTMLElement;
        tasksFormContainer.classList.add("tasksFormContainer");
        tasksFormContainer.style.display = "none";

        const inputTaskName = document.createElement("input") as HTMLInputElement;
        inputTaskName.setAttribute("type", "text");
        inputTaskName.setAttribute("name", "inputTaskName");
        inputTaskName.setAttribute("id", "inputTaskName");
        inputTaskName.setAttribute("placeholder", "Task description");

        const inputDate = document.createElement("input") as HTMLInputElement;
        inputDate.setAttribute("type", "date");
        inputDate.setAttribute("name", "inputDate");
        inputDate.setAttribute("id", "inputDate");
        inputDate.valueAsDate = new Date();

        const submitTask = document.createElement("input") as HTMLInputElement;
        submitTask.setAttribute("type", "submit");
        submitTask.setAttribute("name", "submitTask");
        submitTask.setAttribute("id", "submitTask");
        submitTask.value = "Add";

        const cancelTask = document.createElement("input") as HTMLInputElement;
        cancelTask.setAttribute("type", "submit");
        cancelTask.setAttribute("name", "cancelTask");
        cancelTask.setAttribute("id", "cancelTask");
        cancelTask.value = "Cancel";

        tasksFormContainer.appendChild(inputTaskName);
        tasksFormContainer.appendChild(inputDate);
        tasksFormContainer.appendChild(submitTask);
        tasksFormContainer.appendChild(cancelTask);

        content.appendChild(tasksFormContainer);
        content.appendChild(addTasksButton);

        addTasksButton.addEventListener("click", () => {
          addTasksButton.style.display = "none";
          tasksFormContainer.style.display = "";
          //secondDialog.showModal();
        });

        submitTask.addEventListener("click", (e) => {
          e.preventDefault();
          const name = inputTaskName.value;
          inputTaskName.value = "";
          const date = inputDate.value;
          inputDate.value = "";
          submitTaskFunction(name, date);
          addTasksButton.style.display = "";
          renderContentSection();
        });

        cancelTask.addEventListener("click", (e) => {
          e.preventDefault();
          renderContentSection();
        });
      } else if (arg === "today") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2") as HTMLElement;
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "Today's tasks";

        content.appendChild(contentTitle);

        renderTasks("today");
      } else if (arg === "nextWeek") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2") as HTMLElement;
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "Next week tasks";

        content.appendChild(contentTitle);

        renderTasks("nextWeek");
      } else if (arg === "allTasks") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2") as HTMLElement;
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "All tasks";

        content.appendChild(contentTitle);

        renderTasks("allTasks");
      } else if (arg === "important") {
        //emptyContentSection();

        const contentTitle = document.createElement("h2") as HTMLElement;
        contentTitle.classList.add("contentTitle");
        contentTitle.textContent = "Important";

        content.appendChild(contentTitle);

        renderTasks("important");
      }
    };

    const renderProjectSection = (): void => {
      // the header
      const projectHeader = document.createElement("h2") as HTMLElement;
      projectHeader.textContent = "PROJECTS";
      projectHeader.classList.add("sidebarHeader");

      projectSection.appendChild(projectHeader);

      // goes through every project, and renders a button for them
      for (let i = 0; i < allProjects.length; i++) {
        const ProjectButton = document.createElement("button") as HTMLButtonElement;
        ProjectButton.classList.add("newProjectButton");
        ProjectButton.textContent = allProjects[i].getName();

        const projectDiv = document.createElement('div') as HTMLElement;

        projectDiv.classList.add("projectDiv");

        const icon = document.createElement("i") as HTMLElement;
        icon.classList.add("fa-regular", "fa-trash-can", "deleteProjectIcon");
        icon.style.display = "none";

        projectDiv.appendChild(ProjectButton);

        projectDiv.appendChild(icon);

        projectSection.appendChild(projectDiv);

        ProjectButton.addEventListener("click", () => {
          currentIndex.set(i);
          console.log(allProjects[i].getTasks());
          //emptyContentSection();

          currentHomeSection.set("");

          renderContentSection();
        });

        icon.addEventListener("click", () => {
          deleteThisProjectTasks(i);

          allProjects.splice(i, 1);

          Storage.resetProjects();

          localStorage.setItem("projects", JSON.stringify(allProjects));
          
          emptyProjectSection();

          renderProjectSection();

          if (currentHomeSection.get() !== ""){
            renderContentSection(currentHomeSection.get());
          }

          if (currentIndex.get() === i){
            emptyContentSection();
          }
        })

        projectDiv.addEventListener("mouseover", () => {
          icon.style.display = "";
        })
        
        icon.addEventListener("mouseover", () => {
          ProjectButton.style.backgroundColor = "#283618";
          ProjectButton.style.textDecoration = "underline";
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        })

        icon.addEventListener("mouseout", () => {
          ProjectButton.style.backgroundColor = "";
          ProjectButton.style.textDecoration = "";
          icon.classList.add("fa-regular");
          icon.classList.remove("fa-solid");
        })

        projectDiv.addEventListener("mouseout", () => {
          icon.style.display = "none";
        })
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
      inputProjectName.setAttribute("maxlength", "20");
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
      let tasksToRender: Task[] = [];
      if (arg === "") {
        const project = allProjects[currentIndex.get()];
        tasksToRender = project.getTasks();
      } else if (arg === "today") {
        tasksToRender = allTasks.getTodayTasks();
      } else if (arg === "nextWeek") {
        tasksToRender = allTasks.getNextWeekTasks();
      } else if (arg === "allTasks") {
        tasksToRender = allTasks.getTasks();
      } else if (arg === "important") {
        tasksToRender = allTasks.getImportantTasks();
      }
      for (let i = 0; i < tasksToRender.length; i++) {
        if (!allTasks.contains(tasksToRender[i].getName())) {
          if (arg === "") {
            allProjects[currentIndex.get()].deleteTask(tasksToRender[i].getName());
          }
          continue;
        } else {
          const card = document.createElement("div");
          card.classList.add("card");
          content.appendChild(card);

          const icon = document.createElement("i");
          icon.classList.add("fa-regular", "fa-trash-can", "icon");
          icon.style.display = "none";

          const starIcon = document.createElement("i");

          if (allTasks.isImportant(tasksToRender[i].getName())) {
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
          });

          card.addEventListener("mouseout", () => {
            icon.style.display = "none";
          });

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

            Storage.resetAllTasks();
            localStorage.setItem("allTasks", JSON.stringify(allTasks.getTasks()));

            Storage.resetProjects();
            localStorage.setItem("projects", JSON.stringify(allProjects));

            //emptyContentSection();
            renderContentSection(arg);
          });

          starIcon.addEventListener("click", () => {
            if (starIcon.classList.contains("fa-regular")) {
              starIcon.classList.remove("fa-regular");
              starIcon.classList.add("fa-solid");
              allTasks.pushImportantTask(tasksToRender[i]);
              Storage.resetImportantTasks();
              localStorage.setItem(
                "importantTasks",
                JSON.stringify(allTasks.getImportantTasks()),
              );
            } else {
              starIcon.classList.remove("fa-solid");
              starIcon.classList.add("fa-regular");
              allTasks.removeImportantTask(tasksToRender[i].getName());
            }

            if (arg == "important") {
              renderContentSection("important");
            }
          });

          content.appendChild(card);
        }
      }
    };
    const handleHomeSection = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.id == "title1") {
        renderContentSection("allTasks");
        currentHomeSection.set("allTasks");
      } else if (target.id == "title2") {
        renderContentSection("today");
        currentHomeSection.set("today");
      } else if (target.id == "title3") {
        renderContentSection("nextWeek");
        currentHomeSection.set("nextWeek");
      } else if (target.id == "title4") {
        renderContentSection("important");
        currentHomeSection.set("important");
      }
    };

    renderProjectSection();
  };

  const deleteThisProjectTasks = (index: number) => {
    const tasks: Task[] = allProjects[index].getTasks();

    tasks.forEach(task => {
      allTasks.removeTask(task.getName());

      if (allTasks.isImportant(task.getName())){
        allTasks.removeImportantTask(task.getName());
      }
    });

    Storage.resetAllTasks();
    Storage.resetImportantTasks();

    localStorage.setItem("allTasks", JSON.stringify(allTasks.getTasks()));
    localStorage.setItem("importantTasks", JSON.stringify(allTasks.getImportantTasks()));
  }

  const projectIsValid = (name: string) => {
    return allProjects.some((project) => name === project.getName());
  };

  return {
    loadPage,
    pushProject,
  };
})();

export { UI };
