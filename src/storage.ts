import { allTasks } from "./allTasks";
import { UI } from "./UI";
import Project from "./projects";
import Task from "./tasks";
import { TaskData, ProjectData } from "./types";



const Storage = (() => {
  const init = () => {
    if (!(localStorage.getItem("allTasks") === null)) {
      createTasks();
    }
    if (!(localStorage.getItem("projects") === null)) {
      createProjects();
    }
    if (!(localStorage.getItem("importantTasks") === null)) {
      createImportantTasks();
    }
  };

  const createImportantTasks = (): void => {
    const storedImportantTasks: TaskData[] = JSON.parse(
      localStorage.getItem("importantTasks") ?? "[]",
    );

    storedImportantTasks.forEach((element): void => {
      const newTask: Task = new Task(element.name, element.dueDate);
      allTasks.pushImportantTask(newTask);
    });
  };

  const createTasks = (): void => {
    const storedTasks: TaskData[] = JSON.parse(localStorage.getItem("allTasks") ?? "[]");

    storedTasks.forEach((element) => {
      const newTask: Task = new Task(element.name, element.dueDate);
      allTasks.pushTask(newTask);
    });
  };

  const createProjects = (): void => {
    const storedProjects: ProjectData[] = JSON.parse(localStorage.getItem("projects") ?? "[]");

    for (let i = 0; i < storedProjects.length; i++) {
      const newProject: Project = new Project(storedProjects[i].name);
      for (let j = 0; j < storedProjects[i].tasks.length; j++) {
        const newTask: Task = new Task(
          storedProjects[i].tasks[j].name,
          storedProjects[i].tasks[j].dueDate,
        );
        newProject.addTask(newTask);
      }
      UI.pushProject(newProject);
    }
  };

  const resetProjects = (): void => {
    localStorage.setItem("projects", "[]");
  };

  const resetImportantTasks = (): void => {
    localStorage.setItem("importantTasks", "[]");
  };

  const resetAllTasks = (): void => {
    localStorage.setItem("allTasks", "[]");
  };

  return {
    init,
    resetProjects,
    resetAllTasks,
    resetImportantTasks,
  };
})();

export { Storage };
