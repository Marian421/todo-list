import Task from "./tasks";

export default class Project {
  private name: string;
  private tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
    this.tasks = [];
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(newTask: Task): number | void {
    if (this.tasks.find((task) => task.getName() === newTask.getName()))
      return 0;
    console.log("add Tasks workssssss girllll");
    this.tasks.push(newTask);
  }

  deleteTask(taskToDelete: string): void {
    this.tasks = this.tasks.filter((task) => task.getName() !== taskToDelete);
  }
}
