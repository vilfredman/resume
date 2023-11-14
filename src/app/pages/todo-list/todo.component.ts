import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeadModel } from './shared/types/head.model';
import { TodoService } from './services/todo.service';
import { ConfirmationService } from 'primeng/api';
import { Constants } from './shared/constants/constants';
import { Subscription } from 'rxjs';
import { Todo } from './shared/interfaces/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  model: HeadModel = new HeadModel();

  constructor(
    public readonly todoService: TodoService,
    private readonly confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    const localStorageUser: string | null = localStorage.getItem(
      Constants.localStorageUserKey,
    );
    if (localStorageUser !== null)
      this.model.currentUser = JSON.parse(localStorageUser);
    this.todoService.init(this.model);
  }
  ngOnDestroy(): void {
    this.model.subscriptions.forEach(
      (subscription: Subscription) => subscription?.unsubscribe(),
    );
  }

  openNew(): void {
    this.model.todo = {};
    this.model.submitted = false;
    this.model.todoDialog = true;
  }

  deleteSelectedTodo(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected todos?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this.model.selectedTodo?.forEach((todo: Todo) =>
          this.todoService.deleteTodo(todo),
        );
        this.model.selectedTodo = null;
      },
    });
  }

  deleteTodo(todo: Todo): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + todo.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this.todoService.deleteTodo(todo);
        this.model.todo = {};
      },
    });
  }

  hideDialog(): void {
    this.model.todoDialog = false;
    this.model.submitted = false;
  }

  saveTodo(): void {
    this.model.submitted = true;
    if (this.model.todo.title?.trim()) {
      this.todoService.createTodo(this.model.todo);
      this.model.todos = [...this.model.todos];
      this.model.todoDialog = false;
      this.model.todo = {};
    }
  }

  getSeverity(status: undefined | boolean): string {
    return status ? 'success' : '';
  }

  onRowEditInit(todo: Todo): void {
    this.model.editedTodos[todo.id as number] = { ...todo };
  }

  onRowEditSave(todo: Todo): void {
    this.todoService.editTodo(todo);
  }
  onRowEditCancel(todo: Todo, index: number): void {
    this.model.todos[index] = this.model.editedTodos[todo.id as number];
    delete this.model.editedTodos[todo.id as number];
  }
}
