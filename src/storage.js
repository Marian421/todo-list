import { allTasks } from "./allTasks";
import { UI } from "./UI";
import Project from "./projects";
import Task from "./tasks";

const Storage = (() => {
  const init = () => {
    if (!(localStorage.getItem("allTasks") === null)) {
      createTasks();
    }
    if (!(localStorage.getItem("projects") === null)) {
      console.log("calling createProjects");
      createProjects();
    }
    if (!(localStorage.getItem("importantTasks") === null)) {
      createImportantTasks();
    }
  };

  const createImportantTasks = () => {
    const storedImportantTasks = JSON.parse(
      localStorage.getItem("importantTasks"),
    );

    storedImportantTasks.forEach((element) => {
      const newTask = new Task(element.name, element.dueDate);
      allTasks.pushImportantTask(newTask);
    });
  };

  const createTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("allTasks"));

    storedTasks.forEach((element) => {
      const newTask = new Task(element.name, element.dueDate);
      allTasks.pushTask(newTask);
    });
  };

  const createProjects = () => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));

    for (let i = 0; i < storedProjects.length; i++) {
      const newProject = new Project(storedProjects[i].name);
      console.log(storedProjects[i].tasks.length);
      for (let j = 0; j < storedProjects[i].tasks.length; j++) {
        console.log("after this one ");
        console.log(storedProjects[i].tasks[j].name);
        const newTask = new Task(
          storedProjects[i].tasks[j].name,
          storedProjects[i].tasks[j].dueDate,
        );
        newProject.addTask(newTask);
      }
      UI.pushProject(newProject);
    }
  };

  const resetProjects = () => {
    localStorage.setItem("projects", null);
  };

  const resetImportantTasks = () => {
    localStorage.setItem("importantTasks", null);
  };

  const resetAllTasks = () => {
    localStorage.setItem("allTasks", null);
  };

  return {
    init,
    resetProjects,
    resetAllTasks,
    resetImportantTasks,
  };
})();

export { Storage };
