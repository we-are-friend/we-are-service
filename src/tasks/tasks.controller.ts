import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
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

  // @Post()
  // createTask(@Body() body) {
  //   console.log(
  //     '🚀 ~ file: tasks.controller.ts ~ line 21 ~ TasksController ~ body',
  //     body,
  //   );
  // }

  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.tasksService.createTask(title, description);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  // helloWorld() {
  //   this.taskService;
  // }
}
