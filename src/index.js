import "./styles.css";
import generateSidebar from "./sidebar";
import Task from "./tasks";
import Project from "./projects";
import { allTasks } from "./allTasks";
import { UI } from "./UI";

generateSidebar();
UI.loadPage();


/*
    Left to do:
        - see how to remember all tasks
        - push tasks in project
        - get tasks from the project


*/ 

