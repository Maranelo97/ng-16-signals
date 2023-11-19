import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface Task {
  name: string;
  isCompleted: boolean;
}


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  task = new FormControl<string>('', {
    nonNullable: true
  });

  tasks = signal<Task[]>([]);

  completedTasks = computed( () => {
    const completedTasks = this.tasks().filter((task) => task.isCompleted);

    return completedTasks;
  });

  unCompletedTasks = computed( () => {
    const unCompletedTasks = this.tasks().filter((task) => !task.isCompleted);

    return unCompletedTasks;
  });

  constructor(){
    effect( () => {
      if(this.unCompletedTasks().length > 3) alert(`Tenes ${this.unCompletedTasks().length} tareas sin terminar, no seas gil!`)
    })
  }

  addTask() {
    this.tasks.update(tasks => [...tasks, { name: this.task.value, isCompleted: false }])
    this.task.setValue('');
  }

  complteTask(task: Task){
    this.tasks.mutate(tasks => {
     const tasktoUp = this.tasks().find( t =>  t.name === task.name);

     if(tasktoUp) tasktoUp.isCompleted = !tasktoUp.isCompleted;

     return tasks
    })
  }

  deleteTask(task: Task){
    this.tasks.update(tasks => tasks.filter( t => t.name !== task.name ))
  }

  reset(){
    this.tasks.set([]);
  }

}
