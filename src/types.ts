export type TaskData = {
  name: string;
  dueDate: string;
};

export type ProjectData = {
  name: string,
  tasks: TaskData[]
}