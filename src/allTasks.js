const { isSameDay, isSameWeek } = require("date-fns");

const allTasks = (function () {
  let listOfTasks = [];

  let importantTasks = [];

  const pushTask = (newTask) => {
    listOfTasks.push(newTask);
  };
  const getTasks = () => {
    return listOfTasks;
  };

  const getTodayTasks = () => {
    const todayTasks = [];

    listOfTasks.forEach((task) => {
      if (isSameDay(new Date(), task.getDate())) {
        todayTasks.push(task);
      }
    });
    return todayTasks;
  };
  
  const getImportantTasks = () => {
    return importantTasks;
  }

  const getNextWeekTasks = () => {
    const nextWeekTasks = [];
    
    listOfTasks.forEach((task) => {
      if (isSameWeek(new Date(), task.getDate())) {
        nextWeekTasks.push(task);
      }
    })

    return nextWeekTasks;
  }

  const pushImportantTask = (task) => {
    if (!importantTasks.some((t) => t.getName() === task.getName())){
      importantTasks.push(task);
    }
  }

  const removeImportantTask = (name) => {
    importantTasks = importantTasks.filter((task) => task.getName() !== name);
  }

  const isImportant = (name) => {
    return importantTasks.some((task) => task.getName() === name);
  }

  const removeTask = (name) => {
    listOfTasks = listOfTasks.filter((task) => task.getName() !== name );
  }

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
  };
})();

export { allTasks };
