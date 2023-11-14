import { Injectable } from '@angular/core';
import { HeadModel } from '../shared/types/head.model';
import { MessageService } from 'primeng/api';
import { Todo } from '../shared/interfaces/todo';
import { Constants } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  model!: HeadModel;
  constructor(private readonly messageService: MessageService) {}

  init(model: HeadModel): void {
    this.model = model;
    const storedTodos: string | null = localStorage.getItem('todos');
    if (storedTodos) this.model.todos = JSON.parse(storedTodos);
  }

  createTodo(todo: Todo): void {
    todo.id = Math.floor(Math.random() * 8000) + 201;
    this.model.todos.unshift(todo);
    this.saveTodosLocally();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Task Created',
      life: 3000,
    });
  }

  deleteTodo(todo: Todo): void {
    const index: number = this.model.todos.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      this.model.todos.splice(index, 1);
      this.saveTodosLocally();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Task Deleted',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todo not found',
        life: 3000,
      });
    }
  }

  editTodo(todo: Todo): void {
    const searchTodo: Todo | undefined = this.model.todos.find(
      (t) => t.id === todo.id,
    );
    if (searchTodo) {
      Object.assign(searchTodo, todo);
      this.saveTodosLocally();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Task Updated',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todo not found',
        life: 3000,
      });
    }
  }

  private saveTodosLocally(): void {
    localStorage.setItem(Constants.todos, JSON.stringify(this.model.todos));
  }
}
