import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @ViewChild('titleInput') titleInput:ElementRef;
  @Input() task: Task;
  name: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.taskService.getTask(+params.get('id')))
      .subscribe(task => {
        this.task = task;
        this.name = task.name;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.taskService.update(this.task).subscribe(() => {
      this.name = this.task.name;
      this.titleInput.nativeElement.blur();
    });
  }

  revert(): void {
    if (this.task.name !== this.name) {
      this.task.name = this.name;
      this.titleInput.nativeElement.blur();
    }
  }
}
