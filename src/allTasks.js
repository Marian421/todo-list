const allTasks = (function(){
    const listOfTasks = [];
    const pushIntoAllTasks = (newTask) => {
        listOfTasks.push(newTask);
    }
    const getAllTasks = () => {
        return listOfTasks;
    }
    return {
        pushIntoAllTasks,
        getAllTasks
    }
})();

export {allTasks};