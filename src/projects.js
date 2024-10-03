import {allTasks} from "./allTasks";

export default class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getTasks(){
        return this.tasks;
    }

    addTask(newTask){
       if (this.tasks.find((task) => task.getName() === newTask.getName())) return;
       this.tasks.push(newTask); 
       allTasks.pushIntoAllTasks(newTask);
    }

    deleteTask(taskToDelete){
       this.tasks = this.tasks.filter((task) => task.name !== taskToDelete.name); 
    }
}