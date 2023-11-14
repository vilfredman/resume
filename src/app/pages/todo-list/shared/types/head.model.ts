import { Subscription } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { User } from '../interfaces/user';
import { Constants } from '../constants/constants';

export class HeadModel {
  todos: Todo[] = [];
  todo!: Todo;
  currentUser!: User;
  subscriptions: Subscription[] = [];
  searchInput!: string;
  todoDialog: boolean = false;
  selectedTodo!: Todo[] | null;
  submitted: boolean = false;
  statuses = [
    { label: Constants.activeLabel, value: false },
    { label: Constants.completedLabel, value: true },
  ];
  editedTodos: { [s: string]: Todo } = {};
}
