import { Controller, Get } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // tasksService: TasksService;
  constructor(private tasksService: TasksService) {
    // this.tasksService = tasksService;
  }

  //handler method
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // helloWorld() {
  //   this.taskService;
  // }
}
