const allTasks = (function(){
    const listOfTasks = [];
    const pushTask = (newTask) => {
        listOfTasks.push(newTask);
    }
    const getTasks = () => {
        return listOfTasks;
    }

    const getTodayTasks = () => {
        
    }
    return {
        pushTask,
        getTasks
    }
})();

export {allTasks};