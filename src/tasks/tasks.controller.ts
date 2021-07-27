import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // tasksService: TasksService;
  constructor(private tasksService: TasksService) {
    // this.tasksService = tasksService;
  }

  //handler method
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
  // helloWorld() {
  //   this.taskService;
  // }
}
