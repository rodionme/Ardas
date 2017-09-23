import { Component, OnInit } from '@angular/core';

import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  activeTasks: number;
  totalTasks: number;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getActiveTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  getActiveTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks.filter(task => task.obj_status === 'active');

        this.activeTasks = this.tasks.length;
        this.totalTasks = tasks.length;
      });
  }
}
