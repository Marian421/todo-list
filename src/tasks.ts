export default class Task {
  private name: string;
  private dueDate: string;

  constructor(name: string, dueDate = "no date") {
    this.name = name;
    this.dueDate = dueDate;
  }

  setName(name: string): void {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setDate(dueDate: string): void {
    this.dueDate = dueDate;
  }

  getDate(): string {
    return this.dueDate;
  }
}
