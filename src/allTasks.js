const { isSameDay } = require("date-fns");

const allTasks = (function () {
  let listOfTasks = [];

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

  const removeTask = (name) => {
    listOfTasks = listOfTasks.filter((task) => task.getName() !== name )
  }

  return {
    pushTask,
    getTasks,
    getTodayTasks,
    removeTask,
  };
})();

export { allTasks };
