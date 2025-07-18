const { isSameDay, isSameWeek } = require("date-fns");
import Task from "./tasks";

const allTasks = (function () {
  let listOfTasks: Task[] = [];

  let importantTasks: Task[] = [];

  const pushTask = (newTask: Task): void => {
    listOfTasks.push(newTask);
  };
  const getTasks = (): Task[] => {
    return listOfTasks;
  };

  const setTasks = (tasks: Task[]): void => {
    listOfTasks = tasks;
  };

  const getTodayTasks = () => {
    const todayTasks: Task[] = [];

    listOfTasks.forEach((task: Task): void => {
      if (isSameDay(new Date(), task.getDate())) {
        todayTasks.push(task);
      }
    });
    return todayTasks;
  };

  const getImportantTasks = (): Task[] => {
    return importantTasks;
  };

  const setImportantTasks = (tasks: Task[]): void => {
    importantTasks = tasks;
  };

  const getNextWeekTasks = () => {
    const nextWeekTasks: Task[] = [];

    listOfTasks.forEach((task: Task): void => {
      if (isSameWeek(new Date(), task.getDate())) {
        nextWeekTasks.push(task);
      }
    });

    return nextWeekTasks;
  };

  const pushImportantTask = (task: Task): void => {
    if (!importantTasks.some((t) => t.getName() === task.getName())) {
      importantTasks.push(task);
    }
  };

  const removeImportantTask = (name: string): void => {
    importantTasks = importantTasks.filter((task) => task.getName() !== name);
  };

  const isImportant = (name: string): boolean => {
    return importantTasks.some((task) => task.getName() === name);
  };

  const removeTask = (name: string): void => {
    listOfTasks = listOfTasks.filter((task) => task.getName() !== name);
  };

  const contains = (name: string): boolean => {
    return listOfTasks.some((task) => task.getName() === name);
  };

  return {
    pushTask,
    getTasks,
    getTodayTasks,
    removeTask,
    getNextWeekTasks,
    pushImportantTask,
    removeImportantTask,
    getImportantTasks,
    isImportant,
    contains,
    setTasks,
    setImportantTasks,
  };
})();

export { allTasks };
