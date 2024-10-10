const {isSameDay} = require("date-fns");

const allTasks = (function(){
    const listOfTasks = [];
    
    const pushTask = (newTask) => {
        listOfTasks.push(newTask);
    }
    const getTasks = () => {
        return listOfTasks;
    }

    const getTodayTasks = () => {
        const todayTasks = [];
        listOfTasks.forEach((task) => {
            if(isSameDay(new Date(), task.getDate()))
            {
                todayTasks.push(task);
            }
        })
        return todayTasks;
    }

    return {
        pushTask,
        getTasks,
        getTodayTasks
    }
})();

export {allTasks};